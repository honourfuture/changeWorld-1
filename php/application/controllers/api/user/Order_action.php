<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Order_action extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Order_model');

        $this->action = $this->input->get_post('action');
    }

    public function buyer()
    {
    	switch($this->action){
    		case 'cancel'://取消
    			break;
    		case 'del'://取消=》删除
    			break;
    		case 'pay'://付款
    			break;
    		case 'remind'://提醒发货
    			break;
    		case 'refund'://退单/退款
    			break;
    	}
    }

    public function seller()
    {

    }
}
