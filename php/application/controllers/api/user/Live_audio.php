<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Live_audio extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Room_audio_model');
    }

    /**
	 * @api {get} /api/user/live_audio 我的音频-列表
	 * @apiVersion 1.0.0
	 * @apiName live_audio
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live_audio
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type [uid, title]
	 * @apiParam {String} keyword 搜索词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.count 总数
	 * @apiSuccess {Object[]} data.list 音频列表
	 * @apiSuccess {Number} data.list.id 音频唯一ID
	 * @apiSuccess {String} data.list.created_at 创建时间
	 * @apiSuccess {Number} data.list.duration 时长 秒
	 * @apiSuccess {String} data.list.video_url 音频地址
	 * @apiSuccess {String} data.list.cover_image 音频背景
	 * @apiSuccess {String} data.list.title 音频标题
	 * @apiSuccess {Number} data.list.price 门票价
	 * @apiSuccess {String} data.list.album_title 专辑标题
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 2,
	 *         "list": [
	 *             {
	 *                 "id": "4",
	 *                 "created_at": "2018-03-01 12:30:15",
	 *                 "duration": "1140",
	 *                 "video_url": "http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/4bbd9ba67447398154874879756/f0.flv",
	 *                 "album_id": "0",
	 *                 "title": "你的出生地址",
	 *                 "price": "0.00",
	 *                 "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *                 "room_id": "6",
	 *                 "album_title": ""
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

		$where = array('enable' => 1);
		if($this->user_id){
			$where['anchor_uid'] = $this->user_id;
		}

		$this->search();
		$ret['count'] = $this->Room_audio_model->count_by($where);
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$this->db->select('id,created_at,duration,video_url,album_id,title,price,cover_image,room_id,anchor_uid');
			$this->search();
			$ret['list'] = $this->Room_audio_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			if($ret['list']){
				$a_room_id = $a_album_id = array();
				$a_uid = [];
				foreach($ret['list'] as $key=>$item){
					$a_uid[] = $item['anchor_uid'];
					$ret['list'][$key]['album_title'] = '';
					(empty($item['title']) && empty($item['cover_image'])) && $a_room_id[] = $item['room_id'];
					$item['album_id'] && $a_album_id[] = $item['album_id'];
				}

				if($this->admin_id){
					$this->load->model('Users_model');
					$ret['user'] = $this->Users_model->get_many_user($a_uid);
				}

				$k_room = $k_album = array();
				//取房间信息
				if($a_room_id){
					$this->load->model('Room_model');
					$this->db->select('id,cover_image,title');
					$room = $this->Room_model->get_many($a_room_id);
					foreach($room as $item){
						$key = $item['id'];
						unset($item['id']);
						$k_room[$key] = $item;
					}
				}
				//取专辑信息
				if($a_album_id){
					$this->load->model('Album_model');
					$this->db->select('id,title as album_title');
					$album = $this->Album_model->get_many($a_album_id);
					foreach($album as $item){
						$key = $item['id'];
						unset($item['id']);
						$k_album[$key] = $item;
					}
				}

				if($k_room || $k_album){
					foreach($ret['list'] as $key=>$item){
						isset($k_room[$item['room_id']]) && $ret['list'][$key] = array_merge($ret['list'][$key], $k_room[$item['room_id']]);
						isset($k_album[$item['album_id']]) && $ret['list'][$key] = array_merge($ret['list'][$key], $k_album[$item['album_id']]);
					}
				}
			}else{
				$ret['list'] = [];
			}
		}
		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$type = $this->input->get_post('type');
		if(in_array($type, ['uid', 'title'])){
			$keyword = $this->input->get_post('keyword');
			if($keyword){
				if($type == 'uid'){
					$this->db->where('anchor_uid', $keyword);
				}else{
					$this->db->like('title', $keyword);
				}
			}
		}
	}

	/**
	 * @api {get} /api/user/live_audio/view 我的音频-查看
	 * @apiVersion 1.0.0
	 * @apiName live_audio_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/user/live_audio/view
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
	 *     "data": {
	 *         "id": "3",
	 *         "cover_image": "",
	 *         "title": "",
	 *         "album_id": "0",
	 *         "price": "0.00",
	 *         "city_partner_rate": "0.00",
	 *         "two_level_rate": "0.00",
	 *         "album_title": ""
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
		$this->db->select('id,cover_image,title,album_id,price,city_partner_rate,two_level_rate');
		$info = $this->Room_audio_model->get($id);
		if($info){
			$info['album_title'] = '';
			if($info['album_id']){
				$this->load->model('Album_model');
				$album = $this->Album_model->get($info['album_id']);
				$info['album_title'] = $album ? $album['title'] : '';
			}
		}

		$this->ajaxReturn($info);
	}

    /**
	 * @api {post} /api/user/live_audio/save 我的音频-编辑
	 * @apiVersion 1.0.0
	 * @apiName live_audio_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live_audio/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} cover_image 封面图
	 * @apiParam {String} title 标题
	 * @apiParam {Number} album_id 专辑ID
	 * @apiParam {Number} price 门票价格
	 * @apiParam {Number} city_partner_rate 城市分销比例
	 * @apiParam {Number} two_level_rate 二级分销比例
	 * @apiParam {Number} deleted 删除 1删除 不传或0不处理
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
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function save()
	{
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'cover_image', 'title', 'album_id', 'price',
					'city_partner_rate', 'two_level_rate', 'deleted'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$where = ['id' => $id];
				if($this->user_id){
					$where['anchor_uid'] = $this->user_id;
				}
				$flag = $this->Room_audio_model->update_by($where, $update);
			}else{
				unset($params['deleted']);
				$flag = $this->Room_audio_model->update_by(array('anchor_uid' => $this->user_id, 'id' => $id), $params);
			}
		}else{
			
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请输入音频标题');
				}
				break;
			case 'edit':
				break;
		}
	}
}
