<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 异步通知
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use EasyWeChat\Foundation\Application;
use QCloud\Live\Query;
class Notify extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    // 微信充值
    public function wechat_recharge()
    {
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            $this->load->model('Users_recharge_model');
            $where = ['order_sn' => $notify->out_trade_no];
            if(! $recharge = $this->Users_recharge_model->get_by($where)){
                return false;
            }

            if($recharge['status'] == 1){
                return true;
            }

            $update = [];
            if($successful){
                $update['status'] = 1;

                $this->load->model('Users_model');
                if($user = $this->Users_model->get($recharge['user_id'])){
                    $recharge_gold = $this->Users_model->rmb_to_gold($recharge['real_amount']);
                    $gold = floor($user['gold'] + $recharge_gold);
                    $this->Users_model->update($user['id'], ['gold' => $gold]);

                    //资金明细
                    $gold_log = [
                        'topic' => 0,
                        'from_user_id' => $recharge['user_id'],
                        'to_user_id' => $recharge['user_id'],
                        'item_title' => $recharge['real_amount'],
                        'item_id' => $recharge['id'],
                        'gold' => $recharge_gold
                    ];
                    $this->load->model('Gold_log_model');
                    $this->Gold_log_model->insert($gold_log);
                }
            }else{
                $update['status'] = 2;
            }
            $this->Users_recharge_model->update($recharge['id'], $update);

            return true;
        });

        echo $response;
    }

    // 点播
    public function video()
    {
        $content = file_get_contents("php://input");
        log_message('error', '[notify video content] '.$content);
    }

    // 直播
    public function live()
    {
        $content = file_get_contents("php://input");
        log_message('error', '[notify live content] '.$content);
        if($data = json_decode($content, true)){
            //签名校验
            $channel_id = isset($data['channel_id']) ? $data['channel_id'] : $data['stream_id'];
            $this->load->model('Room_model');
            $this->Room_model->set_userid_roomid_by_channel($channel_id);
            $room_id = $this->Room_model->room_id;
            log_message('error', '[notify live room_id] '.$room_id);
            $update = [];
            switch($data['event_type']){
                case 0://断流
                    $update['status'] = 2;
                    break;
                case 1://推流
                    $update['status'] = 1;
                    break;
                case 100://新的录制文件已生成
                    if($data['duration'] > 300){
                        $this->load->model('Room_audio_model');
                        $insert = elements(
                            array(
                                'duration', 'start_time', 'end_time', 'file_id', 'file_size',
                                'video_id', 'video_url'
                            ),
                            $data,
                            UPDATE_VALID
                        );
                        $insert['room_id'] = $room_id;
                        $insert['anchor_uid'] = $this->Room_model->user_id;

                        $this->Room_audio_model->insert($insert);
                    }
                    break;
                case 200://新的截图文件已生成
                    break;
            }
            $update && $this->Room_model->update($room_id, $update);

            echo json_encode(array('code' => 0));
        }
    }
}
