<?php
/*
 * 购买记录
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Platform_income_model extends MY_Model
{
    public $_table        = 'platform_income';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
