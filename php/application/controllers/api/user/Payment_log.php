<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use EasyWeChat\Foundation\Application;
use EasyWeChat\Payment\Order;

use Yansongda\Pay\Pay;
class Payment_log extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Payment_log_model');

        $this->topic = $this->input->get_post('topic');
		$this->t_id = (int)$this->input->get_post('t_id');
    }

    /**
	 * @api {get} /api/user/payment_log/dialog 购买-弹框判断
	 * @apiVersion 1.0.0
	 * @apiName payment_log_dialog
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/payment_log/dialog
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} topic 主题 直播：live 音频：audio 专辑：album
	 * @apiParam {Number} t_id 项目唯一ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.dialog 0已付费 1未付费弹支付框
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "dialog": 1
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
	public function dialog()
	{
		$flag = false;

		$this->load->model('White_model');

		switch($this->topic){
			case 'live':
				$type = 1;
				if($this->White_model->get_by(['t_id' => $this->t_id, 'type' => $type, 'uid' => $this->user_id])){
					$flag = true;
				}else{
					$flag = $this->Payment_log_model->live($this->user_id, $this->t_id);
				}
				break;
			case 'audio':
				$flag = $this->Payment_log_model->audio($this->user_id, $this->t_id);
				break;
			case 'album':
				$type = 2;
				if($this->White_model->get_by(['t_id' => $this->t_id, 'type' => $type, 'uid' => $this->user_id])){
					$flag = true;
				}else{
					$flag = $this->Payment_log_model->album($this->user_id, $this->t_id);
				}
				break;
			default :
				$this->ajaxReturn([], 1, '支付主题错误');
				break;
		}

		$ret = ['dialog' => 1];
		if($flag){
			$ret['dialog'] = 0;
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/user/payment_log/view 购买-下单
	 * @apiVersion 1.0.0
	 * @apiName payment_log_view
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/payment_log/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} topic 主题 直播：live 音频：audio 专辑：album
	 * @apiParam {Number} t_id 项目唯一ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "id": "1",
	 *         "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *         "title": "你的出生地址",
	 *         "price": "10000.00",
	 *         "city_partner_rate": "0.00",
	 *         "two_level_rate": "0.00",
	 *         "balance": "9800.10"
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
		$this->payment_format();

		$ret = $this->row;

		$user = $this->get_user();
		$ret['balance'] = $user['balance'];

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/payment_log/payment 购买-支付
	 * @apiVersion 1.0.0
	 * @apiName payment_log_payment
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/payment_log/payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} payment_type 支付类型 balance：余额 wechat：微信 alipay：支付宝
	 * @apiParam {String} topic 主题 直播：live 音频：audio 专辑：album
	 * @apiParam {Number} t_id 项目唯一ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function payment()
    {
        $payment_type = $this->input->get_post('payment_type');

        $this->payment_format();

        if($this->row['price'] < 0.01){
        	$payment_type = 'balance';//免费强制用余额
        }

        $this->load->model('Payment_log_model');
		$log = [
			'order_sn' => $this->Payment_log_model->make_order_sn($this->user_id),
			'amount' => $this->row['price'],
			'user_id' => $this->user_id,
			'payment_type' => $payment_type,
			't_id' => $this->t_id,
			'title' => $this->row['title'],
			'service' => $this->service
		];
		if(! $order_id = $this->Payment_log_model->insert($log)){
			$this->ajaxReturn([], 3, '下单失败');
		}

        switch($payment_type){
        	case 'balance':
        		$this->balance($order_id, $log['order_sn']);
        		break;
        	case 'wechat':
        		$this->wechat($log['order_sn']);
        		break;
        	case 'alipay':
        		$this->alipay($log['order_sn']);
        		break;
        	default :
        		$this->ajaxReturn([], 1, '订单支付类型错误');
        		break;
        }
    }

    protected function payment_format()
    {
    	switch($this->topic){
			case 'live':
				$this->service = 0;
				$this->load->model('Room_model');
				$this->db->select('id,anchor_uid,cover_image,title,price,city_partner_rate,two_level_rate');
				$row = $this->Room_model->get($this->t_id);
				$message = '直播间不存在';
				break;
			case 'audio':
				$this->service = 1;
				$this->load->model('Room_audio_model');
				$this->db->select('id,anchor_uid,cover_image,title,price,city_partner_rate,two_level_rate');
				$row = $this->Room_audio_model->get($this->t_id);
				$message = '音频信息不存在';
				break;
			case 'album':
				$this->service = 2;
				$this->load->model('Album_model');
				$this->db->select('id,anchor_uid,cover_image,title,price,city_partner_rate,two_level_rate');
				$row = $this->Album_model->get($this->t_id);
				$message = '专辑信息不存在';
				break;
			default :
				$this->ajaxReturn([], 1, '支付主题错误');
				break;
		}

		if(! $row){
			$this->ajaxReturn([], 2, $message);
		}

        $this->row = $row;
    }

    protected function balance($order_id, $order_sn)
	{
		$user = $this->get_user();
		if($user && $user['balance'] >= $this->row['price']){
			if($this->row['price'] > 0){
				$this->Users_model->update(
					$this->user_id,
					[
						'balance' => round($user['balance'] - $this->row['price'], 2)
					]
				);
			}

			//更新流水状态
			$order_update = ['status' => 1];
			$this->Payment_log_model->update($order_id, $order_update);
			//收藏
			if(in_array($this->topic, ['audio', 'album'])){
				$sub_topic = ($this->topic == 'audio') ? 20 : 21;
				$this->load->model('Users_collection_model');
				$data = [
					'user_id' => $this->user_id,
					't_id' => $this->row['id'],
					'topic' => 2,
					'sub_topic' => $sub_topic
				];
				$this->Users_collection_model->insert($data);
			}
			//余额明细

			//消费记录
            $consume_record = [
            	'type' => 0,
            	'user_id' => $this->user_id,
            	'item_title' => $this->row['title'],
            	'item_id' => $this->row['id'],
            	'item_amount' => $this->row['price'],
            	'order_sn' => $order_sn,
            	'topic' => $this->service + 2,
            	'payment_type' => 'balance'
            ];
            $this->load->model('Consume_record_model');
            $this->Consume_record_model->insert($consume_record);

            //收益明细
            $user['to_user_id'] = $this->row['anchor_uid'];
            $this->load->model('Bind_shop_user_model');
            if($bind = $this->Bind_shop_user_model->get_by(['shop_id' => $this->row['anchor_uid'], 'user_id' => $this->user_id])){
                $user['pid'] = $bind['invite_uid'];
            }else{
                $user['pid'] = 0;
            }
            $this->load->model('Income_model');
            $order_data = $this->row;
            $order_data['service']  = $this->service;
            $this->Income_model->service($user, $order_data, $user['pid']);

			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '账户余额不足');
		}
	}

	protected function wechat($order_sn)
    {
    	$order = new Order([
            'body' => '猪买单-购买服务',
            'out_trade_no' => $order_sn,
            'total_fee' => TEST_PAYMENT ? TEST_PAYMENT : $this->row['price'] * 100,
            'notify_url' => site_url('/api/notify/wechat_service_payment'),
            'trade_type' => 'APP'
        ]);

        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $result = $app->payment->prepare($order);
        if($result->return_code == 'SUCCESS' && $result->result_code == 'SUCCESS'){
            $this->ajaxReturn($app->payment->configForAppPayment($result['prepay_id']));
        }else{
            $this->ajaxReturn([], 2, $result->return_msg);
        }
    }

    protected function alipay($order_sn)
    {
    	$order = [
    		'subject' => '猪买单-购买服务',
            'out_trade_no' => $order_sn,
            'total_amount' => TEST_PAYMENT ? TEST_PAYMENT * 0.01 : $this->row['price']
    	];

    	$this->setting = config_item('yansongda');
    	$this->setting['alipay']['notify_url'] = site_url('/api/notify/alipay_service_payment');
    	$app = new Pay($this->setting);
    	$response = $app->driver('alipay')->gateway('app')->pay($order);

        $this->ajaxReturn($response);
    }
}
