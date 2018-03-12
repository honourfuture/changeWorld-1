<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Album extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Album_model');
    }

	/**
	 * @api {get} /api/album/view 专辑详情
	 * @apiVersion 1.0.0
	 * @apiName album_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/album/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 专辑ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.id 专辑ID
	 * @apiSuccess {String} data.cover_image 专辑背景图
	 * @apiSuccess {String} data.updated_at 专辑更新时间
	 * @apiSuccess {String} data.title 专辑标题
	 * @apiSuccess {String} data.price 专辑打包价
	 * @apiSuccess {String} data.album_class_name 专辑类名称
	 * @apiSuccess {String} data.audio_num 专辑音频数量
	 * @apiSuccess {String} data.play_times 专辑总播放次数
	 * @apiSuccess {String} data.nickname 主播昵称
	 * @apiSuccess {String} data.header 主播头像
	 * @apiSuccess {String} data.has_favorite 是否订阅 0否 1是
	 * @apiSuccess {String} data.favorite 订阅总数
	 * @apiSuccess {String} data.audio 专辑音频列表
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "id": "7",
	 *         "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *         "updated_at": "2018-03-01 14:11:29",
	 *         "title": "你的出生地址",
	 *         "album_class": "3",
	 *         "album_tag": ",配音,铃声,",
	 *         "price": "10000.00",
	 *         "public": "1",
	 *         "anchor_uid": "1",
	 *         "album_class_name": "知识",
	 *         "audio_num": "1",
	 *         "play_times": "0",
	 *         "nickname": "aicode",
	 *         "header": "",
	 *         "has_favorite": 0,
	 *         "favorite": 0,
	 *         "audio": [
	 *             {
	 *                 "id": "3",
	 *                 "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *                 "price": "10000.00",
	 *                 "title": "你的出生地址",
	 *                 "created_at": "2018-03-01 12:08:06",
	 *                 "duration": "404",
	 *                 "video_url": "http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/f0.flv",
	 *                 "play_times": "0",
	 *                 "comment": 0
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
	public function view()
	{
		$id = (int)$this->input->get_post('id');
		$this->db->select('id,cover_image,updated_at,title,album_class,album_tag,price,public,anchor_uid');
		$info = $this->Album_model->get($id);
		if($info){
			if(! $info['public']){
				$this->ajaxReturn([], 2, '主播专辑未公开');
			}
			//专辑类型
			$info['album_class_name'] = '';
			if($info['album_class']){
				$this->load->model('Album_class_model');
				$album_class = $this->Album_class_model->get($info['album_class']);
				$info['album_class_name'] = $album_class ? $album_class['name'] : '';
			}
			//专辑音频汇总
			$this->load->model('Room_audio_model');
			$a_audio_id = [$id];
			$audio = $this->Room_audio_model->get_audio_info_by_album($a_audio_id);
			$info = array_merge($info, $audio[$id]);
			//主播信息
			$this->load->model('Users_model');
			$this->db->select('nickname,header');
			$info = array_merge($info, $this->Users_model->get($info['anchor_uid']));
			//订阅
			$this->load->model('Users_collection_model');
			$info['has_favorite'] = $this->Users_collection_model->check_favorite($this->user_id, $id, 50);
			$where = array('t_id' => $id, 'topic' => 2, 'sub_topic' => 50);
			$info['favorite'] = $this->Users_collection_model->count_by($where);
			//音频
			$this->db->select('id,cover_image,price,title,created_at,duration,video_url,play_times');
			$info['audio'] = $this->Room_audio_model->get_many_by('album_id', $id);
			if($info['audio']){
				foreach($info['audio'] as $key=>$item){
					$info['audio'][$key]['comment'] = 0;
				}
			}

			$this->ajaxReturn($info);
		}else{
			$this->ajaxReturn([], 1, '查看专辑详情参数错误');
		}
	}
}
