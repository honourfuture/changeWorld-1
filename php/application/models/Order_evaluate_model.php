<?php
/*
 * 订单评论
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Order_evaluate_model extends MY_Model
{
    public $_table        = 'order_evaluate';
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
    		'显示',
    		'隐藏'
    	];
    }
}
