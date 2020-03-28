<?php
/*
 * 订单主表
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Order_model extends MY_Model
{
    public $_table        = 'order';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function get_order_by_pay_sn($pay_sn)
    {
        $result = [];
        if($rows = $this->get_many_by(['pay_sn' => $pay_sn])){
            foreach($rows as $item){
                if($item['status'] != 0){
                    $result = [];
                    break;
                }else{
                    !isset($result['id']) && $result['id'] = [];
                    $result['id'][] = $item['id'];

                    !isset($result['total_amount']) && $result['total_amount'] = 0;
                    $result['total_amount'] = round($result['total_amount'] + $item['total_amount'], 2);

                    !isset($result['real_total_amount']) && $result['real_total_amount'] = 0;
                    $result['real_total_amount'] = round($result['real_total_amount'] + $item['real_total_amount'], 2);

                    !isset($result['use_ticket_amount']) && $result['use_ticket_amount'] = 0;
                    $result['use_ticket_amount'] = round($result['use_ticket_amount'] + $item['use_ticket_amount'], 2);

                    !isset($result['use_point_amount']) && $result['use_point_amount'] = 0;
                    $result['use_point_amount'] = round($result['use_point_amount'] + $item['use_point_amount'], 2);

                    !isset($result['use_point']) && $result['use_point'] = 0;
                    $result['use_point'] = round($result['use_point'] + $item['use_point'], 2);
                }
            }
        }

        return $result;
    }

    public function get_order_by_order_sn($order_sn)
    {
        $result = [];
        $this->db->select('id,status,total_amount,real_total_amount,use_ticket_amount,use_point_amount,use_point');
        if($row = $this->get_by(['order_sn' => $order_sn])){
            if($row['status'] == 0){
                $result = $row;
            }
        }

        return $result;
    }

    public function refund_status()
    {
        return [
            '未申请',
            '已申请',
            '已通过',
            '已拒绝'
        ];
    }

    /*
     * 订单状态
     * 已结束：14天后自动更新，禁止退换货操作
     */
    public function status()
    {
        return [
            '待付款',//0
            '已取消',//1
            '待发货',//2
            '待收货',//3
            '待评价',//4
            '已完成',//5
            '已结束'//6
        ];
    }

    public function action()
    {
        //取消订单、删除订单、查看物流、评价订单、付款、催发货、确认收货、申请发票、申请退款、修改价格、发货
    }

    public function make_pay_sn()
    {
        return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000);
    }

    public function make_order_sn($mid)
    {
        return mt_rand(10,99) . sprintf('%010d',time() - 1451577600) . sprintf('%03d', (float) microtime() * 1000) . sprintf('%03d', (int) $mid % 1000);
    }

    //获取商户最优券自动抵扣
    public function format_seller_data(&$seller)
    {
        if($seller){
            foreach($seller as $seller_id=>$item){
                $seller[$seller_id]['total'] = 0;//商户商品总金额
                $seller[$seller_id]['ticket'] = 0;//使用优惠
                $seller[$seller_id]['ticket_info'] = [];//优惠描述
                $seller[$seller_id]['point'] = 0;//可使用总积分

                if($item['goods']){
                    $sum_price = 0;
                    $ticket = [];
                    foreach($item['goods'] as $goods){
                        $seller[$seller_id]['point'] += $goods['use_point_rate'];
                        $seller[$seller_id]['total'] = round($seller[$seller_id]['total'] + ($goods['sale_price'] + $goods['freight_fee']) * $goods['num'], 2);
                        $sum_price += $goods['sale_price'] * $goods['num'];
                        if($goods['goods_ticket'] && $goods_ticket = json_decode($goods['goods_ticket'], true)){
                            $ticket[] = $goods_ticket;
                        }
                    }
                    //遍历优惠
                    if($ticket){
                        $max = 0;
                        foreach($ticket as $rows){
                            foreach($rows as $key=>$val){
                                if($sum_price >= $val['full_amount'] && $val['free_amount'] > $max){
                                    $max = $val['free_amount'];
                                    $seller[$seller_id]['ticket_info'] = $val;
                                }
                            }
                        }
                        $seller[$seller_id]['ticket'] = $max;
                    }
                }
            }
        }
    }
    
    /**
     * 等级初始化信息
     */
    private function _getRankList()
    {
        $curosr = $this->db->query("SELECT * FROM `rank_rule` WHERE `status`=0")->result_array();
        if( empty($curosr) ){
            return false;
        }
        $arrRankList = [];
        foreach ($curosr as $k=>$v){
            $arrRankList["L_{$v['id']}"] = $v;
        }
        ksort($arrRankList);
        return $arrRankList;
    }

    private function _checkIncomeExpPoint($user_id, $order_id)
    {
        $data = ['flag'=>false, 'order'=>[], 'user'=>[]];
        if( empty($order_id) || empty($this->user_id) ){
            return $data;
        }
        //订单信息
        $arrOrder = $this->db->query("SELECT * FROM `order` WHERE id='{$order_id}'")->row_array();
        if( empty($arrOrder) ){
            return $data;
        }
        $data['order'] = $arrOrder;
        
        //用户信息
        $arrUser = $this->db->query("SELECT * FROM `users` WHERE id='{$user_id}'")->row_array();
        if( empty($arrUser) ){
            return $data;
        }
        $data['user'] = $arrUser;
        $data['flag'] = true;
        return $data;
    }
    
    
    /**
     * 处理订单收益产生的积分及经验(用户升级只跟经验有关)
     * @param int $order_id
     */
    public function dealIncomeExpPoint($user_id, $order_id)
    {        
        $arrData = $this->_checkIncomeExpPoint($user_id, $order_id);
        if( !$arrData['flag'] ){
            return false;
        }
        $arrOrder = $arrData['order'];
        $arrUser = $arrData['user'];
        $arrRankList = $this->_getRankList();        
        
        //收益积分限制信息
        $arrPointRule = $this->db->query("SELECT * FROM `point_rule` WHERE `name`='per_income'")->row_array();
        //收益经验限制信息
        $arrGradeRule = $this->db->query("SELECT * FROM `grade_rule` WHERE `name`='per_income'")->row_array();
        
        //订单中的退货商品
        $cursor = $this->db->query("SELECT * FROM record_goods WHERE order_id={$order_id} AND `status`=1")->result_array();
        $arrReturnedGoods = [];
        foreach ($cursor as $item){
            $arrReturnedGoods[$item['goods_id']] = $item['num'];
        }
        $arrReturnedGoodIds = array_keys($arrReturnedGoods);
        
        //取得订单的商品信息
        $arrOrderItems = $this->db->query("SELECT * FROM order_items WHERE order_id={$order_id}")->result_array();

        $arrPoint = [];
        $arrExp = [];
        //处理积分经验
        $arrExpPoint = [];
        $arrExpPoint[$arrOrder['buyer_uid']] = [
            'point' => [],
            'exp' => [],
        ];
        $arrExpPoint[$arrOrder['buyer_uid']]['point'][] = $arrOrder['point'];
        $arrExpPoint[$arrOrder['buyer_uid']]['exp'][] = $arrOrder['exp'];
        foreach ($arrOrderItems as $item){
            if( in_array($item['goods_id'], $arrReturnedGoodIds) ){
                continue;
            }
            if( isset($arrExpPoint[$item['user_id']]) ){
                $userExpPoint = $arrExpPoint[$item['user_id']];
            }
            else{
                $userExpPoint = [
                    'point' => [],
                    'exp' => [],
                ];
            }
            $userExpPoint['point'][] = $item['point'];
            $userExpPoint['exp'][] = $item['exp'];
            $arrExpPoint[$item['user_id']] = $userExpPoint;
        }
        $orderTime = strtotime($arrOrder['created_at']);
        $timeStart = date('Y-m-d 00:00:00', $orderTime);
        $timeEnd =  date('Y-m-d 23:59:59', $orderTime);
        $this->load->model('Users_points_model');
        $this->load->model('Users_grade_model');
        $this->load->model('Grade_model');
        $this->db->trans_start();
        foreach ($arrExpPoint as $userId => $expPoint){
            if( $arrUser['id'] = $userId ){
                $user = $arrUser;
            }
            else{
                $user = $this->db->query("SELECT * FROM `users` WHERE id='{$userId}'")->row_array();
            }
            $point = array_sum($expPoint['point']);
            $exp = array_sum($expPoint['exp']);
            //取得每日已经增加积分
            $daySumPoint = $point + $this->Users_points_model->getUserPointSum($userId, $timeStart, $timeEnd);
            //未超过日限额
            if( $daySumPoint >= $arrPointRule['days_limit'] ){
                $point = $arrPointRule['days_limit'] - $daySumPoint;
            }
            if( $point ){
                $this->Users_points_model->log($userId, 'per_income', $point, $arrOrder['created_at'], ($user['point'] + $point));
            }
            //取得每日已经增加经验
            $daySumExp = $point + $this->Users_grade_model->getUserExpSum($userId, $timeStart, $timeEnd);
            //未超过日限额
            if( $daySumExp >= $arrGradeRule['days_limit'] ){
                $exp = $arrGradeRule['days_limit'] - $daySumExp;
            }
            if( $exp ){
                $this->Users_grade_model->log($userId, 'per_income', $exp, $arrOrder['created_at'], ($user['exp'] + $exp));
            }
            //用户会员等级
            $this->Users_grade_model->upgradeRank($userId, ($user['exp'] + $exp), ($user['point'] + $point));            
        }
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE){
            return false;
        }
        return true;
    }
}
