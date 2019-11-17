<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Change_bind extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {post} /api/change_bind 修改绑定-手机号重新绑定
	 * @apiVersion 1.0.0
	 * @apiName change_bind
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/change_bind
	 *
	 * @apiParam {String} code 验证码
	 * @apiParam {String} phone 新手机号码
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
	 *	    "data": [],
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": 4,
	 *     "message": "先获取短信验证码"
	 * }
	 */
	public function index()
	{
        $mobi = $this->input->get_post('phone');
		$code = $this->input->get_post('code');

		if(!$mobi || !$code){
			$this->ajaxReturn([], 1, '手机号验证码参数错误');
		}

		$this->load->model('Users_model');
        $user = $this->Users_model->get_by('mobi', $mobi);
        if($user){
            $this->ajaxReturn([], 3, '手机号已被注册');
        }

        $this->load->model('Sms_email_record_model');
		$info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
		if($info){
			if($info['verify'] == $code){
				if($this->Users_model->update($user['id'], array('mobi' => $mobi))){
					$this->user_login_success($user);
				}else{
					$this->ajaxReturn([], 6, '更换绑定失败');
				}
			}else{
				$this->ajaxReturn([], 5, '验证码错误');
			}
		}else{
			$this->ajaxReturn([], 4, '先获取短信验证码');
		}
	}
}
