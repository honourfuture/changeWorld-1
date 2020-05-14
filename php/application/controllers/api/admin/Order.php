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

    private function _getOrders($type=1)
    {
        $ret = ['list' => [], 'user' => []];
        $arrStatus = $this->Order_model->status();
        $arrWhere = ["1=1"];
        switch($type){
            case 1://订单列表
                break;
            case 2://分销统计
                $arrWhere[] = "o.`status`>3";
                //unset($arrStatus[0], $arrStatus[1], $arrStatus[2], $arrStatus[3]);
                break;
            default:
                
        }
        $ret['status'] = $arrStatus;
        $ret['refund_status'] = $this->Order_model->refund_status();
        $cur_page = $this->input->get_post('cur_page');
        $per_page = $this->input->get_post('per_page');
        $status = $this->input->get_post('status');
        $order_sn = $this->input->get_post('order_sn');
        $user_name = $this->input->get_post('user_name');
        $product_name = $this->input->get_post('product_name');
        $dateZoom = $this->input->get_post('date_zoom');
        if(isset($ret['status'][$status])){
            $arrWhere[] = "o.`status`={$status}";
        }        
        if($order_sn){
            $arrWhere[] = "o.order_sn='{$order_sn}'";
        }
        if($user_name){
            $arrWhere[] = "u.nickname like '%{$user_name}'";
        }
        if($product_name){
            $sql = "SELECT oi.order_id FROM order_items oi LEFT JOIN `order` o ON oi.order_id = o.id WHERE oi.`name` LIKE '%{$product_name}%'";
            $cursor = $this->db->query($sql)->result_array();
            $arrOrderIds = [];
            foreach ($cursor as $item){
                $arrOrderIds[] = $item['order_id'];
            }
            if( empty($arrOrderIds) ){
                $arrWhere[] = " false ";
            }
            else{
                $arrWhere[] = " o.id IN(" . implode(',', $arrOrderIds) . ")";
            }
        }
        if( $dateZoom ){
            list($dateStart, $dateEnd) = explode('/', $dateZoom);
            $arrWhere[] = "o.created_at BETWEEN '" . $dateStart . ' 00:00:00' . "' AND '" . $dateStart . ' 23:59:59' . "'";
        }
        $sql = "SELECT COUNT(1) AS cnt FROM `order` o LEFT JOIN `users` u ON o.buyer_uid=u.id WHERE " . implode(' AND ', $arrWhere);
        $record = $this->db->query($sql)->row_array();
        $ret['count'] = $record['cnt'];
        if($ret['count']){
            $fields = 'o.id, o.created_at, o.updated_at, o.status, o.order_sn, o.seller_uid, o.total_amount, o.real_total_amount,
            o.buyer_uid, o.commission, o.commission_users, o.point, o.exp, o.seller_income, o.seller_exp, o.seller_point, o.freight_fee';
            $start = ($cur_page - 1) * $per_page;
            $sql = "SELECT {$fields} FROM `order` o LEFT JOIN `users` u ON o.buyer_uid=u.id WHERE " . implode(' AND ', $arrWhere) . " ORDER BY o.id DESC LIMIT {$start}, {$per_page}";
            $ret['list'] = $this->db->query($sql)->result_array();
        
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
        $type = $this->input->get_post('type');
        if(empty($type)){
            $type = 1;
        }
        $this->_getOrders($type);
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
        $details = $this->input->get_post('details');
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

            //取得团队佣金明细信息
            $ret['commission'] = [];
            if( !empty($details) ){
                $this->load->model('Income_model');
                $sql = "SELECT i.user_id, i.amount, i.topic, i.point, i.exp, u.nickname, u.mobi FROM {$this->Income_model->table()} i LEFT JOIN {$this->Users_model->table()} u ON i.user_id = u.id WHERE i.order_id={$id}";
                $ret['commission'] = $this->db->query($sql)->result_array();
            }

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

}
