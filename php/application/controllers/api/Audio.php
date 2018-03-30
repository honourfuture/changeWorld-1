<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Audio extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Room_audio_model');
    }

	/**
	 * @api {get} /api/audio/play 音频-播放页
	 * @apiVersion 1.0.0
	 * @apiName audio_play
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/audio/play
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 音频ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.audio 音频信息
	 * @apiSuccess {Object} data.user 主播信息
	 * @apiSuccess {Object} data.album 专辑信息
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "audio": {
	 *             "id": "3",
	 *             "duration": "404",
	 *             "file_size": "26305965",
	 *             "video_url": "http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/46a1b7707447398154874610391/f0.flv",
	 *             "anchor_uid": "1",
	 *             "album_id": "7",
	 *             "title": "你的出生地址",
	 *             "price": "10000.00",
	 *             "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *             "play_times": "0",
	 *             "has_favorite": 0,
	 *             "favorite": 0,
	 *             "comment": 0
	 *         },
	 *         "user": {
	 *             "nickname": "aicode",
	 *             "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *             "v": "0"
	 *         },
	 *         "album": {
	 *             "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *             "title": "你的出生地址",
	 *             "has_favorite": 1,
	 *             "favorite": 1
	 *         }
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
	public function play()
	{
		$ret = [];

		$id = (int)$this->input->get_post('id');
		$this->db->select('id,duration,file_size,video_url,anchor_uid,album_id,title,price,cover_image,play_times');
		$info = $this->Room_audio_model->get($id);
		if($info){
			if(! $info['album_id']){
				$this->ajaxReturn([], 2, '音频已下线');
			}
			$ret['audio'] = $info;
			//主播信息
			$this->load->model('Users_model');
			$this->db->select('nickname,header,v');
			$ret['user'] = $this->Users_model->get($info['anchor_uid']);
			//专辑
			$this->db->select('cover_image,title');
			$this->load->model('Album_model');
			$ret['album'] = $this->Album_model->get($info['album_id']);

			//订阅
			$this->load->model('Users_collection_model');
			$ret['album']['has_favorite'] = $this->Users_collection_model->check_favorite($this->user_id, $info['album_id'], 50);
			$where = array('t_id' => $info['album_id'], 'topic' => 2, 'sub_topic' => 50);
			$ret['album']['favorite'] = $this->Users_collection_model->count_by($where);

			//喜欢
			$ret['audio']['has_favorite'] = $this->Users_collection_model->check_favorite($this->user_id, $id, 30);
			$where = array('t_id' => $id, 'topic' => 2, 'sub_topic' => 30);
			$ret['audio']['favorite'] = $this->Users_collection_model->count_by($where);
			$ret['audio']['comment'] = 0;

			$this->load->model('Audio_history_model');
			$this->Audio_history_model->delete_by(['user_id' => $this->user_id, 'audio_id' => $id]);
			$this->Audio_history_model->insert(['user_id' => $this->user_id, 'audio_id' => $id]);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '收听音频参数错误');
		}
	}

	/**
	 * @api {post} /api/audio/download 音频-下载
	 * @apiVersion 1.0.0
	 * @apiName audio_download
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/audio/download
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 音频ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {},
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
	public function download()
	{
		$id = (int)$this->input->get_post('id');
		$this->load->model('Resource_download_model');
		$this->Resource_download_model->delete_by(['user_id' => $this->user_id, 't_id' => $id, 'topic' => 0]);
		$this->Resource_download_model->insert(['user_id' => $this->user_id, 't_id' => $id, 'topic' => 0]);

		$this->ajaxReturn();
	}
}
