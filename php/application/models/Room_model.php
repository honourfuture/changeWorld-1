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

    public function __construct()
    {
        parent::__construct();
    }

    public function channel_id($user_id, $room_id)
    {
    	return 'zhumaidan-'.$user_id.'-'.$room_id;
    }

    public function get_roomid_by_channel($channel_id)
    {
        list($app_name, $user_id, $room_id) = explode('-', $channel_id);
        return $room_id;
    }
}
