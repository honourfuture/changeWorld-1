<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

use EasyWeChat\Foundation\Application;

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
			$this->ajaxReturn([], 1, '登录参数非法');
		}
		$this->load->model('Users_model');
		//手机号 or 账号
		$info = $this->Users_model->get_by('account', $account);
		!$info && $info = $this->Users_model->get_by('mobi', $account);
		if($info){
			if($info['password'] == $this->Users_model->get_password($password)){
				$this->check_status($info);
			}else{
				$this->ajaxReturn([], 3, '登录密码错误');
			}
		}else{
			$this->ajaxReturn([], 2, '登录账号错误');
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
    	
    }

    /**
	 * @api {get} /api/user/login/wechat 微信登录
	 * @apiVersion 1.0.0
	 * @apiName login_wechat
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login/wechat
	 *
	 * @apiParam {String} code APP授权code
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集 如果存在auth表名登录成功，否则强制转手机绑定页
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
    public function wechat()
    {
    	$account_type = 1;
    	if(!$code = $this->input->get('code')){
    		$this->ajaxReturn([], 1, 'code码必传');
    	}

    	$this->setting = config_item('wechat');
    	$app = new Application($this->setting);
        $oauth = $app->oauth;
        if($user = $oauth->user()){
            $user = $user->toArray();

            $this->load->model('Users_model');
            //判断是否已绑定
            $where = [
                'account_type' => $account_type,
                'unique_id' => $user['id']
            ];
            $this->load->model('Users_bind_model');
            $this->db->select('id,user_id');
            $user_id = 0;
            if($user_bind = $this->Users_bind_model->get_by($where)){
            	$bind_id = $user_bind['id'];
                if($user_bind['user_id']){//已绑定账号
                	$user_id = $user_bind['user_id'];
                	$this->refresh();
                }else{//未绑定账号
                    $this->Users_bind_model->update($user_bind['id'], ['other' => json_encode($user['original'])]);
                }
            }else{//未绑定账号&首次访问
            	$data = [
	                'account_type' => $account_type,
	                'unique_id' => $user['original']['openid'],
	                'other' => json_encode($user['original']),
	            ];
	            $bind_id = $this->Users_bind_model->insert($data);
            }

            if($user_id && $info = $this->Users_model->get($user_id)){
				$this->check_status($info);
			}else{
				$this->ajaxReturn(['bind_id' => $bind_id]);
			}
        }else{
        	log_message('error', 'wechat oauth failed'.var_export($user, true));
            $this->ajaxReturn([], 1, '微信授权登录异常错误');
        }
    }

    /**
	 * @api {get} /api/user/login/bind 第三方授权-强制绑手机
	 * @apiVersion 1.0.0
	 * @apiName login_bind
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/login/bind
	 *
	 * @apiParam {String} mobi 绑定手机
	 * @apiParam {String} code 短信验证码
	 * @apiParam {String} bind_id 第三方登录返回bind_id
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
    public function bind()
    {
    	$mobi = $this->input->get_post('mobi');
    	$code = $this->input->get_post('code');
    	$bind_id = $this->input->get_post('bind_id');

    	if(!$mobi || !$code){
			$this->ajaxReturn([], 1, '手机号注册参数错误');
		}

        $this->load->model('Sms_email_record_model');
		$info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
		if($info){
			if($info['verify'] == $code){
				$this->load->model('Users_bind_model');
				$this->load->model('Users_model');
		        if($user = $this->Users_model->get_by('mobi', $mobi)){
		        	$bind_id && $this->Users_bind_model->update($bind_id, ['user_id' => $user['id']]);
		        	$this->refresh();
		        }else{
		        	$data = [];
		        	//获取第三方用户资料
		        	if($user_bind = $this->Users_bind_model->get($bind_id)){
		        		$data = json_decode($user_bind['other'], true);
		        	}
		        	$data['mobi'] = $mobi;

		        	if($user_id = $this->Users_model->reg($data)){
	                	$this->Users_bind_model->update($bind_id, ['user_id' => $user_id]);
			        }else{
			            $this->ajaxReturn([], LOGIN_STATUS, '保存注册信息失败');
			        }

			        $user = $this->Users_model->get($user_id);
		        }

		        $this->check_status($user);
			}else{
				$this->ajaxReturn([], 4, '验证码错误');
			}
		}else{
			$this->ajaxReturn([], 3, '请先获取验证码校验');
		}
    }

    //同步更新个人资料
    protected function refresh()
    {

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
    	// modify 2018/3/29
    	$this->ajaxReturn([], LOGIN_STATUS, '游客登录访问已禁用');

    	$guid = $this->input->get_post('guid');
		if(!$guid){
			$this->ajaxReturn([], 1, '匿名登录参数非法');
		}
		$this->load->model('Users_model');
		$info = $this->Users_model->get_by('tourist_uid', $guid);
		if($info){
			$this->check_status($info);
		}else{//注册
			if($user_id = $this->Users_model->reg(['guid' => $guid])){
				$info = $this->Users_model->get($user_id);
				$this->check_status($info);
			}else{
				$this->ajaxReturn([], LOGIN_STATUS, '匿名用户注册失败');
			}
		}
    }

    protected function check_status($info = array())
    {
    	if($info['enable']){
			$this->user_login_success($info);
		}else{
			if($info['deleted']){
				$this->ajaxReturn([], 4, '账号已删除');
			}else{
				$this->ajaxReturn([], 5, '账号被冻结');
			}
		}
    }
}
