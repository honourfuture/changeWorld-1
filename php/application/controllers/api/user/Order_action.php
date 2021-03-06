<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use JPush\Client;

class Order_action extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->load->model('Order_model');

        $order_id = $this->input->get_post('order_id');
        if(! $this->order = $this->Order_model->get($order_id)){
            $this->ajaxReturn([], 1, '订单不存在');
        }
        $this->action = $this->input->get_post('action');
    }

    /**
     * 订单库存退货
     */
    private function _backStocks()
    {
        $this->load->model('Order_items_model');
        $this->load->model('Goods_model');
        $sql = "SELECT * FROM {$this->Order_items_model->table()} WHERE `order_id`={$this->order['id']}";
        $arrOrderItems = $this->db->query($sql)->result_array();
        foreach ($arrOrderItems as $item){
            $sql = "UPDATE {$this->Goods_model->table()} SET `stock` = `stock` + {$item['num']} WHERE `seller_uid` = {$item['seller_uid']} AND `id` = {$item['goods_id']}";
            $this->db->query($sql);
        }
    }

    /**
     * @api {post} /api/user/order_action/buyer 订单操作-买家
     * @apiVersion 1.0.0
     * @apiName order_action_buyer
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/order_action/buyer
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} order_id 订单号
     * @apiParam {String} action {cancel:取消, del:删除, pay:付款, remind:提醒发货, refund:退款/退货, express:查看物流, goods_confirm:确认收货, evaluate:评价, invoice:申请发票}
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function buyer()
    {
        if($this->user_id != $this->order['buyer_uid']){
            $this->ajaxReturn([], 2, '订单操作非法');
        }

        $this->load->model('Order_items_model');
        $this->load->model('Goods_model');
        switch($this->action){
            case 'cancel'://取消
                if($this->order['status'] != 0){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                $this->db->trans_start();
                $this->Order_model->update($this->order['id'], ['status' => 1, 'enable' => 0]);
                $this->_backStocks();
                $this->db->trans_complete();
                if ($this->db->trans_status() === FALSE){
                    $this->ajaxReturn([], 5, '取消订单操作失败');
                }
                else{
                    $this->ajaxReturn();
                }
                break;
            case 'del'://取消=》删除
                if($this->order['status'] != 1){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                $this->db->trans_start();
                $this->Order_model->update($this->order['id'], ['deleted' => 1, 'enable' => 0]);
                $this->_backStocks();
                $this->db->trans_complete();
                if ($this->db->trans_status() === FALSE){
                    $this->ajaxReturn([], 5, '删除订单操作失败');
                }
                else{
                    $this->ajaxReturn();
                }
                break;
            case 'pay'://付款
                if(! $this->order['enable']){
                    $this->ajaxReturn([], 4, '订单已关闭');
                }
                if($this->order['status'] != 0){
                    $this->ajaxReturn([], 5, '订单操作状态不支持');
                }
                //进支付页
                break;
            case 'remind'://提醒发货
                if($this->order['status'] != 2){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                //提醒发货页
                break;
            case 'refund'://退款/退货
                if(! in_array($this->order['status'], [2, 3, 4, 5, 6])){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                $remark = $this->input->get_post('remark');
                if(! $remark){
                    $this->ajaxReturn([], 5, '请输入退款/退货说明');
                }

                $data = [];
                $data['remark'] = $remark;
                $data['user_id'] = $this->user_id;
                $data['order_id'] = $this->order['id'];
                $data['order_sn'] = $this->order['order_sn'];
                $data['seller_uid'] = $this->order['seller_uid'];

                $this->load->model('Order_refund_model');
                if($this->Order_refund_model->insert($data)){
                    $this->Order_model->update($this->order['id'], ['refund_status' => 1]);
                    $this->ajaxReturn();
                }else{
                    $this->ajaxReturn([], 5, '退款/退货提交失败');
                }
                break;
            case 'express'://查看物流
                $this->express();
                break;
            case 'goods_confirm'://确认收货
                if($this->order['status'] != 3){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                $this->db->trans_start();
                try{
                    //更新订单状态
                    $this->Order_model->update($this->order['id'], ['status' => 4]);
                    //处理消费产生的佣金及积分、经验
                    $this->load->model('Income_model');
                    $arrPriceList = $this->Income_model->income($this->order);
                    $this->db->trans_complete();
                    if ($this->db->trans_status() === FALSE){
                        throw new Exception("事务提交失败" . var_export($this->order, true));
                    }
                    else{
                        //处理消费获得的积分、经验
                        //$this->Order_model->dealIncomeExpPoint($this->order['buyer_uid'], $this->order['id']);
                        //商品评论 增加积分
                        //消费EXP增长
                        $this->checkCalculation('per_dollar', true, true);
                        $this->AddCalculation($this->order['buyer_uid'], 'per_dollar', ['price'=>$this->order['real_total_amount']]);
                        //收益EXP增长
                        $this->checkCalculation('per_income', true, true);
                        foreach ($arrPriceList as $userId => $price){
                            $this->AddCalculation($userId, 'per_income', ['price'=>$price]);
                        }
                        
                        $this->load->model('Users_model');
                        $seller = $this->Users_model->get($this->order['seller_uid']);
                        $cid = $seller['device_uuid'];
                        $buyer = $this->Users_model->get($this->order['buyer_uid']);
                        if(!empty($seller)){
                            $setting = config_item('push');
                            $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);
                        
                            $result = $client->push()
                                ->setPlatform('all')
                                ->addRegistrationId($cid)
                                ->setNotificationAlert($buyer['nickname'].'的订单已经确认收货')
                                ->send();
                        }
                        $this->ajaxReturn();
                    }
                }catch (\Exception $e){
                    $file = $e->getFile();
                    $msg = $e->getMessage();
                    $line = $e->getLine();
                    $message = "{$file} / {$msg} / {$line}";
                    $this->ajaxReturn([], 5, '确认收货操作失败' . $message);
                }
                /**
                if($this->Order_model->update($this->order['id'], ['status' => 4])){
                    //收益明细
                    $this->load->model('Users_model');
                    $user = $this->Users_model->get($this->order['buyer_uid']);
                    $user['to_user_id'] = $this->order['seller_uid'];
                    $this->load->model('Bind_shop_user_model');
                    if($bind = $this->Bind_shop_user_model->get_by(['shop_id' => $this->order['seller_uid'], 'user_id' => $this->order['buyer_uid']])){
                        $user['pid'] = $bind['invite_uid'];
                    }else{
                        $user['pid'] = 0;
                    }
                    $this->load->model('Income_model');
                    $order_data = ['id' => [$this->order['id']], 'real_total_amount' => $this->order['real_total_amount']];
                    $this->Income_model->goods($user, $order_data, $user['pid']);
                    $this->ajaxReturn();
                }else{
                    $this->ajaxReturn([], 5, '取消订单操作失败');
                }
                */
                break;
            case 'evaluate'://评价
                if($this->order['status'] != 4){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }

                $data = elements(
                    array(
                        'remark', 'is_anonymous', 'photos'
                    ),
                    $this->input->post(),
                    ''
                );
                if(empty($data['remark'])){
                    $this->ajaxReturn([], 5, '请输入评价描述');
                }
                $data['photos'] = json_encode($data['photos']);

                $data['user_id'] = $this->user_id;
                $data['order_id'] = $this->order['id'];
                $data['order_sn'] = $this->order['order_sn'];
                $data['seller_uid'] = $this->order['seller_uid'];

                $this->load->model('Order_evaluate_model');
                if($this->Order_evaluate_model->insert($data)){
                    //商品评论 增加积分
                    $this->checkCalculation('comment',true,true);
                    $this->AddCalculation($this->user_id,'comment',[]);

                    $this->Order_model->update($this->order['id'], ['status' => 5]);
                    $this->ajaxReturn();
                }else{
                    $this->ajaxReturn([], 5, '评价订单提交失败');
                }
                break;
            case 'invoice'://申请发票
                $this->invoice();
                break;
            default :
                $this->ajaxReturn([], 3, '订单操作状态错误');
                break;
        }
    }

    protected function express()
    {
        $ret = [];
        $this->load->model('Order_express_model');
        if(! $express = $this->Order_express_model->get_by(['order_id' => $this->order['id']])){
            $this->ajaxReturn([], 1, '确认商户是否已发货');
        }

        $config = config_item('kuaidi100');
        $param = [
            'com' => $express['com'],
            'num' => $express['number'],
            // 'from' => '广东省深圳市',
            // 'to' => '广东省深圳市',
            'resultv2' => 1
        ];
        $data = [
            'param' => json_encode($param, JSON_UNESCAPED_UNICODE)
        ];
        $data['customer'] = $config['customer'];
        $data['sign'] = strtoupper(md5($data['param'].$config['key'].$config['customer']));

        $response = Requests::POST($config['url'], [], $data);
        if($response->status_code != 200){
            $this->ajaxReturn([], 2, '网络异常，请隔段时间再查');
        }
        $result = json_decode($response->body, true);
        $info = [];
        if(isset($result['status']) && $result['status'] == 200){
            $info = $result['data'];
            $this->Order_express_model->update($express['id'], ['express_info' => json_encode($info)]);
        }

        if(! $info){
            if($express['express_info']){
                $info = json_decode($express['express_info'], true);
            }else{
                $this->ajaxReturn([], 3, $result['message']);
            }
        }

        $ret['express'] = $express['express'];
        $ret['number'] = $express['number'];
        $ret['info'] = $info;

        $this->ajaxReturn($ret);
    }

    protected function invoice()
    {
        if($this->order['status'] != 5){
            $this->ajaxReturn([], 4, '订单操作状态不支持');
        }

        $this->load->model('E_invoice_model');
        $data = elements(
            array(
                'invoice_type', 'invoice_title', 'invoice_number'
            ),
            $this->input->post(),
            ''
        );
        $type = $this->E_invoice_model->type();

        if(!isset($type[$data['invoice_type']])){
            $this->ajaxReturn([], 5, '发票抬头错误');
        }
        if(empty($data['invoice_title'])){
            $this->ajaxReturn([], 5, '发票名称必填');
        }
        if($data['invoice_type'] == 0 && empty($data['invoice_number'])){
            $this->ajaxReturn([], 5, '企业用户请输入税号');
        }

        $data['user_id'] = $this->user_id;
        $data['order_id'] = $this->order['id'];
        $data['order_sn'] = $this->order['order_sn'];
        $data['seller_uid'] = $this->order['seller_uid'];
        $data['invoice_amount'] = $this->order['real_total_amount'];

        if($this->E_invoice_model->insert($data)){
            $this->Order_model->update($this->order['id'], ['has_e_invoice' => 1]);
            $this->ajaxReturn();
        }else{
            $this->ajaxReturn([], 5, '申请发票提交失败');
        }
    }

    /**
     * @api {post} /api/user/order_action/seller 订单操作-卖家
     * @apiVersion 1.0.0
     * @apiName order_action_seller
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/order_action/seller
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} order_id 订单号
     * @apiParam {String} action {change_price:改价, goods_send:发货, express:查看物流, complete:退款/退货审核}
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function seller()
    {
        if($this->user_id != $this->order['seller_uid']){
            $this->ajaxReturn([], 2, '订单操作非法');
        }

        switch($this->action){
            case 'change_price'://改价
                $real_total_amount = (float)$this->input->get_post('real_total_amount');
                if($real_total_amount < 0.01){
                    $this->ajaxReturn([], 4, '请收入调价金额');
                }
                if($this->order['status'] != 0){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                if($this->Order_model->update($this->order['id'], ['real_total_amount' => $real_total_amount])){
                    $this->ajaxReturn();
                }else{
                    $this->ajaxReturn([], 5, '取消订单操作失败');
                }
                break;
            case 'goods_send'://发货
                if($this->order['status'] != 2){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }

                $data = elements(
                    array(
                        'express_id', 'number'
                    ),
                    $this->input->post(),
                    ''
                );
                $data['user_id'] = $this->user_id;
                $data['order_id'] = $this->order['id'];
                $data['order_sn'] = $this->order['order_sn'];

                $this->load->model('Express_model');
                if(! $express = $this->Express_model->get($data['express_id'])){
                    $this->ajaxReturn([], 4, '该快递公司不支持');
                }
                if(! $express['enable']){
                    $this->ajaxReturn([], 4, '该快递公司不支持');
                }
                $data['express'] = $express['name'];
                $data['com'] = $express['com'];
                if(empty($data['number'])){
                    $this->ajaxReturn([], 4, '快递单号必填');
                }

                $this->load->model('Order_express_model');
                if($this->Order_express_model->insert($data)){
                    $this->Order_model->update($this->order['id'], ['status' => 3]);
                    
                    //消息推送
                    $this->load->model('Users_model');
                    $user_to = $this->Users_model->get($this->order['buyer_uid']);
                    $cid = $user_to['device_uuid'];
                    if(!empty($cid)){
                            $setting = config_item('push');
                            $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);
                    
                            $result = $client->push()
                                ->setPlatform('all')
                                ->addRegistrationId($cid)
                                ->setNotificationAlert($user_to['nickname'].'您购买的商品已经发货了，请注意查收')
                                ->send();
                    }
                    $this->ajaxReturn();
                }else{
                    $this->ajaxReturn([], 5, '取消订单操作失败');
                }
                break;
            case 'express'://查看物流
                $this->express();
                break;
            case 'complete'://退款/退货标识已完成
                if($this->order['refund_status'] != 1){
                    $this->ajaxReturn([], 4, '订单操作状态不支持');
                }
                $this->db->trans_start();
                $this->Order_model->update($this->order['id'], ['refund_status' => 2, 'status' => 6]);
                $this->_backStocks();
                $this->db->trans_complete();
                if ($this->db->trans_status() === FALSE){
                    $this->ajaxReturn([], 5, '取消订单操作失败');
                }
                else{
                    $this->ajaxReturn();
                }
                break;
            default :
                $this->ajaxReturn([], 3, '订单操作状态错误');
                break;
        }
    }
}
