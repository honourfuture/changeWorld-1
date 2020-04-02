<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Order extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Order_model');
    }

    /**
     * @api {get} /api/admin/order 订单管理-列表
     * @apiVersion 1.0.0
     * @apiName order
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/order
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} status -1全部
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
        $ret = ['list' => [], 'user' => []];

        $ret['status'] = $this->Order_model->status();
        $ret['refund_status'] = $this->Order_model->refund_status();

        $where = [];
        $status = $this->input->get_post('status');
        $order_sn = $this->input->get_post('order_sn');
        if(isset($ret['status'][$status])){
            $where['status'] = $status;
        }else{
            $where['1 >'] = 0;
        }

        if($order_sn){
            $where['order_sn'] = $order_sn;
        }

        $order_by = array('id' => 'desc');
        $ret['count'] = $this->Order_model->count_by($where);
        if($ret['count']){
            $this->db->select('id,created_at,updated_at,status,order_sn,seller_uid,total_amount,real_total_amount,buyer_uid, commission, commission_users, point, exp');
            $ret['list'] = $this->Order_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

            $a_uid = [];
            foreach($ret['list'] as $item){
                $a_uid[] = $item['seller_uid'];
                $a_uid[] = $item['buyer_uid'];
            }
            $k_user = [];
            $this->load->model('Users_model');
            $this->db->select('id,mobi,header,nickname,v,exp,sex,balance,point,gold');
            $users = $this->Users_model->get_many($a_uid);
            foreach($users as $item){
                $ret['user'][$item['id']] = $item;
            }
        }

        $this->ajaxReturn($ret);
    }

    /**
     * @api {get} /api/admin/order/view 订单管理-详情
     * @apiVersion 1.0.0
     * @apiName order_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/order/view
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function view()
    {
        $ret = ['user' => []];

        $ret['status'] = $this->Order_model->status();
        $ret['refund_status'] = $this->Order_model->refund_status();

        $id = $this->input->get_post('id');
        if($order = $this->Order_model->get($id)){
            //订单
            $ret['order'] = $order;

            $a_uid = [];
            $a_uid[] = $order['seller_uid'];
            $a_uid[] = $order['buyer_uid'];
            //用户
            $this->load->model('Users_model');
            $this->db->select('id,mobi,header,nickname,v,exp,sex,balance,point,gold');
            $users = $this->Users_model->get_many($a_uid);
            foreach($users as $item){
                $ret['user'][$item['id']] = $item;
            }

            //商品
            $this->load->model('Order_items_model');
            $ret['goods'] = $this->Order_items_model->get_many_by('order_id', $order['id']);

            //发票
            $this->load->model('E_invoice_model');
            $this->db->select('id,invoice_type,invoice_title,invoice_number');
            if($invoice = $this->E_invoice_model->get_by(['user_id' => $order['buyer_uid'], 'order_id' => $order['id']])){
                //to do something
            }else{
                $invoice = [];
            }
            $ret['invoice'] = $invoice;

            //评论
            $this->load->model('Order_evaluate_model');
            $this->db->select('id,remark,is_anonymous,photos');
            if($evaluate = $this->Order_evaluate_model->get_by(['user_id' => $order['buyer_uid'], 'order_id' => $order['id']])){
                $evaluate['photos'] = json_decode($evaluate['photos'], true);
            }else{
                $evaluate = [];
            }
            $ret['evaluate'] = $evaluate;

            $this->ajaxReturn($ret);
        }else{
            $this->ajaxReturn([], 1, '查看用户详情ID错误');
        }
    }

    protected function check_params($act, $params)
    {
        switch($act){
            case 'add':
                break;
            case 'edit':
                break;
        }
    }
    
    /**
     * 分销数据统计
     */
    public function distribution()
    {
        $ret = ['data' => [], 'status' => -1, 'message'=>'fail'];
        
        $where = [];
        $order_sn = $this->input->get_post('order_sn');
        $user_id = $this->input->get_post('user_id');
        if($order_sn){
            $where['order_sn'] = $order_sn;
        }
        if($user_id){
            $where['user_id'] = $user_id;
        }
        $where['`status`>='] = 4;//4-待评论、5-已经完成、6-已结束
        
        $order_by = array('id' => 'desc');
        $count = $this->Order_model->count_by($where);
        if( empty($ret['count']) ){
            $this->ajaxReturn($ret);
        }
        
        $this->db->select('id,created_at,updated_at,status,order_sn,seller_uid,total_amount,real_total_amount,buyer_uid');
        $ret['list'] = $this->Order_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
    
        $a_uid = [];
        foreach($ret['list'] as $item){
            $a_uid[] = $item['seller_uid'];
            $a_uid[] = $item['buyer_uid'];
        }
        $k_user = [];
        $this->load->model('Users_model');
        $this->db->select('id,mobi,header,nickname,v,exp,sex,balance,point,gold');
        $users = $this->Users_model->get_many($a_uid);
        foreach($users as $item){
            $ret['user'][$item['id']] = $item;
        }
        
        $this->ajaxReturn($ret);
    }
}
