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
	 * @api {get} /api/user/room_control/check 主播场控判断
	 * @apiVersion 1.0.0
	 * @apiName room_control_check
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_control/check
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} anchor_uid 主播ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.is_room_control 场控判断 0否 1是
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "is_room_control": 1,
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
	public function check()
	{
		$anchor_uid = (int)$this->input->get_post('anchor_uid');
		$this->load->model('Room_control_model');
		$is_room_control = 0;
		if($this->Room_control_model->get_by(['user_id' => $anchor_uid, 'room_control_user_id' => $this->user_id])){
			$is_room_control = 1;
		}

		$this->ajaxReturn(['is_room_control' => $is_room_control]);
	}

    /**
	 * @api {get} /api/user/room_control/search 场控-添加搜索
	 * @apiVersion 1.0.0
	 * @apiName room_control_search
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_control/search
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} keyword 搜索词 支持：会员号，手机号，昵称
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.user_id 为0表示添加的城市场控手机号未注册
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "3",
	 *             "nickname": "꯭諾꯭",
	 *             "mobi": "13923771616",
	 *             "header": "http://thirdwx.qlogo.cn/mmopen/vi_32//132",
	 *             "sex": "0",
	 *             "summary": ""
	 *         }
	 *     ],
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
	public function search()
	{
		$ret = [];
		$keyword = trim($this->input->get_post('keyword'));
		if($keyword){
			$this->load->model('Users_model');

			$this->db->select('id,nickname,mobi,header,sex,summary,exp,pretty_id');
			$this->db->where('id', $keyword);
			$this->db->or_where('pretty_id', $keyword);
			$this->db->or_like('nickname', $keyword);
			$this->db->or_like('mobi', $keyword);
			if($result = $this->Users_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_all()){
				$this->load->model('Grade_model');
				foreach($result as $key=>$item){
					$row = $this->Room_control_model->get_by(['room_control_user_id' => $item['id']]);
					$item['room_control'] = ($row && $row['user_id'] == $this->user_id) ? 1 : 0;
					$item['room_control_id'] = $item['room_control'] ? $row['id'] : 0;

					$grade = $this->Grade_model->exp_to_grade($item['exp']);
					$item['lv'] = $grade['grade_name'];

					$ret[] = $item;
				}
			}
		}

		$this->ajaxReturn($ret);
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
			$this->db->select('id,room_control_user_id');
			$ret['list'] = $this->Room_control_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_room_control_user_id = [];
			foreach($ret['list'] as $key=>$item){
				$ret['list'][$key]['user_id'] = 0;
				$a_room_control_user_id[] = $item['room_control_user_id'];
			}

			$this->load->model('Users_model');
			$this->db->select('id user_id,nickname,header,v,exp,mobi,summary,pretty_id');
			if($users = $this->Users_model->get_many($a_room_control_user_id)){
				$k_users = [];
				$a_id = array();
				$this->load->model('Grade_model');
				foreach($users as $item){
					$grade = $this->Grade_model->exp_to_grade($item['exp']);
					$item['lv'] = $grade['grade_name'];

					$k_users[$item['user_id']] = $item;
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
					isset($k_users[$item['room_control_user_id']]) && $ret['list'][$key] = array_merge($item, $k_users[$item['room_control_user_id']]);
					$ret['list'][$key]['fans'] = isset($fans[$k_users[$item['room_control_user_id']]['user_id']]) ? $fans[$k_users[$item['room_control_user_id']]['user_id']] : 0;
	                $ret['list'][$key]['music'] = isset($audio[$k_users[$item['room_control_user_id']]['user_id']]) ? $audio[$k_users[$item['room_control_user_id']]['user_id']] : 0;
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
	 * @apiParam {String} room_control_user_id 选择场控账号ID
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
				'room_control_user_id'
			),
			$this->input->post(),
			''
		);
		$params['user_id'] = $this->user_id;
		$this->check_params('add', $params);


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
				if(! $this->Users_model->get($params['room_control_user_id'])){
					$this->ajaxReturn([], 3, '选择场控账号不存在');
				}
				if($this->Room_control_model->get_by($params)){
					$this->ajaxReturn([], 4, '该用户已添加');
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
