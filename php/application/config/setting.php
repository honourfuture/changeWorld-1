<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 项目配置
 */
define('LOGIN_STATUS', -1);//转登录页面状态
define('UPDATE_VALID', -404);//更新字段过滤值
define('ACCESS_REQUEST', 500);//非法操作

define('TEST_PAYMENT', 0);

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
    'bizid' => '',//21924 变更为客户自己域名
    //点播
    'secret_id' => 'AKIDoV3RfhcWYfpD4rsuAF8SWQEWjliYokPv',
    'secret_key' => 'Uq1d8NVSJySjuuiicKsHWfcR8f1c6OVh',
);

// 融云
$config['rongcloud'] = array(
    'app_key' => 'n19jmcy5n81n9',//n19jmcy5n81n9 p5tvi9dspn5p4
    'app_secret' => 'XQXnYJVnTW6iFM',//XQXnYJVnTW6iFM JzSzGK49rqMy
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
        //'app_id' => 'wx32eccca0c7b0b2d0',
        //'secret' => 'bdacd064ac8e8eb1e0379e304e00af1b',
        'app_id' => 'wx8409706b86b829aa',
        'secret' => '707ece43684f5329e6ba1cbaf1fafa08',
    ]
);

// alipay
$config['yansongda'] = [
    'alipay' => [
        'app_id' => '2018031502385108',
        'notify_url' => '',
        'return_url' => 'http://poll.kuaidi100.com',
        'ali_public_key' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmqT3s3C4Y2tl4/LaqiiP2ijG+ifajQfcX3UoHk/HMRFV+E0laMIUpVEHDE0Kk186uBdwB9BErhWAPkm0IOshc8N1lhySbgqCwdcmXbFiNJpQm7MjN6DnCof4H5dZb97y/8uBKledKLyUMOCSe/w8ueVouCOxaPoFx6K6C80UMmQo2P0kCLE6709bIckTZlKsIMCpCrbTDTuB5NavquPvzs4z8OYuKa74OmYnBygnx63eHWNGocyt21XJxxbS+dQZAyouJMbnv040fZgH6z/rSAeeCfg8jD/BCVNusF22pODV9WQb97BuEEEgSNmLslgNvOSINyxaNsQ9M+pwVYxe8wIDAQAB',
        'private_key' => 'MIIEpAIBAAKCAQEAuIuBsw5p0FIGNNb2L2wU+dfVp82jccCLRZopc20GtMGOKlrP7iHTOe2OM3G+1L4ltgVy9Rm9jPfUAVVK0vLQkhbcSre3TJ1jN6xJoKS2hJyZ2Ae9C04Z6M9XjZpA7ITFiITTlL1BzxrI/aqhVUm2Z649T6Eqy/dNIKMAvk1HrcZtegBtF7cQjdrSRxxcB25ixPGmxpyHl1hg03m81mLPheosfWJ/gnX9Cz7ZcesgtQteSGAY+CFEoKH5Jez42B9XKlRx6f4wkE6PDFjOLVNiluaMPTqhMFF1wHLCSDriZ1hJ5jl2NIWA5pOLxyoHCR83+3eFlwuqccwQ92pGzFoUmwIDAQABAoIBAQCreq41FIKMWXt84/X0UMkY806L01A5pgGD1mEH6Voe4e/ZOXMWwoWEwVGuSdZZ1qox/dQ5Hgb9E1gDOR8C7y+RX/6oyxde8Kw+EjCEPil/BgkKLP6jn5oBs5CWeqwzWpg2Z7426rlY2XnEBCZPmuQMaWJ9OLQMvSoE1pIdQrAFLtWP4SF6OmsFtOQb0DdGKHAqQ2G5Z9NqH/hjU+NZpUhLo6n6VXN+G919G0qgO45xP+cBe16oS43pGdD3LoX4RT3sOKQT6tF2CLP2E1gwQkqgq4SweIevqo7HxUeUXylasEIqeH1lD9ME1GWuL11/rVvN/WkqftZRSya/SqkGO97RAoGBAN1OV8YmQwPlRgQj57AW5i3rLZYVusclpQJ6sPjEavHlAoa4tlGX2SE47XU1U8gdjJrjhYrDv0+29ygdKYVCHlhOperyrlIdJyBgAVv9pPV4dxXjAgzbmpqk7YlfSsJkxUb5G1IxH02g/W2Q83gLD59QCCRiAbRZtQmlbqSDPXbpAoGBANV51ZXS3vflNHVqyo3jnFh4irZpHbp3bcjmV64oWuhw6x8aZSKyxIcRhwmhKrQzxU1h+guz4SAlc29ldbjlK1kkQQ3l3dfLuT77V7oBh6EyKuJG8hFueny2q6bzV/GXlIz2yKTalEcrgiOqdyFshFJhXfiWTXvdANhJOpfcTgTjAoGAWDqzo7v9W8A8ecoWxI1cl1H7iqp/HIZVkvd3NraYLHgw2aUqir0PQ79+bAwmqtGdDONIilogG5fGUafOteH2Vx6D53d5KCOXRcEAybwF2Bd+4qruVlH3AVBfozTqiTXDsNf/nHUZFcnpP5Vae7FtOQafOGIaa9yX4JCj29K23oECgYAgSjp1XB0f0AqcTBfxWGFYvHr21nWJs/DmN3lBvZbqm9HktYBgvDuf1pXfbgJgmYgZiV1iEcZWr3ODgQxKeFeTNzmj2YYx0v3lOe1uFDcoucbkzShmXJiobpUOPraps2zj2ZxF204cacdYj7tPUfO95j5pkIqN1sL+9CyptcgTUwKBgQCxD6vARkPCS2dh171fA2ld2eNhjRaXc02ptNWYqJI/9LTxgQP/nDfGimCkJeQKFYTTDEBxmPUAPGIwS2eayMsluUUvSX9KS/BqqIFhIjJ9qgZQlKToCPXDAIRVMWt+ntpjuFh/O8iGP+VHGoxtU2rfE9282aXHqNZ0MX19u1jlNw==',
        'log' => [
            'level' => 'debug',
            'file' => APPPATH.'logs'.DIRECTORY_SEPARATOR.'alipay.log'
        ],
    ]
];

// 快递100
$config['kuaidi100'] = [
    'url' => 'http://poll.kuaidi100.com/poll/query.do',
    'key' => 'JbEACpZW8625',
    'customer' => 'A7CE1F24DADFFAD00F3DBB8574757950'
];

// 极光推送
$config['push'] = [
    'app_key' => 'a66dd3d42daeddb7ac31383a',
    'master_secret' => 'f3f6e0c11711d2f70bb7a33a',
    'log_file' => APPPATH.'logs'.DIRECTORY_SEPARATOR.'jpush.log',
];

// 邀请链接
$config['invite_url'] = "http://cworld.ahkskj.cn/invite?code=";

//是否开发模式
//如果是开发模式，验证码6666
$config['is_dev'] = true;
//域名
$config['base_url'] = "http://cworld.ahkskj.cn";