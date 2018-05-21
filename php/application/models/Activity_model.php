<?php
/*
 * 活动
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Activity_model extends MY_Model
{
    public $_table        = 'activity';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function common(&$ret)
    {
        if($ret['list']){
            $a_goods_id = [];
            foreach($ret['list'] as $key=>$item){
                if(isset($item['photos'])){
                    $ret['list'][$key]['photos'] = json_decode($item['photos'], true);
                }
                $prize = json_decode($item['prize'], true);
                foreach($prize as $row){
                    $a_goods_id[] = $row['goods_id'];
                }

                $ret['list'][$key]['prize'] = $prize;
            }

            //查询商品
            $this->load->model('Goods_model');
            $this->db->select('id,name goods_name,sale_price,default_image');
            $k_goods = [];
            if($goods = $this->Goods_model->get_many($a_goods_id)){
                foreach($goods as $item){
                    $goods_id = $item['id'];
                    unset($item['id']);
                    $k_goods[$goods_id] = $item;
                }
            }

            //格式化数据
            if($k_goods){
                foreach($ret['list'] as $key=>$item){
                    foreach($ret['list'][$key]['prize'] as $id=>$goods){
                        isset($k_goods[$goods['goods_id']]) && $ret['list'][$key]['prize'][$id] = array_merge($ret['list'][$key]['prize'][$id], $k_goods[$goods['goods_id']]);
                    }
                }
            }
        }else{
        	$ret['list'] = [];
        }
    }
}
