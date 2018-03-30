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
        $this->load->model('Shop_model');
    }

    /**
	 * @api {get} /api/admin/shop 等级经验规则-列表
	 * @apiVersion 1.0.0
	 * @apiName shop
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/shop
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *			"grade_login": "50",
	 *			"grade_evaluate": "20"
	 *	   },
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
		$this->ajaxReturn($this->siteGradeRule());
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/shop/save 等级经验规则-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName shop_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/shop/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
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
		$this->check_operation();
		$id = (int)$this->input->get_post('id');
		$params = $this->input->post();
		$this->check_params('add', $params);

		$a_name = array_keys($params);
		$this->Shop_model->delete_by('name', $a_name);
		$data = array();
		foreach($params as $key=>$val){
			// list($value, $remark) = explode('###', $val);
			$data[] = array('name' => $key, 'value' => $val);
		}
		if($flag = $this->Shop_model->insert_many($data)){
			$id = $flag;
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn([], $status, '操作'.$message);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				break;
			case 'edit':
				break;
		}
	}
}
