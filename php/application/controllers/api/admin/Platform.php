<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author ruilongd
 * @email ruilongd@126.com
 * @link www.aicode.org.cn
 */
class Platform extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Platform_income_model');
    }

    /**
     * 平台收益流水
     */
    public function income()
    {
        $ret = ['list' => [], 'user' => []];
        $arrWhere = ["1=1"];
        $arrWhere[] = "o.`status`>3";
        $export = $this->input->get_post('export');
        $cur_page = $this->input->get_post('cur_page');
        if( empty($cur_page) ){
            $cur_page = 1;
        }
        $per_page = $this->input->get_post('per_page');
        if( empty($per_page) ){
            $per_page = 10;
        }
        $dateZoom = $this->input->get_post('date_zoom');
        if( $dateZoom ){
            list($dateStart, $dateEnd) = explode('/', $dateZoom);
            $arrWhere[] = "o.created_at BETWEEN '" . $dateStart . ' 00:00:00' . "' AND '" . $dateStart . ' 23:59:59' . "'";
        }
        $sql = "SELECT SUM(ip.amount) AS total FROM `income_platform` ip LEFT JOIN `order` o ON ip.order_id = o.id WHERE " . implode(' AND ', $arrWhere);
        $arrTotal = $this->db->query($sql)->row_array();
        $ret['total'] = $arrTotal['total'];
        $sql = "SELECT COUNT(DISTINCT ip.order_id) AS cnt FROM `income_platform` ip LEFT JOIN `order` o ON ip.order_id = o.id WHERE " . implode(' AND ', $arrWhere);
        $record = $this->db->query($sql)->row_array();
        $ret['count'] = $record['cnt'];
        if($ret['count']){
            $fields = 'o.created_at, o.status, o.order_sn, o.seller_uid, o.total_amount, o.real_total_amount,
            o.buyer_uid, o.commission, o.commission_users, o.point, o.exp, o.seller_income, o.seller_exp, o.seller_point, o.freight_fee,
            SUM(ip.amount) AS amount ';
            $start = ($cur_page - 1) * $per_page;
            $sql = "SELECT {$fields} FROM `income_platform` ip LEFT JOIN `order` o ON ip.order_id = o.id WHERE " . implode(' AND ', $arrWhere) . " ORDER BY o.id DESC";
            if( !$export ){
                $sql .= " LIMIT {$start}, {$per_page}";
            }
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
        if( $export ){
            return $ret;
        }
        $this->ajaxReturn($ret);
    }

    /**
     * 平台流水导出
     */
    public function export()
    {

    }
}
