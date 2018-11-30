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

    public function siteConfig()
    {
        $config = array();

        $json = [
            'tpl_anchor_fans', 'tpl_audio_play', 'tpl_audio_comment',
            'tpl_album_favorite', 'tpl_live_fans', 'tpl_live_comment'
        ];

        $rows = $this->get_all();
        if($rows){
            foreach($rows as $item){
                $config[$item['name']] = in_array($item['name'], $json) ? json_decode($item['value'], true) : $item['value'];
            }
        }

        return $config;
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
	    		'phone' => '客服联系电话',
	    		'email' => '电子邮件',
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
    			'search_words' => '默认搜索',
    		),
    		'logo' => array(
    			'logo_image' => '网站Logo',
    			'buyer_image' => '会员中心Logo',
    			'seller_image' => '商家中心Logo',
    		),
            'rule' => array(
                'rule_point' => '积分规则',
                'rule_grade' => '等级说明',
                'rmb_to_gold' => '兑金币',
                'gold_to_rmb' => '转余额',
            ),
            'goods' => array(
                'goods_explain' => '商品说明',
            ),
            'withdraw' => [
                'withdraw_system' => '提现手续费',
                'withdraw_headhunter' => '提现猎头返利'
            ],
            'onoff' => [
                'goods_check' => '商品上架审核',
                'gift' => '虚拟礼物开放',//0隐藏 1显示
            ],
            'template' => [
                'tpl_anchor_fans' => '主播粉丝',
                'tpl_audio_play' => '音频播放',
                'tpl_audio_comment' => '音频评论',
                'tpl_album_favorite' => '专辑收藏',
                'tpl_live_fans' => '直播粉丝',
                'tpl_live_comment' => '直播评论',
            ],
    	);
    }
}
