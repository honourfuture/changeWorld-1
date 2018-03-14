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
	 * @apiParam {String} seller 商家商品组
	 * @apiParam {String} goods_id 1,2,3
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
	public function add()
	{
		$params = elements(
			array(
				'addressInfo', 'seller', 'goods_id'
			),
			$this->input->post(),
			''
		);

		//收货人信息
		if(empty($params['addressInfo'])){
			$this->ajaxReturn([], 1, '请输入收货人信息');
		}
		if(!$addressInfo = json_decode($params['addressInfo'], true)){
			$this->ajaxReturn([], 2, '收货人信息格式错误');
		}

		//商家商品信息
		if(empty($params['seller'])){
			$this->ajaxReturn([], 3, '请选择商品再进行下单');
		}
		if(!$seller = json_decode($params['seller'], true)){
			$this->ajaxReturn([], 4, '商品信息格式错误');
		}

		//最优优惠券
		//积分抵扣

		//订单表
		$pay_sn = '';
		$order = [
			'pay_sn' => $pay_sn,

		];
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
