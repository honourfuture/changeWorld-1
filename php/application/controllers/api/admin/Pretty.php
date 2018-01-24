<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Pretty extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Pretty_model');
    }

    /**
	 * @api {get} /api/admin/pretty 靓号-列表
	 * @apiVersion 1.0.0
	 * @apiName pretty
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/pretty
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.pretty 靓号列表
	 * @apiSuccess {String} data.pretty.id 靓号序号
	 * @apiSuccess {String} data.pretty.created_at 靓号创建时间
	 * @apiSuccess {String} data.pretty.updated_at 靓号更新时间
	 * @apiSuccess {String} data.pretty.deleted 删除 0否 1是
	 * @apiSuccess {String} data.pretty.status 状态 0初始化 其他
	 * @apiSuccess {String} data.pretty.enable 启用 1是 0否
	 * @apiSuccess {String} data.pretty.sort 排序 降序
	 * @apiSuccess {String} data.pretty.pretty_id 靓号
	 * @apiSuccess {String} data.pretty.pretty_count 靓号位数
	 * @apiSuccess {String} data.pretty.price 价格
	 * @apiSuccess {String} data.pretty.buyer_id 购买用户ID 0表示未卖出 同用户字段序号
	 * @apiSuccess {String} data.pretty.is_pretty 是否靓号 0否 1是
	 * @apiSuccess {Object[]} data.user 靓号购买用户
	 * @apiSuccess {String} data.user.nickname 用户昵称
	 * @apiSuccess {String} data.user.header 用户头像
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
	 *         "pretty": {
	 *             "count": 1,
	 *             "list": [
	 *                 {
	 *                     "id": "1",
	 *                     "created_at": "2018-01-20 12:42:49",
	 *                     "updated_at": "2018-01-20 12:45:41",
	 *                     "deleted": "0",
	 *                     "status": "0",
	 *                     "enable": "1",
	 *                     "sort": "0",
	 *                     "pretty_id": "10000",
	 *                     "pretty_count": "5",
	 *                     "price": "5000.00",
	 *                     "buyer_id": "1",
	 *                     "is_pretty": "1"
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
		$ret = array('user' => array(), 'pretty' => array('count' => 0, 'list' => array()));

		$deleted = (int)$this->input->get('deleted');
		$where = array('deleted' => $deleted);
		$this->search();
		$ret['pretty']['count'] = $this->Pretty_model->count_by($where);
		if($ret['pretty']['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			$ret['pretty']['list'] = $this->Pretty_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_user = array();
			if($ret['pretty']['list']){
				foreach($ret['pretty']['list'] as $item){
					$item['buyer_id'] && $a_user[] = $item['buyer_id'];
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
		$pretty_id = $this->input->get_post('pretty_id');
		if(! empty($pretty_id)){
			$this->db->like('pretty_id', $pretty_id);
		}
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/pretty/save 靓号-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName pretty_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/pretty/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑(靓号禁止编辑)
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {String} pretty_id 靓号
	 * @apiParam {Number} price 价格
	 * @apiParam {Number} is_pretty 是否靓号 0否 1是
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
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
					'sort', 'price', 'is_pretty', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$info = $this->Pretty_model->get($id);
			if(!$info || $info['buyer_id']){
				$this->ajaxReturn('', 1, '已售卖靓号禁止编辑');
			}
			$this->check_params('edit', $params);
			$this->setPrettyInfo($params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Pretty_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Pretty_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'sort', 'pretty_id', 'price', 'is_pretty'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$this->setPrettyInfo($params);
			if($this->Pretty_model->get_by('pretty_id', $params['pretty_id'])){
				$this->ajaxReturn('', 1, '靓号已存在请勿重复提交');
			}
			if($flag = $this->Pretty_model->insert($params)){
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

	protected function setPrettyInfo(&$params = array())
	{
		isset($params['pretty_id']) && $params['pretty_count'] = strlen($params['pretty_id']);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['pretty_id'] === '' || $params['pretty_id'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '输入靓号');
				}
				if($params['price'] === '' || $params['price'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '输入价格');
				}
				break;
			case 'edit':
				break;
		}
	}
}
