<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Headhunter extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Headhunter_model');
    }

    /**
	 * @api {get} /api/admin/headhunter 猎头用户-列表
	 * @apiVersion 1.0.0
	 * @apiName headhunter
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/headhunter
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} user_id 猎头用户ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-04-02 15:56:26",
	 *                 "updated_at": "2018-04-02 15:56:26",
	 *                 "deleted": "0",
	 *                 "status": "0",
	 *                 "enable": "1",
	 *                 "sort": "0",
	 *                 "url": "http://ww.baidu.com"
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
		$ret = ['count' => 0, 'list' => []];

		$user_id = (int)$this->input->get_post('user_id');
		if($user_id){
			$order_by = array('id' => 'desc');
			$where = ['user_id' => $user_id];
			$ret['count'] = $this->Headhunter_model->count_by($where);
			if($list = $this->Headhunter_model->order_by($order_by)->limit($this->cur_page, $this->offset)->get_many_by($where)){
				$a_uid = [];
				foreach($list as $item){
					$a_uid[] = $item['to_user_id'];
				}

				$this->load->model('Users_model');
				$user = $this->Users_model->get_many_user($a_uid);
				foreach($list as $item){
					$item['nickname'] = '';
					$item['header'] = '';
					$item['mobi'] = '';
					isset($user[$item['to_user_id']]) && $item = array_merge($item, $user[$item['to_user_id']]);

					$ret['list'][] = $item;
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/headhunter/add 猎头用户-添加
	 * @apiVersion 1.0.0
	 * @apiName headhunter_add
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/headhunter/add
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} user_id 猎头用户ID
	 * @apiParam {String} mobi 关联手机号
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
			[
				'user_id', 'mobi'
			],
			$this->input->post(),
			UPDATE_VALID
		);

		$this->load->model('Users_model');
		if($user = $this->Users_model->get_by(['mobi' => $params['mobi']])){
			$params['to_user_id'] = $user['id'];

			if($this->Headhunter_model->get_by(['user_id' => $params['user_id'], 'to_user_id' => $params['to_user_id']])){
				$this->ajaxReturn([], 2, '已是猎头会员');
			}

			if(! $id = $this->Headhunter_model->insert($params)){
				$this->ajaxReturn([], 3, '操作失败，请稍后重试');
			}

			$item = [];
			$item['id'] = $id;
			$item['nickname'] = $user['nickname'];
			$item['header'] = $user['header'];
			$item['mobi'] = $user['mobi'];

			$this->ajaxReturn($item);
		}else{
			$this->ajaxReturn([], 1, '会员未注册');
		}

	}

	/**
	 * @api {post} /api/admin/headhunter/del 猎头用户-删除
	 * @apiVersion 1.0.0
	 * @apiName headhunter_del
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/headhunter/del
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} id 记录唯一ID
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
		$id = (int)$this->input->get_post('id');
		if($id){
			$this->Headhunter_model->delete($id);
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '参数错误');
		}
	}

	/**
	 * @api {post} /api/admin/headhunter/onoff 猎头用户-开关
	 * @apiVersion 1.0.0
	 * @apiName headhunter_onoff
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/headhunter/onoff
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} id 记录唯一ID
	 * @apiParam {String} headhunter 猎头 0否 1是
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
	public function onoff()
	{
		$id = (int)$this->input->get_post('id');
		$headhunter = (int)$this->input->get_post('headhunter');
		if($id){
			$this->load->model('Users_model');
			if($this->Users_model->update($id, ['headhunter' => $headhunter])){
				$this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 2, '设置失败');
			}
		}else{
			$this->ajaxReturn([], 1, '参数错误');
		}
	}
}
