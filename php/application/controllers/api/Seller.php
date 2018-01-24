<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Seller extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/seller 店铺
	 * @apiVersion 1.0.0
	 * @apiName seller
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 * @apiParam {String} type 商店：goods 简介：info 专辑：album 直播：live
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": "",
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
		$seller_uid = $this->input->get('seller_uid');
		$type = $this->input->get('type');

		$this->load->model('Users_model');
		$result = $this->Users_model->check_shop($seller_uid);
		if($result['status']){
			$this->ajaxReturn($result['data'], $result['status'], $result['message']);
		}

		$ret = array('fans' => 0, 'user' => array(), $type => array('count' => 0, 'list' => array()));
		$ret['user'] = $result['data'];

		$this->load->model('Users_collection_model');
		$ret['fans'] = $this->Users_collection_model->check_fans($this->user_id, $seller_uid);
		switch($type){
			case 'goods':
				$ret[$type] = $this->_goods($seller_uid);
				break;
			case 'info':
				break;
			case 'album':
				break;
			case 'live':
				break;
			default :
				$this->ajaxReturn([], 1, '类型不支持');
				break;
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		
	}

	protected function _goods($seller_uid)
	{
		$ret = array('count' => 0, 'list' => array());
		$where = array('enable' => 1);
		$where['seller_uid'] = $seller_uid;
		$this->load->model('Goods_model');

		$this->search();
		$ret['count'] = $this->Goods_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
			$this->search();
			$this->db->select('id,default_image,name,sale_price');
			$ret['list'] = $this->Goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		return $ret;
	}

	/**
	 * @api {get} /api/seller/goods 店铺-更多商品
	 * @apiVersion 1.0.0
	 * @apiName seller_goods
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/seller/goods
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} seller_uid 店铺唯一ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集 推荐商品
	 * @apiSuccess {Object[]} data.goods 推荐商品
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "name": "热门"
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "name": "靓号"
	 *	        }
	 *	    ],
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function goods()
	{
		$ret = array();
		$seller_uid = $this->input->get('seller_uid');
		if($seller_uid){
			$ret['goods'] = $this->_goods($seller_uid);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '店铺唯一ID错误');
		}
	}
}
