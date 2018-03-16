<?php
/*
 * 优惠充值
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Recharge_model extends MY_Model
{
    public $_table        = 'recharge';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
