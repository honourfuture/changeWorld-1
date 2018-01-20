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
        // $this->load->model('Shop_model');
    }

    /**
	 * @api {get} /api/shop 商城-类型查商品
	 * @apiVersion 1.0.0
	 * @apiName shop
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} shop_class_id 商城分类ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.anchor 推荐主播
	 * @apiSuccess {Object[]} data.goods 推荐商品
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *        "anchor": [],
	 *        "goods": []
	 *    },
	 *    "status": 0,
	 *    "message": "成功"
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 *    "data": "",
	 *    "status": 1,
	 *    "message": "商城分类ID错误"
	 * }
	 */
	public function index()
	{
		$ret = array('anchor' => array(), 'goods' => array());
		$shop_class_id = (int)$this->input->get_post('shop_class_id');
		if($shop_class_id){
			$this->load->model('Users_model');
			$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
			$where = array('shop_class_id' => $shop_class_id);
			$this->db->select('id,header,nickname');
			$ret['anchor'] = $this->Users_model->order_by($order_by)->limit(5, 0)->get_many_by($where);

			$ret['goods'] = $this->_goods($shop_class_id);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn('', 1, '商城分类ID错误');
		}
	}

	/**
	 * @api {get} /api/shop/goods 商城-获取商品
	 * @apiVersion 1.0.0
	 * @apiName shop_goods
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop/goods
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} shop_class_id 商城分类ID
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
		$ret = array('goods' => array());
		$shop_class_id = (int)$this->input->get_post('shop_class_id');
		if($shop_class_id){
			$ret['goods'] = $this->_goods($shop_class_id);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn('', 1, '商城分类ID错误');
		}
	}

	protected function _goods($shop_class_id)
	{
		$this->load->model('Goods_model');
		$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
		$where = array('shop_class_id' => $shop_class_id);
		$this->db->select('id,default_image,name,sale_price');
		return $this->Goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
	}

	/**
	 * @api {get} /api/shop/pretty 商城-靓号
	 * @apiVersion 1.0.0
	 * @apiName shop_pretty
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop/pretty
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 商城唯一ID
	 * @apiSuccess {String} data.name 商城名称
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
	public function pretty()
	{
		$ret = array('ad' => array(), 'ids' => array());
		$ad_position_id = 3;
        $ret['ad'] = $this->ad($ad_position_id, 3);
	}

	// 查看
	public function view()
	{

	}
}
