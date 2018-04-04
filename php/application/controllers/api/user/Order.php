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
	 * @api {get} /api/user/order/view 订单-详情
	 * @apiVersion 1.0.0
	 * @apiName order_view
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/order/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status 订单状态 -1全部 -2退单
	 * @apiParam {String} order_id 订单号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "order": {
	 *             "id": "1",
	 *             "created_at": "2018-03-14 13:01:08",
	 *             "updated_at": "2018-03-14 13:01:08",
	 *             "deleted": "0",
	 *             "status": "0",
	 *             "enable": "1",
	 *             "pay_sn": "870069426068845",
	 *             "order_sn": "280069426068852001",
	 *             "seller_uid": "1",
	 *             "total_amount": "145.50",
	 *             "real_total_amount": "115.50",
	 *             "use_ticket_amount": "10.00",
	 *             "use_point_amount": "20.00",
	 *             "buyer_uid": "1",
	 *             "refund_status": "0",
	 *             "has_e_invoice": "0",
	 *             "address_info": "{\"username\":\"daihanqiao\",\"mobi\":\"18507558811\",\"address\":\"河北省-唐山市-路南区 2313\"}",
	 *             "message": "留言1",
	 *             "use_point": "20",
	 *             "ticket_info": "{\"full_amount\":\"100\",\"free_amount\":\"10\"}"
	 *         },
	 *         "evaluate": [],
	 *         "invoice": [],
	 *         "goods": [
	 *             {
	 *                 "id": "1",
	 *                 "order_id": "1",
	 *                 "goods_id": "4",
	 *                 "goods_price": "20.00",
	 *                 "num": "1",
	 *                 "freight_fee": "2.00",
	 *                 "goods_attr": "{\"7\":[\"1L\"],\"8\":[\"白色\"]}",
	 *                 "name": "测试商品",
	 *                 "default_image": "/uploads/2018/01/23/3b3b5b51b0290d787276d741f1c0f81d.png"
	 *             },
	 *             {
	 *                 "id": "2",
	 *                 "order_id": "1",
	 *                 "goods_id": "26",
	 *                 "goods_price": "100.00",
	 *                 "num": "1",
	 *                 "freight_fee": "1.50",
	 *                 "goods_attr": "{\"6\":[\"xxl\"],\"8\":[\"红色\"]}",
	 *                 "name": "完美小金瓶",
	 *                 "default_image": "/uploads/2018/03/13/c1f71ad3579f0543685a92ce663c8532.png"
	 *             },
	 *             {
	 *                 "id": "3",
	 *                 "order_id": "1",
	 *                 "goods_id": "4",
	 *                 "goods_price": "20.00",
	 *                 "num": "1",
	 *                 "freight_fee": "2.00",
	 *                 "goods_attr": "",
	 *                 "name": "测试商品",
	 *                 "default_image": "/uploads/2018/01/23/3b3b5b51b0290d787276d741f1c0f81d.png"
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
    public function view()
    {
    	$ret = [];

    	$order_id = $this->input->get_post('order_id');
    	if($order = $this->Order_model->get($order_id)){
    		if($order['seller_uid'] != $this->user_id && $order['buyer_uid'] != $this->user_id){
    			$this->ajaxReturn([], 2, '该订单不属于你');
    		}
    		$ret['order'] = $order;
    		//评论
    		$this->load->model('Order_evaluate_model');
    		$this->db->select('id,remark,is_anonymous,photos');
    		if($evaluate = $this->Order_evaluate_model->get_by(['user_id' => $order['buyer_uid'], 'order_id' => $order['id']])){
    			$evaluate['photos'] = json_decode($evaluate['photos'], true);
    		}else{
    			$evaluate = [];
    		}
    		$ret['evaluate'] = $evaluate;
    		//发票
    		$this->load->model('E_invoice_model');
    		$this->db->select('id,invoice_type,invoice_title,invoice_number');
    		if($invoice = $this->E_invoice_model->get_by(['user_id' => $order['buyer_uid'], 'order_id' => $order['id']])){
    			//to do something
    		}else{
    			$invoice = [];
    		}
    		$ret['invoice'] = $invoice;
    		//商品
    		$this->load->model('Order_items_model');
			$this->db->select('id,order_id,goods_id,goods_price,num,freight_fee,goods_attr,name,default_image');
			$ret['goods'] = $this->Order_items_model->get_many_by('order_id', $order['id']);

			$this->ajaxReturn($ret);
    	}else{
    		$this->ajaxReturn([], 1, '订单不存在');
    	}
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
	 * @apiParam {Number} status 订单状态 -1全部 -2退单
	 * @apiParam {Number} is_seller 1卖出订单 0买入订单(私人)
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
		$ret = array('count' => 0, 'list' => [], 'status' => []);

		$status = intval($this->input->get_post('status'));
		$is_seller = intval($this->input->get_post('is_seller'));

		$ret['status'] = $this->Order_model->status();

		$where = [];
		if(isset($ret['status'][$status])){
			$where['status'] = $status;
			$where['refund_status'] = 0;
		}elseif($status == -1){

		}elseif($status == -2){
			$where['refund_status >'] = 0;
		}else{
			$this->ajaxReturn([], 1, '订单状态未知');
		}

		if($is_seller){
			$where['seller_uid'] = $this->user_id;
		}else{
			$where['buyer_uid'] = $this->user_id;
		}

		$this->search();
		$ret['count'] = $this->Order_model->count_by($where);
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$this->search();
			$this->db->select('id,created_at,status,order_sn,real_total_amount,use_ticket_amount,use_point_amount,seller_uid,buyer_uid,deleted,refund_status');
			$ret['list'] = $this->Order_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_order_id = [];
			foreach($ret['list'] as $item){
				$a_order_id[] = $item['id'];
			}

			if($a_order_id){
				$this->load->model('Order_items_model');
				$this->db->select('id,order_id,goods_id,goods_price,num,freight_fee,goods_attr,name,default_image');
				$order_item = $this->Order_items_model->get_many_by('order_id', $a_order_id);
				$k_order_item = [];
				foreach($order_item as $item){
					!isset($k_order_item[$item['order_id']]) && $k_order_item[$item['order_id']] = [];
					$k_order_item[$item['order_id']][] = $item;
				}

				foreach($ret['list'] as $key=>$item){
					$ret['list'][$key]['goods'] = $k_order_item[$item['id']];
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{

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
			'point' => $r_point,
			'balance' => $user['balance']
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
