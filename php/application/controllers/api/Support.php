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
class Support extends API_Controller {
	protected $tag = '#KM#';

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/support/index 赞助商-提交页
	 * @apiVersion 1.0.0
	 * @apiName support_index
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/support/index
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} activity_id 活动ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.activity 活动信息
	 * @apiSuccess {Object} data.activity_user 活动发起人信息
	 * @apiSuccess {Object} data.balance 赞助人余额
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "activity": {
	 *             "id": "7",
	 *             "title": "开业大酬宾",
	 *             "user_id": "2"
	 *         },
	 *         "activity_user": {
	 *             "id": "2",
	 *             "header": "/uploads/2018/05/19/0a6f179af5ac8a3a13698aaff961777d.png",
	 *             "nickname": "三斤叔"
	 *         },
	 *         "balance": "999933.00"
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

		$activity_id = (int)$this->input->get_post('activity_id');

		$this->load->model('Activity_model');
		$this->db->select('id,title,user_id');
		if(! $activity = $this->Activity_model->get($activity_id)){
			$this->ajaxReturn([], 1, '活动ID错误');
		}
		$ret['activity'] = $activity;

		$this->load->model('Users_model');
		$this->db->select('id,header,nickname');
		if(!$ret['activity_user'] = $this->Users_model->get($activity['user_id'])){
			$this->ajaxReturn([], 2, '活动发起人信息错误');
		}

		$user = $this->Users_model->get($this->user_id);
		$ret['balance'] = $user['balance'];

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/support/payment 赞助商-付款
	 * @apiVersion 1.0.0
	 * @apiName support_payment
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/support/payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} payment_type 支付类型 balance：余额 wechat：微信 alipay：支付宝
	 * @apiParam {Number} activity_id 活动ID
	 * @apiParam {String} money 转账金额
	 * @apiParam {String} remark 转账备注
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
                'payment_type', 'money', 'remark', 'activity_id'
            ),
            $this->input->post(),
            ''
        );

		$this->load->model('Activity_model');
		$this->db->select('id,title,user_id');
		if(! $activity = $this->Activity_model->get($params['activity_id'])){
			$this->ajaxReturn([], 1, '活动ID错误');
		}

		$params['title'] = $activity['title'];
		$params['to_user_id'] = $activity['user_id'];
        if($params['to_user_id'] == $this->user_id){
        	$this->ajaxReturn([], 1, '请勿自己给自己转账');
        }

        $params['money'] = floatval($params['money']);
        if($params['money'] < 0.01){
        	$this->ajaxReturn([], 1, '转账金额不少于 0.01 ￥');
        }
        //预留优惠折扣
        $params['pay_money'] = $params['money'];

        $this->load->model('Users_model');
        if(empty($params['to_user_id']) || !$user_to = $this->Users_model->get($params['to_user_id'])){
        	$this->ajaxReturn([], 2, '收款账户不存在');
        }

        $this->load->model('Users_support_model');
        switch($params['payment_type']){
        	case 'balance':
        		$this->balance($params, $user_to);
        		break;
        	case 'wechat':
        		$this->wechat($params);
        		break;
        	case 'alipay':
        		$this->alipay($params);
        		break;
        	default :
        		$this->ajaxReturn([], 1, '支付类型错误');
        		break;
        }
    }

    protected function balance($params, $user_to)
	{
		$user = $this->get_user();
		if($user && $user['balance'] >= $params['pay_money']){
			if($params['pay_money'] > 0){
				$this->Users_model->update($this->user_id, ['balance' => round($user['balance'] - $params['pay_money'], 2)]);
			}
			$this->Users_model->update($params['to_user_id'], ['balance' => round($user_to['balance'] + $params['money'], 2)]);

			$data = [
	            'status' => 1,
	            'order_sn' => $this->Users_support_model->make_order_sn($this->user_id),
	            'money' => $params['money'],
	            'pay_money' => $params['pay_money'],
	            'user_id' => $this->user_id,
	            'payment_type' => $params['payment_type'],
	            'to_user_id' => $params['to_user_id'],
	            'remark' => $params['remark'],
	            'activity_id' => $params['activity_id']
	        ];
	        $this->Users_support_model->insert($data);

	        //消费记录
            $consume_record = [
            	'type' => 0,
            	'user_id' => $this->user_id,
            	'item_title' => $params['title'],
            	'item_id' => $data['activity_id'],
            	'item_amount' => $data['pay_money'],
            	'order_sn' => $data['order_sn'],
            	'topic' => 6,
            	'payment_type' => 'balance'
            ];
            $this->load->model('Consume_record_model');
            $this->Consume_record_model->insert($consume_record);

			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '账户余额不足');
		}
	}

    protected function alipay($params)
    {
    	$order = [
    		'subject' => '猪买单-赞助商转账付款',
            'out_trade_no' => $this->Users_support_model->make_order_sn($this->user_id),
            'total_amount' => TEST_PAYMENT ? TEST_PAYMENT * 0.01 : $params['pay_money'],
    	];

    	$this->setting = config_item('yansongda');
    	$this->setting['alipay']['notify_url'] = site_url('/api/notify/alipay_support');
    	$app = new Pay($this->setting);
    	$response = $app->driver('alipay')->gateway('app')->pay($order);

    	$data = [
            'order_sn' => $order['out_trade_no'],
            'money' => $params['money'],
            'pay_money' => $params['pay_money'],
            'user_id' => $this->user_id,
            'payment_type' => $params['payment_type'],
            'to_user_id' => $params['to_user_id'],
            'remark' => $params['remark'],
            'activity_id' => $params['activity_id']
        ];
        $this->Users_support_model->insert($data);
        $this->ajaxReturn($response);
    }

    protected function wechat($params)
    {
    	$order = new Order([
            'body' => '猪买单-赞助商转账付款',
            'out_trade_no' => $this->Users_support_model->make_order_sn($this->user_id),
            'total_fee' => TEST_PAYMENT ? TEST_PAYMENT : $params['pay_money'] * 100,
            'notify_url' => site_url('/api/notify/wechat_support'),
            'trade_type' => 'APP'
        ]);

        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $result = $app->payment->prepare($order);
        if($result->return_code == 'SUCCESS' && $result->result_code == 'SUCCESS'){
            $data = [
	            'order_sn' => $order['out_trade_no'],
	            'money' => $params['money'],
	            'pay_money' => $params['pay_money'],
	            'user_id' => $this->user_id,
	            'payment_type' => $params['payment_type'],
	            'to_user_id' => $params['to_user_id'],
	            'remark' => $params['remark'],
	            'activity_id' => $params['activity_id']
	        ];
            $this->Users_support_model->insert($data);
            $this->ajaxReturn($app->payment->configForAppPayment($result['prepay_id']));
        }else{
            $this->ajaxReturn([], 2, $result->return_msg);
        }
    }

    /**
	 * @api {get} /api/support/rank 赞助商-排行
	 * @apiVersion 1.0.0
	 * @apiName support_rank
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/support/rank
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} activity_id 活动ID
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
	public function rank()
	{
		$activity_id = (int)$this->input->get_post('activity_id');
		$this->load->model('Users_support_model');
		$ret = $this->Users_support_model->rank($activity_id, $this->per_page, $this->offset);

		$this->ajaxReturn($ret);
	}
}
