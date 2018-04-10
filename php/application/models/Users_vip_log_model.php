<?php
/*
 * 用户贵族购买记录
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_vip_log_model extends MY_Model
{
    public $_table        = 'users_vip_log';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function status()
    {
        return [
            '待付款',
            '已付款',
            '失败',
        ];
    }

    public function make_pay_sn()
    {
        return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000);
    }

    public function make_order_sn($mid)
    {
        return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000) . sprintf('%03d', (int) $mid % 1000);
    }
}
