<?php
/*
 * 主队列
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Queue_model extends MY_Model
{
    public $_table        = 'queue';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function main_type()
    {
        return [
            '主播粉丝数',
            '音频播放量',
            '音频点赞数(去掉)',
            '专辑收藏数',
            '活动浏览数&累计投票数',

            '直播观看人数',
            '直播聊天',
            ''
        ];
    }

    public function status()
    {
        return [
            '待执行',//0
            '执行中',//1
            '成功',//2
            '失败',//3
            '取消',//4
            '未启动',//5
        ];
    }

    public function trade_no()
    {
    	$random = mt_rand(0, 99999);
    	return date("YmdHis").str_pad($random, 5, 0);
    }

    public function check_run_status($flag, $item)
    {
    	$update = array('exe_times' => $item['exe_times'] + 1);
        if($flag){
            $update['status'] = 2;
        }else{
            if($update['exe_times'] >= $item['max_times']){
                $update['status'] = 3;
            }else{
                $update['status'] = 0;
            }
        }
        $this->update($item['id'], $update);
    }

    public function lock_rows($queue)
    {
    	if($queue){
	    	$a_lock = array();
	        foreach($queue as $item){
	            $a_lock[] = $item['id'];
	        }
	        $this->update_many($a_lock, array('status' => 1));
    	}
    }
}
