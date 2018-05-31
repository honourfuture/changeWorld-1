<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Room_action extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Room_action_model');
    }

    /**
	 * @api {get} /api/user/room_action 直播间操作集合-首页
	 * @apiVersion 1.0.0
	 * @apiName room_action
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_action
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 直播间ID
	 * @apiParam {Number} action 0禁言 1黑名单
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
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

		$room_id = (int)$this->input->get_post('room_id');
		$action = (int)$this->input->get_post('action');

		$where = ['room_id' => $room_id, 'action' => $action];

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Room_action_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,uid');
			$list = $this->Room_action_model->order_by($order_by)->get_many_by($where);

			$a_uid = [];
			foreach($list as $key=>$item){
				$a_uid[] = $item['uid'];
			}

			$this->load->model('Users_model');
			$this->db->select('id user_id,nickname,header,v,exp,mobi,summary');
			$ret['list'] = $this->Users_model->get_many($a_uid);
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/room_action/add 直播间操作集合-添加
	 * @apiVersion 1.0.0
	 * @apiName room_action_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_action/add
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 直播间ID
	 * @apiParam {Number} action 0禁言 1黑名单
	 * @apiParam {Number} uid 被操作用户ID
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
		$room_id = (int)$this->input->get_post('room_id');
		$action = (int)$this->input->get_post('action');
		$uid = (int)$this->input->get_post('uid');

		$this->load->model('Room_model');
		if(!$room = $this->Room_model->get($room_id)){
			$this->ajaxReturn([], 1, '直播间号错误');
		}

		$this->load->model('Room_control_model');
		if(!$this->Room_control_model->get_by(['user_id' => $room['anchor_uid'], 'room_control_user_id' => $this->user_id]) && $room['anchor_uid'] != $this->user_id){
			$this->ajaxReturn([], 2, '无权限操作直播间');
		}

		$params = [
			'room_id' => $room['id'],
			'anchor_uid' => $room['anchor_uid'],
			'action_uid' => $this->user_id,
			'uid' => $uid,
			'action' => $action
		];

		if($this->Room_action_model->insert($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '保存直播间操作集合人信息失败');
		}
	}

	/**
	 * @api {post} /api/user/room_action/del 直播间操作集合-删除
	 * @apiVersion 1.0.0
	 * @apiName room_action_del
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/room_action/del
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 直播间ID
	 * @apiParam {Number} action 0禁言 1黑名单
	 * @apiParam {Number} uid 被操作用户ID
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
				'room_id', 'action', 'uid'
			),
			$this->input->post(),
			''
		);

		$this->Room_action_model->delete_by(['room_id' => $params['room_id'], 'action' => $params['action'], 'uid' => $params['uid']]);
		$this->ajaxReturn();
	}
}
