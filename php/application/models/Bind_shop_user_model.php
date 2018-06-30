<?php
/*
 * 店铺会员绑定
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Bind_shop_user_model extends MY_Model
{
    public $_table        = 'bind_shop_user';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
