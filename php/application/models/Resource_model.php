<?php
/*
 * 用户资源
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Resource_model extends MY_Model
{
    public $_table        = 'resource';
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
    		'ppt',
    		'bg_music'
    	];
    }
}
