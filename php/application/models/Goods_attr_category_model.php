<?php
/*
 * 商品属性类
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Goods_attr_category_model extends MY_Model
{
    public $_table        = 'goods_attr_category';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function array_keys_value()
    {
    	$result = array();
    	$rows = $this->get_all();
    	if($rows){
    		foreach($rows as $item){
    			$result[$item['id']] = $item['name'];
    		}
    	}

    	return $result;
    }
}
