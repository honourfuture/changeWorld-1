<?php
/*
 * 会员用户
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_model extends MY_Model
{
    public $_table        = 'users';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    private $_pwd_key = '5jGwhZLONPxb';

    public function __construct()
    {
        parent::__construct();
    }

    public function rmb_to_gold_rate()
    {
        return 100;
    }

    public function rmb_to_gold($money)
    {
        $rate = $this->rmb_to_gold_rate();
        return floor($money * $rate);
    }

    public function gold_to_rmb_rate()
    {
        return 100;
    }

    public function gold_to_rmb($gold)
    {
        $rate = $this->gold_to_rmb_rate();
        return round($gold / $rate, 2);
    }

    public function age($birth)
    {
        $date = strtotime($birth);
        $today = strtotime('today');
        $diff = floor(($today-$date)/86400/365);

        $age = (strtotime($birth.' +'.$diff.'years') > $today) ? ($diff+1) : $diff;
        $age = max($age, 0);
        return min($age, 255);
    }

    //城市合伙人
    public function check_city_partners()
    {
        return [
            '否',
            '待审核',
            '是'
        ];
    }

    public function sex()
    {
        return [
            '保密',
            '男',
            '女'
        ];
    }

    public function get_header($header)
    {
        return strpos($header, 'http') === false ? $this->config->base_url($header) : $header;
    }

    public function set_password()
    {

    }

    public function get_password($password = '')
    {
        return md5($this->_pwd_key.$password.$this->_pwd_key);
    }

    public function get_many_user($a_user = array(), $select = 'id,nickname,header,mobi')
    {
        $ret = array();
        $this->db->select($select);
        if($users = $this->get_many($a_user)){
            foreach($users as $item){
                $id = $item['id'];
                unset($item['id']);
                $ret[$id] = $item;
            }
        }

        return $ret;
    }

    public function check_shop($seller_uid)
    {
        $result = array('status' => 0, 'message' => '', 'data' => array());
        $this->db->select('id,nickname,header,v,exp,pretty_id');
        $user = $this->get($seller_uid);
        if(! $user){
            $result['status'] = 1;
            $result['message'] = '店铺不存在';
        }else{
            $result['data'] = $user;
        }

        return $result;
    }

    public function reg($params = array())
    {
        $data = array();
        switch($this->router->method)
        {
            case 'account':
                $data['mobi'] = $params['mobi'];
                $data['account'] = $params['account'];
                $data['nickname'] = $params['account'];
                $data['password'] = $this->Users_model->get_password($params['password']);
                break;
            case 'qq'://QQ
                break;
            case 'wechat'://微信
                $data['nickname'] = $params['nickname'];
                $data['header'] = $params['headimgurl'];
                $data['sex'] = $params['sex'];
                break;
            case 'tourist'://匿名
                $data['nickname'] = '匿名';
                $data['tourist_uid'] = $params['guid'];
                break;
            case 'bind':
                $data['mobi'] = $params['mobi'];
                $data['nickname'] = isset($params['nickname']) ? $params['nickname'] : '';
                $data['header'] = isset($params['headimgurl']) ? $params['headimgurl'] : '';
                $data['sex'] = isset($params['sex']) ? $params['sex'] : 0;
                break;
        }
        $data['point'] = 0;//注册送积分
        $data['birth'] = date("Y-m-d");
        $data['reg_ip'] = $this->input->ip_address();

        $user_id = $this->Users_model->insert($data);

        if(isset($data['mobi'])){
            $this->load->model('Users_bind_model');
            $data = [
                'user_id' => $user_id,
                'account_type' => 0,
                'unique_id' => $data['mobi'],
            ];
            $this->Users_bind_model->insert($data);
        }

        return $user_id;
    }
}
