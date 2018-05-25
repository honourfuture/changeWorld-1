<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Room_control extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Room_control_model');
    }

    /**
	 * @api {get} /api/user/room_control 场控-首页
	 * @apiVersion 1.0.0
	 * @apiName room_control
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_control
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.user_id 为0表示添加的城市场控手机号未注册
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "mobi": "13723716381",
	 *                 "user_id": "1",
	 *                 "nickname": "13723716381",
	 *                 "header": "/uploads/2018/05/24/8cfada92a1ab02de2244a6adbd842add.png",
	 *                 "v": "0",
	 *                 "exp": "0",
	 *                 "summary": "成功的人\n",
	 *                 "fans": "3",
	 *                 "music": "2"
	 *             }
	 *         ]
	 *     },
	 *     "status": 0,
	 *     "message": "成功"
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function index()
	{
		$ret = array('count' => 0, 'list' => array());

		$where = array('user_id' => $this->user_id);

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Room_control_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,mobi');
			$ret['list'] = $this->Room_control_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_mobi = [];
			foreach($ret['list'] as $key=>$item){
				$ret['list'][$key]['user_id'] = 0;
				$a_mobi[] = $item['mobi'];
			}

			$this->load->model('Users_model');
			$this->db->select('id user_id,nickname,header,v,exp,mobi,summary');
			if($users = $this->Users_model->get_many_by(['mobi' => $a_mobi])){
				$k_users = [];
				$a_id = array();
				foreach($users as $item){
					$k_users[$item['mobi']] = $item;
					$a_id[] = $item['user_id'];
				}

				if($a_id){
					$this->load->model('Users_collection_model');
	                $fans = $this->Users_collection_model->get_many_count_fans($a_id);
	                $this->load->model('Room_audio_model');
	                $audio = $this->Room_audio_model->get_many_count_music($a_id);
	                /*foreach($ret['list'] as $key=>$item){
	                    $ret['list'][$key]['fans'] = isset($fans[$item['id']]) ? $fans[$item['id']] : 0;
	                    $ret['list'][$key]['music'] = isset($audio[$item['id']]) ? $audio[$item['id']] : 0;
	                }*/
	            }

				foreach($ret['list'] as $key=>$item){
					isset($k_users[$item['mobi']]) && $ret['list'][$key] = array_merge($item, $k_users[$item['mobi']]);
					$ret['list'][$key]['fans'] = isset($fans[$k_users[$item['mobi']]['user_id']]) ? $fans[$k_users[$item['mobi']]['user_id']] : 0;
	                $ret['list'][$key]['music'] = isset($audio[$k_users[$item['mobi']]['user_id']]) ? $audio[$k_users[$item['mobi']]['user_id']] : 0;
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/room_control/add 场控-添加
	 * @apiVersion 1.0.0
	 * @apiName room_control_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_control/add
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} mobi 场控手机号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function add()
	{
		$params = elements(
			array(
				'mobi'
			),
			$this->input->post(),
			''
		);
		$this->check_params('add', $params);

		$params['user_id'] = $this->user_id;

		if($this->Room_control_model->insert($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '保存场控人信息失败');
		}
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				$this->load->model('Users_model');
				if(! $this->Users_model->get_by(['mobi' => $params['mobi']])){
					$this->ajaxReturn([], 3, '手机号未注册应用');
				}
				break;
			case 'edit':
				break;
		}
	}

	/**
	 * @api {post} /api/user/room_control/del 场控-删除
	 * @apiVersion 1.0.0
	 * @apiName room_control_del
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_control/del
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} id 场控ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function del()
	{
		$params = elements(
			array(
				'id'
			),
			$this->input->post(),
			''
		);

		$this->Room_control_model->delete_by(['id' => $params['id'], 'user_id' => $this->user_id]);
		$this->ajaxReturn();
	}
}
