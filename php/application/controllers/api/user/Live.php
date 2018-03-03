<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use QCloud\Live\Query;
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
		if(! $user['anchor']){
			$this->ajaxReturn([], 1, '主播信息未认证');
		}

		$this->load->model('Users_anchor_model');
		$anchor = $this->Users_anchor_model->get_by('user_id', $this->user_id);
		list($date, $time) = explode(' ', $anchor['updated_at']);
		$ret['anchor'] = array(
			'name' => $anchor['realname'] ? $anchor['realname'] : $anchor['nickname'],
			'updated_at' => $date,
			'header' => $user['header'],
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
	 * @api {post} /api/user/live/add 我的直播-创建
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
	 * @apiParam {Number} start_at 开始时间 time 1519707307
	 * @apiParam {Number} price 门票价格
	 * @apiParam {Number} city_partner_rate 城市分销比例
	 * @apiParam {Number} two_level_rate 二级分销比例
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
				'cover_image', 'title', 'live_class', 'slide_photo', 'start_at',
				'price', 'city_partner_rate', 'two_level_rate'
			),
			$this->input->post(),
			UPDATE_VALID
		);

		$data['anchor_uid'] = $this->user_id;
		$this->check_add_params('add', $data);
		$this->load->model('Room_model');
		if($id = $this->Room_model->insert($data)){
			$QLive = new Query();
	        $config = config_item('live');
	        $QLive->setAppInfo($config['appid'], $config['api_key'], $config['push_key'], $config['bizid']);
	        $channel_id = $this->Room_model->channel_id($this->user_id, $id);
	        $play_url = $QLive->getPlayUrl($channel_id);
	        $update = array(
	        	'push_url' => $QLive->getPushUrl($channel_id).'&record=flv&record_interval=5400&record_type=audio',
	        	'play_url' => json_encode($play_url)
	        );
	        $this->Room_model->update($id, $update);

	        $update['room_id'] = $id;
	        $update['play_url'] = $play_url;
			$this->ajaxReturn($update);
		}else{
			$this->ajaxReturn([], 1, '创建房间失败');
		}
	}

	protected function check_add_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['cover_image'] === '' || $params['cover_image'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请上传直播封面图');
				}
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请输入直播标题');
				}
				if($params['start_at'] === '' || $params['start_at'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请传入直播开始时间');
				}
				break;
			case 'save':
				break;
		}
	}
}