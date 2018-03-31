<?php
/*
 * 主播信息
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_anchor_model extends MY_Model
{
    public $_table        = 'users_anchor';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function certificate()
    {
    	return array(
            ['id' => 1, 'name' => '二代身份证'],
            ['id' => 2, 'name' => '港澳证']
    	);
    }

    public function status()
    {
        return [
            '待审核',
            '已通过',
            '已拒绝'
        ];
    }
}
