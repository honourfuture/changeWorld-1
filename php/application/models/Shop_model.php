<?php
/*
 * 店铺主表
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Shop_model extends MY_Model
{
    public $_table        = 'shop';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function status()
    {
    	return [
            1 => '待审核',
            2 => '已通过',
            3 => '已拒绝'
        ];
    }

    public function seller($where, $limit, $offset = 0)
    {
        $result = array('total' => 0, 'list' => array());
        $this->db->join('users', 'users.id = shop.user_id');
        $this->db->where($where);
        $result['total'] = $this->db->count_all_results('shop', false);

        if($result['total']){
            $this->db->select('users.mobi,users.sex,users.header,users.nickname,users.summary,users.v,users.exp,shop.*');
            $this->db->limit($limit, $offset);
            $this->db->order_by('users.id', 'DESC');
            $result['list'] = $this->db->get()->result_array();
        }else{
            $this->db->reset_query();
        }

        return $result;
    }
}
