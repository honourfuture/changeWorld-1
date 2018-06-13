<?php
/*
 * 消费记录
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Consume_record_model extends MY_Model
{
    public $_table        = 'consume_record';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_valid');
    public $before_update = array('updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function type()
    {
        return [
            '人民币',
            '金币',
        ];
    }

    public function topic()
    {
    	return [
    		'贵族',// 0
    		'靓号',// 1
            '直播',// 2
            '音频',// 3
            '专辑',// 4
            '商品',// 5
            '赞助',// 6
            // '转金币',// 7
    	];
    }

    public function payment_type()
    {
        return [
            'gold' => '金币',
            'balance' => '余额',
            'wechat' => '微信',
            'alipay' => '支付宝'
        ];
    }
}
