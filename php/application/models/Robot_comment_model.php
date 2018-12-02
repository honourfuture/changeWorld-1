<?php
/*
 * 机器人评论
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Robot_comment_model extends MY_Model
{
    public $_table        = 'robot_comment';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function topic()
    {
    	return [
    		'直播评论',
    		'音频评论'
    	];
    }
}
