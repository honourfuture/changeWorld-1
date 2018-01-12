<?php
/*
 * 短信/邮件发生记录
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Sms_email_record_model extends MY_Model
{
    public $_table        = 'sms_email_record';
    public $primary_key   = 'id';
    public $before_create = array('verify');
    public $before_update = array();
    public $protected_attributes = array('id');

    protected $wait_time_loop = 180;//秒

    public function __construct()
    {
        parent::__construct();
    }

    public function verify($row)
    {
    	$now_time = time();
    	$last = $this->order_by('id', 'DESC')->get_by('account', $row['account']);
    	if($last && $now_time < $last['created_at'] + $this->wait_time_loop){
    		header('Content-type: application/json; charset=utf-8');
    		$ret = array();
    		$ret['data'] = "";
	        $ret['status'] = 1;
	        $ret['message'] = '验证码发送频率为: '.$this->wait_time_loop.'秒/次';
	        echo json_encode($ret);exit();
    	}
    	$this->load->helper('string');
        $row['verify'] = random_string('numeric', 4);

        $row['created_at'] = time();
        $row['ip'] = $this->input->ip_address();

        return $row;
    }
}
