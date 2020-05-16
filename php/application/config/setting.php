<?php
defined('BASEPATH') or exit('No direct script access allowed');

//是否生产环境
define('IS_PROD', 1);

//是否调试模式
define('DEBUG_MODE', 1);

/*
 * 项目配置
 */
define('LOGIN_STATUS', -1);//转登录页面状态
define('UPDATE_VALID', -404);//更新字段过滤值
define('ACCESS_REQUEST', 500);//非法操作

#分销原始帐号手机
define('SUPER_USER_MOBILE', '18664589318');

#测试支付配置
define('TEST_PAYMENT', (IS_PROD ? 0 : 1) );

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
    //'app_id' => 'wx32eccca0c7b0b2d0',
    //'secret' => 'bdacd064ac8e8eb1e0379e304e00af1b',
    //'token' => 'f2161f9f30a72a6c0bcaa71a7a74b2e9',
    'app_id' => 'wx8409706b86b829aa',
    'secret' => '707ece43684f5329e6ba1cbaf1fafa08',
    'token' => 'f2161f9f30a72a6c0bcaa71a7a74b2e9',
    'aes_key' => '',
    'response_type' => 'array',
    'log' => [
        'level' => 'debug',
        'permission' => 0777,
        'file' => APPPATH.'logs'.DIRECTORY_SEPARATOR.'easywechat.log'
    ],
    'payment' => [
        //'merchant_id' => '1501096091',
        //'key' => 'bdacd064ac8e8eb1e0379e304e00af1b',
        'merchant_id' => '1582302151',
        'key' => '2ab4d07fba40e2df139eb59e2990a8c4',
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
    /**
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
    */
    'alipay' => [
        'app_id' => '2021001144610065',
        'notify_url' => '',
        'return_url' => 'http://poll.kuaidi100.com',
        //'ali_public_key' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsPH/0hi7CQmd8lLGmTlrd+kNzwJ1vGiIx9ZmAB++0wSXM/cWUFxhUb22oVG1PZUeuAiPAesqr6fb+uBmC0kufHhFaQN+JaDwzNa+l2xNNi3EHb/47/xXN+HlhDwF6zaX3dZ/MW6iI67Ryta94H6ZQg5Dava9OD1r9UwubeepuyIqAsJsgtozcbF+EMTz3C2c52HnBIWWdOcMRsq5hJz/Vo2FlXa21dS8hnJriInA9vlkOdhR3PzWWbmTCd2r29ZiF/TBh27Lyxr8QktprUPheZitWFLfO+MhQ3SCfA978XaZbemE5Se5bSJB9CeOWMXY9JHLHS/C3OYZ3Hi9M1TKVwIDAQAB',
        'ali_public_key' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArFKRLKbfZa5CxG19Sg89W938ylPlZGy/McIeLWPOxOb2XeZXR1myLH/vcYE/82i3RLR28oyFU9hf+Q6QoTICbUkssQeWxG8C2GogObuBXHCfINbkf0OZF89y8GqcY4+bKhEwJueA0xAKFaG4ceWQdCcCO8dDgbRXCvkCNTTo/gg8c0ESqwO1fagRfmCLcx6qeE0xfpx2+oTIyU2pvLnmGgsZUjUHsgYl/zsQ817n78w+q6EYY7K4FSGZTlDNR6+VVfusRHyd3Va132AWaxGuXPCPJ7jqHaYruskVd5uk7++20S49bhpj2V38LO+CM1jMyuffSsHOxwWgGp6ttQNP3QIDAQAB',
        'private_key' => 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCw8f/SGLsJCZ3yUsaZOWt36Q3PAnW8aIjH1mYAH77TBJcz9xZQXGFRvbahUbU9lR64CI8B6yqvp9v64GYLSS58eEVpA34loPDM1r6XbE02LcQdv/jv/Fc34eWEPAXrNpfd1n8xbqIjrtHK1r3gfplCDkNq9r04PWv1TC5t56m7IioCwmyC2jNxsX4QxPPcLZznYecEhZZ05wxGyrmEnP9WjYWVdrbV1LyGcmuIicD2+WQ52FHc/NZZuZMJ3avb1mIX9MGHbsvLGvxCS2mtQ+F5mK1YUt874yFDdIJ8D3vxdplt6YTlJ7ltIkH0J45Yxdj0kcsdL8Lc5hnceL0zVMpXAgMBAAECggEAKE6oOOLbUF65dSb4CJV07rbPJ3Xm/glOBz/GsoaIwKcODo9drOauYKF3xd3IDIQ4oDGK6iP48FSrnsWZWT7NcRswrJBYHxg/YloUxoesOwhH4YMGoRx5fchesTW/H2qrQ6SGCuup0bkUH0G1tTsBjHOVVfto9TPAsPsupGieWHs5wTMmbw/88qhr0NtfI6bhV0Gscb2zBC32tgWkuf0sncPEvR9mjDkQVLboEOynFRjNQuvCTrLcU6ou1qRXHpuTVHuZJ99Pwuud+IRABRFZATqBlOF0SIFAfyxH0YXRSWXpRTCXLr3mHwfElGMPAgO9IU0cO6PjCQKnoD0vweDSIQKBgQDf8c2hCbCGmdxiraetsnYs5b2M0sjozyuFJ7dTPpLTcl88y2zrOLk8ld/OEvXzsqkrrI2krRvFZn/+wOyzenDdVEwwCGWKRnV/bxU78OcaJFUGoPkJsyTa7xffS1Xcvs2UF3urkIefb8vZcbLxJyUmiFeu2iXfzt6DLb4jCtH6sQKBgQDKRfY5cE6psaew/0spZ9fC5Y246WwSDM75r7HMYMrD+fx6d+XTKkrNF3W97EvvZTRz0dBoln0pmYQPkE64tiEVKkobbOK/iJnhYK1uwUKpR7nR+Tt2Zg+ohyPyZki050IAmmNqq36zLCLIZcphd3mmHCR6Um9xJL0aypAk6trHhwKBgQDZEAQzGjQ7Uzk1gIKtrvQysoBW1hyc4+mYCBX+nwEr6Ij9YWPyXynU2qRylxhEnSCyT29/dbccUCyyHgeQM5bgQQwT5p+dNow+98nKLseiJCMx6KdayoRnnSYzbk8MRvj2mQhrFA0Q8gjRfA5pBntQ7QioV5QsadRtq9HHH37GEQKBgQCH6NhXocmJJdCaEf9rs9V6pAlE3Lp7qlWL2Wyq+cJkSd1GYLdw2nLmOUQot9QR57uFss3I6Izy3a6pUnpCjEXQVdjzcocs0NksYWxHBd4HpiUKG9/DXzJYN22E2wsxWk2z4Ai6zL5WH2rDofmI4eFAJpqwAiHVMS1LCh4uYAtekwKBgQDMMBUiv7biHs6xHt9tjTBOkBUF8K+87WCA9C07qmDTZ5WHYqTsAhp/gMQJwCSstZ9Zv/EWaAKZT0PbMpM+9KbCMXTleAXffrxQJOgi8TnaE9zuDrnolVR9fXRdspDNxBFS7C/eDP6izVCOysOt7KTALj140EtH77dI1fRoxGvUUA==',
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
    //'app_key' => 'a66dd3d42daeddb7ac31383a',
    //'master_secret' => 'f3f6e0c11711d2f70bb7a33a',
    'app_key' => '0588e14bcd180dbe69b3f34f',
    'master_secret' => 'cfff10a24857a56e5fee0799',
    'log_file' => APPPATH.'logs'.DIRECTORY_SEPARATOR.'jpush.log',
];


//是否开发模式
//如果是开发模式，验证码6666
$config['is_dev'] = true;
//域名
$config['base_url'] = "https://www.luomashichang.cn/";

// 邀请链接
$config['invite_url'] = $config['base_url'] . "invite?code=";