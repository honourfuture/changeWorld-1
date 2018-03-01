<?php
/*
 * 直播房间
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Room_model extends MY_Model
{
    public $_table        = 'room';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public $user_id;
    public $room_id;

    public function __construct()
    {
        parent::__construct();
    }

    public function channel_id($user_id, $room_id)
    {
    	return 'zhumaidan-'.$user_id.'-'.$room_id;
    }

    public function set_userid_roomid_by_channel($channel_id)
    {
        list($app_name, $user_id, $room_id) = explode('-', $channel_id);
        $this->user_id = $user_id;
        $this->room_id = $room_id;
    }
}
