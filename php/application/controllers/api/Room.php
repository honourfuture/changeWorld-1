<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use QCloud\Live\Query;
class Room extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Room_model');
    }

    /**
	 * @api {get} /api/room/add 直播-开房
	 * @apiVersion 1.0.0
	 * @apiName room_add
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/room/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.room_id 房间号
	 * @apiSuccess {String} data.push_url 推送地址
	 * @apiSuccess {Object} data.play_url 播放地址
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *		  "room_id": 1,
	 *        "push_url": "rtmp://6077.livepush.myqcloud.com/live/6077_zhumaidan-1-2?bizid=6077&txSecret=cbe8817ff9e6185dd783b09c99ea9f20&txTime=5A7AF498",
	 *       "play_url": "{\"rtmp\":\"rtmp:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2\",\"flv\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.flv\",\"m3u8\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.m3u8\"}"
	 *   },
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
	public function add()
	{
		$data = array(
			'anchor_uid' => $this->user_id
		);
		if($id = $this->Room_model->insert($data)){
			$live = new Query();
	        $channel_id = $this->Room_model->channel_id($this->user_id, $id);
	        $update = array(
	        	'push_url' => $live->getPushUrl($channel_id).'&record=flv&record_interval=5400',
	        	'play_url' => json_encode($live->getPlayUrl($channel_id))
	        );
	        $this->Room_model->update($id, $update);

	        $update['room_id'] = $id;
			$this->ajaxReturn($update);
		}else{
			$this->ajaxReturn([], 1, '创建房间失败');
		}
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
			}else{
				$update = array('offline' => $info['offline'] + 1);
			}
			$this->Room_model->update($room_id, $update);
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
	public function in()
	{
		$room_id = (int)$this->input->get_post('room_id');
		if($info = $this->Room_model->get($room_id)){
			if($info['anchor_uid'] != $this->user_id){
				$update = array('views' => $info['views'] + 1);
				$this->Room_model->update($room_id, $update);
			}
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '房间不存在');
		}
	}
}
