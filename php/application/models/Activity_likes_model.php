<?php
/*
 * 点赞
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Activity_likes_model extends MY_Model
{
    public $_table        = 'activity_likes';
    public $primary_key   = 'id';
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
