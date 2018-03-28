<?php
/*
 * 等级经验设置
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Grade_model extends MY_Model
{
    public $_table        = 'grade';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function exp_to_grade($exp)
    {
    	$ret = ['before_grade_name' => '', 'grade_name' => '', 'after_grade_name' => '', 'diff' => 0, 'exp' => $exp];

    	$order_by = array('grade_demand' => 'desc', 'id' => 'desc');
		if($one = $this->Grade_model->order_by($order_by)->get_by(['enable' => 1, 'grade_demand <' => $exp])){
			$ret['before_grade_name'] = $one['grade_name'];
		}

		if($one = $this->Grade_model->order_by($order_by)->get_by(['enable' => 1, 'grade_demand' => $exp])){
			$ret['grade_name'] = $one['grade_name'];
		}else{
			$ret['grade_name'] = $ret['before_grade_name'];
		}

		if($one = $this->Grade_model->order_by($order_by)->get_by(['enable' => 1, 'grade_demand >' => $exp])){
			$ret['after_grade_name'] = $one['grade_name'];
			$ret['diff'] = $one['grade_demand'] - $exp;
		}

		return $ret;
    }

    public function rule()
    {
    	return '';
    }
}
