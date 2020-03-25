<?php
/*
 * 提现
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Withdraw_model extends MY_Model
{
    public $_table        = 'withdraw';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    const WITHDRAW_STATUS_WAITING = 0;//待处理
    const WITHDRAW_STATUS_SUCCESS = 1;//已汇款
    const WITHDRAW_STATUS_EXCEPTION = 2;//异常
    public function __construct()
    {
        parent::__construct();
    }

    public function status()
    {
        return [
            '待处理',
            '已汇款',
            '异常'
        ];
    }
    
    /**
     * 取得累计已提现金额
     * @param number $user_id 用户ID
     * @param array $where 附加条件
     */
    public function getWithdrawed($user_id=0, $where)
    {
        if( empty($user_id) ){
            return 0;
        }
        $query = $this->db->select('sum(amount) amount')
                ->where('user_id', $user_id)
                ->where_in('status', [self::WITHDRAW_STATUS_WAITING, self::WITHDRAW_STATUS_SUCCESS]);
        if( !empty($where) ){
            $query = $query->where($where);
        }
        $result = $query->get($this->table())->row_array();
        return empty($result['amount']) ? 0 : $result['amount'];
    }
}
