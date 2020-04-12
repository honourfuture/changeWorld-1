<?php
/*
 * 专辑音频评论
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Audio_play_seconds_model extends MY_Model
{
    public $_table        = 'audio_play_seconds';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_valid');
    public $before_update = array('updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

}
