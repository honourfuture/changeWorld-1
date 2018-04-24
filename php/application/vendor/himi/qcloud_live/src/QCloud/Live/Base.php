<?php
namespace QCloud\Live;

class Base
{
    # AppID
    protected $appid = '1253104369';
    # API鉴权key
    protected $api_key = 'f6a34bbd23b89db693b88805aa49d223';
    # 推流防盗链key
    protected $push_key = '72b6cd0cf7b4bed16368193a244ee97d';
    # 腾讯云分配bizid
    protected $bizid = '6077';
    # 接口url
    protected $url = '';
    # 统计URL
    protected $stat_url = '';
    # 视频直播过期时间
    protected $expire = 86400;
    protected $time   = 0;

    public function setAppInfo($appid, $api_key, $push_key, $bizid, $url = '', $stat_url = '')
    {
        $this->appid    = $appid;
        $this->api_key  = $api_key;
        $this->push_key = $push_key;
        $this->bizid    = $bizid;
        $this->url      = $url == '' ? 'http://fcgi.video.qcloud.com/common_access' : $url;
        $this->stat_url = $stat_url == '' ? 'http://statcgi.video.qcloud.com/common_access' : $stat_url;
    }

    /**
     *  获取签名
     *
     */
    public function getSign()
    {
        $this->time = strtotime('10 minute');
        return md5($this->api_key . $this->time);
    }
}
