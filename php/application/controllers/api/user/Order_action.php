<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Order_action extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Order_model');

        $order_id = $this->input->get_post('order_id');
        if(! $this->order = $this->Order_model->get($order_id)){
        	$this->ajaxReturn([], 1, '订单不存在');
        }
        $this->action = $this->input->get_post('action');
    }

    /**
	 * @api {post} /api/user/order_action/buyer 订单操作-买家
	 * @apiVersion 1.0.0
	 * @apiName order_action_buyer
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/order_action/buyer
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} order_id 订单号
	 * @apiParam {String} action {cancel:取消, del:删除, pay:付款, remind:提醒发货, refund:退款/退货, express:查看物流, goods_confirm:确认收货, evaluate:评价, invoice:申请发票}
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
    public function buyer()
    {
    	if($this->user_id != $this->order['buyer_uid']){
    		$this->ajaxReturn([], 2, '订单操作非法');
    	}

    	switch($this->action){
    		case 'cancel'://取消
    			if($this->order['status'] != 0){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}
    			if($this->Order_model->update($this->order['id'], ['status' => 1, 'enable' => 0])){
    				$this->ajaxReturn();
    			}else{
    				$this->ajaxReturn([], 5, '取消订单操作失败');
    			}
    			break;
    		case 'del'://取消=》删除
    			if($this->order['status'] != 1){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}
    			if($this->Order_model->update($this->order['id'], ['deleted' => 1, 'enable' => 0])){
    				$this->ajaxReturn();
    			}else{
    				$this->ajaxReturn([], 5, '删除订单操作失败');
    			}
    			break;
    		case 'pay'://付款
    			if(! $this->order['enable']){
    				$this->ajaxReturn([], 4, '订单已关闭');
    			}
    			if($this->order['status'] != 0){
    				$this->ajaxReturn([], 5, '订单操作状态不支持');
    			}
    			//进支付页
    			break;
    		case 'remind'://提醒发货
    			if($this->order['status'] != 2){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}
    			//提醒发货页
    			break;
    		case 'refund'://退款/退货
    			break;
    		case 'express'://查看物流
    			$this->express();
    			break;
    		case 'goods_confirm'://确认收货
    			if($this->order['status'] != 3){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}
    			if($this->Order_model->update($this->order['id'], ['status' => 4])){
    				$this->ajaxReturn();
    			}else{
    				$this->ajaxReturn([], 5, '取消订单操作失败');
    			}
    			break;
    		case 'evaluate'://评价
    			if($this->order['status'] != 4){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}

    			$data = elements(
					array(
						'remark', 'is_anonymous', 'photos'
					),
					$this->input->post(),
					''
				);
				if(empty($data['remark'])){
					$this->ajaxReturn([], 5, '请输入评价描述');
				}
				$data['photos'] = json_encode($data['photos']);

				$data['user_id'] = $this->user_id;
				$data['order_id'] = $this->order['id'];
				$data['order_sn'] = $this->order['order_sn'];
				$data['seller_uid'] = $this->order['seller_uid'];

				$this->load->model('Order_evaluate_model');
				if($this->Order_evaluate_model->insert($data)){
					$this->Order_model->update($this->order['id'], ['status' => 5]);
					$this->ajaxReturn();
				}else{
					$this->ajaxReturn([], 5, '评价订单提交失败');
				}
    			break;
    		case 'invoice'://申请发票
    			$this->invoice();
    			break;
    		default :
    			$this->ajaxReturn([], 3, '订单操作状态错误');
    			break;
    	}
    }

    protected function invoice()
    {
    	if($this->order['status'] != 5){
			$this->ajaxReturn([], 4, '订单操作状态不支持');
		}

		$this->load->model('E_invoice_model');
		$data = elements(
			array(
				'invoice_type', 'invoice_title', 'invoice_number'
			),
			$this->input->post(),
			''
		);
		$type = $this->E_invoice_model->type();

		if(!isset($type[$data['invoice_type']])){
			$this->ajaxReturn([], 5, '发票抬头错误');
		}
		if(empty($data['invoice_title'])){
			$this->ajaxReturn([], 5, '发票名称必填');
		}
		if($data['invoice_type'] == 0 && empty($data['invoice_number'])){
			$this->ajaxReturn([], 5, '企业用户请输入税号');
		}

		$data['user_id'] = $this->user_id;
		$data['order_id'] = $this->order['id'];
		$data['order_sn'] = $this->order['order_sn'];
		$data['seller_uid'] = $this->order['seller_uid'];
		$data['invoice_amount'] = $this->order['real_total_amount'];

		if($this->E_invoice_model->insert($data)){
			$this->Order_model->update($this->order['id'], ['has_e_invoice' => 1]);
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 5, '申请发票提交失败');
		}
    }

    public function seller()
    {
    	if($this->user_id != $this->order['seller_uid']){
    		$this->ajaxReturn([], 2, '订单操作非法');
    	}

    	switch($this->action){
    		case 'change_price'://改价
    			$real_total_amount = (float)$this->input->get_post('real_total_amount');
    			if($real_total_amount < 0.01){
    				$this->ajaxReturn([], 4, '请收入调价金额');
    			}
    			if($this->order['status'] != 0){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}
    			if($this->Order_model->update($this->order['id'], ['real_total_amount' => $real_total_amount])){
    				$this->ajaxReturn();
    			}else{
    				$this->ajaxReturn([], 5, '取消订单操作失败');
    			}
    			break;
    		case 'goods_send'://发货
    			if($this->order['status'] != 2){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}

    			$data = elements(
					array(
						'express_id', 'number'
					),
					$this->input->post(),
					''
				);
				$data['user_id'] = $this->user_id;
				$data['order_id'] = $this->order['id'];
				$data['order_sn'] = $this->order['order_sn'];

    			$this->load->model('Express_model');
    			if(! $express = $this->Express_model->get($data['express_id'])){
    				$this->ajaxReturn([], 4, '该快递公司不支持');
    			}
    			if(! $express['enable']){
    				$this->ajaxReturn([], 4, '该快递公司不支持');
    			}
				$data['express'] = $express['name'];
    			if(empty($data['number'])){
    				$this->ajaxReturn([], 4, '快递单号必填');
    			}

    			$this->load->model('Order_express_model');
    			if($this->Order_express_model->insert($data)){
    				$this->Order_model->update($this->order['id'], ['status' => 3])
    				$this->ajaxReturn();
    			}else{
    				$this->ajaxReturn([], 5, '取消订单操作失败');
    			}
    			break;
    		case 'express'://查看物流
    			$this->express();
    			break;
    		case 'complete'://退款/退货标识已完成
    			if($this->order['refund_status'] != 1){
    				$this->ajaxReturn([], 4, '订单操作状态不支持');
    			}
    			if($this->Order_model->update($this->order['id'], ['refund_status' => 2])){
    				$this->ajaxReturn();
    			}else{
    				$this->ajaxReturn([], 5, '取消订单操作失败');
    			}
    			break;
    		default :
    			$this->ajaxReturn([], 3, '订单操作状态错误');
    			break;
    	}
    }
}