<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use QCloud\Live\Query;
use RongCloud\RongCloud;
use JPush\Client;
class Live extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/user/live 我的直播-首页
	 * @apiVersion 1.0.0
	 * @apiName live
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.anchor 房间号
	 * @apiSuccess {String} data.anchor.name 名称
	 * @apiSuccess {String} data.anchor.updated_at 加入日期
	 * @apiSuccess {String} data.anchor.header 头像
	 * @apiSuccess {Number} data.album 专辑数量
	 * @apiSuccess {Number} data.work 作品数量
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *     "data": {
	 *         "anchor": {
	 *             "name": "Qqqqqq",
	 *             "updated_at": "2018-02-07",
	 *             "header": ""
	 *         },
	 *         "album": 0,
	 *         "work": 0
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
		$ret = array();

		$user = $this->get_user();
		if($user['anchor'] != 2){
			$this->ajaxReturn([], 1, '主播信息未认证');
		}

		$this->load->model('Users_anchor_model');
		$anchor = $this->Users_anchor_model->get_by('user_id', $this->user_id);
		list($date, $time) = explode(' ', $anchor['updated_at']);
		$ret['anchor'] = array(
			'name' => $user['nickname'] ? $user['nickname'] : ($anchor['nickname'] ? $anchor['nickname'] : $anchor['realname']),
			'updated_at' => $date,
			'header' => $user['header'],
			'pretty_id' => $user['pretty_id']
		);

		//专辑
		$this->load->model('Album_model');
		$where = array('enable' => 1, 'anchor_uid' => $this->user_id);
		$ret['album'] = $this->Album_model->count_by($where);

		//作品
		$this->load->model('Room_audio_model');
		$where = array('enable' => 1, 'anchor_uid' => $this->user_id);
		$ret['work'] = $this->Room_audio_model->count_by($where);

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/live/add 我的直播-开始直播
	 * @apiVersion 1.0.0
	 * @apiName live_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} cover_image 封面图
	 * @apiParam {String} title 标题
	 * @apiParam {String} live_class 直播类型
	 * @apiParam {String} slide_photo 幻灯片 json
	 * @apiParam {Number} price 门票价格
	 * @apiParam {Number} city_partner_rate 城市分销比例
	 * @apiParam {Number} two_level_rate 二级分销比例
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.room_id 房间号
	 * @apiSuccess {Number} data.chat_room_id 聊天室ID
	 * @apiSuccess {String} data.push_url 推送地址
	 * @apiSuccess {Object} data.play_url 播放地址
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *		  "chat_room_id": 1,
	 *        "room_id": 1,
	 *        "push_url": "rtmp://6077.livepush.myqcloud.com/live/6077_zhumaidan-1-2?bizid=6077&txSecret=cbe8817ff9e6185dd783b09c99ea9f20&txTime=5A7AF498",
	 *        "play_url": "{\"rtmp\":\"rtmp:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2\",\"flv\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.flv\",\"m3u8\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.m3u8\"}"
	 *    },
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
		$data = elements(
			array(
				'cover_image', 'title', 'live_class', 'slide_photo',
				'price', 'city_partner_rate', 'two_level_rate'
			),
			$this->input->post(),
			UPDATE_VALID
		);

		$data['anchor_uid'] = $this->user_id;
		$data['start_at'] = time();
		$data['type'] = 1;
		$this->check_add_params('add', $data);
		$this->load->model('Room_model');
		if($id = $this->Room_model->insert($data)){
			// 直播中断重新创建
			$this->Room_model->update_by(['anchor_uid' => $this->user_id, 'status' => 2], ['status' => 4]);

			if($row = $this->Room_model->order_by('id', 'desc')->get_by(['anchor_uid' => $this->user_id, 'type' => 2])){
				$this->Room_model->delete_by(['anchor_uid' => $this->user_id, 'type' => 2]);

				$this->load->model('White_model');
				$this->White_model->update_by(['type' => 1, 't_id' => $row['id']], ['t_id' => $id]);
			}
			//直播
			$QLive = new Query();
	        $config = config_item('live');
	        $QLive->setAppInfo($config['appid'], $config['api_key'], $config['push_key'], $config['bizid']);
	        $channel_id = $this->Room_model->channel_id($this->user_id, $id);
	        $play_url = $QLive->getPlayUrl($channel_id);
	        $update = array(
	        	'push_url' => $QLive->getPushUrl($channel_id).'&record=aac&record_interval=5400&record_type=audio',
	        	'play_url' => json_encode($play_url)
	        );
	        //融云
	        $config = config_item('rongcloud');
        	$rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
        	//聊天室
	        $update['chat_room_id'] = 0;
        	$chat_room_id = $id;
        	$response = $rongCloud->Chatroom()->create([$chat_room_id => $data['title']]);
        	if($response && $result = json_decode($response, true)){
        		if($result['code'] == 200){
        			$update['chat_room_id'] = $chat_room_id;
        		}
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
        	}*/

	        $this->Room_model->update($id, $update);

	        $update['room_id'] = $id;
	        $update['play_url'] = $play_url;
	        // $update['token'] = $token;

	        $user = $this->get_user();
	        //消息推送
	        try {
		        $setting = config_item('push');
	            $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);

	            $result = $client->push()
	                             ->setPlatform('all')
	                             ->addTag($this->Users_model->live_group_tag($this->user_id))
	                             ->setNotificationAlert($user['nickname'].'开播了')
	                             ->send();
	        } catch (Exception $e) {
	        	
	        }

			$this->ajaxReturn($update);
		}else{
			$this->ajaxReturn([], 1, '创建房间失败');
		}
	}

	/**
	 * @api {post} /api/user/live/preview 我的直播-预告
	 * @apiVersion 1.0.0
	 * @apiName live_preview
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live/preview
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} cover_image 封面图
	 * @apiParam {String} title 标题
	 * @apiParam {String} live_class 直播类型
	 * @apiParam {String} slide_photo 幻灯片 json
	 * @apiParam {Number} start_at 开始时间 time 1519707307
	 * @apiParam {Number} price 门票价格
	 * @apiParam {Number} city_partner_rate 城市分销比例
	 * @apiParam {Number} two_level_rate 二级分销比例
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.room_id 房间号
	 * @apiSuccess {Number} data.chat_room_id 聊天室ID
	 * @apiSuccess {String} data.push_url 推送地址
	 * @apiSuccess {Object} data.play_url 播放地址
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *		  "chat_room_id": 1,
	 *        "room_id": 1,
	 *        "push_url": "rtmp://6077.livepush.myqcloud.com/live/6077_zhumaidan-1-2?bizid=6077&txSecret=cbe8817ff9e6185dd783b09c99ea9f20&txTime=5A7AF498",
	 *        "play_url": "{\"rtmp\":\"rtmp:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2\",\"flv\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.flv\",\"m3u8\":\"http:\\/\\/6077.liveplay.myqcloud.com\\/live\\/6077_zhumaidan-1-2.m3u8\"}"
	 *    },
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
	public function preview()
	{
		$data = elements(
			array(
				'cover_image', 'title', 'live_class', 'slide_photo', 'start_at',
				'price', 'city_partner_rate', 'two_level_rate'
			),
			$this->input->post(),
			UPDATE_VALID
		);
		if($data['start_at'] === '' || $data['start_at'] == UPDATE_VALID){
			$this->ajaxReturn([], 501, '请传入直播开始时间');
		}

		$data['anchor_uid'] = $this->user_id;
		$data['type'] = 2;
		$this->check_add_params('preview', $data);
		$this->load->model('Room_model');
		//限定预告仅一个
		$this->Room_model->delete_by(['anchor_uid' => $this->user_id, 'type' => 2]);
		if($id = $this->Room_model->insert($data)){
			//直播
			$QLive = new Query();
	        $config = config_item('live');
	        $QLive->setAppInfo($config['appid'], $config['api_key'], $config['push_key'], $config['bizid']);
	        $channel_id = $this->Room_model->channel_id($this->user_id, $id);
	        $play_url = $QLive->getPlayUrl($channel_id);
	        $update = array(
	        	'push_url' => $QLive->getPushUrl($channel_id).'&record=aac&record_interval=5400&record_type=audio',
	        	'play_url' => json_encode($play_url)
	        );
	        //融云
	        $config = config_item('rongcloud');
        	$rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
        	//聊天室
	        $update['chat_room_id'] = 0;
        	$chat_room_id = $id;
        	$response = $rongCloud->Chatroom()->create([$chat_room_id => $data['title']]);
        	if($response && $result = json_decode($response, true)){
        		if($result['code'] == 200){
        			$update['chat_room_id'] = $chat_room_id;
        		}
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
        	}*/

	        $this->Room_model->update($id, $update);

	        $update['room_id'] = $id;
	        $update['play_url'] = $play_url;
	        // $update['token'] = $token;
			$this->ajaxReturn($update);
		}else{
			$this->ajaxReturn([], 1, '创建房间失败');
		}
	}

	/**
	 * @api {get} /api/user/live/init 我的直播-获取预告
	 * @apiVersion 1.0.0
	 * @apiName live_init
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live/init
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *     "data": {
	 *         },
	 *         "album": 0,
	 *         "work": 0
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
	public function init()
	{
		$this->load->model('Room_model');
		$this->db->select('id,cover_image,title,live_class,slide_photo,price,city_partner_rate,two_level_rate,start_at');
		if(!$info = $this->Room_model->get_by(['anchor_uid' => $this->user_id, 'type' => 2])){
			$info = [];
		}
		$info['stop'] = [];

		$stop = $this->Room_model->order_by('id', 'desc')->get_by(['anchor_uid' => $this->user_id, 'status' => 2]);
		if($stop && strtotime($stop['created_at']) > strtotime('-1 day')){
			$info['stop'] = $stop;
		}

		$this->ajaxReturn($info);
	}

	/**
	 * @api {get} /api/user/live/del 我的直播-删除预告
	 * @apiVersion 1.0.0
	 * @apiName live_del
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live/del
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *     "data": {
	 *         },
	 *         "album": 0,
	 *         "work": 0
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
	public function del()
	{
		$this->load->model('Room_model');
		//限定预告仅一个
		$this->Room_model->delete_by(['anchor_uid' => $this->user_id, 'type' => 2]);
		$this->ajaxReturn();
	}

	protected function check_add_params($act, $params)
	{
		switch($act){
			case 'add':
			case 'preview':
				if($params['cover_image'] === '' || $params['cover_image'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请上传直播封面图');
				}
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请输入直播标题');
				}
				break;
			case 'save':
				break;
		}
	}
}
