<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Register extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {post} /api/user/register 注册-校验手机
	 * @apiVersion 1.0.0
	 * @apiName register
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/register
	 *
	 * @apiParam {String} mobi 注册手机
	 * @apiParam {String} code 验证码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
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
	 *     "status": 3,
	 *     "message": "登录密码错误"
	 * }
	 */
	public function index()
	{
		$this->step(1);
	}

	protected function step($step)
	{
		$mobi = $this->input->get_post('mobi');
		$code = $this->input->get_post('code');
		if(!$mobi || !$code){
			$this->ajaxReturn('', 1, '手机号注册参数错误');
		}

		$this->load->model('Users_model');
        $user = $this->Users_model->get_by('mobi', $mobi);
        if($user){
            $this->ajaxReturn('', 2, '手机号已被注册');
        }

        $this->load->model('Sms_email_record_model');
		$info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
		if($info){
			if($info['verify'] == $code){
				if($step == 1){
					$this->ajaxReturn();
				}elseif($step == 2){
					$account = $this->input->get_post('account');
					$password = $this->input->get_post('password');
					$confirm_password = $this->input->get_post('confirm_password');
					if(!$password){
						$this->ajaxReturn('', 4, '请输入密码');
					}
					if($password != $confirm_password){
						$this->ajaxReturn('', 5, '确认密码不一致');
					}
					$user = $this->Users_model->get_by('account', $account);
			        if($user){
			            $this->ajaxReturn('', 6, '账号已被注册');
			        }
					$this->user_reg(array('mobi' => $mobi, 'account' => $account, 'password' => $password));
				}
			}else{
				$this->ajaxReturn('', 4, '验证码错误');
			}
		}else{
			$this->ajaxReturn('', 3, '先获取验证码注册');
		}
	}

	/**
	 * @api {get} /api/user/register/account 注册-完善账号
	 * @apiVersion 1.0.0
	 * @apiName register_account
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/register/account
	 *
	 * @apiParam {String} mobi 注册手机
	 * @apiParam {String} code 验证码
	 * @apiParam {String} account 账号
	 * @apiParam {String} password 密码
	 * @apiParam {String} confirm_password 确认密码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.auth 接口认证信息
	 * @apiSuccess {String} data.auth.user_id 用户唯一ID
	 * @apiSuccess {String} data.auth.sign 接口签名
	 * @apiSuccess {String} data.updated_at 最后登录时间
	 * @apiSuccess {String} data.nickname 用户账号
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
	 *	        "nickname": "13430332489",
	 *	        "header": ""
	 *	    },
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": 3,
	 *     "message": "登录密码错误"
	 * }
	 */
	public function account()
	{
		$this->step(2);
	}
}
