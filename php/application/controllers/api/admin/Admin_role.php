<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Admin_role extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Admin_role_model');
    }

    /**
	 * @api {get} /api/admin/admin_role 管理员角色-列表
	 * @apiVersion 1.0.0
	 * @apiName admin_role
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin_role
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 管理员角色唯一ID
	 * @apiSuccess {String} data.name 管理员角色名称
	 * @apiSuccess {String} data.size 管理员角色尺寸
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
		$deleted = (int)$this->input->get('deleted');
		$order_by = array('id' => 'desc');
		$list = $this->Admin_role_model->order_by($order_by)->get_many_by('deleted', $deleted);

		$ret = $list ? $list : [];
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/admin_role/save 管理员角色-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName admin_role_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin_role/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} name 管理员角色名称
	 * @apiParam {String} remark 管理员角色备注
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
					'deleted', 'enable',
					'name', 'remark'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Admin_role_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Admin_role_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'remark'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Admin_role_model->insert($params)){
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
				if($params['name'] === '' || $params['name'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '名称参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}

	/**
	 * @api {post} /api/admin/admin_role/access 管理员角色-权限设置
	 * @apiVersion 1.0.0
	 * @apiName admin_role_access
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin_role/access
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID
	 * @apiParam {String} access 权限集 json
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
	public function access()
	{
		$params = elements(
			array(
				'id', 'access'
			),
			$this->input->post(),
			''
		);
		if(!$role = $this->Admin_role_model->get($params['id'])){
			$this->ajaxReturn([], 1, '角色ID错误');
		}

		if($this->Admin_role_model->update($role['id'], ['access' => $params['access']])){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '保存角色权限失败');
		}
	}
}
