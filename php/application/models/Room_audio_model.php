<?php
/*
 * 直播点播类
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Room_audio_model extends MY_Model
{
    public $_table        = 'room_audio';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
