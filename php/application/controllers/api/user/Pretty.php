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
class Pretty extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Pretty_model');

		$this->id = (int)$this->input->get_post('id');
    }

	/**
	 * @api {get} /api/user/pretty/view 靓号-购买-下单
	 * @apiVersion 1.0.0
	 * @apiName pretty_view
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/pretty/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 靓号唯一ID
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
	public function view()
	{
		$this->payment_format();

		$ret = $this->row;

		$user = $this->get_user();
		$ret['balance'] = $user['balance'];

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/pretty/payment 靓号-购买-支付
	 * @apiVersion 1.0.0
	 * @apiName pretty_payment
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/pretty/payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} payment_type 支付类型 balance：余额 wechat：微信 alipay：支付宝
	 * @apiParam {Number} id 靓号唯一ID
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
			't_id' => $this->id,
			'service' => $this->service
		];
		if(! $order_id = $this->Payment_log_model->insert($log)){
			$this->ajaxReturn([], 3, '下单失败');
		}

        switch($payment_type){
        	case 'balance':
        		$this->balance($order_id);
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
    	$this->db->select('id,status,enable,pretty_id,price');
    	$row = $this->Pretty_model->get($this->id);

		if(! $row){
			$this->ajaxReturn([], 1, '靓号不存在');
		}
		if(! $row['enable']){
			$this->ajaxReturn([], 1, '靓号已下架');
		}
		if($row['status'] != 0){
			$this->ajaxReturn([], 2, '靓号已出售');
		}

        $this->row = $row;
        $this->service = 3;
    }

    protected function balance($order_id)
	{
		$user = $this->get_user();
		if($user && $user['balance'] >= $this->row['price']){
			if($this->row['price'] > 0){
				$this->Users_model->update(
					$this->user_id,
					[
						'balance' => round($user['balance'] - $this->row['price'], 2),
						'pretty_id' => $this->row['pretty_id']
					]
				);
			}

			//更新流水状态
			$order_update = ['status' => 1];
			$this->Payment_log_model->update($order_id, $order_update);
			//更新销售状态
			$this->Pretty_model->update($this->row['id'], ['status' => 1, 'buyer_id' => $this->user_id]);
			//余额明细

			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '账户余额不足');
		}
	}

	protected function wechat($order_sn)
    {
    	$order = new Order([
            'body' => '猪买单-购买靓号',
            'out_trade_no' => $order_sn,
            'total_fee' => TEST_PAYMENT ? TEST_PAYMENT : $this->row['price'] * 100,
            'notify_url' => site_url('/api/notify/wechat_pretty_payment'),
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
    		'subject' => '猪买单-购买靓号',
            'out_trade_no' => $order_sn,
            'total_amount' => TEST_PAYMENT ? TEST_PAYMENT * 0.01 : $this->row['price']
    	];

    	$this->setting = config_item('yansongda');
    	$this->setting['alipay']['notify_url'] = site_url('/api/notify/alipay_pretty_payment');
    	$app = new Pay($this->setting);
    	$response = $app->driver('alipay')->gateway('app')->pay($order);

        $this->ajaxReturn($response);
    }
}
