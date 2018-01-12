<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Shop_class extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Shop_class_model');
    }

    /**
	 * @api {get} /api/shop_class 商城导航类-列表
	 * @apiVersion 1.0.0
	 * @apiName shop_class
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/shop_class
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 商城导航类唯一ID
	 * @apiSuccess {String} data.name 商城导航类名称
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
	public function index()
	{
		$this->db->select('id,name');
		$order_by = array('sort' => 'asc', 'id' => 'asc');
		$ret = $this->Shop_class_model->order_by($order_by)->get_many_by('enable', 1);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/shop_class/save 商城导航类-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName shop_class_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/shop_class/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} name 导航类名称
	 * @apiParam {Number} sort 排序 数值小在前
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
					'name', 'sort', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params($params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Shop_class_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Shop_class_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'sort'
				),
				$this->input->post(),
				''
			);
			$this->check_params($params);
			$flag = $this->Shop_class_model->insert($params);
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn('', $status, '操作'.$message);
	}

	protected function check_params($params)
	{
		if(!isset($params['name']) || empty($params['name']) || $params['name'] == UPDATE_VALID){
			$this->ajaxReturn('', 501, '名称参数错误');
		}
	}
}
