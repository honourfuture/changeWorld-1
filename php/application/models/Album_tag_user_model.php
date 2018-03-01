<?php
/*
 * 专辑标签-用户自定义
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Album_tag_user_model extends MY_Model
{
    public $_table        = 'album_tag_user';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
