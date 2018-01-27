<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Cart extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Cart_model');
    }

    /**
	 * @api {post} /api/user/cart 购物车
	 * @apiVersion 1.0.0
	 * @apiName cart
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/cart
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
		$this->ajaxReturn($this->Cart_model->buyer($this->user_id));
	}

	/**
	 * @api {post} /api/user/cart/add 购物车-添加
	 * @apiVersion 1.0.0
	 * @apiName cart_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/cart/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} goods_id 商品唯一ID
	 * @apiParam {Number} num 购买数量
	 * @apiParam {String} goods_attr 商品属性
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
		$params['buyer_uid'] = $this->user_id;
		$this->check_params('add', $params);
		$this->load->model('Goods_model');
		$goods = $this->Goods_model->get($params['goods_id']);
		if(! $goods){
			$this->ajaxReturn([], 1, '商品已删除下架');
		}
		$params['seller_uid'] = $goods['seller_uid'];

		if($this->Cart_model->add($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '添加购物车失败');
		}
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['seller_uid'] === '' || $params['seller_uid'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '商家ID错误');
				}
				if($params['goods_id'] === '' || $params['goods_id'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '商品ID错误');
				}
				if($params['num'] === '' || $params['num'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '最少购买数量: 1');
				}
				break;
			case 'edit':
				break;
		}
	}
}
