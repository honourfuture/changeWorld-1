<?php
/*
 * 收款码转账
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_support_model extends MY_Model
{
    public $_table        = 'users_support';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function status()
    {
        return [
            '待付款',
            '已付款',
            '失败',
        ];
    }

    public function make_pay_sn()
    {
    	return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000);
    }

    public function make_order_sn($mid)
    {
    	return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000) . sprintf('%03d', (int) $mid % 1000);
    }

    public function rank($activity_id, $per_page, $offset)
    {
        $ret = array('count' => 0, 'list' => array());

        $where = array('status' => 1, 'activity_id' => $activity_id);

        $this->db->group_by('user_id');
        $ret['count'] = $this->count_by($where);
        if($ret['count']){
            $order_by = array('money' => 'desc');
            $this->db->group_by('user_id');
            $this->db->select('sum(money) as money,user_id');
            if($list = $this->order_by($order_by)->limit($per_page, $offset)->get_many_by($where)){
                $a_user_id = [];
                foreach($list as $item){
                    $a_user_id[] = $item['user_id'];
                }

                $this->load->model('Users_model');
                $users = $this->Users_model->get_many_user($a_user_id);
                foreach($list as $item){
                    $ret['list'][] = array_merge($item, $users[$item['user_id']]);
                }
            }
        }

        return $ret;
    }
}
