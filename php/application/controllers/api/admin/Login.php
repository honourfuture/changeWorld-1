<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends Admin_Controller {

	public function index()
	{
		$account = $this->input->get_post('account');
		$password = $this->input->get_post('password');
		if(!$account || !$password){
			$this->ajaxReturn('', 1, '登录参数非法');
		}
		$this->load->model('Admin_model');
		$info = $this->Admin_model->get_by('account', $account);
		if($info){
			if($info['password'] == $this->Admin_model->get_password($password)){
				if($info['enable']){
					$this->log($info['id'], $info['account'], '登录');
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

	protected function login_success($admin_info)
    {
        $this->admin_id = $admin_info['id'];
        $token = $this->set_token();
        if(empty($token)){
        	$this->ajaxReturn('', 6, '获取授权token失败');
        }
        $sign = $this->get_sign($token);

        $ret = array(
        	'auth' => array('admin_id' => $this->admin_id, 'sign' => $sign, 'account' => $admin_info['account'],),
            'updated_at' => $admin_info['updated_at'],
            'account' => $admin_info['account'],
            'header' => $admin_info['header'],
        );

        $this->ajaxReturn($ret);
    }
}
