<?php
/*
 * 评论点赞
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Album_audio_comment_likes_model extends MY_Model
{
    public $_table        = 'album_audio_comment_likes';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_valid');
    public $before_update = array('updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
