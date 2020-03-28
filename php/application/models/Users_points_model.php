<?php
/*
 * 会员积分日志
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_points_model extends MY_Model
{
    public $_table        = 'users_points';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
    

    /**
     * 取得指定时间段内累计增加积分
     * @param unknown $user_id
     * @param unknown $start
     * @param unknown $end
     * @return number
     */
    public function getUserPointSum($user_id, $start, $end)
    {        
        $curosr = $this->db->query(
                "SELECT SUM(`value`) AS total, is_add FROM users_points
                WHERE user_id={$user_id} AND created_at BETWEEN '{$start}' AND '{$end}' AND `deleted` = 0 AND `enable` = 1
                GROUP BY is_add"
        )->result_array();
        $arrPointTotal = ['inc'=>0, 'dec'=>0];
        foreach ($curosr as $row){
            $key = ($row['is_add'] == 1 ? 'inc' : 'dec');
            $arrPointTotal[$key] = $row['total'];
        }
        $sum = $arrPointTotal['inc'] - $arrPointTotal['dec'];
        return $sum;
    }
    
    /**
     * 积分日志入库
     */
    public function log($user_id, $rule_name, $point, $datetime, $curPoint, $is_add=1)
    {
        //写入积分日志
        $data = array(
                'user_id'=>$user_id,
                'rule_name'=>$rule_name,
                'value' => $point,
                'is_add' => $is_add,
                'created_at' => $datetime,
                'updated_at' => $datetime,
                'point' => $curPoint,
        		'remark' => '每元收益',
        );
        $this->db->insert('users_points', $data);
    }
}
