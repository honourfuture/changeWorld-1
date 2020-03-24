<?php
/*
 * 系统极光推送
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

use JPush\Client;

class Push_model extends MY_Model
{
    public $_table        = 'push';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
    
    public function add()
    {

    }

    public function send($userInfo, $message)
    {
        if( empty($$userInfo) || empty($userInfo['device_uuid']) || empty($message) ){
            return false;
        }
        $setting = config_item('push');
        $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);

        $this->db->insert($this->table(), ['created_at'=>date('Y-m-d H:i:s'), 'summary'=>$message]);
        $push_id = $this->db->insert_id();
        if( empty($push_id) ){
            return false;
        }

        $registrationId = $userInfo['device_uuid'];
        $result = $client->push()
            ->setPlatform('all')
            // ->addAllAudience()
            ->addRegistrationId($registrationId)
            ->setNotificationAlert($message)
            ->send();
        $body = [];
        if($result['http_code'] == 200){
            $body = $result['body'];
        }
        $update = [
            'sendno' => isset($body['sendno']) ? $body['sendno'] : 0,
            'msg_id' => isset($body['msg_id']) ? $body['msg_id'] : '',
            'http_code' => $result['http_code'],
            'times' => 1
        ];
        $this->db->update($push_id, $update);

        return ($result['http_code'] == 200);
    }
}
