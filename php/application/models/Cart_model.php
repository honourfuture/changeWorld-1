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
    			$goods_num[$item['goods_id']] = array('num' => $item['num'], 'goods_attr' => $item['goods_attr']);
    		}
    	}

    	if($a_seller && $a_goods){
    		$this->load->model('Users_model');
    		$seller = $this->Users_model->get_many_user($a_seller);

    		$this->load->model('Goods_model');
    		$this->db->select('id,name,sale_price,seller_uid,default_image');
    		$goods = $this->Goods_model->get_many($a_goods);

    		foreach($goods as $item){
    			isset($goods_num[$item['id']]) && $item = array_merge($item, $goods_num[$item['id']]);
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
    		$update = array('num' => $data['num'], 'goods_attr' => $data['goods_attr']);
    		return $this->update($goods['id'], $update);
    	}else{
    		return $this->insert($data);
    	}
    }

    //批编辑
    public function save($buyer_uid, $goods_num)
    {
    	if($goods = $this->get_many_by('buyer_uid', $buyer_uid)){
    		$update = $delete = array();
    		foreach($goods as $item){
    			if(isset($goods_num[$item['goods_id']])){
    				if($goods_num[$item['goods_id']]){
    					$goods_num[$item['goods_id']] != $item['num'] && $this->update($item['id'], array('num' => $goods_num[$item['goods_id']]));
    				}else{
    					$delete[] = $item['id'];
    				}
    			}
    		}

    		$delete && $this->delete_many($delete);
    		return true;
    	}else{
    		return false;
    	}
    }
}
