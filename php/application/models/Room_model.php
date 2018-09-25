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
    public $before_update = array('updated_at');
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

    //$status 0预告 1直播中 2点播
    public function live_anchor($live, $status)
    {
        $a_uid = $a_tag = array();
        if($live){
            foreach($live as $key=>$item){
                $live[$key]['play_url'] = json_decode($item['play_url'], true);
                $live[$key]['tag_name'] = '';
                $live[$key]['live_status'] = $status;
                $a_uid[] = $item['anchor_uid'];
                $item['live_tag_id'] && $a_tag[] = $item['live_tag_id'];
            }

            //主播信息
            $this->db->select('id,nickname,v');
            $user = $this->Users_model->get_many($a_uid);
            $k_user = array();
            foreach($user as $item){
                $key = $item['id'];
                unset($item['id']);
                $k_user[$key] = $item;
            }

            //直播标签
            $k_tag = array();
            if($a_tag){
                $this->load->model('Live_tag_model');
                $this->db->select('id,name as tag_name');
                $tag = $this->Live_tag_model->get_many($a_tag);
                foreach($tag as $item){
                    $key = $item['id'];
                    unset($item['id']);
                    $k_tag[$key] = $item;
                }
            }

            foreach($live as $key=>$item){
                isset($k_user[$item['anchor_uid']]) && $live[$key] = array_merge($live[$key], $k_user[$item['anchor_uid']]);
                isset($k_tag[$item['live_tag_id']]) && $live[$key] = array_merge($live[$key], $k_tag[$item['live_tag_id']]);
            }
        }

        return $live;
    }

    // 直播类型
    public function type()
    {
        return [
            1 => '直播',
            2 => '预告'
        ];
    }

    public function status()
    {
        return [
            '新房间',//0
            '直播中',//1
            '断流',//2
            '禁播',//3
            '已结束',//4
        ];
    }
}
