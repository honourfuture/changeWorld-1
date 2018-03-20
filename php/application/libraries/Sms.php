<?php
/*
 * 短信类
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
defined('BASEPATH') or exit('No direct script access allowed');

class Sms
{
    public $server_name = '【猪买单平台】';
    private $a_tpl_sms   = array(
        '您的验证码是：#code#。请不要把验证码泄露给其他人，若非本人操作请忽略。',
        '您的验证码是：#code#。请不要把验证码泄露给其他人，若非本人操作请忽略。',
    );
    // 短信发送接口地址
    private $_url = 'https://dx.ipyy.net/smsJson.aspx';
    //短信模式0测试模式 1正常模式
    private $_sms_mode = 1;

    public function getMsg($sms_id, $data = array())
    {
        $str           = isset($this->a_tpl_sms[$sms_id]) ? $this->a_tpl_sms[$sms_id] : '';
        if (empty($str)) {
            return $str;
        }
        if ($data) {
            foreach ($data as $key => $val) {
                $str = str_replace('#' . $key . '#', $val, $str);
            }
        }
        return $str;
    }

    /**
     * 发送手机短信
     * @param Number $mobile 手机号
     * @param Array $params 短信参数
     * @param Number $params 短信模板
     */
    public function send($mobile, $params = array(), $sms_id = 0)
    {
        $res = array('status' => 0, 'message' => '');
        if ($this->_sms_mode) {
	        $url = 'https://dx.ipyy.net/smsJson.aspx';
	        $sms = config_item('sms');
	        $msg = $this->getMsg($sms_id, $params);
	        if(empty($msg)){
	            $res['status'] = 1;
	            $res['message'] = '模板未开启';
	            return $res;
	        }

	        $msg = $this->server_name.$msg;

	        $data = array(
	            'userid' => '',
	            'account' => $sms['account'],
	            'password' => strtoupper(md5($sms['password'])),
	            'content' => $msg,
	            'action' => 'send',
	            'extno' => ''
	        );
	        $data['mobile'] = $mobile;

	        $return = Requests::post($url, array(), $data);

	        $flag = false;
	        $message = '';
	        if(isset($return->body) && $ret = json_decode($return->body, true)){
	            if(strtoupper($ret['returnstatus']) == 'SUCCESS'){
	                $flag = true;
	            }
	            isset($ret['message']) && $message = $ret['message'];
	        }else{
	            $message = '网络异常请稍后重试';
	        }

	        if(! $flag){
	            $res['status'] = 2;
	            $res['message'] = empty($message) ? '短信接口报错' : $message;
	            log_message('error', 'sms = '.var_export($return, true));
	        }
        }

        return $res;
    }
}
