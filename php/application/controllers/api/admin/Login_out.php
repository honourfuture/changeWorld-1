<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */
class Login_out extends Admin_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/admin/login_out 管理员退出
	 * @apiVersion 1.0.0
	 * @apiName login_out
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/login_out
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
	public function index()
	{
		$this->log($this->admin_id, $this->account, '退出');
		$this->ajaxReturn('');
	}
}
