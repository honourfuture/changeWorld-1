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

    public function init($control, $position_id = 0)
    {
    	$init = array(
    		'shop' => array(//商城
    			'1' => 1,
    		),
    	);

    	if(isset($init[$control])){
    		if($position_id){
    			return isset($init[$control][$position_id]) ? $init[$control][$position_id] : 0;
    		}else{
    			return $init[$control];
    		}
    	}
    	return 0;
    }
}
