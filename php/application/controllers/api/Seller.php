<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Seller extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/seller 店铺-主页
	 * @apiVersion 1.0.0
	 * @apiName seller
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 * @apiParam {String} type 商店：goods 简介：info 专辑：album 直播：live 回听：video
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": "",
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
		$seller_uid = $this->input->get_post('seller_uid');
		$type = $this->input->get_post('type');

		$this->load->model('Users_model');
		$result = $this->Users_model->check_shop($seller_uid);
		if($result['status']){
			$this->ajaxReturn($result['data'], $result['status'], $result['message']);
		}

		$ret = array('hasFans' => 0, 'user' => array(), $type => array('count' => 0, 'list' => array()));
		$ret['user'] = $result['data'];

		$this->load->model('Users_collection_model');
		$ret['hasFans'] = $this->Users_collection_model->check_fans($this->user_id, $seller_uid);
		$where = array('user_id' => $seller_uid, 'topic' => 1);
		$ret['user']['follow'] = $this->Users_collection_model->count_by($where);
		$where = array('t_id' => $seller_uid, 'topic' => 1);
		$ret['user']['fans'] = $this->Users_collection_model->count_by($where);

		$this->load->model('Gold_log_model');

		$this->db->select_sum('gold');
		$gold = $this->Gold_log_model->get_by(['to_user_id' => $seller_uid]);
		$ret['user']['gold_in'] = $gold ? $gold['gold'] : 0;

		$this->db->select_sum('gold');
		$gold = $this->Gold_log_model->get_by(['from_user_id' => $seller_uid]);
		$ret['user']['gold_out'] = $gold ? $gold['gold'] : 0;

		$this->load->model('Users_vip_model');
		$ret['vip'] = $this->Users_vip_model->vip_info($seller_uid);

		switch($type){
			case 'goods':
				$ret[$type] = $this->_goods($seller_uid);
				break;
			case 'info':
				$this->load->model('Users_anchor_model');
				$this->db->select('job,address,summary,anchor_photo,anchor_video');
				$ret[$type] = $this->Users_anchor_model->get_by('user_id', $seller_uid);
				$ret[$type] && $ret[$type]['anchor_photo'] && $ret[$type]['anchor_photo'] = json_decode($ret[$type]['anchor_photo'], true);
				$ret[$type] && $ret[$type]['anchor_video'] && $ret[$type]['anchor_video'] = json_decode($ret[$type]['anchor_video'], true);
				break;
			case 'album':
				$ret[$type] = $this->_album($seller_uid);
				$ret['audio'] = $this->_audio($seller_uid);
				break;
			case 'live':
				$ret[$type] = $this->_live($seller_uid);
				//正在直播
				$this->load->model('Room_model');
				$this->db->select('id,views,play_url,cover_image,title,price,chat_room_id');
				$liveing = $this->Room_model->get_by(array('anchor_uid' => $seller_uid, 'status' => 1));
				$liveing && $liveing['play_url'] = json_decode($liveing['play_url'], true);
				$ret['liveing'] = $liveing ? $liveing : [];
				break;
			case 'video':
				$ret['audio'] = $this->_audio($seller_uid, false);
				//正在直播
				$this->load->model('Room_model');
				$this->db->select('id,views,play_url,cover_image,title,price,chat_room_id');
				$liveing = $this->Room_model->get_by(array('anchor_uid' => $seller_uid, 'status' => 1));
				$liveing && $liveing['play_url'] = json_decode($liveing['play_url'], true);
				$ret['liveing'] = $liveing ? $liveing : [];
				//直播预告
				$this->load->model('Room_model');
				$this->db->select('id,views,play_url,cover_image,title,price,chat_room_id,start_at');
				$preview = $this->Room_model->get_by(array('anchor_uid' => $seller_uid, 'type' => 2));
				$preview && $preview['play_url'] = json_decode($preview['play_url'], true);
				$ret['preview'] = $preview ? $preview : [];
				break;
			default :
				$this->ajaxReturn([], 1, '类型不支持');
				break;
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$keyword = $this->input->get_post('keyword');
		if($keyword){
			$this->db->like($this->field, $keyword);
		}
	}

	protected function _live($seller_uid)
	{
		$this->field = 'title';
		$ret = array('count' => 0, 'list' => array());
		//预告直播
		$where = array('start_at >' => time());
		$where['anchor_uid'] = $seller_uid;
		$this->load->model('Room_model');

		$this->search();
		$ret['count'] = $this->Room_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			$this->db->select('id as room_id,title,cover_image,anchor_uid,views,price,start_at');
			$ret['list'] = $this->Room_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		return $ret;
	}

	/**
	 * @api {get} /api/seller/live 店铺-更多预告
	 * @apiVersion 1.0.0
	 * @apiName seller_live
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller/live
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 * @apiParam {String} keyword 搜索关键词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.live 直播预告
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "live": {
	 *             "count": 15,
	 *             "list": [
	 *                 {
	 *                     "room_id": "48",
	 *                     "title": "安卓测试",
	 *                     "cover_image": "/uploads/2018/01/30/bb61ca8b2be1d1aee82b0ae8c6ac1cce.png",
	 *                     "anchor_uid": "1",
	 *                     "views": "3",
	 *                     "price": "0.00",
	 *                     "start_at": "4294967295"
	 *                 }
	 *             ]
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
	public function live()
	{
		$ret = array();
		$seller_uid = $this->input->get_post('seller_uid');
		if($seller_uid){
			$ret['live'] = $this->_live($seller_uid);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '店铺唯一ID错误');
		}
	}

	protected function _album($seller_uid)
	{
		$this->field = 'title';
		$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1);
		$where['anchor_uid'] = $seller_uid;
		/*if($this->user_id != $seller_uid){
			$where['public'] = 1;
		}*/
		$where['public'] = 1;
		$this->load->model('Album_model');

		$this->search();
		$ret['count'] = $this->Album_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
			$this->search();
			$this->db->select('id,cover_image,title,price');
			$ret['list'] = $this->Album_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$this->Album_model->audio($ret);
		}

		return $ret;
	}

	/**
	 * @api {get} /api/seller/album 店铺-更多专题
	 * @apiVersion 1.0.0
	 * @apiName seller_album
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller/album
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 * @apiParam {String} keyword 搜索关键词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.album 专题
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "album": {
	 *             "count": 1,
	 *             "list": [
	 *                 {
	 *                     "id": "7",
	 *                     "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *                     "title": "你的出生地址",
	 *                     "price": "10000.00",
	 *                     "audio_num": "1",
	 *                     "play_times": "0"
	 *                 }
	 *             ]
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
	public function album()
	{
		$ret = array();
		$seller_uid = $this->input->get_post('seller_uid');
		if($seller_uid){
			$ret['album'] = $this->_album($seller_uid);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '店铺唯一ID错误');
		}
	}

	protected function _audio($seller_uid, $album = true)
	{
		$this->field = 'title';
		$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1);
		$where['anchor_uid'] = $seller_uid;
		if($album){
			$where['album_id >'] = 0;
		}else{
			$where['album_id'] = 0;
		}
		$this->load->model('Room_audio_model');

		$this->search();
		$ret['count'] = $this->Room_audio_model->count_by($where);
		if($ret['count']){
			$order_by = array('updated_at' => 'desc', 'id' => 'desc');
			$this->search();
			$this->db->select('id,cover_image,title,price,updated_at,duration,play_times,album_id,video_url');
			if(!$ret['list'] = $this->Room_audio_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
				$ret['list'] = [];
			}
		}

		return $ret;
	}

	/**
	 * @api {get} /api/seller/audio 店铺-更多音频
	 * @apiVersion 1.0.0
	 * @apiName seller_audio
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller/audio
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 * @apiParam {String} keyword 搜索关键词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.audio 音频
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "album": {
	 *             "count": 1,
	 *             "list": [
	 *                 {
	 *                     "id": "3",
	 *                     "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *                     "title": "你的出生地址",
	 *                     "price": "10000.00",
	 *                     "updated_at": "2018-03-01 18:38:43",
	 *                     "duration": "404",
	 *                     "play_times": "0"
	 *                 }
	 *             ]
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
	public function audio()
	{
		$ret = array();
		$seller_uid = $this->input->get_post('seller_uid');
		if($seller_uid){
			$ret['album'] = $this->_audio($seller_uid);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '店铺唯一ID错误');
		}
	}

	protected function _goods($seller_uid)
	{
		$this->field = 'name';
		$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1);
		$where['seller_uid'] = $seller_uid;
		$this->load->model('Goods_model');

		$this->search();
		$ret['count'] = $this->Goods_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
			$this->search();
			$this->db->select('id,default_image,name,sale_price');
			$ret['list'] = $this->Goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		return $ret;
	}

	/**
	 * @api {get} /api/seller/goods 店铺-更多商品
	 * @apiVersion 1.0.0
	 * @apiName seller_goods
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller/goods
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 * @apiParam {String} keyword 搜索关键词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.goods 推荐商品
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "name": "热门"
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "name": "靓号"
	 *	        }
	 *	    ],
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function goods()
	{
		$ret = array();
		$seller_uid = $this->input->get('seller_uid');
		if($seller_uid){
			$ret['goods'] = $this->_goods($seller_uid);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '店铺唯一ID错误');
		}
	}
}
