<?php
/*
 * 购物车
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Cart_model extends MY_Model
{
    public $_table        = 'cart';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    //个人购物车
    public function buyer($buyer_uid)
    {
    	$seller = array();
    	$cart = $this->get_many_by(array('buyer_uid' => $buyer_uid));
    	$a_seller = $a_goods = $goods_num = array();
    	if($cart){
    		foreach($cart as $item){
    			$a_goods[] = $item['goods_id'];
    			$a_seller[] = $item['seller_uid'];
    			$goods_num[$item['goods_id']] = $item['num'];
    		}
    	}

    	if($a_seller && $a_goods){
    		$this->load->model('Users_model');
    		$seller = $this->Users_model->get_many_user($a_seller);

    		$this->load->model('Goods_model');
    		$this->db->select('id,name,sale_price,seller_uid,goods_attr,default_image');
    		$goods = $this->Goods_model->get_many($a_goods);

    		foreach($goods as $item){
    			$item['num'] = isset($goods_num[$item['id']]) ? $goods_num[$item['id']] : 1;
    			if(isset($seller[$item['seller_uid']])){
    				!isset($seller[$item['seller_uid']]['goods']) && $seller[$item['seller_uid']]['goods'] = array();
    				$seller[$item['seller_uid']]['goods'][] = $item;
    			}
    		}
    	}

    	return $seller;
    }

    //添加
    public function add($data = array())
    {
    	$where = array('buyer_uid' => $data['buyer_uid'], 'goods_id' => $data['goods_id']);
    	$goods = $this->get_by($where);
    	if($goods){
    		$update = array('num' => $goods['num'] + $data['num']);
    		return $this->update($goods['id'], $update);
    	}else{
    		return $this->insert($data);
    	}
    }
}