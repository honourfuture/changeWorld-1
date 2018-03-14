<?php
/*
 * 订单主表
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Order_model extends MY_Model
{
    public $_table        = 'order';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function make_pay_sn()
    {
    	return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000);
    }

    public function make_order_sn($mid)
    {
    	return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000) . sprintf('%03d', (int) $mid % 1000);
    }

    //获取商户最优券自动抵扣
    public function format_seller_data(&$seller)
    {
    	if($seller){
    		foreach($seller as $seller_id=>$item){
    			$seller[$seller_id]['total'] = 0;//商户商品总金额
    			$seller[$seller_id]['ticket'] = 0;//使用优惠
    			$seller[$seller_id]['ticket_info'] = [];//优惠描述
    			$seller[$seller_id]['point'] = 0;//可使用总积分

    			if($item['goods']){
    				$sum_price = 0;
    				$ticket = [];
    				foreach($item['goods'] as $goods){
    					$seller[$seller_id]['point'] += $goods['use_point_rate'];
    					$seller[$seller_id]['total'] = round($seller[$seller_id]['total'] + ($goods['sale_price'] + $goods['freight_fee']) * $goods['num'], 2);
    					$sum_price += $goods['sale_price'] * $goods['num'];
    					if($goods['goods_ticket'] && $goods_ticket = json_decode($goods['goods_ticket'], true)){
    						$ticket[] = $goods_ticket;
    					}
    				}
    				//遍历优惠
    				if($ticket){
    					$max = 0;
    					foreach($ticket as $rows){
    						foreach($rows as $key=>$val){
	    						if($sum_price >= $val['full_amount'] && $val['free_amount'] > $max){
	    							$max = $val['free_amount'];
	    							$seller[$seller_id]['ticket_info'] = $val;
	    						}
    						}
    					}
    					$seller[$seller_id]['ticket'] = $max;
    				}
    			}
    		}
    	}
    }
}
