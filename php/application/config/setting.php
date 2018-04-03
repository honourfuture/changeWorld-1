<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 项目配置
 */
define('LOGIN_STATUS', -1);//转登录页面状态
define('UPDATE_VALID', -404);//更新字段过滤值
define('ACCESS_REQUEST', 500);//非法操作

// QQ互联
define('CONNECT_QQ_APPID', '101437563');
define('CONNECT_QQ_APPKEY', '68eea7a3a58d29f262af2a18322f8da1');

// 微信开放平台
define('CONNECT_WEIXIN_APPID', 'wxe8d9630d3897200f');
define('CONNECT_WEIXIN_APPKEY', '72d3a3797ce11a73122175e49463f3b3');

// 新浪微博
define('CONNECT_WEIBO_APPID', '3729950905');
define('CONNECT_WEIBO_APPKEY', '7c97fef63ea8389142506246dcd3bccd');

// 跨域白名单
$config['white_list_url'] = array(
	'null', 'localhost', 'qichebaby.com', 'kuaimacode.com', '192.168.31.46'
);

// sms短信
$config['sms'] = array(
    'account' => '8H00010',
    'password' => '8H0001052'
);

// 邮箱
$config['mail'] = array(
    'account' => '1428452507@qq.com',
    'password' => 'smkyykvqtpjshhhb'
);

$config['weibo'] = array(
    'app_key' => '4205373700',
    'app_secret' => '0baf8cedc16e5e73b7587a144830a4b1'
);

// QQLive
$config['live'] = array(
	//直播
	'appid' => '1256014700',
	'api_key' => '03bf0596a1764280e524311cf5670fdc',
	'push_key' => '18b06646116701e01d32dce38414c22a',
	'bizid' => '21924',
	//点播
	'secret_id' => 'AKIDoV3RfhcWYfpD4rsuAF8SWQEWjliYokPv',
	'secret_key' => 'Uq1d8NVSJySjuuiicKsHWfcR8f1c6OVh',
);

// 融云
$config['rongcloud'] = array(
	'app_key' => 'p5tvi9dspn5p4',
	'app_secret' => 'JzSzGK49rqMy'
);

// 微信
$config['wechat'] = array(
	'app_id' => 'wx32eccca0c7b0b2d0',
	'secret' => 'bdacd064ac8e8eb1e0379e304e00af1b',
	'token' => 'f2161f9f30a72a6c0bcaa71a7a74b2e9',
	'aes_key' => '',
	'response_type' => 'array',
	'log' => [
		'level' => 'debug',
		'permission' => 0777,
		'file' => APPPATH.'logs'.DIRECTORY_SEPARATOR.'easywechat.log'
	],
    'payment' => [
        'merchant_id' => '1501096091',
        'key' => 'bdacd064ac8e8eb1e0379e304e00af1b',
        'cert_path' => '',
        'key_path' => '',
        'notify_url' => '',
    ],
    'open_platform' => [
    	'app_id' => 'wx32eccca0c7b0b2d0',
		'secret' => 'bdacd064ac8e8eb1e0379e304e00af1b',
    ]
);

// 快递100
$config['kuaidi100'] = [
	'url' => 'http://poll.kuaidi100.com/poll/query.do',
	'key' => 'JbEACpZW8625',
	'customer' => 'A7CE1F24DADFFAD00F3DBB8574757950'
];