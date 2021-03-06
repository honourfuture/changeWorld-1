<?php
/*
 * 文章类
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Article_class_model extends MY_Model
{
    public $_table        = 'article_class';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    //帮助
    public function help()
    {
    	return [1, 2, 3, 4, 5, 6];
    }
}
