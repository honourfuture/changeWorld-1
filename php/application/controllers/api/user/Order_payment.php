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

class Order_payment extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Order_model');
    }

    protected function payment_format($trade_type, $trade_sn)
    {
    	if(! $trade_sn){
			$this->ajaxReturn([], 2, '订单交易号必传');
		}

		switch ($trade_type) {
			case 'pay_sn':
				$result = $this->Order_model->get_order_by_pay_sn($trade_sn);
				if(! $result){
					$this->ajaxReturn([], 3, '订单存在非待付款状态');
				}
				break;
			case 'order_sn':
				$result = $this->Order_model->get_order_by_order_sn($trade_sn);
				if(! $result){
					$this->ajaxReturn([], 3, '订单请勿重复付款');
				}
				break;
			default:
				$this->ajaxReturn([], 1, '订单交易类型错误');
				break;
		}

		return $result;
    }

	/**
	 * @api {get} /api/user/order_payment 订单付款页
	 * @apiVersion 1.0.0
	 * @apiName order_payment
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/order_payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} trade_type 交易类型 pay_sn:下单支付号 order_sn:商家订单号
	 * @apiParam {String} trade_sn 交易号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.total_amount 订单总金额
	 * @apiSuccess {String} data.real_total_amount 实付总金额
	 * @apiSuccess {String} data.use_ticket_amount 优惠总金额
	 * @apiSuccess {String} data.use_point_amount 积分抵扣总金额
	 * @apiSuccess {String} data.use_point 积分总数
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "total_amount": "145.50",
	 *         "real_total_amount": "115.50",
	 *         "use_ticket_amount": "10.00",
	 *         "use_point_amount": "20.00",
	 *         "use_point": "20"
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
		$trade_type = $this->input->get_post('trade_type');
		$trade_sn = $this->input->get_post('trade_sn');

		$ret = $this->payment_format($trade_type, $trade_sn);

		$user = $this->get_user();
		$ret['balance'] = $user['balance'];

		$this->ajaxReturn($ret);
	}

	protected function balance($order_id)
	{
		$user = $this->get_user();
		if($user && $user['balance'] >= $this->amount){
			if($this->amount > 0){
				$this->Users_model->update($this->user_id, ['balance' => round($user['balance'] - $this->amount, 2)]);
			}

			$order_update = ['status' => 2, 'payment_type' => 'balance'];
			if(is_array($order_id)){
				$this->Order_model->update_many($order_id, $order_update);
			}else{
				$this->Order_model->update($order_id, $order_update);
			}
			//分佣

			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '账户余额不足');
		}
	}

	/**
	 * @api {post} /api/user/order_payment/payment 订单付款页-提交
	 * @apiVersion 1.0.0
	 * @apiName order_payment_payment
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/user/order_payment/payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} payment_type 支付类型 balance：余额 wechat：微信 alipay：支付宝
	 * @apiParam {String} trade_type 交易类型 pay_sn：下单支付 order_sn：订单列表支付
	 * @apiParam {String} trade_sn 交易号
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
        $params = elements(
            array(
                'payment_type', 'trade_type', 'trade_sn'
            ),
            $this->input->post(),
            ''
        );

        $order = $this->payment_format($params['trade_type'], $params['trade_sn']);
        if($order['real_total_amount'] < 0.01){
        	$params['payment_type'] = 'balance';//免费强制用余额
        }
        $this->amount = $order['real_total_amount'];

        switch($params['payment_type']){
        	case 'balance':
        		$this->balance($order['id']);
        		break;
        	case 'wechat':
        		$this->wechat($params['trade_type'], $params['trade_sn']);
        		break;
        	case 'alipay':
        		$this->alipay($params['trade_type'], $params['trade_sn']);
        		break;
        	default :
        		$this->ajaxReturn([], 1, '订单支付类型错误');
        		break;
        }
    }

    protected function alipay($trade_type, $trade_sn)
    {
    	$order = [
    		'subject' => '猪买单订单支付-商品订单消费',
            'out_trade_no' => $trade_sn,
            'total_amount' => TEST_PAYMENT ? TEST_PAYMENT * 0.01 : $this->amount,
            'passback_params' => $trade_type
    	];

    	$this->setting = config_item('yansongda');
    	$this->setting['alipay']['notify_url'] = site_url('/api/notify/alipay_order_payment');
    	$app = new Pay($this->setting);
    	$response = $app->driver('alipay')->gateway('app')->pay($order);

        $this->ajaxReturn($response);
    }

    protected function wechat($trade_type, $trade_sn)
    {
    	$order = new Order([
            'body' => '猪买单订单支付-商品订单消费',
            'out_trade_no' => $trade_sn,
            'total_fee' => TEST_PAYMENT ? TEST_PAYMENT : $this->amount * 100,
            'notify_url' => site_url('/api/notify/wechat_order_payment'),
            'trade_type' => 'APP',
            'attach' => $trade_type
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
}
