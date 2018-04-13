<?php
/*
 * 发红包
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Bag_model extends MY_Model
{
    public $_table        = 'bag';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_valid');
    public $before_update = array('updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    /*
     * 初始化红包
     * var $type 0:随机 1固定
     */
    public function init($bag_id, $room_id, $amount, $num ,$type = 0)
    {
    	$result = [];

    	if($type){
    		for($i = 0; $i < $num; $i++){
    			$result[] = [
    				'bag_id' => $bag_id,
    				'amount' => $amount,
    				'room_id' => $room_id
    			];
    		}
    	}else{
    		$min = 0.01;
    		for($i = 1; $i < $num; $i++){
    			//随机安全上限
	    		$safe_total = ($amount-($num-$i)*$min) / ($num-$i);
				$money = round(mt_rand($min*100, $safe_total*100) / 100, 2);
				$amount = round($amount - $money, 2);

				$result[] = [
    				'bag_id' => $bag_id,
    				'amount' => $money,
    				'room_id' => $room_id
    			];
    		}
    		$result[] = [
				'bag_id' => $bag_id,
				'amount' => $amount,
				'room_id' => $room_id
			];
    	}

    	return $result;
    }
}
