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
