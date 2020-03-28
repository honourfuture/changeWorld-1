<?php
/*
 * 会员经验值日志
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_grade_model extends MY_Model
{
    public $_table        = 'users_grade';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
    
    /**
     * 取得指定时间段内累计增加经验
     * @param unknown $user_id
     * @param unknown $start
     * @param unknown $end
     * @return number
     */
    public function getUserExpSum($user_id, $start, $end){
        
        $curosr = $this->db->query(
                "SELECT SUM(`value`) AS total, is_add FROM users_grade
                WHERE user_id={$user_id} AND created_at BETWEEN '{$start}' AND '{$end}' AND `deleted` = 0 AND `enable` = 1
                GROUP BY is_add"
        )->result_array();
        $arrExpTotal = ['inc'=>0, 'dec'=>0];
        foreach ($curosr as $row){
            $key = ($row['is_add'] == 1 ? 'inc' : 'dec');
            $arrExpTotal[$key] = $row['total'];
        }
        $sum = $arrExpTotal['inc'] - $arrExpTotal['dec'];
        return $sum;
    }
    
    /**
     * 经验日志入库
     */
    public function log($user_id, $rule_name, $exp, $datetime, $curExp, $is_add=1)
    {
        //写入积分日志
        $data = array(
                'user_id'=>$user_id,
                'rule_name'=>$rule_name,
                'value' => $exp,
                'is_add' => $is_add,
                'created_at' => $datetime,
                'updated_at' => $datetime,
                'point' => $curExp,
        );
        $this->db->insert('users_grade', $data);
    }

    /**
     * 会员等级升级
     */
    public function upgradeRank($user, $exp, $point)
    {
        $nowDatetime = date('Y-m-d H:i:s');
        $this->load->model('Grade_model');
        $arrGrade = $this->Grade_model->getExpRank($exp);
        if( $arrGrade['rank_rule_id'] > $user['rank_rule_id']){
            if( $user['rank_rule_id'] != 2 ){
                //通知(极光)
                $this->load->model('Push_model');
                $this->Push_model->send($userInfo, $user['nickname'] . '恭喜您升级成功！');
            }
            else{
                //铂金会员->钻石会员=>需要审核
                $arrVerify = [
                    'user_id' => $user['id'],
                    'from' => $user['rank_rule_id'],
                    'to' => $arrGrade['rank_rule_id'],
                    'status' => 0,
                    'created_at' => $nowDatetime
                ];
                $this->db->insert('users_rank_rule_verify', $arrVerify);
            }
        }
        //更新用户等级、经验、积分
        $sql = "UPDATE `users` SET point=point+{$point}, exp=exp+{$exp}, rand_rule_id={$arrGrade['rank_rule_id']}, updated_at='{$nowDatetime}' WHERE id={$user['id']}";
        $this->db->query($sql);        
    }
}
