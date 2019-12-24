<?php
/*
 * 等级经验级别设置
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Grade_level_model extends MY_Model
{
    public $_table        = 'grade_level';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function exp_to_level($exp)
    {
    	$ret = ['before_level_name' => '', 'level_name' => '', 'after_level_name' => '', 'diff' => 0, 'exp' => $exp];

    	$order_by = array('grade_demand' => 'asc');
		if($one = $this->Grade_level_model->order_by($order_by)->get_by(['enable' => 1, 'grade_demand <' => $exp])){
			$ret['before_level_name'] = $one['name'];
			$ret['before_level_rule'] = $one['rule'];
			$ret['before_level_icon'] = $one['icon'];
			$ret['before_level_remark'] = $one['remark'];
		}

		if($one = $this->Grade_level_model->order_by($order_by)->get_by(['enable' => 1, 'grade_demand' => $exp])){
			$ret['level_name'] = $one['name'];
			$ret['level_rule'] = $one['rule'];
			$ret['level_icon'] = $one['icon'];
			$ret['level_remark'] = $one['remark'];
		}else{
			$ret['level_name'] = isset($ret['before_level_name']) ? $ret['before_level_name'] : '';
            $ret['level_rule'] = isset($ret['before_level_rule']) ? $ret['before_level_rule'] : '';
            $ret['level_icon'] = isset($ret['before_level_icon']) ? $ret['before_level_icon'] : '';
            $ret['level_remark'] = isset($ret['before_level_remark']) ? $ret['before_level_remark'] : '';
		}

		if($one = $this->Grade_level_model->order_by($order_by)->get_by(['enable' => 1, 'grade_demand >' => $exp])){
			$ret['after_level_name'] = $one['name'];
            $ret['after_l..evel_rule'] = $one['rule'];
            $ret['after_level_icon'] = $one['icon'];
            $ret['after_level_remark'] = $one['remark'];
			$ret['diff'] = $one['grade_demand'] - $exp;
		}

		return $ret;
    }


}
