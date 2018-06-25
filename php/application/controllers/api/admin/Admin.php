<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Admin extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Admin_model');
    }

    /**
	 * @api {get} /api/admin/admin/access 管理员-权限
	 * @apiVersion 1.0.0
	 * @apiName admin_access
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin/access
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "name": "热门",
	 				"size": "300 X 400",
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "name": "靓号",
	 *	            "size": "300 X 400",
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
	public function access()
	{
		if(!$admin = $this->Admin_model->get($this->admin_id)){
			$this->ajaxReturn([], LOGIN_STATUS, '管理员身份ID错误');
		}

		$access = ['is_root' => $admin['is_root'], 'access' => []];
		if($admin['role_id']){
			$this->load->model('Admin_role_model');
			if($role = $this->Admin_role_model->get($admin['role_id'])){
				$access['access'] = $role;
			}
		}
		$this->ajaxReturn($access);
	}

    /**
	 * @api {get} /api/admin/admin 管理员-列表
	 * @apiVersion 1.0.0
	 * @apiName admin
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "name": "热门",
	 				"size": "300 X 400",
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "name": "靓号",
	 *	            "size": "300 X 400",
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
	public function index()
	{
		$ret = array('role' => array(), 'count' => 0, 'list' => array());
		$this->load->model('Admin_role_model');
		$order_by = array('id' => 'desc');
		$ret['role'] = $this->Admin_role_model->order_by($order_by)->get_many_by('deleted', 0);

		$deleted = (int)$this->input->get('deleted');
		$where = array('deleted' => $deleted);
		$this->search();
		$ret['count'] = $this->Admin_model->count_by($where);
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$this->search();
			if($list = $this->Admin_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
				$ret['list'] = $list;
			}
		}
		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$title = $this->input->get_post('title');
		if(! empty($title)){
			$this->db->like('account', $title);
		}
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/admin/save 管理员-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName admin_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} login_account 登录账号
	 * @apiParam {String} password 登录密码
	 * @apiParam {Number} header 头像
	 * @apiParam {Number} role_id 角色ID
	 * @apiParam {Number} remark 备注
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
			if(! $admin = $this->Admin_model->get($id)){
				$this->ajaxReturn([], 1, '管理员ID错误');
			}
			$params = elements(
				array(
					'deleted', 'status', 'enable',
					'login_account', 'password', 'header', 'role_id', 'remark'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['password'] === '' || $params['password'] == UPDATE_VALID){
				unset($params['password']);
			}else{
				$params['password'] = $this->Admin_model->get_password($params['password']);
			}
			$params['account'] = $params['login_account'];unset($params['login_account']);

			if($info = $this->Admin_model->get_by(['account' => $params['account']])){
				if($info['id'] != $id){
					$this->ajaxReturn([], 501, '账号已存在');
				}
			}

			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Admin_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Admin_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'login_account', 'password', 'header', 'role_id', 'remark'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$params['password'] = $this->Admin_model->get_password($params['password']);
			$params['account'] = $params['login_account'];unset($params['login_account']);
			if($flag = $this->Admin_model->insert($params)){
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

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['login_account'] === '' || $params['login_account'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '登录账号必填');
				}
				if($this->Admin_model->get_by(['account' => $params['login_account']])){
					$this->ajaxReturn([], 501, '账号已存在');
				}
				if($params['password'] === '' || $params['password'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '登录密码必填');
				}
				break;
			case 'edit':
				break;
		}
	}
}
