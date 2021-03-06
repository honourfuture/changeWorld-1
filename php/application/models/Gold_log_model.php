<?php
/*
 * 金币流水
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Gold_log_model extends MY_Model
{
    public $_table        = 'gold_log';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function topic()
    {
    	return [
    		'充值',// 0
    		'转余额',// 1
            '礼物',// 2（送、收）
            '购买贵族',// 3
            '红包',// 4
    	];
    }
}
