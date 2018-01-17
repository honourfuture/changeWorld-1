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

    public function set_password()
    {

    }

    public function get_password($password = '')
    {
        return md5($this->_pwd_key.$password.$this->_pwd_key);
    }
}
