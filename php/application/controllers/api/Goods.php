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

    public function top()
    {
    	$id = (int)$this->input->get_post('id');
    	if($max = $this->Goods_model->order_by('sort', 'desc')->get_by(['seller_uid' => $this->user_id])){
    		if($row = $this->Goods_model->get($id)){
    			if($row['seller_uid'] == $this->user_id){
    				$this->Goods_model->update($id, ['sort' => $max['sort'] + 1]);
    			}
    		}
    	}

    	$this->ajaxReturn();
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
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.user 发布用户
	 * @apiSuccess {String} data.user.nickname 用户昵称
	 * @apiSuccess {String} data.user.header 用户头像
	 * @apiSuccess {Object} data.goods 商品
	 * @apiSuccess {Number} data.goods.count 商品总数
	 * @apiSuccess {Object[]} data.goods.list 商品列表
	 * @apiSuccess {String} data.goods.list.id 商品唯一ID
	 * @apiSuccess {String} data.goods.list.created_at 创建时间
	 * @apiSuccess {String} data.goods.list.updated_at 更新时间
	 * @apiSuccess {String} data.goods.list.status 状态 0初始化 1下架 其他
	 * @apiSuccess {String} data.goods.list.enable 启用 1是 0否
	 * @apiSuccess {String} data.goods.list.sort 排序 降序
	 * @apiSuccess {String} data.goods.list.name 商品名称
	 * @apiSuccess {String} data.goods.list.stock 库存
	 * @apiSuccess {String} data.goods.list.sale_price 销售价
	 * @apiSuccess {String} data.goods.list.freight_fee 邮费
	 * @apiSuccess {String} data.goods.list.send_mode 发货模式
	 * @apiSuccess {String} data.goods.list.use_point_rate 最大积分使用量
	 * @apiSuccess {String} data.goods.list.e_invoice 支持电子发票 0否 1是
	 * @apiSuccess {String} data.goods.list.city_partner_rate 城市合伙人分销比例
	 * @apiSuccess {String} data.goods.list.goods_detail 商品详情
	 * @apiSuccess {String} data.goods.list.goods_image 商品主图
	 * @apiSuccess {String} data.goods.list.goods_attr 商品属性
	 * @apiSuccess {String} data.goods.list.goods_ticket 优惠券
	 * @apiSuccess {String} data.goods.list.goods_class_id 商品分类ID
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "user": {
	 *             "1": {
	 *                 "nickname": "aicode",
	 *                 "header": ""
	 *             }
	 *         },
	 *         "goods": {
	 *             "count": 2,
	 *             "list": [
	 *                 {
	 *                     "id": "1",
	 *                     "created_at": "2018-01-18 15:56:27",
	 *                     "updated_at": "2018-01-18 15:56:27",
	 *                     "deleted": "0",
	 *                     "status": "0",
	 *                     "enable": "1",
	 *                     "sort": "0",
	 *                     "name": "测试商品",
	 *                     "stock": "1000",
	 *                     "original_price": "198.00",
	 *                     "sale_price": "198.00",
	 *                     "freight_fee": "6.00",
	 *                     "send_mode": "1",
	 *                     "use_point_rate": "1.00",
	 *                     "e_invoice": "1",
	 *                     "city_partner_rate": "2.00",
	 *                     "two_level_rate": "3.00",
	 *                     "goods_detail": "[\"/uploads/2018/01/18/2ea459123697d30c36a707e155dc23da.png\"]",
	 *                     "seller_uid": "1",
	 *                     "goods_image": "[\"/uploads/2018/01/18/3e14d5652673b8a225d4772f13441ab1.jpeg\"]",
	 *                     "goods_attr": "{\"6\":[\"XL\",\"L\"],\"8\":[\"白色\",\"绿色\"]}",
	 *                     "goods_ticket": "[{\"full_amount\":\"100\",\"free_amount\":\"6\"}]",
	 *                     "default_image": "/uploads/2018/01/18/3e14d5652673b8a225d4772f13441ab1.jpeg",
	 *                     "goods_class_id": "0"
	 *                 }
	 *             ]
	 *         }
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
		$ret = array('user' => array(), 'goods' => array('count' => 0, 'list' => array()));

		$deleted = (int)$this->input->get('deleted');
		$where = array('deleted' => $deleted);
		if($this->user_id){
			$where['seller_uid'] = $this->user_id;
		}
		$this->search();
		$ret['goods']['count'] = $this->Goods_model->count_by($where);
		if($ret['goods']['count']){
			$order_by = array('updated_at' => 'desc', 'id' => 'desc');
			if($this->user_id){
				$order_by = array_merge(['sort' => 'desc'], $order_by);
			}
			$this->search();
			$ret['goods']['list'] = $this->Goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_user = array();
			if($ret['goods']['list']){
				foreach($ret['goods']['list'] as $item){
					$item['seller_uid'] && $a_user[] = $item['seller_uid'];
				}
			}
			if($a_user){
				$this->load->model('Users_model');
				$ret['user'] = $this->Users_model->get_many_user($a_user);
			}
		}
		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$name = $this->input->get_post('name');
		if(! empty($name)){
			$this->db->like('name', $name);
		}

		$goods_class_id = $this->input->get_post('goods_class_id');
		if(! empty($goods_class_id)){
			$this->db->like('goods_class_id', $goods_class_id);
		}
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
		$rule = $this->sitePointsRule();
		$rate = isset($rule['goods_exchange']) ? $rule['goods_exchange'] : 0;
		$ret['point_rate'] = $rate;

		$this->load->model('Goods_class_model');
		$this->db->select('id,name');
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret['goods_class'] = $this->Goods_class_model->order_by($order_by)->get_many_by('deleted', 0);

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/goods/view 商品-详情
	 * @apiVersion 1.0.0
	 * @apiName goods_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/goods/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} goods_id 商品ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.goods_info 商品详情
	 * @apiSuccess {Object} data.goods_attr 商品属性
	 * @apiSuccess {Object} data.evaluate 评论
	 * @apiSuccess {Object} data.seller 商家信息
	 * @apiSuccess {Object} data.goods 商家其他商品
	 * @apiSuccess {Object} data.favorite 商品收藏 1已收藏 0未收藏
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
	public function view()
	{
		$ret = array();

		//积分抵扣金额
		$rule = $this->sitePointsRule();
		$rate = isset($rule['goods_exchange']) ? $rule['goods_exchange'] : 0;
		$ret['rate'] = $rate * 0.01;

		$this->load->model('Config_model');
		$siteConfig = $this->Config_model->siteConfig();
		$ret['goods_explain'] = isset($siteConfig['goods_explain']) ? $siteConfig['goods_explain'] : '';

		//详情
		$goods_id = $this->input->get_post('goods_id');
		$info = $this->Goods_model->get($goods_id);
		if(!$info['enable']){
			if($info['deleted']){
				$this->ajaxReturn([], 1, '商品已删除');
			}else{
				$this->ajaxReturn([], 2, '商品已下架');
			}
		}
		$ret['goods_info'] = $info;

		//属性
		$this->load->model('Goods_attr_category_model');
		$ret['goods_attr'] = $this->Goods_attr_category_model->array_keys_value();

		//评价
		$this->load->model('Order_items_model');
		$ret['evaluate'] = $this->Order_items_model->getGoodsEvaluate($goods_id, 5);

		//店家
		$this->load->model('Users_model');
		$this->db->select('nickname,v,header,summary,address,reward_point');
		$ret['seller'] = $this->Users_model->get($info['seller_uid']);
		if(!$ret['seller']){
            $ret['seller'] = [];
        }
		//在售商品
		$ret['goods'] = array('total' => 0, 'list' => array());
		$where = array('enable' => 1, 'seller_uid' => $info['seller_uid']);
		$ret['goods']['total'] = $this->Goods_model->count_by($where);
		$order_by = array('updated_at' => 'desc', 'id' => 'desc');
		$this->db->select('id,name,sale_price,default_image,rebate_percent,guarantee,buy_notice');
		$ret['goods']['list'] = $this->Goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

		//收藏状态
		$this->load->model('Users_collection_model');
		$ret['favorite'] = $this->Users_collection_model->check_favorite($this->user_id, $goods_id, 40);

		//月销量
		/*$this->db->select('sum(num) as total');
		$order_items = $this->Order_items_model->get_by(['goods_id' => $goods_id, 'created_time >' => strtotime('-30 days')]);
		$ret['sale_num'] = ($order_items && $order_items['total']) ? $order_items['total'] : 0;*/
		$this->load->model('Record_goods_model');
		$this->db->select('sum(num) as total');
		$order_items = $this->Record_goods_model->get_by(['goods_id' => $goods_id, 'created_at >' => date("Y-m-d H:i:s", strtotime('-30 days'))]);
		$ret['sale_num'] = ($order_items && $order_items['total']) ? $order_items['total'] : 0;

		/**
		 * 获得收益情况(base_percent&rebate_percent)
		 */
		$this->load->model('Income_model');
		$this->load->model('Users_model');
		$arrIncomeRate = $this->Income_model->getIncomeRate();
		//自购比例
		$underPercent = $arrIncomeRate['underPercent'];
		$user = $this->Users_model->get($this->user_id);
		$ret['switcher_income'] = empty($info['base_percent']) ? 0 : 1;
		$ret['max_income'] = floor($info['sale_price'] * $underPercent[$user['rank_rule_id']] * $info['rebate_percent'] / 100);
		$ret['min_income'] = floor($info['sale_price'] * $underPercent[$user['rank_rule_id']] * $info['base_percent'] / 100);

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/goods/evaluate 商品-更多评论
	 * @apiVersion 1.0.0
	 * @apiName goods_evaluate
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/goods/evaluate
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} goods_id 商品ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",evaluate
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
	public function evaluate()
	{
		$goods_id = $this->input->get_post('goods_id');
		//评价
		$this->load->model('Order_items_model');
		$ret = $this->Order_items_model->getGoodsEvaluate($goods_id, $this->per_page, $this->offset);

		$this->ajaxReturn($ret);
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
	 * @apiParam {Number} goods_class_id 商品分类ID
	 * @apiParam {Number} is_hot 是否热门 0否 1是
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
					'goods_image', 'goods_attr', 'goods_detail', 'deleted', 'enable', 'sort', 'goods_class_id',
					'is_hot','rebate_percent','base_percent', 'guarantee', 'buy_notice','poster_img'
				),
				$this->input->post(),
				UPDATE_VALID
			);
            $this->check_params('edit', $params);
			$where = array('seller_uid' => $this->user_id, 'id' => $id);
			if($this->admin_id){
				unset($where['seller_uid']);
			}
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Goods_model->update_by($where, $update);
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
				$flag = $this->Goods_model->update_by($where, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'stock', 'sale_price', 'freight_fee', 'send_mode',
					'goods_ticket', 'use_point_rate', 'e_invoice', 'city_partner_rate', 'two_level_rate',
					'goods_image', 'goods_attr', 'goods_detail', 'is_hot', 'goods_class_id','rebate_percent','base_percent',
                    'guarantee', 'buy_notice','poster_img'
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
        if($params['poster_img'] !== '' || $params['poster_img'] != UPDATE_VALID){
            $goods_image = json_decode($params['poster_img'], true);
            $params['poster'] = $goods_image[0];
        }



    }

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['name'] === '' || $params['name'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入产品名称');
				}
				if($params['stock'] === '' || $params['stock'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入产品数量');
				}
				if($params['sale_price'] === '' || $params['sale_price'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入产品销售价');
				}
				if($params['goods_image'] === '' || !$goods_image = json_decode($params['goods_image'])){
					$this->ajaxReturn([], 501, '上传产品主图');
				}
				if($params['goods_detail'] === '' || $params['goods_detail'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入产品详情');
				}
                if($params['rebate_percent'] > 90){
                    $this->ajaxReturn([], 501, '最高让利率上限为90');
                }
				break;
			case 'edit':
                if($params['rebate_percent'] > 90){
                    $this->ajaxReturn([], 501, '最高让利率上限为90');
                }
				break;
		}
	}
}
