<?php
/*
 * 专辑
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Album_model extends MY_Model
{
    public $_table        = 'album';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function audio(&$ret)
    {
        if($ret['list']){
        	$a_audio_id = array();
    		foreach($ret['list'] as $key=>$item){
    			$a_audio_id[] = $item['id'];
    			$ret['list'][$key]['audio_num'] = 0;
    			$ret['list'][$key]['play_times'] = 0;
    		}
    		$this->load->model('Room_audio_model');
    		$audio = $this->Room_audio_model->get_audio_info_by_album($a_audio_id);
    		if($audio){
    			foreach($ret['list'] as $key=>$item){
    				isset($audio[$item['id']]) && $ret['list'][$key] = array_merge($ret['list'][$key], $audio[$item['id']]);
    			}
    		}
        }
    }
}
