<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Login extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/login 用户登录
	 * @apiVersion 1.0.0
	 * @apiName login
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login
	 *
	 * @apiParam {String} account 登录手机/账号
	 * @apiParam {String} password 登录密码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.auth 接口认证信息
	 * @apiSuccess {String} data.auth.user_id 用户唯一ID
	 * @apiSuccess {String} data.auth.sign 接口签名
	 * @apiSuccess {String} data.updated_at 最后登录时间
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.header 用户头像
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "auth": {
	 *	            "user_id": "1",
	 *	            "sign": "ad8550bf1d589f5213a1b13ba051c376",
	 *	        },
	 *	        "updated_at": "2018-01-08 16:03:47",
	 *	        "nickname": "aicode",
	 *	        "header": ""
	 *	    },
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": 3,
	 *     "message": "登录密码错误"
	 * }
	 */
	public function index()
	{
		$account = $this->input->get_post('account');
		$password = $this->input->get_post('password');
		if(!$account || !$password){
			$this->ajaxReturn('', 1, '登录参数非法');
		}
		$this->load->model('Users_model');
		//手机号 or 账号
		$info = $this->Users_model->get_by('account', $account);
		!$info && $info = $this->Users_model->get_by('mobi', $account);
		if($info){
			if($info['password'] == $this->Users_model->get_password($password)){
				$this->check_status($info);
			}else{
				$this->ajaxReturn('', 3, '登录密码错误');
			}
		}else{
			$this->ajaxReturn('', 2, '登录账号错误');
		}
	}

    /**
	 * @api {get} /api/user/login/qq QQ登录
	 * @apiVersion 1.0.0
	 * @apiName login_qq
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login/qq
	 *
	 * @apiParam {String} account 唯一登录账号
	 * @apiParam {String} password 登录密码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.auth 接口认证信息
	 * @apiSuccess {String} data.auth.user_id 用户唯一ID
	 * @apiSuccess {String} data.auth.sign 接口签名
	 * @apiSuccess {String} data.updated_at 最后登录时间
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.header 用户头像
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "auth": {
	 *	            "user_id": "1",
	 *	            "sign": "ad8550bf1d589f5213a1b13ba051c376",
	 *	        },
	 *	        "updated_at": "2018-01-08 16:03:47",
	 *	        "nickname": "aicode",
	 *	        "header": ""
	 *	    },
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": 3,
	 *     "message": "登录密码错误"
	 * }
	 */
    public function qq()
    {
    	$guid = $this->input->get_post('guid');
		if(!$guid){
			$this->ajaxReturn('', 1, 'QQ登录参数非法');
		}
		$this->load->model('Users_model');
		$info = $this->Users_model->get_by('qq_uid', $guid);
		if($info){
			$this->check_status($info);
		}else{//注册
			$this->user_reg(array('guid' => $guid));
		}
    }

    /**
	 * @api {get} /api/user/login/weixin 微信登录
	 * @apiVersion 1.0.0
	 * @apiName login_weixin
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login/weixin
	 *
	 * @apiParam {String} account 唯一登录账号
	 * @apiParam {String} password 登录密码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.auth 接口认证信息
	 * @apiSuccess {String} data.auth.user_id 用户唯一ID
	 * @apiSuccess {String} data.auth.sign 接口签名
	 * @apiSuccess {String} data.updated_at 最后登录时间
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.header 用户头像
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "auth": {
	 *	            "user_id": "1",
	 *	            "sign": "ad8550bf1d589f5213a1b13ba051c376",
	 *	        },
	 *	        "updated_at": "2018-01-08 16:03:47",
	 *	        "nickname": "aicode",
	 *	        "header": ""
	 *	    },
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": 3,
	 *     "message": "登录密码错误"
	 * }
	 */
    public function weixin()
    {
    	$guid = $this->input->get_post('guid');
		if(!$guid){
			$this->ajaxReturn('', 1, '微信登录参数非法');
		}
		$this->load->model('Users_model');
		$info = $this->Users_model->get_by('weixin_uid', $guid);
		if($info){
			$this->check_status($info);
		}else{//注册
			$this->user_reg(array('guid' => $guid));
		}
    }

    /**
	 * @api {get} /api/user/login/tourist 匿名登录
	 * @apiVersion 1.0.0
	 * @apiName login_tourist
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login/tourist
	 *
	 * @apiParam {String} guid 设备唯一码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.auth 接口认证信息
	 * @apiSuccess {String} data.auth.user_id 用户唯一ID
	 * @apiSuccess {String} data.auth.sign 接口签名
	 * @apiSuccess {String} data.updated_at 最后登录时间
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.header 用户头像
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "auth": {
	 *	            "user_id": "1",
	 *	            "sign": "ad8550bf1d589f5213a1b13ba051c376",
	 *	        },
	 *	        "updated_at": "2018-01-08 16:03:47",
	 *	        "nickname": "匿名",
	 *	        "header": ""
	 *	    },
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": 1,
	 *     "message": "匿名登录参数非法"
	 * }
	 */
    public function tourist()
    {
    	$guid = $this->input->get_post('guid');
		if(!$guid){
			$this->ajaxReturn('', 1, '匿名登录参数非法');
		}
		$this->load->model('Users_model');
		$info = $this->Users_model->get_by('tourist_uid', $guid);
		if($info){
			$this->check_status($info);
		}else{//注册
			$this->user_reg(array('guid' => $guid));
		}
    }

    protected function check_status($info = array())
    {
    	if($info['enable']){
			$this->user_login_success($info);
		}else{
			if($info['deleted']){
				$this->ajaxReturn('', 4, '账号已删除');
			}else{
				$this->ajaxReturn('', 5, '账号被冻结');
			}
		}
    }
}
