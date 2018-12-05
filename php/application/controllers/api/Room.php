<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use RongCloud\RongCloud;
class Room extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Room_model');
    }

    /**
	 * @api {post} /api/room/ppt 直播-设置ppt
	 * @apiVersion 1.0.0
	 * @apiName room_ppt
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/room/ppt
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 房间号
	 * @apiParam {String} url 资源地址
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": [],
	 *    "status": 0,
	 *    "message": "成功"
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
    public function ppt()
    {
    	$url = $this->input->get_post('url');
    	$room_id = (int)$this->input->get_post('room_id');
    	$this->Room_model->update_by(['id' => $room_id, 'anchor_uid' => $this->user_id], ['ppt' => $url]);
    	$this->ajaxReturn();
    }

	/**
	 * @api {post} /api/room/out 直播-退出房间
	 * @apiVersion 1.0.0
	 * @apiName room_out
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/room/out
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 房间号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": [],
	 *    "status": 0,
	 *    "message": "成功"
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function out()
	{
		$room_id = (int)$this->input->get_post('room_id');
		if($info = $this->Room_model->get($room_id)){
			if($info['anchor_uid'] == $this->user_id){
				$update = array('status' => 4);

				$this->Room_model->update_by(['anchor_uid' => $this->user_id, 'status' => 2], ['status' => 4]);
			}else{
				$update = array('offline' => $info['offline'] + 1);
			}
			$update['views'] = $info['views'] - 1;
			$this->Room_model->update($room_id, $update);

			$this->load->model('Live_online_model');
			$where = [
				'room_id' => $room_id,
				'user_id' => $this->user_id
			];
			$this->Live_online_model->delete_by($where);

			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '房间不存在');
		}
	}

	/**
	 * @api {post} /api/room/in 直播-进房间
	 * @apiVersion 1.0.0
	 * @apiName room_in
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/room/in
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 房间号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.chat_room_id 聊天室ID
	 * @apiSuccess {Number} data.views 主播热度
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "chat_room_id": 2,
	 *         "views": 2,
	 *         "income_gold": 10000,
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
	public function in()
	{
		$room_id = (int)$this->input->get_post('room_id');
		if($info = $this->Room_model->get($room_id)){
			$this->load->model('Live_online_model');
			$insert = [
				'room_id' => $room_id,
				'user_id' => $this->user_id
			];
			$this->Live_online_model->insert($insert);

			$ret = array();
			$ret['ppt'] = $info['ppt'];

			$update = array();
			if($info['anchor_uid'] != $this->user_id){
				$update['views'] = $info['views'] + 1;
				// $this->Room_model->update($room_id, $update);
			}
			//融云
	        $config = config_item('rongcloud');
        	$rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
        	//聊天室
        	$ret['chat_room_id'] = $info['chat_room_id'];
        	if(! $info['chat_room_id']){
	        	$chat_room_id = $room_id;
	        	$response = $rongCloud->Chatroom()->create([$chat_room_id => $info['title']]);
	        	if($response && $result = json_decode($response, true)){
	        		if($result['code'] == 200){
	        			$ret['chat_room_id'] = $update['chat_room_id'] = $chat_room_id;
	        		}
	        	}
        	}
        	$update && $this->Room_model->update($room_id, $update);

        	$ret['views'] = $info['views'] + 1;
        	$ret['income_gold'] = $info['income_gold'];

        	$this->load->model('Users_model');
        	$user = $this->Users_model->get($info['anchor_uid']);
        	$ret['nickname'] = $user['nickname'];
        	$ret['header'] = $user['header'];

        	$ret['hasFans'] = $ret['fans'] = 0;
        	if($this->user_id){
	        	$this->load->model('Users_collection_model');
				$ret['hasFans'] = $this->Users_collection_model->check_fans($this->user_id, $info['anchor_uid']);
				$where = array('t_id' => $info['anchor_uid'], 'topic' => 1, 'enable' => 1);
				$ret['fans'] = $this->Users_collection_model->count_by($where);
        	}
        	//token
        	/*$token = '';
        	$user = $this->get_user();
        	$this->load->model('Users_model');
        	$response = $rongCloud->user()->getToken(
        		$this->user_id,
        		$user['nickname'],
        		$this->Users_model->get_header($user['header'])
        	);
        	if($response && $result = json_decode($response, true)){
        		if($result['code'] == 200){
        			$token = $result['token'];
        		}
        	}
        	$ret['token'] = $token;*/

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '房间不存在');
		}
	}

	/**
	 * @api {get} /api/room/viewer 直播-观众
	 * @apiVersion 1.0.0
	 * @apiName room_viewer
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/room/viewer
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} room_id 房间号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.vip 贵族信息 id=0表示无贵族
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *             "exp": "0",
	 *             "vip": {
	 *                 "name": "",
	 *                 "icon": "",
	 *                 "id": 0
	 *             }
	 *         },
	 *         {
	 *             "id": "2",
	 *             "header": "",
	 *             "exp": "0",
	 *             "vip": {
	 *                 "name": "",
	 *                 "icon": "",
	 *                 "id": 0
	 *             }
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
	public function viewer()
	{
		$room_id = (int)$this->input->get_post('room_id');
		if($info = $this->Room_model->get($room_id)){
			$ret = [];
			$this->load->model('Live_online_model');
			$this->db->distinct();
			$this->db->select('user_id');
			$order_by = array('id' => 'desc');
			$where = ['room_id' => $room_id];
			$rows = $this->Live_online_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
			if($rows){
				$a_user_id = [];
				foreach($rows as $item){
					$a_user_id[] = $item['user_id'];
				}
				$this->load->model('Users_model');
				$this->db->select('id,header,exp');
				if($ret = $this->Users_model->get_many($a_user_id)){
					$this->load->model('Users_vip_model');
					foreach($ret as $key=>$item){
						$ret[$key]['vip'] = $this->Users_vip_model->vip_info($item['id']);
					}
				}
			}

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '房间不存在');
		}
	}
}
