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
// use Yansongda\Pay\Log;
class Recharge extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/recharge 充值
	 * @apiVersion 1.0.0
	 * @apiName recharge
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/recharge
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.rmb_to_gold_rate 充值金币兑换倍率
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "rmb_to_gold_rate": 100
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
		$ret = [];

		/*$this->load->model('Recharge_model');
		$this->db->select('id,money,free');
		$ret['recharge'] = $this->Recharge_model->get_many_by('enable', 1);*/

		$this->load->model('Users_model');
		$ret['rmb_to_gold_rate'] = $this->Users_model->rmb_to_gold_rate();

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/recharge/payment 充值-提交
	 * @apiVersion 1.0.0
	 * @apiName recharge_payment
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/user/recharge/payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} payment_id 充值方式 0微信 1支付宝
	 * @apiParam {String} amount 充值金额
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
                'payment_id', 'amount'
            ),
            $this->input->post(),
            0
        );


        $this->load->model('Users_recharge_model');
        $payment_id = $this->Users_recharge_model->payment_id();
        if(! isset($payment_id[$params['payment_id']])){
        	$this->ajaxReturn([], 1, '支付方式错误');
        }

        $params['amount'] = floatval($params['amount']);
        if($params['amount'] < 0.01){
            $this->ajaxReturn([], 1, '请输入金额进行充值');
        }

        $params['real_amount'] = $params['amount'];

        switch($params['payment_id']){
        	case 0:
        		$this->wechat($params);
        		break;
        	case 1:
        		$this->alipay($params);
        		break;
        	default :
        		$this->ajaxReturn([], 1, '支付方式错误');
        		break;
        }
    }

    protected function alipay($params)
    {
    	$order = [
    		'subject' => '罗马市场充值中心-会员充值',
            'out_trade_no' => $this->Users_recharge_model->make_order_sn($this->user_id),
            'total_amount' => TEST_PAYMENT ? TEST_PAYMENT * 0.01 : $params['amount'],
    	];

    	$this->setting = config_item('yansongda');
    	$this->setting['alipay']['notify_url'] = site_url('/api/notify/alipay_recharge');
    	$app = new Pay($this->setting);
    	$response = $app->driver('alipay')->gateway('app')->pay($order);

    	$data = [
            'order_sn' => $order['out_trade_no'],
            'amount' => $params['amount'],
            'real_amount' => $params['real_amount'],
            'user_id' => $this->user_id,
            'payment_id' => $params['payment_id']
        ];
        $this->Users_recharge_model->insert($data);
        $this->ajaxReturn($response);
    }

    protected function wechat($params)
    {
    	$order = new Order([
            'body' => '罗马市场充值中心-会员充值',
            'out_trade_no' => $this->Users_recharge_model->make_order_sn($this->user_id),
            'total_fee' => TEST_PAYMENT ? TEST_PAYMENT : $params['amount'] * 100,
            'notify_url' => site_url('/api/notify/wechat_recharge'),
            'trade_type' => 'APP'
        ]);

        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $result = $app->payment->prepare($order);
        if($result->return_code == 'SUCCESS' && $result->result_code == 'SUCCESS'){
            $data = [
                'order_sn' => $order['out_trade_no'],
                'amount' => $params['amount'],
                'real_amount' => $params['real_amount'],
                'user_id' => $this->user_id,
                'payment_id' => $params['payment_id']
            ];
            $this->Users_recharge_model->insert($data);
            $this->ajaxReturn($app->payment->configForAppPayment($result['prepay_id']));
        }else{
            $this->ajaxReturn([], 2, $result->return_msg);
        }
    }

	/**
	 * @api {get} /api/user/recharge/record 充值-记录
	 * @apiVersion 1.0.0
	 * @apiName recharge_record
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/recharge/record
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "9",
	 *                 "updated_at": "2018-03-23 15:11:00",
	 *                 "order_sn": "112233445566778899",
	 *                 "amount": "100.00",
	 *                 "real_amount": "100.00",
	 *                 "payment_id": "0"
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
	public function record()
	{
		$ret = array('count' => 0, 'list' => array());

		$this->load->model('Users_recharge_model');
		$where = array('status' => 1, 'user_id' => $this->user_id);

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Users_recharge_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,updated_at,order_sn,amount,real_amount,payment_id');
			$ret['list'] = $this->Users_recharge_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}
}
