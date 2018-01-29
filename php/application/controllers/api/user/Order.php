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
				'goods_id', 'num', 'goods_attr'
			),
			$this->input->post(),
			UPDATE_VALID
		);
		//优惠券
		//积分抵扣
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['goods_id'] === '' || $params['goods_id'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '商品ID错误');
				}
				if($params['num'] === '' || $params['num'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '最少购买数量: 1');
				}
				break;
			case 'save':
				break;
		}
	}
}
