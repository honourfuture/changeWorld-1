<?php
/*
 * 积分规则
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Points_rule_model extends MY_Model
{
    public $_table        = 'points_rule';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function init()
    {
    	return array(
    		'points_reg' => '会员注册',
    		'points_login' => '会员登陆',
    		'points_evaluate' => '会员评论',
            'points_pay' => '消费'
    		'points_order' => '订单上限',
    	);
    }
}