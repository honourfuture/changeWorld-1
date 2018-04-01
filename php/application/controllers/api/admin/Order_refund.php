<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Order_refund extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Order_refund_model');
    }

    /**
	 * @api {get} /api/admin/order_refund 退款/退单-列表
	 * @apiVersion 1.0.0
	 * @apiName order_refund
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/order_refund
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
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function index()
	{
		$ret = ['list' => [], 'user' => []];

		$this->load->model('Order_model');
		$ret['status'] = $this->Order_model->refund_status();
		unset($ret['status'][0]);

		$where = [];
		$status = $this->input->get_post('status');
		if(isset($ret['status'][$status])){
			$where['status'] = $status;
		}else{
			$where['1 >'] = 0;
		}

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Order_refund_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,created_at,status,order_id,order_sn,user_id,seller_uid,remark');
			$ret['list'] = $this->Order_refund_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_uid = $a_order = [];
			foreach($ret['list'] as $item){
				$a_order[] = $item['order_id'];
				$a_uid[] = $item['seller_uid'];
				$a_uid[] = $item['user_id'];
			}
			$k_user = [];
			//用户信息
			$this->load->model('Users_model');
			$this->db->select('id,mobi,header,nickname,v,exp,sex,balance,point,gold');
			$users = $this->Users_model->get_many($a_uid);
			foreach($users as $item){
				$ret['user'][$item['id']] = $item;
			}
			//订单信息
			$this->load->model('Order_model');
			$this->db->select('id,total_amount,real_total_amount');
			$order = $this->Order_model->get_many($a_order);
			foreach($order as $item){
				$ret['order'][$item['id']] = $item;
			}
		}

		$this->ajaxReturn($ret);
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
