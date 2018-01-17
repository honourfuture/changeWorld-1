<?php
/*
 * 商品
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Goods_model extends MY_Model
{
    public $_table        = 'goods';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function init_send_mode()
    {
    	return array('卖家发货', '上门自提', '不用发货');
    }
}
