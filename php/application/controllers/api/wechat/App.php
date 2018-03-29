<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use EasyWeChat\Foundation\Application;
use EasyWeChat\Payment\Order;

class App extends API_Controller {
    private $account_type = 1;
    private $original = [];

    public function __construct()
    {
        parent::__construct();

        $this->setting = config_item('wechat');
    }

    // 成功跳转，带签名校验参数
    protected function succeed_goto_page($user_id)
    {
        $this->load->model('User_model');
        if($info = $this->User_model->get($user_id)){
            $this->suid_type = $this->User_model->suid_type;
            $data = $this->login_success($info);
        }else{
            $this->user_bind([]);
        }
    }

    // 静默授权
    public function index()
    {
        $jsCode = $this->input->get_post('jsCode');
        if($jsCode){
            $app = new Application($this->setting);
            $open_platform = $app->open_platform;

            if($user = $mini_program->sns->getSessionKey($jsCode)){
                $user = $user->toArray();
                //判断是否已绑定
                $where = [
                    'account_type' => $this->account_type,
                    'unique_id' => $user['openid']
                ];
                $this->load->model('User_bind_model');
                $this->db->select('id,user_id,other');
                if($user_bind = $this->User_bind_model->get_by($where)){
                    $original = json_decode($user_bind['other'], true);
                    $original['bind_id'] = $user_bind['id'];
                    $this->original = $original;

                    if($user_bind['user_id']){//已绑定账号
                        //访问页 or 个人中心
                        $this->succeed_goto_page($user_bind['user_id']);
                    }else{//未绑定账号
                        $this->user_bind([]);
                    }
                }else{//未绑定账号&首次访问
                    $this->user_bind($user);
                }
            }else{
                log_message('error', 'mini_program oauth failed'.var_export($user, true));
                show_error('小程序授权服务异常错误');
            }
            $this->ajaxReturn($user);
        }else{
            $this->ajaxReturn([], 1, 'mini_program授权参数错误');
        }
    }

    protected function user_bind($user = [])
    {
        if($user){
            $data = [
                'account_type' => $this->account_type,
                'unique_id' => $user['openid'],
                'other' => json_encode($user),
            ];
            if($bind_id = $this->User_bind_model->insert($data)){
                $user['bind_id'] = $bind_id;
                $this->original = $user;
            }
        }

        $this->ajaxReturn($this->original, LOGIN_STATUS);
    }

    public function payment()
    {
        $this->check_sign();

        $params = elements(
            array(
                'recharge_id', 'amount'
            ),
            $this->requestData,
            0
        );
        $params['recharge_id'] = intval($params['recharge_id']);
        $params['amount'] = floatval($params['amount']);
        if(empty($params['recharge_id']) && empty($params['amount'])){
            $this->ajaxReturn([], 1, '请输入金额进行充值');
        }

        $params['real_amount'] = $params['amount'];

        $this->load->model('User_recharge_model');
        $order = new Order([
            'body' => '沙僧充值中心-会员充值',
            'out_trade_no' => $this->User_recharge_model->make_order_sn($this->suid),
            'total_fee' => $params['amount'] * 100,
            'notify_url' => site_url('/notify/wechat'),
            'trade_type' => 'JSAPI',
        ]);

        $app = new Application($this->setting);
        $result = $app->payment->prepare($order);
        if($result->return_code == 'SUCCESS' && $result->result_code == 'SUCCESS'){
            $data = [
                'order_sn' => $order['out_trade_no'],
                'amount' => $params['amount'],
                'real_amount' => $params['real_amount'],
                'suid' => $this->suid,
                'suid_type' => $this->suid_type
            ];
            $this->User_recharge_model->insert($data);
            $this->ajaxReturn($app->payment->configForPayment($result['prepay_id'], false));
        }else{
            $this->ajaxReturn([], 2, $result->return_msg);
        }
    }
}
