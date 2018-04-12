<?php
/*
 * 购买记录
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Payment_log_model extends MY_Model
{
    public $_table        = 'payment_log';
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

    public function service()
    {
        return [
            '直播',//预告、直播中
            '音频',
            '专辑',
            '靓号',
        ];
    }

    public function live($user_id, $room_id)
    {
        $where = [
            'user_id' => $user_id,
            't_id' => $room_id,
            'service' => 0,
            'status' => 1
        ];

        return $this->get_by($where);
    }

    public function audio($user_id, $audio_id)
    {
        $where = [
            'user_id' => $user_id,
            't_id' => $audio_id,
            'service' => 1,
            'status' => 1
        ];

        return $this->get_by($where);
    }

    public function album($user_id, $album_id)
    {
        $where = [
            'user_id' => $user_id,
            't_id' => $album_id,
            'service' => 2,
            'status' => 1
        ];

        return $this->get_by($where);
    }

    public function make_pay_sn()
    {
        return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000);
    }

    public function make_order_sn($mid)
    {
        return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000) . sprintf('%03d', (int) $mid % 1000);
    }
}
