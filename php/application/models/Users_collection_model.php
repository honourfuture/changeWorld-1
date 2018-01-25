<?php
/*
 * 收藏&关注
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_collection_model extends MY_Model
{
    public $_table        = 'users_collection';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function check_fans($user_id, $t_id)
    {
    	return $this->get_by(array('user_id' => $user_id, 't_id' => $t_id, 'topic' => 1)) ? 1 : 0;
    }

    public function check_favorite($user_id, $t_id, $sub_topic)
    {
        return $this->get_by(array('user_id' => $user_id, 't_id' => $t_id, 'topic' => 2, 'sub_topic' => $sub_topic)) ? 1 : 0;
    }

    public function get_many_count_fans($a_user_id)
    {
        $this->db->select('t_id, COUNT(id) AS sum');
        $this->db->from($this->_table);
        $this->db->where('topic', 1);
        $this->db->where_in('t_id', $a_user_id);
        $this->db->group_by('t_id');
        $rows = $this->db->get()->result_array();

        $result = array();
        if($rows){
            foreach($rows as $item){
                $result[$item['t_id']] = $item['sum'];
            }
        }

        return $result;
    }
}
