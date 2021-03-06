<?php
/*
 * 系统管理员授权token
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Income_platform_model extends MY_Model
{
    public $_table        = 'income_platform';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
