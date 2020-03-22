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
    public $_joinTable        = 'order_items as oi';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
    
    /**
     * 订单运费
     * @param int $order_id 订单号
     */
    public function getFreightFee($order_id)
    {
    	$field = "sum(freight_fee) as freight_fee";
    	return $this->db->select($field)->get($this->table())->where('order_id', $order_id)->row_array();
    }

    // 商品评论
    public function getGoodsEvaluate($goods_id, $limit, $offset = 0)
    {
    	$result = array('total' => 0, 'list' => array(), 'user' => array());
		// $this->db->from('order_items');
		$this->db->join('order_evaluate', 'order_evaluate.order_id = order_items.order_id');
		$this->db->where('goods_id', $goods_id);
		$result['total'] = $this->db->count_all_results('order_items', false);

		if($result['total']){
			$this->db->select('order_evaluate.id,order_evaluate.created_at,order_evaluate.user_id,order_evaluate.remark,order_evaluate.is_anonymous,order_evaluate.photos');
			$this->db->limit($limit, $offset);
			$this->db->order_by('order_evaluate.id', 'DESC');
			$result['list'] = $this->db->get()->result_array();

			$a_user = array();
			if($result['list']){
				foreach($result['list'] as $item){
					$item['user_id'] && $a_user[] = $item['user_id'];
				}
			}
			if($a_user){
				$this->db->reset_query();
				$this->load->model('Users_model');
                $this->load->model('Grade_model');
				$result['user'] = $this->Users_model->get_many_user($a_user, 'id,nickname,header,mobi,pretty_id,exp');
				foreach ($result['user'] as &$user){
                    $grade = $this->Grade_model->exp_to_grade($user['exp']);
                    $user['lv'] = $grade['grade_name'];
                }
			}
		}else{
			$this->db->reset_query();
		}

		return $result;
    }


    public function crontabOrder()
    {
        $this->db->select("oi.id,o.real_total_amount,oi.base_percent,oi.rebate_percent,oi.buyer_uid,oi.seller_uid,oi.name,oi.goods_price");
        $this->db->from($this->_joinTable);
        $this->db->join('order as o', 'o.id = oi.order_id');
        $this->db->where_in('o.status', [4,5,6]);
        $this->db->where('oi.is_income', 0);
        $this->db->where('oi.rebate_percent >', 0);
        $this->db->order_by('oi.id', 'DESC');
        $orders = $this->db->get();
        $orders = $orders->result_array();
        $this->db->last_query();
        return $orders;
    }
}
