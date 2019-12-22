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
use JPush\Client;

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

	private function _setBalance($uid, $balance)
    {
        $balance = round($balance , 2);
        $this->db->set('balance', 'balance +'.$balance, false);
        $this->db->where('id', $uid);
        $this->db->update($this->Users_model->table());
    }
	protected function balance($order_id)
	{
        //自购比例
        $selfPercent = [
            '0' => 0,
            '1' => 1,
            '2' => 1.6,
            '3' => 2,
            '4' => 3,
            '5' => 4
        ];
        //直属比例
        $underPercent = [
            '0' => 0,
            '1' => 0.2,
            '2' => 0.4,
            '3' => 0.4,
            '4' => 0.6,
            '5' => 0.8
        ];
        //下属佣金提成比例(大于)
        $branch = [
            '0' => 0,
            '1' => 0.2,
            '2' => 0.25,
            '3' => 0.25,
            '4' => 0.35,
            '5' => 0.5
        ];
        //下属佣金提成比例(等于)
        $branchEq = [
            '0' => 0,
            '1' => 0.2,
            '2' => 0.05,
            '3' => 0.05,
            '4' => 0.07,
            '5' => 0.1
        ];
        $user = $this->get_user();
		if($user && $user['balance'] >= $this->amount){
			if($this->amount > 0){
				$this->Users_model->update($this->user_id, ['balance' => round($user['balance'] - $this->amount, 2)]);
			}

			$order_update = ['status' => 2, 'payment_type' => 'balance'];
			if(!is_array($order_id)){
				$order_id = [$order_id];
			}

			$this->Order_model->update_many($order_id, $order_update);
			//分佣
            $insert = [];

            //商品销售记录
            $this->load->model('Order_items_model');
            if($goods = $this->Order_items_model->get_many_by(['order_id' => $order_id])){
                $this->load->model('Record_goods_model');
                $data = [];
                $consume_record = [];
                foreach($goods as $item){
                    $data[] = [
                        'goods_id' => $item['goods_id'],
                        'seller_uid' => $item['seller_uid'],
                        'num' => $item['num'],
                        'order_id' => $item['order_id']
                    ];

                    //消费记录
                    $consume_record[] = [
                        'type' => 0,
                        'user_id' => $this->user_id,
                        'item_title' => $item['name'],
                        'item_id' => $item['goods_id'],
                        'item_amount' => $item['total_price'],
                        'order_sn' => $item['order_sn'],
                        'topic' => 5,
                        'payment_type' => 'balance'
                    ];

                    if($user['pid']){
                        $this->load->model('Users_model');
                        $top = $this->Users_model->parent($user['pid'], [$user]);

                        $this->load->model('Grade_model');
                        $levelUsers = $this->Grade_model->getLevelByUsers($top);
                        $levelIds = [];
                        foreach ($levelUsers as $k => $levelUser){
                            $levelIds[] = $levelUser['level'];

                            if($levelUser['id'] == $user['id']){
                                //自购佣金
                                $addPrice = isset($selfPercent[$levelUser['level']]) ? $selfPercent[$levelUser['level']] * $this->amount : 0;
                            }else if($levelUser['id'] == $user['pid']){
                                //直属
                                $addPrice = isset($underPercent[$levelUser['level']]) ? $underPercent[$levelUser['level']] * $this->amount: 0;
                            }else{
                                $maxLevelId = max($levelIds);
                                if($maxLevelId > $levelUser['level']){
                                    continue;
                                }else if($maxLevelId == $levelUser['level']){
                                    $addPrice = isset($branchEq[$levelUser['level']]) ? $branchEq[$levelUser['level']] * $this->amount : 0;
                                }else{
                                    $addPrice = isset($branch[$levelUser['level']]) ? $branch[$levelUser['level']] * $this->amount : 0;
                                }
                            }
                            $addPrice = $item['base_percent'] / 100 * $addPrice;
                            $addPrice = round($addPrice, 2);
                            if($addPrice){
                                $this->_setBalance($levelUser['id'], $addPrice);

                                $insert[] = [
                                    'topic' => 2,
                                    'sub_topic' => 0,
                                    'user_id' => $levelUser['id'],
                                    'name' => $levelUser['nickname'],
                                    'mobi' => $levelUser['mobi'],
                                    'amount' => $addPrice,
                                    'type' => 2,
                                    'item' => json_encode($item),
                                    'level' => count($levelIds),
                                    'shop_id' => $item['seller_uid'],
                                    'from_id' => $user['id']
                                ];
                            }
                        }
                    }
                }
                $this->load->model('Income_model');
                if($insert){
                    $this->Income_model->insert_many($insert);
                }

                $this->Record_goods_model->insert_many($data);

                $this->load->model('Consume_record_model');
                $this->Consume_record_model->insert_many($consume_record);
            }

            //消息推送
            $order = $this->Order_model->get_many($order_id);
			foreach($order as $item){
				if($user_to = $this->Users_model->get($item['seller_uid'])){
		            $cid = $user_to['device_uuid'];
		            if(!empty($cid)){
			        	$setting = config_item('push');
				        $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);

				        $result = $client->push()
			                             ->setPlatform('all')
			                             ->addRegistrationId($cid)
			                             ->setNotificationAlert($user['nickname'].'在您店铺购买了商品，请尽快发货')
			                             ->send();
		            }
				}
			}

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
