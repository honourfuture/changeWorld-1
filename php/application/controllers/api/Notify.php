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

    // 微信收款码转账
    public function wechat_support()
    {
        $this->payment_type = 'wechat';
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            return $this->support($notify, true);
        });

        echo $response;
    }

    protected function support($notify, $successful)
    {
        is_array($notify) && $notify = (object)$notify;
        if(! isset($notify->out_trade_no)){
            return false;
        }

        $this->load->model('Users_support_model');
        $where = ['order_sn' => $notify->out_trade_no];
        if(! $recharge = $this->Users_support_model->get_by($where)){
            return false;
        }

        if($recharge['status'] == 1){
            return true;
        }

        $update = [];
        if($successful){
            $update['status'] = 1;

            $this->load->model('Users_model');
            if($user = $this->Users_model->get($recharge['to_user_id'])){
                $this->Users_model->update($user['id'], ['balance' => round($user['balance'] + $recharge['money'], 2)]);
                //金币明细
                /*$gold_log = [
                    'topic' => 0,
                    'from_user_id' => $recharge['user_id'],
                    'to_user_id' => $recharge['user_id'],
                    'item_title' => $recharge['real_amount'],
                    'item_id' => $recharge['id'],
                    'gold' => $recharge_gold
                ];
                $this->load->model('Gold_log_model');
                $this->Gold_log_model->insert($gold_log);*/

                //消费记录
                $this->load->model('Activity_model');
                $this->db->select('id,title,user_id');
                $activity = $this->Activity_model->get($recharge['activity_id']);
                $consume_record = [
                    'type' => 0,
                    'user_id' => $recharge['user_id'],
                    'item_title' => $activity ? $activity['title'] : '',
                    'item_id' => $recharge['activity_id'],
                    'item_amount' => $recharge['pay_money'],
                    'order_sn' => $notify->out_trade_no,
                    'topic' => 6,
                    'payment_type' => $this->payment_type
                ];
                $this->load->model('Consume_record_model');
                $this->Consume_record_model->insert($consume_record);
            }
        }else{
            $update['status'] = 2;
        }
        $this->Users_support_model->update($recharge['id'], $update);

        return true;
    }

    // 支付宝收款码转账
    public function alipay_support()
    {
        $this->payment_type = 'alipay';
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->support($notify, true);
        }else{
            $this->support([], false);
        }

        echo "success";
    }

    // 微信靓号
    public function wechat_pretty_payment()
    {
        $this->payment_type = 'wechat';
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            return $this->pretty($notify, $successful);
        });

        echo $response;
    }

    protected function pretty($notify, $successful)
    {
        is_array($notify) && $notify = (object)$notify;
        if(! isset($notify->out_trade_no)){
            return false;
        }

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

                //消费记录
                $consume_record = [
                    'type' => 0,
                    'user_id' => $service_log['user_id'],
                    'item_title' => $pretty['pretty_id'],
                    'item_id' => $pretty['id'],
                    'item_amount' => $service_log['amount'],
                    'order_sn' => $notify->out_trade_no,
                    'topic' => 1,
                    'payment_type' => $this->payment_type
                ];
                $this->load->model('Consume_record_model');
                $this->Consume_record_model->insert($consume_record);
            }
        }else{
            $update['status'] = 2;
        }

        //更新流水状态
        $this->Payment_log_model->update($service_log['id'], $update);

        return true;
    }

    // 支付宝良好
    public function alipay_pretty_payment()
    {
        $this->payment_type = 'alipay';
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->pretty($notify, true);
        }else{
            $this->pretty([], false);
        }

        echo "success";
    }

    // 微信服务
    public function wechat_service_payment()
    {
        $this->payment_type = 'wechat';
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            return $this->service($notify, $successful);
        });

        echo $response;
    }

    protected function service($notify, $successful)
    {
        is_array($notify) && $notify = (object)$notify;
        if(! isset($notify->out_trade_no)){
            return false;
        }

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
            //消费记录
            $consume_record = [
                'type' => 0,
                'user_id' => $service_log['user_id'],
                'item_title' => $service_log['title'],
                'item_id' => $service_log['t_id'],
                'item_amount' => $service_log['amount'],
                'order_sn' => $notify->out_trade_no,
                'topic' => $service_log['service'] + 2,
                'payment_type' => $this->payment_type
            ];
            $this->load->model('Consume_record_model');
            $this->Consume_record_model->insert($consume_record);

            //收益明细
            $this->t_id = $service_log['t_id'];
            $this->service = $service_log['service'];
            $this->service_format();
            $user['to_user_id'] = $this->row['anchor_uid'];
            $this->load->model('Bind_shop_user_model');
            if($bind = $this->Bind_shop_user_model->get_by(['shop_id' => $this->row['anchor_uid'], 'user_id' => $service_log['user_id']])){
                $user['pid'] = $bind['invite_uid'];
            }else{
                $user['pid'] = 0;
            }
            $this->load->model('Income_model');
            $order_data = $this->row;
            $order_data['service']  = $this->service;
            $this->Income_model->service($user, $order_data, $user['pid']);
        }else{
            $update['status'] = 2;
        }

        //更新流水状态
        $this->Payment_log_model->update($service_log['id'], $update);

        return true;
    }

    protected function service_format()
    {
        switch($this->service){
            case 0:
                $this->load->model('Room_model');
                $this->db->select('id,anchor_uid,cover_image,title,price,city_partner_rate,two_level_rate');
                $row = $this->Room_model->get($this->t_id);
                $message = '直播间不存在';
                break;
            case 1:
                $this->load->model('Room_audio_model');
                $this->db->select('id,anchor_uid,cover_image,title,price,city_partner_rate,two_level_rate');
                $row = $this->Room_audio_model->get($this->t_id);
                $message = '音频信息不存在';
                break;
            case 2:
                $this->load->model('Album_model');
                $this->db->select('id,anchor_uid,cover_image,title,price,city_partner_rate,two_level_rate');
                $row = $this->Album_model->get($this->t_id);
                $message = '专辑信息不存在';
                break;
            default :
                $this->ajaxReturn([], 1, '支付主题错误');
                break;
        }

        if(! $row){
            $this->ajaxReturn([], 2, $message);
        }

        $this->row = $row;
    }

    // 支付宝服务
    public function alipay_service_payment()
    {
        $this->payment_type = 'alipay';
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->service($notify, true);
        }else{
            $this->service([], false);
        }

        echo "success";
    }

    // 微信贵族
    public function wechat_vip_payment()
    {
        $this->payment_type = 'wechat';
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            return $this->vip($notify, $successful);
        });

        echo $response;
    }

    protected function vip($notify, $successful)
    {
        is_array($notify) && $notify = (object)$notify;
        if(! isset($notify->out_trade_no)){
            return false;
        }

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

            //消费记录
            $consume_record = [
                'type' => 0,
                'user_id' => $vip_log['user_id'],
                'item_title' => $vip['name'],
                'item_id' => $vip['id'],
                'item_amount' => $vip_log['amount'],
                'order_sn' => $notify->out_trade_no,
                'topic' => 0,
                'payment_type' => $this->payment_type
            ];
            $this->load->model('Consume_record_model');
            $this->Consume_record_model->insert($consume_record);
        }else{
            $update['status'] = 2;
        }

        //更新流水状态
        $this->Users_vip_log_model->update($vip_log['id'], $update);

        return true;
    }

    // 支付宝贵族
    public function alipay_vip_payment()
    {
        $this->payment_type = 'alipay';
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->vip($notify, true);
        }else{
            $this->vip([], false);
        }

        echo "success";
    }

    // 微信商品订单
    public function wechat_order_payment()
    {
        $this->payment_type = 'wechat';
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            return $this->order($notify, $successful);
        });

        echo $response;
    }

    protected function order($notify, $successful)
    {
        is_array($notify) && $notify = (object)$notify;
        if(! isset($notify->out_trade_no)){
            return false;
        }

        $attach = null;
        if(isset($notify->passback_params)){
            $attach = $notify->passback_params;
        }elseif(isset($notify->attach)){
            $attach = $notify->attach;
        }

        if(! in_array($attach, ['pay_sn', 'order_sn'])){
            log_message('error', '[wechat_order_payment] '.$notify);
            return false;
        }
        $this->load->model('Order_model');
        if($attach == 'pay_sn'){
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
                $consume_record = [];
                foreach($goods as $item){
                    $data[] = [
                        'goods_id' => $item['goods_id'],
                        'seller_uid' => $item['seller_uid'],
                        'num' => $item['num'],
                        'order_id' => $item['order_id']
                    ];

                    //消费记录
                    $consume_record[] = [
                        'type' => 0,
                        'user_id' => $order[0]['buyer_uid'],
                        'item_title' => $item['name'],
                        'item_id' => $item['goods_id'],
                        'item_amount' => $item['total_price'],
                        'order_sn' => $item['order_sn'],
                        'topic' => 5,
                        'payment_type' => $this->payment_type
                    ];
                }
                $this->Record_goods_model->insert_many($data);

                $this->load->model('Consume_record_model');
                $this->Consume_record_model->insert_many($consume_record);
            }
            //分佣
        }else{
            log_message('error', '[wechat_order_payment] '.$notify);
        }
        $update && $this->Order_model->update_many($a_order_id, $update);

        return true;
    }

    // 支付宝商品订单
    public function alipay_order_payment()
    {
        $this->payment_type = 'alipay';
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->order($notify, true);
        }else{
            $this->order([], false);
        }

        echo "success";
    }

    // 微信充值
    public function wechat_recharge()
    {
        $this->setting = config_item('wechat');
        $app = new Application($this->setting);
        $response = $app->payment->handleNotify(function($notify, $successful){
            return $this->recharge($notify, true);
        });

        echo $response;
    }

    protected function recharge($notify, $successful)
    {
        is_array($notify) && $notify = (object)$notify;
        if(! isset($notify->out_trade_no)){
            return false;
        }

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
    }

    // 支付宝充值
    public function alipay_recharge()
    {
        $this->setting = config_item('yansongda');
        $app = new Pay($this->setting);
        if($notify = $app->driver('alipay')->gateway('app')->verify($_REQUEST)){
            $this->recharge($notify, true);
        }else{
            $this->recharge([], false);
        }

        echo "success";
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

                        if($room_info = $this->Room_model->get($room_id)){
                            $insert['title'] = $room_info['title'];
                            $insert['cover_image'] = $room_info['cover_image'];
                        }

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
