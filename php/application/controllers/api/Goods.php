<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Goods extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Goods_model');
    }

    /**
	 * @api {get} /api/goods 商品-列表
	 * @apiVersion 1.0.0
	 * @apiName goods
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/goods
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 商品唯一ID
	 * @apiSuccess {String} data.created_at 创建时间
	 * @apiSuccess {String} data.updated_at 更新时间
	 * @apiSuccess {String} data.status 状态 0初始化 1下架 其他
	 * @apiSuccess {String} data.enable 启用 1是 0否
	 * @apiSuccess {String} data.sort 排序 降序
	 * @apiSuccess {String} data.name 商品名称
	 * @apiSuccess {String} data.stock 库存
	 * @apiSuccess {String} data.sale_price 销售价
	 * @apiSuccess {String} data.freight_fee 邮费
	 * @apiSuccess {String} data.send_mode 发货模式
	 * @apiSuccess {String} data.use_point_rate 最大积分使用量
	 * @apiSuccess {String} data.e_invoice 支持电子发票 0否 1是
	 * @apiSuccess {String} data.city_partner_rate 城市合伙人分销比例
	 * @apiSuccess {String} data.goods_detail 商品详情
	 * @apiSuccess {String} data.goods_image 商品主图
	 * @apiSuccess {String} data.goods_attr 商品属性
	 * @apiSuccess {String} data.goods_ticket 优惠券
	 * @apiSuccess {String} data.shop_class_id 商品分类ID
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": [
	 *       {
	 *           "id": "2",
	 *           "created_at": "2018-01-18 16:44:33",
	 *           "updated_at": "2018-01-18 16:44:33",
	 *           "deleted": "0",
	 *           "status": "0",
	 *           "enable": "1",
	 *           "sort": "0",
	 *           "name": "商品名称",
	 *           "stock": "1999",
	 *           "original_price": "55.00",
	 *           "sale_price": "55.00",
	 *           "freight_fee": "6.00",
	 *           "send_mode": "1",
	 *           "use_point_rate": "100.00",
	 *           "e_invoice": "0",
	 *           "city_partner_rate": "0.00",
	 *            "two_level_rate": "0.00",
	 *            "goods_detail": "[]",
	 *            "seller_uid": "1",
	 *            "goods_image": "[\"/uploads/2018/01/18/f619795f7f2eb345645a67f7a7df4b78.png\"]",
	 *            "goods_attr": "{}",
	 *            "goods_ticket": "[{\"full_amount\":\"66\",\"free_amount\":\"3\"}]",
	 *            "default_image": "/uploads/2018/01/18/f619795f7f2eb345645a67f7a7df4b78.png",
	 *            "shop_class_id": "0"
	 *        }
	 *    ],
	 *    "status": 0,
	 *    "message": "成功"
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
		$deleted = (int)$this->input->get('deleted');
		$where = array('deleted' => $deleted);
		if($this->user_id){
			$where['seller_uid'] = $this->user_id;
		}
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret = $this->Goods_model->order_by($order_by)->get_many_by($where);
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/goods/init 商品-发布初始化
	 * @apiVersion 1.0.0
	 * @apiName goods_init
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/goods/init
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.send_mode 发货模式
	 * @apiSuccess {String} data.goods_attr 商品属性
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *        "send_mode": [
	 *            "卖家发货",
	 *            "上门自提",
	 *            "不用发货"
	 *        ],
	 *        "goods_attr": [
	 *            {
	 *                "id": "9",
	 *                "name": "尺寸"
	 *            },
	 *            {
	 *                "id": "8",
	 *                "name": "颜色"
	 *            },
	 *            {
	 *                "id": "7",
	 *                "name": "容量"
	 *            },
	 *            {
	 *                "id": "6",
	 *                "name": "尺寸"
	 *            },
	 *            {
	 *                "id": "5",
	 *                "name": "型号"
	 *            },
	 *            {
	 *                "id": "4",
	 *                "name": "规格"
	 *            }
	 *        ]
	 *    },
	 *    "status": 0,
	 *    "message": "成功"
	 * }
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function init()
	{
		$ret = array();
		//发货模式
		$ret['send_mode'] = $this->Goods_model->init_send_mode();
		//商品属性
		$this->load->model('Goods_attr_category_model');
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$this->db->select('id,name');
		$ret['goods_attr'] = $this->Goods_attr_category_model->order_by($order_by)->get_many_by('deleted', 0);
		//积分兑换比例
		$ret['point_rate'] = 10;

		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/goods/save 商品-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName goods_save
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/goods/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} name 产品名称
	 * @apiParam {Number} stock 数量
	 * @apiParam {Number} sale_price 销售价
	 * @apiParam {Number} freight_fee 邮费
	 * @apiParam {Number} send_mode 发货模式
	 * @apiParam {String} goods_ticket 优惠券 json [{full_amount: 500, free_amount: 50}, {full_amount: 1000, free_amount: 150}]
	 * @apiParam {Number} use_point_rate 最大积分使用量
	 * @apiParam {Number} e_invoice 是否支持发票
	 * @apiParam {Number} city_partner_rate 城市合伙人分销比例
	 * @apiParam {Number} two_level_rate 二级分销比例
	 * @apiParam {String} goods_image 商品主图 json ["\/uploads\/2018\/01\/17\/09c4a26e54ab231b734870b510771265.png"]
	 * @apiParam {String} goods_attr 商品属性 json {"9":["M","X","S","L"],"8":["红色","蓝色"]}
	 * @apiParam {String} goods_detail 商品详情 json ["\/uploads\/2018\/01\/17\/09c4a26e54ab231b734870b510771265.png"]
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} shop_class_id 商品分类ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
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
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'name', 'stock', 'sale_price', 'freight_fee', 'send_mode',
					'goods_ticket', 'use_point_rate', 'e_invoice', 'city_partner_rate', 'two_level_rate',
					'goods_image', 'goods_attr', 'goods_detail', 'deleted', 'enable', 'sort', 'shop_class_id'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Goods_model->update_by(array('seller_uid' => $this->user_id, 'id' => $id), $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable'])){
					$params['deleted'] = 0;
					if($params['enable']){
						$params['status'] = 0;
					}else{
						$params['status'] = 1;
					}
				}
				$this->setGoodsInfo($params);
				$flag = $this->Goods_model->update_by(array('seller_uid' => $this->user_id, 'id' => $id), $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'stock', 'sale_price', 'freight_fee', 'send_mode',
					'goods_ticket', 'use_point_rate', 'e_invoice', 'city_partner_rate', 'two_level_rate',
					'goods_image', 'goods_attr', 'goods_detail'
				),
				$this->input->post(),
				''
			);
			$this->check_params('add', $params);
			$this->setGoodsInfo($params);
			$params['seller_uid'] = $this->user_id;
			if($flag = $this->Goods_model->insert($params)){
				$id = $flag;
			}
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
	}

	protected function setGoodsInfo(&$params = array())
	{
		if($params['sale_price'] !== '' || $params['sale_price'] != UPDATE_VALID){
			$params['original_price'] = $params['sale_price'];
		}
		if($params['goods_image'] !== '' || $params['goods_image'] != UPDATE_VALID){
			$goods_image = json_decode($params['goods_image'], true);
			$params['default_image'] = $goods_image[0];
		}
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['name'] === '' || $params['name'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '输入产品名称');
				}
				if($params['stock'] === '' || $params['stock'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '输入产品数量');
				}
				if($params['sale_price'] === '' || $params['sale_price'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '输入产品销售价');
				}
				if($params['goods_image'] === '' || !$goods_image = json_decode($params['goods_image'])){
					$this->ajaxReturn('', 501, '上传产品主图');
				}
				if($params['goods_detail'] === '' || $params['goods_detail'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '输入产品详情');
				}
				break;
			case 'edit':
				break;
		}
	}
}
