<?php
/*
 * 广告位
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Ad_position_model extends MY_Model
{
    public $_table        = 'ad_position';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function get_ad_position_id($control, $method_or_id = '')
    {
    	$init = array(
    		'shop' => array(//商城
    			'1' => 15,//热门
                '6' => 17,//美丽
                '4' => 18,//健康
                '7' => 19,//学习
                '13' => 20,//其他
    		),
            'knowledge' => array(//知识
                'live' => 1,//热门
            ),
    	);

    	if(isset($init[$control])){
    		if($method_or_id){
    			return isset($init[$control][$method_or_id]) ? $init[$control][$method_or_id] : 0;
    		}else{
    			return $init[$control];
    		}
    	}
    	return 0;
    }
}
