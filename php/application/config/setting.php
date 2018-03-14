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

// QQLive
$config['live'] = array(
	'appid' => '1253104369',
	'api_key' => 'f6a34bbd23b89db693b88805aa49d223',
	'push_key' => '72b6cd0cf7b4bed16368193a244ee97d',
	'bizid' => '6077'
);

// 融云
$config['rongcloud'] = array(
	'app_key' => 'p5tvi9dspn5p4',
	'app_secret' => 'JzSzGK49rqMy'
);