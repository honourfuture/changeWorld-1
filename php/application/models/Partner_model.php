<?php
/*
 * 城市合伙人
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Partner_model extends MY_Model
{
    public $_table        = 'partner';
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
            '城市合伙人',
            '二级分销'
        ];
    }
}
