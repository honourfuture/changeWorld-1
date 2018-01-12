<?php
/*
 * 地址库
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Area_model extends MY_Model
{
    public $_table        = 'area';
    public $primary_key   = 'id';
    public $before_create = array();
    public $before_update = array('updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
