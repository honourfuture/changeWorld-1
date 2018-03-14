<?php
/*
 * 站内信
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Mailbox_model extends MY_Model
{
    public $_table        = 'mailbox';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    //红点标识
    public function reddot($user_id)
    {
    	$this->db->select('id');
    	$order_by = array('sort' => 'desc', 'id' => 'desc');
    	$result = $this->order_by($order_by)->limit(50, 0)->get_by('enable', 1);
    	if($result){
	    	$this->load->model('Users_read_model');
	    	if($user_read = $this->Users_read_model->get_by(array('user_id' => $user_id, 'type' => 1))){
	    		if($user_read['ids']){
	    			foreach($result as $id){
	    				if(strpos($user_read['ids'], ','.$id.',') === false){
		                    return 1;
		                }
	    			}
	    			return 0;
	    		}else{
	    			return 1;
	    		}
	    	}else{
	    		return 1;
	    	}
	    }else{
	    	return 0;
	    }
    }
}
