<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 异步通知
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use EasyWeChat\Foundation\Application;
use Yansongda\Pay\Pay;
use QCloud\Live\Query;
class Notify extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    // 微信靓号
    public function wechat_pretty_payment()
    {
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            $this->load->model('Payment_log_model');

            $where = ['order_sn' => $notify->out_trade_no];
            if(! $service_log = $this->Payment_log_model->get_by($where)){
                return false;
            }

            if($service_log['status'] == 1){
                return true;
            }

            $update = [];
            if($successful){
                $update['status'] = 1;

                //更新销售状态
                $this->load->model('Pretty_model');
                if($pretty = $this->Pretty_model->get($service_log['t_id'])){
                    $this->Pretty_model->update($service_log['t_id'], ['status' => 1, 'buyer_id' => $service_log['user_id']]);

                    //更新个人靓号
                    $this->load->model('Users_model');
                    $this->Users_model->update($service_log['user_id'], ['pretty_id' => $pretty['pretty_id']]);
                }
            }else{
                $update['status'] = 2;
            }

            //更新流水状态
            $this->Payment_log_model->update($service_log['id'], $update);

            return true;
        });

        echo $response;
    }

    // 微信服务
    public function wechat_service_payment()
    {
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            $this->load->model('Payment_log_model');

            $where = ['order_sn' => $notify->out_trade_no];
            if(! $service_log = $this->Payment_log_model->get_by($where)){
                return false;
            }

            if($service_log['status'] == 1){
                return true;
            }

            $update = [];
            if($successful){
                $update['status'] = 1;

                //收藏
                if(in_array($service_log['service'], [1, 2])){
                    $sub_topic = ($service_log['service'] == 1) ? 20 : 21;
                    $this->load->model('Users_collection_model');
                    $data = [
                        'user_id' => $service_log['user_id'],
                        't_id' => $service_log['t_id'],
                        'topic' => 2,
                        'sub_topic' => $sub_topic
                    ];
                    $this->Users_collection_model->insert($data);
                }
            }else{
                $update['status'] = 2;
            }

            //更新流水状态
            $this->Payment_log_model->update($service_log['id'], $update);

            return true;
        });

        echo $response;
    }

    // 微信贵族
    public function wechat_vip_payment()
    {
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            $this->load->model('Users_vip_log_model');
            $this->load->model('Users_vip_model');
            $this->load->model('Vip_model');

            $where = ['order_sn' => $notify->out_trade_no];
            if(! $vip_log = $this->Users_vip_log_model->get_by($where)){
                return false;
            }

            if($vip_log['status'] == 1){
                return true;
            }

            $update = [];
            if($successful){
                $update['status'] = 1;

                if(! $vip = $this->Vip_model->get($vip_log['vip_id'])){
                    return false;
                }
                //更新用户贵族
                $user_vip = $this->Users_vip_model->get_by(['user_id' => $vip_log['user_id'], 'vip_id' => $vip_log['vip_id']]);
                if($user_vip){
                    $add_time = max($user_vip['validity_time'], time());
                    $data = [
                        'validity_time' => strtotime('+'.$vip['days'].' days', $add_time)
                    ];
                    $this->Users_vip_model->update($user_vip['id'], $data);
                }else{
                    $data = [
                        'user_id' => $vip_log['user_id'],
                        'vip_id' => $vip_log['vip_id'],
                        'validity_time' => strtotime('+'.$vip['days'].' days')
                    ];
                    $this->Users_vip_model->insert($data);
                }

                $this->load->model('Users_model');
                $this->db->set('gold', 'gold + '.$vip_log['gold'], false);
                $this->db->where('id', $vip_log['user_id']);
                $this->db->update($this->Users_model->table());
                //金币明细
                $gold_log = [
                    'topic' => 3,
                    'from_user_id' => $vip_log['user_id'],
                    'to_user_id' => $vip_log['user_id'],
                    'item_title' => $vip_log['amount'],
                    'item_id' => $vip_log['id'],
                    'gold' => $vip_log['gold']
                ];
                $this->load->model('Gold_log_model');
                $this->Gold_log_model->insert($gold_log);
            }else{
                $update['status'] = 2;
            }

            //更新流水状态
            $this->Users_vip_log_model->update($vip_log['id'], $update);

            return true;
        });

        echo $response;
    }

    // 微信商品订单
    public function wechat_order_payment()
    {
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            if(! in_array($notify->attach, ['pay_sn', 'order_sn'])){
                log_message('error', '[wechat_order_payment] '.$notify);
                return false;
            }
            $this->load->model('Order_model');
            if($notify->attach == 'pay_sn'){
                $where = ['pay_sn' => $notify->out_trade_no];
            }else{
                $where = ['order_sn' => $notify->out_trade_no];
            }
            if(! $order = $this->Order_model->get_many_by($where)){
                return false;
            }

            $a_order_id = [];
            foreach($order as $item){
                $a_order_id[] = $item['id'];
            }

            $update = [];
            if($successful){
                $update['status'] = 2;

                //商品销售记录
                $this->load->model('Order_items_model');
                if($goods = $this->Order_items_model->get_many_by(['order_id' => $a_order_id])){
                    $this->load->model('Record_goods_model');
                    $data = [];
                    foreach($goods as $item){
                        $data[] = [
                            'goods_id' => $item['goods_id'],
                            'seller_uid' => $item['seller_uid'],
                            'num' => $item['num'],
                            'order_id' => $item['order_id']
                        ];
                    }
                    $this->Record_goods_model->insert_many($data);
                }
                //分佣
            }else{
                log_message('error', '[wechat_order_payment] '.$notify);
            }
            $update && $this->Order_model->update_many($a_order_id, $update);

            return true;
        });

        echo $response;
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

                    //金币明细
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

    // 支付宝充值
    public function alipay_recharge()
    {
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->load->model('Users_recharge_model');
            $where = ['order_sn' => $notify['out_trade_no']];
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

                    //金币明细
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

            echo "success";
        }
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
                    if(true || $data['duration'] > 300){
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
