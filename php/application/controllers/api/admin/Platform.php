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
            $arrWhere[] = "o.created_at BETWEEN '" . $dateStart . ' 00:00:00' . "' AND '" . $dateEnd . ' 23:59:59' . "'";
        }
        $sql = "SELECT SUM(ip.amount) AS total FROM `income_platform` ip LEFT JOIN `order` o ON ip.order_id = o.id WHERE " . implode(' AND ', $arrWhere);
        $arrTotal = $this->db->query($sql)->row_array();
        $ret['total'] = $arrTotal['total'];
        $sql = "SELECT COUNT(DISTINCT ip.order_id) AS cnt FROM `income_platform` ip LEFT JOIN `order` o ON ip.order_id = o.id WHERE " . implode(' AND ', $arrWhere);
        $record = $this->db->query($sql)->row_array();
        $ret['count'] = intval($record['cnt']);
        if($ret['count']){
            $fields = 'ip.id, o.id AS order_id, o.created_at, o.status, o.order_sn, o.seller_uid, o.total_amount, o.real_total_amount,
            o.buyer_uid, o.commission, o.commission_users, o.point, o.exp, o.seller_income, o.seller_exp, o.seller_point, o.freight_fee,
            SUM(ip.amount) AS amount, ip.created_at AS updated_at';
            $start = ($cur_page - 1) * $per_page;
            $sql = "SELECT {$fields} FROM `income_platform` ip LEFT JOIN `order` o ON ip.order_id = o.id WHERE " . implode(' AND ', $arrWhere) . " GROUP BY ip.order_id ORDER BY ip.created_at DESC";
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

    private function _exportIncome($data)
    {
        
        $arrHeaderTitle = [
            ['title'=>'订单编号', 'field'=>'order_sn'],
            ['title'=>'买家姓名', 'field'=>'buyer_uid'],
            ['title'=>'卖家姓名', 'field'=>'seller_uid'],
            ['title'=>'支付金额', 'field'=>'real_total_amount'],
            ['title'=>'平台收益', 'field'=>'amount'],
            ['title'=>'时间', 'field'=>'updated_at']
        ];
        $this->load->library('PHPExcel');
        $this->load->library('PHPExcel/IOFactory');
        $objPHPExcel = new PHPExcel();
        // 以下内容是excel文件的信息描述信息
        $file = '数据导出-' . date('YmdHi');
        $objPHPExcel->getProperties()->setTitle($file);
        $objPHPExcel->getProperties()->setDescription("none");
        $objPHPExcel->getProperties()->setCreator(''); //设置创建者
        $objPHPExcel->getProperties()->setLastModifiedBy(''); //设置修改者
        $objPHPExcel->getProperties()->setSubject(''); //设置主题
        $objPHPExcel->getProperties()->setDescription(''); //设置描述
        $objPHPExcel->getProperties()->setKeywords('');//设置关键词
        $objPHPExcel->getProperties()->setCategory('');//设置类型
        $objPHPExcel->setActiveSheetIndex(0);
        
        //处理表头
        foreach ($arrHeaderTitle as $k=>$item){
            $cell = chr(ord('A') + $k) . "1";
            $objPHPExcel->getActiveSheet()->setCellValue($cell, $item['title']);
        }
        $arrStatus = $this->Order_model->status();
        //处理表数据（第n(n>=2, n∈N*)行数据）
        foreach ($data as $key => $item) {
            foreach ($arrHeaderTitle as $k=>$v) {
                $cell = chr(ord('A') + $k) . ($key + 2);
                $value = "";
                switch($v['field']){
                    case 'buyer_uid':
                    case 'seller_uid':
                        $value = $data['user'][$item[$v['field']]]['nickname'];
                        break;
                    case 'status':
                        $value =$arrStatus[$item[$v['field']]];
                        break;
                    default:
                        $value = $item[$v['field']];
                }
                $objPHPExcel->getActiveSheet()->setCellValue($cell, $value, \PHPExcel_Cell_DataType::TYPE_STRING);//将其设置为文本格式
            }
        }
        $objWriter = IOFactory::createWriter($objPHPExcel, 'Excel5');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'. $file .'"');
        header('Cache-Control: max-age=0');
        $objWriter->save('php://output');
    }
    /**
     * 平台流水导出
     */
    private function export()
    {
        $type = $this->input->get_post('type');
        switch($type){
            case 1:
                $data = $this->income();
                $this->_exportIncome($data);
                break;
        }
    }
}
