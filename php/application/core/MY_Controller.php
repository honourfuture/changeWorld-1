<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/*
 * 通用的Controller函数
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */
date_default_timezone_set('Asia/Shanghai');

//基础Controller
class MY_Controller extends CI_Controller
{
    protected $_user_key = '9U4dpSMh9l6o';
    protected $_admin_key = 'Yn5TnebxdV9x';
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
        //跨域
        $http_origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        $allow_origin = config_item('white_list_url');
        foreach($allow_origin as $origin){
            if(strpos($http_origin, $origin) !== false){
                header('Access-Control-Allow-Origin:'.$http_origin); // 指定允许其他域名访问
                header('Access-Control-Allow-Credentials:true' );
                header('Access-Control-Allow-Methods','POST,GET,OPTIONS'); // 响应类型
                header('Access-Control-Allow-Headers:x-requested-with,content-type'); // 响应头设置

                break;
            }
        }
        //翻页
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
    protected function ajaxReturn($data = array(), $status = 0, $message='', $ajaxFileUpload = false)
    {
        if(! $ajaxFileUpload){
            header('Content-type: application/json; charset=utf-8');
        }else{
            header('Content-type: text/html; charset=utf-8');
        }
        $ret = array();
        $ret['data'] = is_null($data) ? [] : $data;
        $ret['status'] = $status;
        $ret['message'] = empty($message) ? '成功' : $message;
        echo json_encode($ret, JSON_UNESCAPED_UNICODE);exit();
    }

    //等级经验规则
    protected function siteGradeRule()
    {
        $config = array();
        $this->load->model('Grade_rule_model');
        $rows = $this->Grade_rule_model->get_all();
        if($rows){
            foreach($rows as $item){
                $config[$item['name']] = $item['value'];
            }
        }

        return $config;
    }

    //积分规则
    protected function sitePointsRule()
    {
        $config = array();
        $this->load->model('Points_rule_model');
        $rows = $this->Points_rule_model->get_all();
        if($rows){
            foreach($rows as $item){
                $config[$item['name']] = $item['value'];
            }
        }

        return $config;
    }

    /*
     * @admin_id 登录ID
     * @account 登录账号
     * @sign 签名字段
     */
    protected function check_sign()
    {
        $sign = $this->input->get_post('sign');
        $this->user_id = $this->input->get_post('user_id');
        $this->admin_id = $this->input->get_post('admin_id');
        if($this->user_id){
            $pri_id = $this->user_id;
            $token = $this->get_user_token();
            $sign_key = $this->_user_key;
        }elseif($this->admin_id){
            $pri_id = $this->admin_id;
            $this->account = $this->input->get_post('account');//登录账号
            $token = $this->get_admin_token();
            $sign_key = $this->_admin_key;
        }else{
            $this->ajaxReturn([], LOGIN_STATUS, '非法请求来源');
        }

        if(empty($token)){
            $this->ajaxReturn([], LOGIN_STATUS, '授权token为空');
        }
        if($sign != $this->get_sign($pri_id, $token, $sign_key)){
            $this->ajaxReturn([], LOGIN_STATUS, '签名校验错误');
        }
    }

    protected function get_sign($pri_id, $token, $sign_key)
    {
        return md5($sign_key.$pri_id.$token.$sign_key);
    }

    protected function get_user_token()
    {
        $this->load->model('Users_token_model');
        $info = $this->Users_token_model->get_by('user_id', $this->user_id);
        return $info ? $info['token'] : '';
    }

    protected function get_admin_token()
    {
        $this->load->model('Admin_token_model');
        $info = $this->Admin_token_model->get_by('admin_id', $this->admin_id);
        return $info ? $info['token'] : '';
    }

    protected function set_user_token($is_single = false)
    {
        if(! $this->user_id){
            return '';
        }
        $token = '';
        $this->load->model('Users_token_model');
        $info = $this->Users_token_model->get_by('user_id', $this->user_id);
        if($is_single){
            $this->Users_token_model->delete($info['id']);
        }else{
            if($info){
                $token = $info['token'];
                $this->Users_token_model->update($info['id'], array('token' => $token));
            }
        }

        if(empty($token)){
            $token = md5(microtime());
            $this->Users_token_model->insert(array('user_id' => $this->user_id, 'token' => $token));
        }

        return $token;
    }

    protected function set_admin_token($is_single = false)
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

    // 后台日志
    protected function log_admin($admin_id, $account, $remarks)
    {
        $log = array(
            'ip' => $this->input->ip_address(),
            'admin_id' => $admin_id,
            'admin_account' => $account,
            'remarks' => $remarks
        );
        $this->Admin_log_model->insert($log);
    }

    protected function check_operation()
    {
        if($this->user_id){
            $this->ajaxReturn([], ACCESS_REQUEST, '非法操作');
        }
    }

    protected function get_user()
    {
        $this->load->model('Users_model');
        return $this->Users_model->get($this->user_id);
    }
}


//API端Controller
class API_Controller extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        if(! in_array($this->router->class, array('login', 'common', 'register', 'forget', 'normal', 'notify'))){
            $this->check_sign();
        }
    }

    protected function user_login_success($user_info)
    {
        $this->user_id = $user_info['id'];
        $token = $this->set_user_token();
        if(empty($token)){
            $this->ajaxReturn([], LOGIN_STATUS, '获取授权token失败');
        }
        $sign = $this->get_sign($this->user_id, $token, $this->_user_key);

        $ret = array(
            'auth' => array('user_id' => $this->user_id, 'sign' => $sign),
            'updated_at' => $user_info['updated_at'],
            'nickname' => $user_info['nickname'],
            'header' => $user_info['header'],
        );

        $this->ajaxReturn($ret);
    }

    // 广告
    protected function ad($ad_position_id, $limit = 1)
    {
        if(!$ad_position_id || !$limit){
            return array();
        }
        $this->load->model('Ad_model');
        $order_by = array('sort' => 'desc', 'id' => 'desc');
        $now_time = time();
        $where = array('ad_position_id' => $ad_position_id, 'enable' => 1, 'start_time <=' => $now_time, 'end_time >' => $now_time);
        $this->db->select('title,link,image');
        return $this->Ad_model->order_by($order_by)->limit($limit)->get_many_by($where);
    }

    // 会员积分
    protected function points($user)
    {
        $rule = $this->sitePointsRule();
        return array(
            'rule' => isset($rule['goods_exchange']) ? $rule['goods_exchange'] : 0,
            'user' => $user ? $user['point'] : 0
        );
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