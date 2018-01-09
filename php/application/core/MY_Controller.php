<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * 通用的Controller函数
 * @author Teamtweaks
 *
 */
date_default_timezone_set('Asia/Shanghai');

//基础Controller
class MY_Controller extends CI_Controller
{
    protected $user_id = 0;
    protected $admin_id = 0;

    protected $data = array(
        'style' => 0,//样式：0默认 1登录注册 2会员中心
    );

    protected $cur_page = 0;//当前页
    protected $per_page = 20;//每页显示条数
    protected $offset = 0;//偏移量

    function __construct()
    {
        parent::__construct();

        $this->init_my();
    }

    protected function init_my()
    {
        $cur_page = intval($this->input->get_post('cur_page'));
        $offset = intval($this->input->get_post('offset'));
        $per_page = intval($this->input->get_post('per_page'));
        if($cur_page < 1){
            $cur_page = 1;
        }
        $this->cur_page = $cur_page;
        $this->per_page = $per_page ? $per_page : $this->per_page;
        $this->offset = $offset ? $offset : ($this->cur_page - 1) * $this->per_page;
    }

    /**
     * 接口/ajax返回
     * @param int $status 0表示成功 其他表示失败
     */
    protected function ajaxReturn($data, $status = 0, $message='', $ajaxFileUpload = false)
    {
        if(! $ajaxFileUpload){
            header('Content-type: application/json; charset=utf-8');
        }else{
            header('Content-type: text/html; charset=utf-8');
        }
        $ret['data'] = $data;
        $ret['status'] = $status;
        $ret['message'] = $message;
        echo json_encode($ret);exit();
    }

    //站点设置
    protected function siteConfig()
    {
        $config = array();
        $this->load->model('Config_model');
        $rows = $this->Config_model->get_list(array(), 1000, 0);
        if($rows){
            foreach($rows as $item){
                $config[$item['name']] = $item['value'];
            }
        }

        return $config;
    }
}


//API端Controller
class API_Controller extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
    }
}


//管理员Controller
class Admin_Controller extends API_Controller
{
    private $_admin_key = 'Yn5TnebxdV9x';

	public function __construct()
	{
		parent::__construct();
        if(! in_array($this->router->class, array('login'))){
            $this->check_sign();
        }
    }

    /*
     * @admin_id 登录ID
     * @account 登录账号
     * @sign 签名字段
     */
    protected function check_sign()
    {
        $this->admin_id = $this->input->get_post('admin_id');
        $this->account = $this->input->get_post('account');
        $sign = $this->input->get_post('sign');
        $token = $this->get_token();
        if(empty($token)){
            $this->ajaxReturn('', LOGIN_STATUS, '登录授权token为空');
        }
        if($sign != $this->get_sign($token)){
            $this->ajaxReturn('', LOGIN_STATUS, '登录签名校验错误');
        }
    }

    protected function get_sign($token)
    {
        return md5($this->_admin_key.$this->admin_id.$token.$this->_admin_key);
    }

    protected function set_token($is_single = false)
    {
        if(! $this->admin_id){
            return '';
        }
        $token = '';
        $this->load->model('Admin_token_model');
        $info = $this->Admin_token_model->get_by('admin_id', $this->admin_id);
        if($is_single){
            $this->Admin_token_model->delete($info['id']);
        }else{
            if($info){
                $token = $info['token'];
                $this->Admin_token_model->update($info['id'], array('token' => $token));
            }
        }

        if(empty($token)){
            $token = md5(microtime());
            $this->Admin_token_model->insert(array('admin_id' => $this->admin_id, 'token' => $token));
        }

        return $token;
    }

    protected function get_token()
    {
        $this->load->model('Admin_token_model');
        $info = $this->Admin_token_model->get_by('admin_id', $this->admin_id);
        return $info ? $info['token'] : '';
    }

    // 后台日志
    protected function log($admin_id, $account, $remarks)
    {
        $log = array(
            'ip' => $this->input->ip_address(),
            'admin_id' => $admin_id,
            'admin_account' => $account,
            'remarks' => $remarks
        );
        $this->Admin_log_model->insert($log);
    }

	protected function tpl($views = '')
    {
        return empty($views) ? 'admin'.DIRECTORY_SEPARATOR.$this->router->class.DIRECTORY_SEPARATOR.$this->router->method : $views;
    }
}


//微信端Controller
class Wechat_Controller extends API_Controller
{
    public function __construct()
    {
        parent::__construct();
    }
}


//移动浏览器Controller
class WAP_Controller extends API_Controller
{
	public function __construct()
	{
		parent::__construct();
	}
}



//PC网站Controller
class Web_Controller extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('session');
    }

    public function tpl($views = '')
    {
        return empty($views) ? 'web'.DIRECTORY_SEPARATOR.$this->router->class.DIRECTORY_SEPARATOR.$this->router->method : $views;
    }

    //已登录
    protected function hasLogin($isDialog=false)
    {
        if(! $this->uid = $this->checkLogin('U')){
            $this->unLogin($isDialog);
        }
    }

    //未登录
    protected function unLogin($isDialog=false, $url = '/login/')
    {
        $this->session->sess_destroy();
        if($isDialog){
            redirect(site_url('/dialog/login?redirect='.$this->router->method));
        }else{
            redirect(site_url($url));
        }

    }

    //登录
    protected function saveLogin($data)
    {
        $array = array(
            'system_user_id' => $data['id'],
            'system_user_name' => $data['name'],
        );
        $this->session->set_userdata($array);
    }

    protected function getUser()
    {
        $this->load->model('User_model');
        $this->data['userInfo'] = $this->User_model->get_one(array('id' => $this->uid));
    }
}