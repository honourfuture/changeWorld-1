<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud\Live\Query;

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
