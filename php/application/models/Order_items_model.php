<?php
/*
 * 订单项目
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Order_items_model extends MY_Model
{
    public $_table        = 'order_items';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    // 商品评论
    public function getGoodsEvaluate($goods_id, $limit, $offset = 0)
    {
    	$result = array('total' => 0, 'list' => array());
		// $this->db->from('order_items');
		$this->db->join('order_evaluate', 'order_evaluate.order_id = order_items.order_id');
		$this->db->where('goods_id', $goods_id);
		$result['total'] = $this->db->count_all_results('order_items', false);

		$this->db->limit($limit, $offset);
		$this->db->order_by('order_evaluate.id', 'DESC');
		$result['list'] = $this->db->get()->result_array();

		return $result;
    }
}
