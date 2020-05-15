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
        $this->load->model('Users_bind_model');
    }

    /**
     * @api {post} /api/change_bind/oldPhone 修改绑定1-旧手机号验证
     * @apiVersion 1.0.0
     * @apiName change_bind_old_phone
     * @apiGroup changeBin
     *
     * @apiSampleRequest /api/change_bind/oldPhone
     *
     * @apiParam {String} code 验证码
     * @apiParam {String} phone 旧手机号码
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常 设置成功直接登录成功
     * @apiSuccess {String} message 接口信息描述
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
    public function oldPhone()
    {
        $mobi = $this->input->get_post('phone');
        $code = $this->input->get_post('code');

        $check = '/^(1(([35789][0-9])|(47)))\d{8}$/';
        if (!preg_match($check, $mobi)) {
            $this->ajaxReturn([], 1, '手机号错误');
        }

        $this->load->model('Users_model');
        $user = $this->Users_model->get_by('mobi', $mobi);

        if(!$user || $user['id'] != $this->user_id){
            $this->ajaxReturn([], 3, '手机号不可用');
        }

        if(!$mobi || !$code){
            $this->ajaxReturn([], 1, '手机号验证码参数错误');
        }

        $this->load->model('Sms_email_record_model');
        $info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
        if($info){
            if($info['verify'] == $code){
                $this->ajaxReturn([], 0, '验证通过');
            }else{
                $this->ajaxReturn([], 5, '验证码错误');
            }
        }else{
            $this->ajaxReturn([], 4, '先获取短信验证码');
        }
    }


    /**
     * @api {post} /api/change_bind/newPhone 修改绑定2-手机号重新绑定
     * @apiVersion 1.0.0
     * @apiName change_bind
     * @apiGroup changeBin
     *
     * @apiSampleRequest /api/change_bind/newPhone
     *
     * @apiParam {String} code 验证码
     * @apiParam {String} phone 新手机号码
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
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
    public function newPhone()
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

        $user = $this->Users_model->get_by('id', $this->user_id);

        $this->load->model('Sms_email_record_model');
        $info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);

        if($info){
            if($info['verify'] == $code){
                if($this->Users_model->update($user['id'], array('mobi' => $mobi))){
                    $where = [
                        'user_id' => $user['id'],
                        'account_type' => 0
                    ];

                    $user_bind = $this->Users_bind_model->get_by($where);
                    $this->Users_bind_model->update($user_bind['id'], ['unique_id' => $mobi]);
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

    /**
     * @api {post} /api/change_bind/changByPassword 修改绑定-根据密码
     * @apiVersion 1.0.0
     * @apiName chang_by_password
     * @apiGroup changeBin
     *
     * @apiSampleRequest /api/change_bind/changByPassword
     *
     * @apiParam {String} code 验证码
     * @apiParam {String} password 密码
     * @apiParam {String} phone 新手机号码
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
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
     *     "message": "密码错误"
     * }
     */
    public function changByPassword()
    {
        $mobi = $this->input->get_post('phone');
        $password = $this->input->get_post('password');
        $code = $this->input->get_post('code');

        if(!$mobi || !$password){
            $this->ajaxReturn([], 1, '手机号密码参数错误');
        }

        $this->load->model('Users_model');
        $user = $this->Users_model->get_by('mobi', $mobi);
        if($user){
            $this->ajaxReturn([], 3, '手机号已被注册');
        }

        $user = $this->Users_model->get_by('id', $this->user_id);
        if(!$code){
            $this->ajaxReturn([], 3, '验证码参数错误');
        }
        if($user['password'] == $this->Users_model->get_password($password)){
            $this->load->model('Sms_email_record_model');
            $info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);

            if($info){
                if($info['verify'] == $code){
                    if($this->Users_model->update($user['id'], array('mobi' => $mobi))){
                        $where = [
                            'user_id' => $user['id'],
                            'account_type' => 0
                        ];

                        $user_bind = $this->Users_bind_model->get_by($where);
                        $this->Users_bind_model->update($user_bind['id'], ['unique_id' => $mobi]);
                        $this->user_login_success($user);
                    }else{
                        $this->ajaxReturn([], 6, '更换绑定失败');
                    }
                }else{
                    $this->ajaxReturn([], 5, '验证码错误');
                }
            }else{
                $this->ajaxReturn([], 2, '先获取短信验证码');
            }
        }else{
            $this->ajaxReturn([], 4, '密码错误');
        }
    }
    /**
     * @api {post} /api/change_bind/releaseThree 修改绑定-删除第三方绑定
     * @apiVersion 1.0.0
     * @apiName change_bind_release_three
     * @apiGroup changeBin
     *
     * @apiSampleRequest /api/change_bind/releaseThree
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常 设置成功直接登录成功
     * @apiSuccess {String} message 接口信息描述
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
     *     "message": "取消绑定失败"
     * }
     */
    public function releaseThree()
    {
        $account_type = intval($this->input->get_post('account_type'));
        $account_type = in_array($account_type, [0, 1, 2, 3, 4]) ? $account_type : 0;
        $where = [
            'user_id' => $this->user_id,
            'account_type' => $account_type
        ];
        $user_bind = $this->Users_bind_model->get_by($where);
        if(!$user_bind){
            $this->ajaxReturn([], 1, '未绑定第三方');
        }
        $status = $this->Users_bind_model->update($user_bind['id'], ['unique_id' => 0, 'updated_at'=>date('Y-m-d H:i:s'), 'other'=>'']);
        if($status){
            $this->ajaxReturn([], 0, '取消绑定成功');
        }else{
            $this->ajaxReturn([], 2, '取消绑定失败');
        }

    }
}
