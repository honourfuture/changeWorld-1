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
        $this->keyword = trim($this->input->get_post('keyword'));
    }

    /**
	 * @api {get} /api/shop 商城-首页
	 * @apiVersion 1.0.0
	 * @apiName shop
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} goods_class_id 商城分类ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.ad 推荐广告
	 * @apiSuccess {Object[]} data.goods 推荐商品
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *        "ad": [],
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

        $ret = array('ad' => array(), 'goods' => array());
		$goods_class_id = (int)$this->input->get_post('goods_class_id');
		$is_hot = (int)$this->input->get_post('is_hot');
		if($goods_class_id){
			$ret['goods'] = $this->_goods($goods_class_id);
			$this->load->model('Ad_position_model');
			$ad_position_id = $this->Ad_position_model->get_ad_position_id('shop', $goods_class_id);
            $ret['ad'] = $this->ad($ad_position_id, 5);

			$this->ajaxReturn($ret);
		}elseif($is_hot){
			$ret['goods'] = $this->_goods(0, true);

			$this->load->model('Ad_position_model');
			$ad_position_id = $this->Ad_position_model->get_ad_position_id('shop', 1);
            $ret['ad'] = $this->ad($ad_position_id, 5);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '商城分类ID错误');
		}
	}

	/**
	 * @api {get} /api/shop/goods 商城-更多商品
	 * @apiVersion 1.0.0
	 * @apiName shop_goods
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop/goods
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} goods_class_id 商城分类ID
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
		$goods_class_id = (int)$this->input->get_post('goods_class_id');
		$is_hot = (int)$this->input->get_post('is_hot');
		if($goods_class_id){
			$ret['goods'] = $this->_goods($goods_class_id);

			$this->ajaxReturn($ret);
		}elseif($is_hot){
			$ret['goods'] = $this->_goods(0, true);

			$this->ajaxReturn($ret);
		}else{
			$this->ajaxReturn([], 1, '商城分类ID错误');
		}
	}

	protected function _goods($goods_class_id, $is_hot = false)
	{
		$this->load->model('Goods_model');
		$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
		$where = ['enable' => 1];
		if($is_hot){
			$where['is_hot'] = 1;
		}else{
			$where['goods_class_id'] = $goods_class_id;
		}
		$this->db->select('id,default_image,name,sale_price,poster');
		if($this->keyword){
			$this->db->group_start();
			$this->db->like('name', $this->keyword);
			if(is_numeric($this->keyword)){
				$this->db->or_where('id', $this->keyword);
			}
			$this->db->group_end();
		}
		return $this->Goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
	}

	/**
	 * @api {get} /api/shop/pretty_index 商城-靓号首页
	 * @apiVersion 1.0.0
	 * @apiName shop_pretty_index
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop/pretty_index
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} pretty_count 靓号位数 0表示默认靓号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.ad 广告集
	 * @apiSuccess {Object[]} data.pretty 靓号列表
	 * @apiSuccess {Object[]} data.pretty_count 靓号位数
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "ad": [
	 *             {
	 *                 "title": "22",
	 *                 "link": "",
	 *                 "image": ""
	 *             },
	 *             {
	 *                 "title": "1",
	 *                 "link": "",
	 *                 "image": ""
	 *             }
	 *         ],
	 *         "pretty": [
	 *             {
	 *                 "id": "1",
	 *                 "pretty_id": "10000",
	 *                 "price": "5000.00"
	 *             }
	 *         ],
	 *         "pretty_count": [
	 *             {
	 *                 "pretty_count": "3"
	 *             },
	 *             {
	 *                 "pretty_count": "4"
	 *             },
	 *             {
	 *                 "pretty_count": "5"
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
	public function pretty_index()
	{
		$ret = array('ad' => array(), 'pretty' => array(), 'pretty_count' => array());
		$ad_position_id = 3;
        $ret['ad'] = $this->ad($ad_position_id, 2);

		$ret['pretty'] = $this->_pretty();

		$this->db->select('pretty_count');
		$this->db->group_by('pretty_count');
		$ret['pretty_count'] = $this->Pretty_model->get_all();

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/shop/pretty 商城-靓号其他
	 * @apiVersion 1.0.0
	 * @apiName shop_pretty
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop/pretty
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} pretty_count 靓号位数 0表示默认靓号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.pretty 靓号列表
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "pretty": [
	 *             {
	 *                 "id": "1",
	 *                 "pretty_id": "10000",
	 *                 "price": "5000.00"
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
	public function pretty()
	{
		$ret = array('pretty' => array());
		$ret['pretty'] = $this->_pretty();

		$this->ajaxReturn($ret);
	}

	protected function _pretty()
	{
		$pretty_count = (int)$this->input->get_post('pretty_count');

		$this->load->model('Pretty_model');
		$order_by = array('sort' => 'desc', 'updated_at' => 'desc');
		$where = array('enable' => 1, 'buyer_id' => 0);
		if($pretty_count){
			$where['pretty_count'] = $pretty_count;
		}else{
			$where['is_pretty'] = 1;
		}

		if($this->keyword){
			$this->db->group_start();
			$this->db->like('pretty_id', $this->keyword);
			$this->db->group_end();
		}
		$this->db->select('id,pretty_id,price,point');
		$cursor = $this->Pretty_model->order_by($order_by)->get_many_by($where);//->limit($this->per_page, $this->offset)
		$arrList = [];
		$this->load->model('Config_model');
		$config = $this->db->select('*')->where('name', 'point_to_price')->get($this->Config_model->table())->row_array();
		foreach($cursor as $k=>$v){
			$v['point'] = floor($v['price'] * $config['value']);
			$arrList[] = $v;
		}
		return $arrList;
	}
}
