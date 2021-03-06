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

    public function get_audio_info_by_album($a_album_id){
    	$this->db->select('album_id,count(`id`) as audio_num,sum(`play_times`) as play_times');
        $this->db->where('enable', 1);
    	$this->db->where_in('album_id', $a_album_id);
    	$this->db->group_by('album_id');
    	$result = $this->db->get($this->_table)->result_array();

    	$return = array();
    	if($result){
    		foreach($result as $item){
    			$album_id = $item['album_id'];
    			unset($item['album_id']);
    			$return[$album_id] = $item;
    		}
    	}
    	return $return;
    }

    public function get_many_count_music($a_user_id)
    {
        $this->db->select('anchor_uid, COUNT(id) AS sum');
        $this->db->from($this->_table);
        $this->db->where('album_id >', 0);
        $this->db->where('enable', 1);
        $this->db->where_in('anchor_uid', $a_user_id);
        $this->db->group_by('anchor_uid');
        $rows = $this->db->get()->result_array();

        $result = array();
        if($rows){
            foreach($rows as $item){
                $result[$item['anchor_uid']] = $item['sum'];
            }
        }

        return $result;
    }
}
