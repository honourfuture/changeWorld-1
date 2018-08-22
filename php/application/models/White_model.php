<?php
/*
 * 白名单
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class White_model extends MY_Model
{
    public $_table        = 'white';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function type()
    {
    	return [
    		1 => '直播',
    		2 => '专辑'
    	];
    }
}
