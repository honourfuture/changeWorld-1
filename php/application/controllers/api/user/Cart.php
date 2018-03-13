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
	 * @api {get} /api/user/cart/count 购物车-数量
	 * @apiVersion 1.0.0
	 * @apiName cart_count
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/cart/count
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
	 *         "count": 2
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
    public function count()
    {
    	$count = $this->Cart_model->count_by('buyer_uid', $this->user_id);
    	$this->ajaxReturn(['count' => $count]);
    }

    /**
	 * @api {get} /api/user/cart/order 结算信息
	 * @apiVersion 1.0.0
	 * @apiName cart_order
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/cart/order
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
    public function order()
    {
    	$ret = array();
		$ret['point'] = $this->points($this->user_id);
		$ret['goods'] = $this->Cart_model->buyer($this->user_id);

		$this->ajaxReturn($ret);
    }

    /**
	 * @api {get} /api/user/cart 购物车
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
		$ret = $this->Cart_model->buyer($this->user_id);
		$this->ajaxReturn($ret);
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
	 * @apiParam {String} goods_attr 商品属性 json
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

		if($this->cart_add($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '添加购物车失败');
		}
	}

	protected function cart_add($params, $is_buy = false)
	{
		//判断商品
		$this->check_goods_add($params, $is_buy);

		//加入购物车
		return $this->Cart_model->add($params);
	}

	/**
	 * @api {post} /api/user/cart/buy 商品-直接购买
	 * @apiVersion 1.0.0
	 * @apiName cart_buy
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/cart/buy
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} goods_id 商品唯一ID
	 * @apiParam {String} goods_attr 商品属性 json
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
	public function buy()
	{
		$params = elements(
			array(
				'goods_id', 'goods_attr'
			),
			$this->input->post(),
			UPDATE_VALID
		);
		$params['num'] = 1;
		$this->cart_add($params, true);

		//商品&商家信息
		$this->load->model('Users_model');
		$seller = $this->Users_model->get_many_user([$this->goods['seller_uid']]);
		!isset($seller[$this->goods['seller_uid']]['goods']) && $seller[$this->goods['seller_uid']]['goods'] = array();
    	$seller[$this->goods['seller_uid']]['goods'][] = $this->goods;

		$this->ajaxReturn($seller);
	}

	protected function check_goods_add(&$params, $is_buy = false)
	{
		$params['buyer_uid'] = $this->user_id;
		$this->check_params('add', $params);
		$this->load->model('Goods_model');
		$this->db->select('id,name,sale_price,seller_uid,default_image,goods_ticket,use_point_rate,freight_fee');
		$goods = $this->Goods_model->get($params['goods_id']);
		if(! $goods){
			$this->ajaxReturn([], 1, '商品已删除下架');
		}
		$params['seller_uid'] = $goods['seller_uid'];

		$is_buy && $this->goods = $goods;
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

	/**
	 * @api {post} /api/user/cart/save 购物车-批编辑
	 * @apiVersion 1.0.0
	 * @apiName cart_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/cart/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} goods_num json {商品唯一ID:数量} 数量0表示删除
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
	public function save()
	{
		$goods_num = $this->input->get_post('goods_num');
		if($a_goods_num = json_decode($goods_num, true)){
			if($this->Cart_model->save($this->user_id, $a_goods_num)){
				$this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 2, '操作失败');
			}
		}else{
			$this->ajaxReturn([], 1, '数据格式错误');
		}
	}
}
