<?php
/*
 * 帮助管理
 * @author sz.ljx
 * @link www.aicode.org.cn
 */

class Help_model extends MY_Model
{
    public $_table        = 'help';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
