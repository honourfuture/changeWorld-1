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

    // 关注主播
    public function get_collection_anchor($user_id, $limit, $offset = 0)
    {
        $result = array('total' => 0, 'list' => array());
        $this->db->join('users', 'users.id = users_collection.t_id');
        $this->db->where('users_collection.user_id', $user_id);
        $this->db->where('users_collection.topic', 1);
        // $this->db->where('users.anchor', 1);
        $result['total'] = $this->db->count_all_results('users_collection', false);

        if($result['total']){
            $this->db->select('users.id,users.header,users.nickname,users.summary,users.v,users.exp');
            $this->db->limit($limit, $offset);
            $this->db->order_by('users.id', 'DESC');
            $result['list'] = $this->db->get()->result_array();
        }else{
            $this->db->reset_query();
        }

        return $result;
    }
}
