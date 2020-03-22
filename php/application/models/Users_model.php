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
    public $protected_attributes = array('v');

    private $_pwd_key = '5jGwhZLONPxb';

    public function __construct()
    {
        parent::__construct();
    }

    public function random_robot($where, $select = 'id')
    {
        $this->db->select('id');
        $row = $this->order_by('id', 'asc')->limit(1)->get_by($where);
        $min = $row['id'];

        $this->db->select('id');
        $row = $this->order_by('id', 'desc')->limit(1)->get_by($where);
        $max = $row['id'];

        $id = mt_rand($min, $max);
        $where['id >'] = $id;
        $this->db->select($select);
        return $this->limit(1)->get_by($where);
    }

    public function under($uid, $uids=array())
    {
        $this->db->select('id, pid');
        $this->db->where_in('pid', $uid);
        $rows = $this->get_all();
        foreach ($rows as $key=>$value){
            if($value['id'] == $value['pid']){
                continue;
            }
            $uids[] = $value['id'];
            $this->db->select('id,pid');
            $user = $this->db->where_in('pid', $value['id']);
            if($user){
                $uids = $this->under($value['id'], $uids);
            }
        }
        return $uids;
    }

    public function parent($uid, $top = [])
    {
        $user = $this->get($uid);

        if($user){
            $top[] = $user;
            if(!$user['pid']){
                return $top;
            }else{
                $top = $this->parent($user['pid'], $top);
            }
        }
        return $top;
    }

    public function live_group_tag($user_id)
    {
        return 'live_group_'.$user_id;
    }

    // 主播状态
    public function anchor()
    {
        return [
            '未申请',
            '待审核',
            '已通过',
            '已拒绝'
        ];
    }

    // 商家状态
    public function seller()
    {
        return [
            '未申请',
            '待审核',
            '已通过',
            '已拒绝'
        ];
    }

    public function rmb_to_gold_rate()
    {
        $this->load->model('Config_model');
        $siteConfig = $this->Config_model->siteConfig();
        return isset($siteConfig['rmb_to_gold']) ? $siteConfig['rmb_to_gold'] : 100;
    }

    public function rmb_to_gold($money)
    {
        $rate = $this->rmb_to_gold_rate();
        return floor($money * $rate);
    }

    public function gold_to_rmb_rate()
    {
        $this->load->model('Config_model');
        $siteConfig = $this->Config_model->siteConfig();
        return isset($siteConfig['gold_to_rmb']) ? $siteConfig['gold_to_rmb'] : 100;
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

    public function get_many_user($a_user = array(), $select = 'id,nickname,header,mobi,pretty_id', $has_pri_id = false)
    {
        $ret = array();
        $this->db->select($select);
        if($users = $this->get_many($a_user)){
            foreach($users as $item){
                $id = $item['id'];
                if($has_pri_id){
                    $ret[$id] = $item;
                }else{
                    unset($item['id']);
                    $ret[$id] = $item;
                }
            }
        }

        return $ret;
    }

    public function check_shop($seller_uid)
    {
        $result = array('status' => 0, 'message' => '', 'data' => array());
        $this->db->select('id,nickname,header,v,exp,pretty_id,bg_image,address');
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
                $data['nickname'] = '罗马会员' . date('d') . substr($params['mobi'], -4);
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
                $data['password'] = $this->Users_model->get_password($params['password']);
                $data['nickname'] = isset($params['nickname']) ? $params['nickname'] : '';
                $data['header'] = isset($params['headimgurl']) ? $params['headimgurl'] : '';
                $data['sex'] = isset($params['sex']) ? $params['sex'] : 0;
                break;
        }
        $data['point'] = 0;//注册送积分
        $data['birth'] = date("Y-m-d");
        $data['reg_ip'] = $this->input->ip_address();

        $rule_name = 'points_reg';
        if(isset($data['mobi'])){
            //邀请注册
            $this->load->model('Share_record_model');
            if($record = $this->Share_record_model->get_by(['mobi' => $data['mobi']])){
                $data['pid'] = $record['invite_uid'];
                $data['point'] = $record['point'];

                $rule_name = 'invite_reg';
            }
        }

        //生成用户的邀请码（7位纯数字）
        $invite_code = mt_rand(1000000, 9999999);
        $gen_invite_code = true;
        while($gen_invite_code){
            $temp_user = $this->Users_model->get_by(['invite_code' => $invite_code]);
            if(empty($temp_user)){
                $gen_invite_code = false;
            }else{
                $invite_code = mt_rand(1000000, 9999999);
            }
        }
        //保存邀请码
        $data['invite_code'] = $invite_code;

        $max_id = $this->Users_model->get_next_id();
        if(! $max_id || strlen($max_id) < 8){
            $max_id = 10000000;
        }
        $this->load->model('Pretty_model');
        while ( $this->Pretty_model->get_by(['pretty_id' => $max_id]) ) {
            $max_id += 3;
        }
        $data['id'] = $max_id;


        $user_id = $this->Users_model->insert($data);

        if($data['point']){
            $this->load->model('Users_points_model');
            $log = [
                'user_id' => $user_id,
                'value' => $data['point'],
                'point' => $data['point'],
                'rule_name' => $rule_name,
                'remark' => '注册'
            ];
            $this->Users_points_model->insert($log);
        }

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
