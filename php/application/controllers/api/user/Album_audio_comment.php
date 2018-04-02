<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Album_audio_comment extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {post} /api/user/album_audio_comment/barrage 音频-弹幕
	 * @apiVersion 1.0.0
	 * @apiName album_audio_comment_barrage
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/album_audio_comment/barrage
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} audio_id 音频ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *	   },
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
	public function barrage()
	{
		$ret = array('count' => 0, 'list' => array());

		$audio_id = $this->input->get_post('audio_id');
		$this->load->model('Room_audio_model');
		if(! $audio = $this->Room_audio_model->get($audio_id)){
			$this->ajaxReturn($ret);
		}

		$this->load->model('Album_audio_comment_model');

		$where = [
			'album_id' => $audio['album_id']
		];
		$order_by = array('id' => 'asc');
		$ret['count'] = $this->Album_audio_comment_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,user_id,comment');
			$ret['list'] = $this->Album_audio_comment_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_uid = [];
			foreach($ret['list'] as $key=>$item){
				$ret['list'][$key]['header'] = '';
				$ret['list'][$key]['nickname'] = '';

				$item['user_id'] && $a_uid[] = $item['user_id'];
			}

			if($a_uid){
				$this->load->model('Users_model');
				$this->db->select('id,header,nickname');
				if($users = $this->Users_model->get_many($a_uid)){
					$k_user = [];
					foreach($users as $item){
						$user_id = $item['id'];
						unset($item['id']);
						$k_user[$user_id] = $item;
					}

					foreach($ret['list'] as $key=>$item){
						isset($k_user[$item['user_id']]) && $ret['list'][$key] = array_merge($ret['list'][$key], $k_user[$item['user_id']]);
					}
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/album_audio_comment/add 音频-发布评论
	 * @apiVersion 1.0.0
	 * @apiName album_audio_comment_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/album_audio_comment/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} audio_id 音频ID
	 * @apiParam {String} comment 评论内容
	 * @apiParam {String} pid 父级ID 默认0，大于0表示回复该评论
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *	   },
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
	public function add()
	{
		$params = elements(
			array(
				'audio_id', 'comment', 'pid'
			),
			$this->input->post(),
			''
		);
		if(empty($params['comment'])){
			$this->ajaxReturn([], 1, '评论内容不能为空');
		}
		$this->load->model('Room_audio_model');
		if(! $audio = $this->Room_audio_model->get($params['audio_id'])){
			$this->ajaxReturn([], 1, '该音频文件已被删除');
		}
		$params['album_id'] = $audio['album_id'];
		$params['user_id'] = $this->user_id;

		$this->load->model('Album_audio_comment_model');
		$this->Album_audio_comment_model->insert($params);

		$this->ajaxReturn();
	}
}
