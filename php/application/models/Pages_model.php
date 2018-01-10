<?php
/*
 * 单页管理
 * @author sz.ljx
 * @link www.aicode.org.cn
 */

class Pages_model extends MY_Model
{
    public $_table        = 'pages';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
