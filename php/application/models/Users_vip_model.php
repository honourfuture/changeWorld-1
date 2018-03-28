<?php
/*
 * 用户开通贵族
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_vip_model extends MY_Model
{
    public $_table        = 'users_vip';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function vip_info($user_id)
    {
    	$vip_info = ['name' => '', 'icon' => '', 'id' => 0];
    	$this->db->select('vip_id');
    	if($vip_user = $this->order_by('id', 'DESC')->get_by(['user_id' => $user_id, 'validity_time >' => time()])){
    		$this->load->model('Vip_model');
    		if($vip = $this->Vip_model->get($vip_user['vip_id'])){
    			$vip_info['name'] = $vip['name'];
    			$vip_info['icon'] = $vip['icon'];
    			$vip_info['id'] = $vip['id'];
    		}
    	}

    	return $vip_info;
    }
}
