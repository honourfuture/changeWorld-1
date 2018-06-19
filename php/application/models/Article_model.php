<?php
/*
 * 文章
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Article_model extends MY_Model
{
    public $_table        = 'article';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function initSinglePage()
    {
    	return array(
    		'about_us' => '关于我们',
    		'join_us' => '加入我们',
    		'contact_us' => '联系我们',
    		'protocol' => '用户协议',
    		'copyright' => '版权申明',
            'protocol_shop' => '店铺协议',
            'rule_shop' => '平台规则',
    	);
    }
}
