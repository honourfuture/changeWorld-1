<?php
/*
 * 账号绑定
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_bind_model extends MY_Model
{
    public $_table        = 'users_bind';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function account_type()
    {
        return [
            '手机',//0
            '微信',//1
            'QQ',//2
            '微博'//3
        ];
    }

    public function get_user_bind_list($user_id)
    {
        $this->db->select('GROUP_CONCAT(account_type) s_account_type');
        $this->db->group_by('user_id');
        $result = $this->get_by('user_id', $user_id);
        return $result ? explode(',', $result['s_account_type']) : [];
    }
}
