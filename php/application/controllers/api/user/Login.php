<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends WAP_Controller {

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
	 * @apiSuccess {String} data.account 用户账号
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
	 *	        "account": "aicode",
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
	public function index()
	{
		$account = $this->input->get_post('account');
		$password = $this->input->get_post('password');
		if(!$account || !$password){
			$this->ajaxReturn('', 1, '登录参数非法');
		}
		$this->load->model('Users_model');
		$info = $this->Users_model->get_by('account', $account);
		if($info){
			if($info['password'] == $this->Users_model->get_password($password)){
				if($info['enable']){
					$this->login_success($info);
				}else{
					if($info['deleted']){
						$this->ajaxReturn('', 4, '账号已删除');
					}else{
						$this->ajaxReturn('', 5, '账号被冻结');
					}
				}
			}else{
				$this->ajaxReturn('', 3, '登录密码错误');
			}
		}else{
			$this->ajaxReturn('', 2, '登录账号错误');
		}
	}

	protected function login_success($user_info)
    {
        $this->user_id = $user_info['id'];
        $token = $this->set_token();
        if(empty($token)){
        	$this->ajaxReturn('', 6, '获取授权token失败');
        }
        $sign = $this->get_sign($token);

        $ret = array(
        	'auth' => array('user_id' => $this->user_id, 'sign' => $sign),
            'updated_at' => $user_info['updated_at'],
            'account' => $user_info['account'],
            'header' => $user_info['header'],
        );

        $this->ajaxReturn($ret);
    }
}
