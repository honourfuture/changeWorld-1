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
	 * @api {get} /api/admin/login 管理员登录
	 * @apiVersion 1.0.0
	 * @apiName login
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/login
	 *
	 * @apiParam {String} account 唯一登录账号
	 * @apiParam {String} password 登录密码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.auth 接口认证信息
	 * @apiSuccess {String} data.auth.admin_id 管理员唯一ID
	 * @apiSuccess {String} data.auth.sign 接口签名
	 * @apiSuccess {String} data.auth.account 管理员账号
	 * @apiSuccess {String} data.updated_at 最后登录时间
	 * @apiSuccess {String} data.account 管理员账号
	 * @apiSuccess {String} data.header 管理员头像
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "auth": {
	 *	            "admin_id": "1",
	 *	            "sign": "0ec1966af508f2ceda19cf516e03b959",
	 *	            "account": "aicode"
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
			$this->ajaxReturn([], 1, '登录参数非法');
		}
		$this->load->model('Admin_model');
		$info = $this->Admin_model->get_by('account', $account);
		if($info){
			if($info['password'] == $this->Admin_model->get_password($password)){
				if($info['enable']){
					$this->log_admin($info['id'], $info['account'], '登录');
					$this->login_success($info);
				}else{
					if($info['deleted']){
						$this->ajaxReturn([], 4, '账号已删除');
					}else{
						$this->ajaxReturn([], 5, '账号被冻结');
					}
				}
			}else{
				$this->ajaxReturn([], 3, '登录密码错误');
			}
		}else{
			$this->ajaxReturn([], 2, '登录账号错误');
		}
	}

	protected function login_success($admin_info)
    {
        $this->admin_id = $admin_info['id'];
        $token = $this->set_admin_token();
        if(empty($token)){
        	$this->ajaxReturn([], 6, '获取授权token失败');
        }
        $sign = $this->get_sign($this->admin_id, $token, $this->_admin_key);

        $ret = array(
        	'auth' => array('admin_id' => $this->admin_id, 'sign' => $sign, 'account' => $admin_info['account']),
            'updated_at' => $admin_info['updated_at'],
            'account' => $admin_info['account'],
            'header' => $admin_info['header'],
        );

        $this->ajaxReturn($ret);
    }
}
