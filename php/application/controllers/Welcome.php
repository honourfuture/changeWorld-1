<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud\Live\Query;
use RongCloud\RongCloud;

class Welcome extends Web_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('welcome_message');
	}

    public function notify()
    {
        $successful = true;
        $this->load->model('Users_recharge_model');
        $where = ['order_sn' => '112233445566778899'];
        if(! $recharge = $this->Users_recharge_model->get_by($where)){
            return false;
        }

        if($recharge['status'] == 1){
            return true;
        }

        $update = [];
        if($successful){
            $update['status'] = 1;

            $this->load->model('Users_model');
            if($user = $this->Users_model->get($recharge['user_id'])){
                $recharge_gold = $this->Users_model->rmb_to_gold($recharge['real_amount']);
                $gold = floor($user['gold'] + $recharge_gold);
                $this->Users_model->update($user['id'], ['gold' => $gold]);

                //资金明细
                $gold_log = [
                    'topic' => 0,
                    'from_user_id' => $recharge['user_id'],
                    'to_user_id' => $recharge['user_id'],
                    'item_title' => '',
                    'gold' => $recharge_gold
                ];
                $this->load->model('Gold_log_model');
                $this->Gold_log_model->insert($gold_log);
            }
        }else{
            $update['status'] = 2;
        }
        $this->Users_recharge_model->update($recharge['id'], $update);

        return true;
    }

    public function chat()
    {
        $config = config_item('rongcloud');
        $rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
        $result = $rongCloud->user()->getToken('userId1', 'username', 'http://www.rongcloud.cn/images/logo.png');
        echo $result;

        // echo $rongCloud->Chatroom()->create([1 => '龙哥聊天室']);
        // echo $rongCloud->Chatroom()->query(1);
    }

    public function room()
    {
        $live = new Query();
        $live->setAppInfo('1253104369', 'f6a34bbd23b89db693b88805aa49d223', '72b6cd0cf7b4bed16368193a244ee97d', 6077);
        $channel_id = 'zhumaidan-1-1';
        // echo $live->Live_Channel_GetStatus($channel_id);
        echo $live->Live_Channel_GetLiveChannelList();
    }

	public function area()
	{
		$this->load->model('Area_model');
        $this->db->select('id,fullname,pid,level');
        $area = $this->Area_model->order_by('pid', 'asc')->get_all();
        $rows = array();
        foreach($area as $item){
        	switch($item['level']){
        		case 1:
        			$pid = $item['id'];
        			$rows[$pid] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
        			break;
        		case 2:
        			$pid = $item['pid'];
        			$rows[$pid]['children'][$item['id']] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
        			break;
        		case 3:
        			$o_pid = str_pad(substr($item['pid'], 0, 2), 6, 0);
        			$pid = str_pad(substr($item['pid'], 0, 4), 6, 0);
        			$rows[$o_pid]['children'][$pid]['children'][] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
        			break;
        	}
        }

        $rows = array_values($rows);
        foreach($rows as $key=>$item){
        	$item['children'] && $rows[$key]['children'] = array_values($item['children']);
        }

        echo json_encode($rows, JSON_UNESCAPED_UNICODE);
	}

    public function sms()
    {
        $this->load->library('sms');
        var_export($this->sms->send(13430332489, array('code' => 1024), 0));
    }
}
