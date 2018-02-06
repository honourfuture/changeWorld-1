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
	 * @apiSuccess {String} data.push_url 推送地址
	 * @apiSuccess {Object} data.play_url 播放地址
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
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
		$this->load->model('Room_model');
		$data = array(
			'anchor_uid' => $this->user_id
		);
		if($id = $this->Room_model->insert($data)){
			$live = new Query();
	        $channel_id = $this->Room_model->channel_id($this->user_id, $id);
	        $update = array(
	        	'push_url' => $live->getPushUrl($channel_id),
	        	'play_url' => json_encode($live->getPlayUrl($channel_id))
	        );
	        $this->Room_model->update($id, $update);

			$this->ajaxReturn($update);
		}else{
			$this->ajaxReturn([], 1, '创建房间失败');
		}
	}
}
