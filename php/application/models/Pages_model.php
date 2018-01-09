<?php
/*
 * 系统管理员
 * @author sz.ljx
 * @link www.aicode.org.cn
 */

class Admin_model extends MY_Model
{
    public $_table        = 'admin';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
