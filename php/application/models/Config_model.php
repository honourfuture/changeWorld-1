<?php
/*
 * 系统配置
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Config_model extends MY_Model
{
    public $_table        = 'config';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function init()
    {
    	return array(
    		'site' => array(
    			'site_name' => '站点名称',
	    		'icp_number' => 'ICP证书号',
	    		'statistics_code' => '第三方流量统计代码',
	    		'copyright' => '版权信息',
	    		'site_status' => '站点状态',
	    		'closed_reason' => '关闭原因',
    		),
    		'upload' => array(
    			'image_max_filesize' => '图片文件大小',
    			'image_allow_ext' => '文件扩展名',
    		),
    		'email' => array(
    			'email_host' => 'SMTP 服务器',
    			'email_port' => 'SMTP 端口',
    			'email_addr' => '发信人邮件地址',
    			'email_id' => 'SMTP 身份验证用户名',
    			'email_pass' => 'SMTP 身份验证密码',
    			'email_test' => '测试接收的邮件地址',
    		),
    		'search' => array(
    			'default_search' => '默认搜索',
    			'hot_search' => '热门搜索',
    		),
    	);
    }
}
