<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Forget extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {post} /api/forget/mobi 忘记密码-手机号重设
	 * @apiVersion 1.0.0
	 * @apiName forget_mobi
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/forget/mobi
	 *
	 * @apiParam {String} mobi 注册手机
	 * @apiParam {String} code 验证码
	 * @apiParam {String} password 新密码
	 * @apiParam {String} confirm_password 确认密码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常 设置成功直接登录成功
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
	public function mobi()
	{
		$mobi = $this->input->get_post('mobi');
		$code = $this->input->get_post('code');
		$password = $this->input->get_post('password');
		$confirm_password = $this->input->get_post('confirm_password');
		if(!$mobi || !$code){
			$this->ajaxReturn([], 1, '手机号验证码参数错误');
		}
		if(!$password){
			$this->ajaxReturn([], 2, '请输入新密码');
		}
		if($password != $confirm_password){
			$this->ajaxReturn([], 2, '确认密码不一致');
		}

		$this->load->model('Users_model');
        $user = $this->Users_model->get_by('mobi', $mobi);
        if(!$user){
            $this->ajaxReturn([], 3, '手机号未注册');
        }

        $this->load->model('Sms_email_record_model');
		$info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
		if($info){
			if($info['verify'] == $code){
				if($this->Users_model->update($user['id'], array('password' => $this->Users_model->get_password($password)))){
					$this->user_login_success($user);
				}else{
					$this->ajaxReturn([], 6, '保存新密码失败');
				}
			}else{
				$this->ajaxReturn([], 5, '验证码错误');
			}
		}else{
			$this->ajaxReturn([], 4, '先获取短信验证码');
		}
	}
}
