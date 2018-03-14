<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Order extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Order_model');
    }

    /**
	 * @api {get} /api/user/order 订单-列表
	 * @apiVersion 1.0.0
	 * @apiName order
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/order
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
	 *	   },
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
		$ret = array('count' => 0, 'list' => array());

		$status = intval($this->input->get_post('status'));
		$seller_uid = intval($this->input->get_post('seller_uid'));
		if($seller_uid){

		}else{
			
		}
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/order/add 订单-下单
	 * @apiVersion 1.0.0
	 * @apiName order_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/order/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} addressInfo 收货人信息
	 * @apiParam {String} seller 商家信息组
	 * @apiParam {String} cart_id 1,2,3
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "pay_sn": "870069426068845",
	 *         "total": 131.5,
	 *         "ticket": 16,
	 *         "point_amount": 20,
	 *         "point": 20
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
	public function add()
	{
		$params = elements(
			array(
				'addressInfo', 'seller', 'cart_id'
			),
			$this->input->post(),
			''
		);

		//个人信息
		$this->load->model('Users_model');
		$user = $this->Users_model->get($this->user_id);
	    $point = $this->points($user);

		//收货人信息
		if(empty($params['addressInfo'])){
			$this->ajaxReturn([], 1, '请输入收货人信息');
		}
		if(!$addressInfo = json_decode($params['addressInfo'], true)){
			$this->ajaxReturn([], 2, '收货人信息格式错误');
		}

		//商家信息
		if(empty($params['seller'])){
			$this->ajaxReturn([], 3, '商家信息字段空值');
		}
		if(!$seller = json_decode($params['seller'], true)){
			$this->ajaxReturn([], 4, '商家信息格式错误');
		}

		//商品信息
		$goods = [];
		if($params['cart_id']){
    		$a_cart_id = explode(',', $params['cart_id']);
	    	if($a_cart_id){
	    		$this->load->model('Cart_model');
				$goods = $this->Cart_model->buyer($this->user_id, $a_cart_id);
				//最优优惠券
				$this->Order_model->format_seller_data($goods);
	    	}
    	}
    	if(! $goods){
    		$this->ajaxReturn([], 5, '请选择商品再下单');
    	}

		//订单表
		$pay_sn = $this->Order_model->make_pay_sn();
		$this->load->model('Order_items_model');
		$r_total = $r_ticket = $r_point = $r_point_amount = 0;
		$d_cart_id = [];//待删除购物车ID
		$flag_point = false;//积分变动标识
		foreach($goods as $seller_id=>$rows){
			$order = $order_item = [];
			if(! isset($seller[$seller_id])){
				$this->ajaxReturn([], 6, '商户商品信息不一致');
			}
			if(! $rows['goods']){
				$this->ajaxReturn([], 7, '商户商品信息为空');
			}
			//积分抵扣
			$use_point_amount = 0;
			if($point['rule'] && $point['user'] && $seller[$seller_id]['point']){
				//修正商户可使用积分量
				$seller[$seller_id]['point'] > $rows['point'] && $seller[$seller_id]['point'] = $rows['point'];
				//修正用户可使用积分量
				$seller[$seller_id]['point'] > $point['user'] && $seller[$seller_id]['point'] = $point['user'];
				$point['user'] -= $seller[$seller_id]['point'];
			}else{
				$seller[$seller_id]['point'] = 0;
			}

			if($seller[$seller_id]['point']){
				$flag_point = true;
				$use_point_amount = $seller[$seller_id]['point'] * 100 / $point['rule'];
			}
			//实付金额
			$real_total_amount = round($rows['total'] - $rows['ticket'] - $use_point_amount, 2);
			$order_sn = $this->Order_model->make_order_sn($seller_id);
			//返回字段
			$r_total += $real_total_amount;
			$r_ticket += $rows['ticket'];
			$r_point_amount += $use_point_amount;
			$r_point += $seller[$seller_id]['point'];

			$this->db->trans_start();
			$order = [
				'pay_sn' => $pay_sn,
				'order_sn' => $order_sn,
				'seller_uid' => $seller_id,
				'total_amount' => $rows['total'],
				'real_total_amount' => $real_total_amount,
				'use_ticket_amount' => $rows['ticket'],
				'use_point_amount' => $use_point_amount,
				'buyer_uid' => $this->user_id,
				'address_info' => $params['addressInfo'],
				'message' => $seller[$seller_id]['message'],
				'use_point' => $seller[$seller_id]['point'],
				'ticket_info' => json_encode($rows['ticket_info'])
			];

			$order_id = $this->Order_model->insert($order);
			foreach($rows['goods'] as $item){
				$d_cart_id[] = $item['cart_id'];
				$order_item[] = [
					'order_id' => $order_id,
					'order_sn' => $order_sn,
					'goods_id' => $item['goods_id'],
					'goods_price' => $item['sale_price'],
					'num' => $item['num'],
					'freight_fee' => $item['freight_fee'],
					'send_mode' => $item['send_mode'],
					'e_invoice' => $item['e_invoice'],
					'total_price' => round(($item['sale_price'] + $item['freight_fee']) * $item['num'], 2),
					'goods_attr' => $item['goods_attr'],
					'name' => $item['name'],
					'default_image' => $item['default_image'],
					'buyer_uid' => $this->user_id,
					'seller_uid' => $seller_id,
				];
			}
			$this->db->insert_batch($this->Order_items_model->table(), $order_item);

			$this->db->trans_complete();
			if($this->db->trans_status() === FALSE){
				log_message('error', "[order]".var_export($order, true)."\r\n[order_item]".var_export($order_item, true));
				$this->ajaxReturn([], 500, '保存订单商品信息失败');
			}
		}

		if($flag_point){
			//更新积分
			$this->Users_model->update($this->user_id, ['point' => $point['user']]);
			//积分抵扣明细
			$this->load->model('Users_points_model');
			$point_log = [
				'user_id' => $this->user_id,
				'value' => $r_point,
				'rule_name' => 'goods_exchange',
				'remark' => '商品下单积分使用抵扣'
			];
			$this->Users_points_model->insert($point_log);
		}
		//系统赠送积分

		//删除购物车相关商品
		$this->Cart_model->delete_many($d_cart_id);

		$this->distribution();

		$ret = [
			'pay_sn' => $pay_sn,
			'total' => $r_total,
			'ticket' => $r_ticket,
			'point_amount' => $r_point_amount,
			'point' => $r_point
		];
		$this->ajaxReturn($ret);
	}

	//分销业务
	protected function distribution()
	{

	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				break;
			case 'save':
				break;
		}
	}
}
