<?php
/*
 * 等级经验规则
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Grade_rule_model extends MY_Model
{
    public $_table        = 'grade_rule';
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
    		'grade_login' => '会员登录',
    		'grade_evaluate' => '会员评论',
    		'grade_pay' => '消费',
    		'grade_order' => '订单上限',
    	);
    }
}
