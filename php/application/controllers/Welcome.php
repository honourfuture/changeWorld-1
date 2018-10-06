<?php
defined('BASEPATH') or exit('No direct script access allowed');

use JPush\Client;
use QCloud\Live\Query;
use RongCloud\RongCloud;

class Welcome extends Web_Controller
{

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     *         http://example.com/index.php/welcome
     *    - or -
     *         http://example.com/index.php/welcome/index
     *    - or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        $this->db->where('id', 2);
        $this->db->group_start();
        $this->db->where_not_in('mobi', ['134', '8899']);
        $this->db->or_where_not_in('mobi', ['134', '8899']);
        $this->db->group_end();
        $this->load->model('Users_model');
        $this->Users_model->get_all();
        echo $this->db->last_query();exit();

        $this->load->driver('cache');
        $cache_id = 'live_join_93_55';
        $cache = $this->cache->file->get($cache_id);

        var_export($cache);
    }

    public function cron()
    {
        $queue = [];

        $anchor_uid = 10000013;
        $this->load->model('Queue_model');

        //关注
        $params = [
            'step_times' => 5,
            'step_num'   => '1',
            'max'        => 100,
            'id'         => $anchor_uid,
        ];
        $queue[] = [
            'main_type' => 'fans',
            'sub_type'  => $anchor_uid,
            'params'    => json_encode($params),
            // 'status' => 5
        ];

        //播放次数
        $audio_id = 1;
        $room_id  = 1;
        $params   = [
            'step_times' => 5,
            'step_num'   => '10-99',
            'max'        => 100,
            // 'anchor_uid' => $anchor_uid,
            // 'room_id' => $room_id,
            'id'         => $audio_id,
        ];
        $queue[] = [
            'main_type' => 'audio_play',
            'sub_type'  => $audio_id,
            'params'    => json_encode($params),
            // 'status' => 5
        ];

        //专辑收藏
        $album_id = 1;
        $params   = [
            'step_times' => 5,
            'step_num'   => '10-99',
            'max'        => 100,
            'id'         => $album_id,
        ];
        $queue[] = [
            'main_type' => 'album_collection',
            'sub_type'  => $album_id,
            'params'    => json_encode($params),
            // 'status' => 5
        ];

        //活动
        $activity_id = 1;
        $params      = [
            'step_times' => 5,
            'step_num'   => '10-99',
            'max'        => 100,
            'id'         => $activity_id,
        ];
        $queue[] = [
            'main_type' => 'activity',
            'sub_type'  => $activity_id,
            'params'    => json_encode($params),
            // 'status' => 5
        ];

        //直播
        $live_id = 58;
        $params      = [
            'step_times' => 5,
            'step_num'   => '10-99',
            'max'        => 100,
            'id'         => $live_id,
        ];
        $queue[] = [
            'main_type' => 'live_join',
            'sub_type'  => $live_id,
            'params'    => json_encode($params),
            // 'status' => 5
        ];

        $this->Queue_model->insert_many($queue);
    }

    public function push()
    {
        $appKey       = 'a66dd3d42daeddb7ac31383a';
        $masterSecret = 'f3f6e0c11711d2f70bb7a33a';
        $logFile      = APPPATH . 'logs' . DIRECTORY_SEPARATOR . 'jpush.log';
        $client       = new Client($appKey, $masterSecret, $logFile);

        $registrationId = '1517bfd3f796d7071c1';
        $result         = $client->push()
            ->setPlatform('all')
        // ->addAllAudience()
            ->addRegistrationId($registrationId)
            ->setNotificationAlert('还会再来购买了雪糕')
            ->send();

        var_export($result);
        // $this->testSimplePushToAll();
    }

    public function testSimplePushToAll()
    {
        $payload = $this->payload;
        $result  = $payload->build();

        var_export($result);exit();

        $this->assertTrue(is_array($result));
        $this->assertEquals(4, count($result));
        $this->assertArrayHasKey('platform', $result);
        $this->assertArrayHasKey('audience', $result);
        $this->assertArrayHasKey('notification', $result);
        $this->assertArrayHasKey('options', $result);
    }

    public function truncate()
    {
        $config = [
            'activity_class', 'app_version', 'grade_rule',
            'ad', 'ad_position', 'admin', 'album_class', 'admin_access', 'admin_role',
            'album_tag', 'anchor_class', 'app_map', 'area', 'article',
            'article_class', 'bank', 'config', 'express', 'goods_attr_category',
            'goods_class', 'grade', 'help', 'live_class', 'live_gift',
            'live_tag', 'mailbox', 'pretty', 'recharge', 'search_words',
            'security_question', 'vip', 'robot_nickname', 'robot_header'
        ];
        $tables = $this->db->list_tables();

        foreach ($tables as $table) {
            if (!in_array($table, $config)) {
                $this->db->truncate($table);
            }
        }
    }

    public function kuaidi()
    {
        $url = 'http://poll.kuaidi100.com/poll/query.do';

        $com   = 'yuantong';
        $num   = '813304321148'; //813304321148
        $param = [
            'com'      => $com,
            'num'      => $num,
            // 'from' => '广东省深圳市',
            // 'to' => '广东省深圳市',
            'resultv2' => 1,
        ];
        $data = [
            'param' => json_encode($param, JSON_UNESCAPED_UNICODE),
        ];

        $key      = 'JbEACpZW8625';
        $customer = 'A7CE1F24DADFFAD00F3DBB8574757950';

        $data['customer'] = $customer;
        $data['sign']     = strtoupper(md5($data['param'] . $key . $customer));

        // var_export($data);
        $response = Requests::POST($url, [], $data);
        echo $response->body;
    }

    public function notify()
    {
        $successful = true;
        $this->load->model('Users_recharge_model');
        $where = ['order_sn' => '112233445566778899'];
        if (!$recharge = $this->Users_recharge_model->get_by($where)) {
            return false;
        }

        if ($recharge['status'] == 1) {
            return true;
        }

        $update = [];
        if ($successful) {
            $update['status'] = 1;

            $this->load->model('Users_model');
            if ($user = $this->Users_model->get($recharge['user_id'])) {
                $recharge_gold = $this->Users_model->rmb_to_gold($recharge['real_amount']);
                $gold          = floor($user['gold'] + $recharge_gold);
                $this->Users_model->update($user['id'], ['gold' => $gold]);

                //资金明细
                $gold_log = [
                    'topic'        => 0,
                    'from_user_id' => $recharge['user_id'],
                    'to_user_id'   => $recharge['user_id'],
                    'item_title'   => '',
                    'gold'         => $recharge_gold,
                ];
                $this->load->model('Gold_log_model');
                $this->Gold_log_model->insert($gold_log);
            }
        } else {
            $update['status'] = 2;
        }
        $this->Users_recharge_model->update($recharge['id'], $update);

        return true;
    }

    public function chat()
    {
        $config    = config_item('rongcloud');
        $rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
        // $result = $rongCloud->user()->getToken('userId1', 'username', 'http://www.rongcloud.cn/images/logo.png');
        // echo $result;

        // echo $rongCloud->Chatroom()->create([1 => '龙哥聊天室']);
        // echo $rongCloud->Chatroom()->query(1);

        $fromUserId   = 10000027;
        $chat_room_id = [30];
        $content      = [
            "cmd" => "enter",
            "userId" => $fromUserId,
            "name" => "小明",
            "lv" => 1,
            "avtar" => "http://xxxxx",
            "vip" => "贵族2",
            "icon" => "图标",
        ];
        $result = $rongCloud->message()->publishChatroom($fromUserId, $chat_room_id, 'RC:TxtMsg', json_encode(['content' => json_encode($content)]));
        print_r($result);
    }

    public function room()
    {
        $live = new Query();
        $live->setAppInfo('1253104369', 'f6a34bbd23b89db693b88805aa49d223', '72b6cd0cf7b4bed16368193a244ee97d', 6077);
        $channel_id = 'zhumaidan-1-1';
        // echo $live->Live_Channel_GetStatus($channel_id);
        echo $live->Live_Channel_GetLiveChannelList();
    }

    public function area()
    {
        $this->load->model('Area_model');
        $this->db->select('id,name,fullname,pid,level');
        $area = $this->Area_model->order_by('pid', 'asc')->get_all();
        $rows = array();
        $city = [110000, 120000, 310000, 500000, 810000, 820000];
        foreach ($area as $item) {
            if(in_array($item['id'], [710000])){
                continue;
            }
            switch ($item['level']) {
                case 1:
                    $pid        = $item['id'];
                    if(in_array($pid, $city)){
                        $rows[$pid] = array('value' => $item['id'], 'label' => $item['name'], 'children' => array(
                            $pid => array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array())
                        ));
                    }else{
                        $rows[$pid] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
                    }
                    break;
                case 2:
                    $pid                                 = $item['pid'];
                    if(in_array($pid, $city)){
                        $rows[$pid]['children'][$pid]['children'][] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
                    }else{
                        $rows[$pid]['children'][$item['id']] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
                    }
                    break;
                case 3:
                    $o_pid                                        = str_pad(substr($item['pid'], 0, 2), 6, 0);
                    $pid                                          = str_pad(substr($item['pid'], 0, 4), 6, 0);
                    $rows[$o_pid]['children'][$pid]['children'][] = array('value' => $item['id'], 'label' => $item['fullname'], 'children' => array());
                    break;
            }
        }

        $rows = array_values($rows);
        foreach ($rows as $key => $item) {
            $item['children'] && $rows[$key]['children'] = array_values($item['children']);
        }

        echo json_encode($rows, JSON_UNESCAPED_UNICODE);
    }

    public function sms()
    {
        $this->load->library('sms');
        var_export($this->sms->send(13430332489, array('code' => 1024), 0));
    }

    public function n_sms()
    {
        $account = 'ywfwhy';
        $password = 'ywfwhy';
        $post = [
            'userid' => '153',
            'timestamp' => date("YmdHis"),
            'mobile' => '13430332489',
            'content' => '【猪买单平台】您的验证码是：1024。请不要把验证码泄露给其他人，若非本人操作请忽略。',
            'sendTime' => '',
            'action' => 'send',
            'extno' => ''
        ];
        $post['sign'] = strtolower(md5($account.$password.$post['timestamp']));

        try {
            $url = 'http://47.95.231.135:8888/v2sms.aspx';
            $response = Requests::post($url, [], $post);
            $xml = $response->body;
            $result = json_decode(json_encode((array) simplexml_load_string($xml)), true);
            var_export($result);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}
