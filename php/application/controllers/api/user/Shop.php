<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Shop extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/shop 我的商城
	 * @apiVersion 1.0.0
	 * @apiName shop
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/shop
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集 建议用forin遍历buyer 和 seller
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *         "nickname": "aicode",
	 *         "anchor": "1",
	 *         "seller": "1",
	 *         "buyer": [
	 *             "8"
	 *         ],
	 *         "seller": [
	 *             "5"
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
	public function index()
	{
		$ret = [];

		$user = $this->get_user();
		$ret['header'] = $user['header'];
		$ret['nickname'] = $user['nickname'];
		$ret['pretty_id'] = $user['pretty_id'];
		//主播标识
		$ret['anchor'] = $user['anchor'];
		//商家标识（限定主播才能申请开店）
		$ret['seller_status'] = $user['seller'];

		$this->load->model('Order_model');

		//买
		$ret['buyer'] = [];
		$this->db->select('count(id) num,status');
		$this->db->group_by('status');
		if($buyer = $this->Order_model->get_many_by(['buyer_uid' => $this->user_id])){
			foreach($buyer as $item){
				$ret['buyer'][$item['status']] = $item['num'];
			}
		}

		//卖
		if($ret['seller_status'] == 2){
			$ret['seller'] = [];
			$this->db->select('count(id) num,status');
			$this->db->group_by('status');
			if($seller = $this->Order_model->get_many_by(['seller_uid' => $this->user_id, 'refund_status' => 0, 'deleted' => 0])){
				foreach($seller as $item){
					$ret['seller'][$item['status']] = $item['num'];
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/user/shop/add 我的商城-申请开店
	 * @apiVersion 1.0.0
	 * @apiName shop_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/shop/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集 建议用forin遍历buyer 和 seller
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *         "nickname": "aicode",
	 *         "anchor": "1",
	 *         "seller": "1",
	 *         "buyer": [
	 *             "8"
	 *         ],
	 *         "seller": [
	 *             "5"
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
	public function add()
	{
		$user = $this->get_user();
		if($user['anchor'] == 2){
			if($user['seller'] == 2){
				$this->ajaxReturn([], 2, '店铺已开通请勿重复申请');
			}else{
				$status = 1;
				$this->load->model('Shop_model');
				$this->Shop_model->delete_by(['user_id' => $this->user_id]);
				$this->Shop_model->insert(['user_id' => $this->user_id, 'status' => $status]);

				$this->load->model('Users_model');
				$this->Users_model->update($this->user_id, ['seller' => $status]);

				$this->ajaxReturn();
			}
		}else{
			$this->ajaxReturn([], 1, '认证主播才能申请开店');
		}
	}

	/**
	 * @api {get} /api/user/shop/static_goods 我的商城-统计商品
	 * @apiVersion 1.0.0
	 * @apiName shop_static_goods
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/shop/static_goods
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集 建议用forin遍历buyer 和 seller
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *         "nickname": "aicode",
	 *         "anchor": "1",
	 *         "seller": "1",
	 *         "buyer": [
	 *             "8"
	 *         ],
	 *         "seller": [
	 *             "5"
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
	public function static_goods()
	{
		$ret = ['count' => 0, 'goods' => []];

		$this->load->model('Record_goods_model');
		$this->db->select('goods_id,sum(num) count');
		$this->db->group_by('goods_id');
		if($rows = $this->Record_goods_model->get_many_by(['seller_uid' => $this->user_id])){
			$a_goods_id = [];
			$k_goods_count = [];
			foreach($rows as $item){
				$a_goods_id[] = $item['goods_id'];
				$k_goods_count[$item['goods_id']] = $item['count'];
			}
			$this->load->model('Goods_model');
			$this->db->select('id,default_image,name,sale_price');
			if($goods = $this->Goods_model->get_many($a_goods_id)){
				foreach($goods as $key=>$item){
					$goods[$key]['count'] = isset($k_goods_count[$item['id']]) ? $k_goods_count[$item['id']] : 0;
					$ret['count'] += $goods[$key]['count'];
				}
				$ret['goods'] = $goods;
			}
		}

		$this->ajaxReturn($ret);
	}
}