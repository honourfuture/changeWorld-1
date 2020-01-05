<?php
/*
 * 积分规则
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Points_rule_model extends MY_Model
{
    public $_table        = 'points_rule';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function init()
    {
    	$list =  array(
    		'points_reg' => '会员注册',
    		'points_login' => '会员登陆',
    		'points_evaluate' => '订单评论',
            'points_pay' => '消费立返',
    		'points_order' => '订单上限',
            'goods_exchange' => '消费抵扣',
            'invite_reg' => '邀请注册',
            'pretty_buy' => '靓号积分购买',
            'audio_buy' => '音频积分购买'
    	);
    	//与配置表中的兼容
        $points_list = $this->get_many_by([
            'enable'=>1,
            'status'=>0,
            'show_name !='=>''
        ]) ;
        $points_rule = array_column($points_list,'show_name','name');
        return array_merge($points_rule,$list);
    }

    public function getAll(){
        $where = ['enable'=>1,'status'=>0];
        return $this->get_many_by($where);
    }

    public function getInfoByRuleName($rule_name){
        return $this->get_by(["name"=>$rule_name]);
    }

}
