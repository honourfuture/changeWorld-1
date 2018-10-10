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
        //主播自己
        $this->load->model('Room_model');
        if($room = $this->Room_model->get($room_id)){
            if($room['anchor_uid'] == $user_id){
                return true;
            }
        }else{
            return false;
        }

        //场控
        $this->load->model('Room_control_model');
        $where = [
            'user_id' => $room['anchor_uid'],
            'room_control_user_id' => $user_id
        ];
        if($this->Room_control_model->get_by($where)){
            return true;
        }

        //已付款
        $where = [
            'user_id' => $user_id,
            't_id' => $room_id,
            'service' => 0,
            'status' => 1
        ];

        return $this->get_by($where) ? true : false;
    }

    public function audio($user_id, $audio_id)
    {
        $this->load->model('Room_audio_model');
        if($audio = $this->Room_audio_model->get($audio_id)){
            //归属者
            if($audio['anchor_uid'] == $user_id){
                return true;
            }
        }

        //专辑白名单
        $this->load->model('White_model');
        if($this->White_model->get_by(['t_id' => $audio['album_id'], 'type' => 2, 'uid' => $user_id])){
            return true;
        }

        //购买专辑
        $flag = $this->album($user_id, $audio['album_id']);
        if($flag){
            return $flag;
        }

        //购买音频
        $where = [
            'user_id' => $user_id,
            't_id' => $audio_id,
            'service' => 1,
            'status' => 1
        ];

        return $this->get_by($where) ? true : false;
    }

    public function album($user_id, $album_id)
    {
        $this->load->model('Album_model');
        if($album = $this->Album_model->get($album_id)){
            if($album['anchor_uid'] == $user_id){
                return true;
            }
        }

        $where = [
            'user_id' => $user_id,
            't_id' => $album_id,
            'service' => 2,
            'status' => 1
        ];

        return $this->get_by($where) ? true : false;
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
