<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Vip extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Vip_model');
    }

    /**
	 * @api {get} /api/vip 贵族-列表
	 * @apiVersion 1.0.0
	 * @apiName vip
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/vip
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 贵族唯一ID
	 * @apiSuccess {String} data.name 贵族名称
	 * @apiSuccess {String} data.first_fee 首开费用
	 * @apiSuccess {String} data.first_gold 首开金币
	 * @apiSuccess {String} data.renew_fee 续费费用
	 * @apiSuccess {String} data.renew_gold 续费金币
	 * @apiSuccess {String} data.days 有效期天数
	 * @apiSuccess {String} data.unit 有效期单位：日/月/季/年
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "name": "男爵",
	 *             "first_fee": "100.00",
	 *             "first_gold": "10000",
	 *             "renew_fee": "80.00",
	 *             "renew_gold": "12000",
	 *             "icon": "",
	 *             "days": "30",
	 *             "unit": "月",
	 *         }
	 *     ],
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
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$this->db->select('id,name,first_fee,first_gold,renew_fee,renew_gold,icon,days,unit');
		$ret = $this->Vip_model->order_by($order_by)->get_many_by('enable', 1);
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/vip/view 贵族-下单
	 * @apiVersion 1.0.0
	 * @apiName vip_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/vip/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} vip_id 贵族ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 贵族唯一ID
	 * @apiSuccess {String} data.name 贵族名称
	 * @apiSuccess {String} data.first_fee 首开费用
	 * @apiSuccess {String} data.first_gold 首开金币
	 * @apiSuccess {String} data.renew_fee 续费费用
	 * @apiSuccess {String} data.renew_gold 续费金币
	 * @apiSuccess {String} data.days 有效期天数
	 * @apiSuccess {String} data.unit 有效期单位：日/月/季/年
	 * @apiSuccess {String} data.balance 账号余额
	 * @apiSuccess {String} data.amount 支付金额
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "id": "1",
	 *         "name": "男爵",
	 *         "enable": "1",
	 *         "first_fee": "100.00",
	 *         "first_gold": "10000",
	 *         "renew_fee": "80.00",
	 *         "renew_gold": "12000",
	 *         "icon": "",
	 *         "days": "30",
	 *         "unit": "月",
	 *         "balance": "9800.10",
	 *         "amount": "100.00"
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
		$vip_id = $this->input->get_post('vip_id');
		$this->payment_format(['vip_id' => $vip_id]);

		$ret = $this->vip;

		$user = $this->get_user();
		$ret['balance'] = $user['balance'];
		$ret['amount'] = $this->amount;

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/vip/payment 贵族-支付
	 * @apiVersion 1.0.0
	 * @apiName vip_payment
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/vip/payment
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} payment_type 支付类型 balance：余额 wechat：微信 alipay：支付宝
	 * @apiParam {Number} vip_id 贵族ID
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
        $params = elements(
            array(
                'payment_type', 'vip_id'
            ),
            $this->input->post(),
            0
        );

        $this->payment_format($params);

        if($this->amount < 0.01){
        	$params['payment_type'] = 'balance';//免费强制用余额
        }

        $this->load->model('Users_vip_log_model');
		$log = [
			'order_sn' => $this->Users_vip_log_model->make_order_sn($this->user_id),
			'amount' => $this->amount,
			'user_id' => $this->user_id,
			'payment_type' => $params['payment_type'],
			'vip_id' => $params['vip_id'],
			'gold' => $this->gold
		];
		if(! $order_id = $this->Users_vip_log_model->insert($log)){
			$this->ajaxReturn([], 3, '下单失败');
		}

        switch($params['payment_type']){
        	case 'balance':
        		$this->balance($order_id);
        		break;
        	case 'wechat':
        		$this->wechat($log['order_sn']);
        		break;
        	case 'alipay':
        		break;
        	default :
        		$this->ajaxReturn([], 1, '订单支付类型错误');
        		break;
        }
    }

    protected function payment_format($params)
    {
    	$this->db->select('id,name,enable,first_fee,first_gold,renew_fee,renew_gold,icon,days,unit');
    	if(! $vip = $this->Vip_model->get($params['vip_id'])){
        	$this->ajaxReturn([], 1, '该贵族信息不存在');
        }
        if(! $vip['enable']){
        	$this->ajaxReturn([], 2, '该贵族已下架');
        }
        $amount = $vip['first_fee'];
        $gold = $vip['first_gold'];

        $this->load->model('Users_vip_model');
        if($user_vip = $this->Users_vip_model->get_by(['user_id' => $this->user_id, 'vip_id' => $params['vip_id']])){
        	$amount = $vip['renew_fee'];
        	$gold = $vip['renew_gold'];
        }else{
        	$user_vip = [];
        }

        $this->amount = $amount;
        $this->gold = $gold;
        $this->vip = $vip;
        $this->user_vip = $user_vip;
    }

    protected function balance($order_id)
	{
		$user = $this->get_user();
		if($user && $user['balance'] >= $this->amount){
			if($this->amount > 0){
				$this->Users_model->update(
					$this->user_id,
					[
						'balance' => round($user['balance'] - $this->amount, 2),
						'gold' => round($user['gold'] + $this->gold)
					]
				);
			}

			//更新流水状态
			$order_update = ['status' => 1];
			$this->Users_vip_log_model->update($order_id, $order_update);
			//更新用户贵族
			if($this->user_vip){
				$add_time = max($this->user_vip['validity_time'], time());
				$data = [
					'validity_time' => strtotime('+'.$this->vip['days'].' days', $add_time)
				];
				$this->Users_vip_model->update($this->user_vip['id'], $data);
			}else{
				$data = [
					'user_id' => $this->user_id,
					'vip_id' => $this->vip['id'],
					'validity_time' => strtotime('+'.$this->vip['days'].' days')
				];
				$this->Users_vip_model->insert($data);
			}
			//金币明细
            $gold_log = [
                'topic' => 3,
                'from_user_id' => $this->user_id,
                'to_user_id' => $this->user_id,
                'item_title' => $this->amount,
                'item_id' => $order_id,
                'gold' => $this->gold
            ];
            $this->load->model('Gold_log_model');
            $this->Gold_log_model->insert($gold_log);

			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '账户余额不足');
		}
	}

	protected function wechat($order_sn)
    {
    	$order = new Order([
            'body' => '猪买单-购买贵族',
            'out_trade_no' => $order_sn,
            'total_fee' => $this->amount * 100,
            'notify_url' => site_url('/api/notify/wechat_vip_payment'),
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
}
