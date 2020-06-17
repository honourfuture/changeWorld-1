<?php
/*
 * 应用版本
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class App_version_model extends MY_Model
{
    public $_table        = 'app_version';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    //平台
    public function platform()
    {
    	return [
    		'IOS',
    		'Android'
    	];
    }

    public function verifyStatus()
    {
        return [
            '未提审',
            '审核中',
            '审核通过'
        ];
    }

    //渠道
    public function channel()
    {
    	return [];
    }
}
