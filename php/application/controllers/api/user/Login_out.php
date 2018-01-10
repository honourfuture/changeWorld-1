<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */
class Login_out extends WAP_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/user/login_out 用户退出
	 * @apiVersion 1.0.0
	 * @apiName login_out
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login_out
	 *
	 * @apiParam {Number} user_id 用户唯一ID
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
		$this->load->model('Users_token_model');
		$this->Users_token_model->delete_by('user_id', $this->user_id);
		$this->ajaxReturn('');
	}
}
