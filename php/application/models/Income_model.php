<?php
/*
 * 收益
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Income_model extends MY_Model
{
    public $_table        = 'income';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function type()
    {
        return [
            '销售',
            '分销',
            '充值'
        ];
    }

    public function topic()
    {
    	return [
    		'知识',
    		'直播',
    		'商品',
    		'充值'
    	];
    }

    public function sub_topic()
    {
    	return [
    		[1 => '专辑', 2 => '音频']
    	];
    }

    public function sum_income_topic_group($user_id = 0)
    {
    	$ret = [
    		'goods' => 0,
			'live' => 0,
			'knowledge' => 0
    	];
    	$this->db->select('topic,sum(amount) amount');
    	if($user_id){
    		$this->db->where('user_id', $user_id);
    	}
    	$this->db->group_by('topic');
    	if($result = $this->db->get($this->table())->result_array()){
    		foreach($result as $item){
    			switch($item['topic']){
    				case 0:
    					$ret['knowledge'] = $item['amount'];
    					break;
    				case 1:
    					$ret['live'] = $item['amount'];
    					break;
    				case 2:
    					$ret['goods'] = $item['amount'];
    					break;
    			}
    		}
    	}

    	return $ret;
    }
}
