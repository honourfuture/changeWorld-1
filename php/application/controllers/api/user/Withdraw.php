<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Withdraw extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/withdraw 提现
	 * @apiVersion 1.0.0
	 * @apiName withdraw
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/withdraw
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "balance": "0.00",
	 *         "point": "950",
	 *         "income": {
	 *             "goods": "1000.00",
	 *             "live": "50.00",
	 *             "knowledge": "210.00"
	 *         }
	 *     },
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
		$ret = [
			'balance' => 0,
			'bank' => []
		];

		$user = $this->get_user();
		$ret['balance'] = $user['balance'];

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/user/withdraw/record 提现-记录
	 * @apiVersion 1.0.0
	 * @apiName withdraw_record
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/withdraw/record
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "5",
	 *                 "updated_at": "2018-03-16 11:32:32",
	 *                 "order_sn": "112233445566778899",
	 *                 "item_id": "1",
	 *                 "amount": "550.00",
	 *                 "real_amount": "500.00"
	 *             }
	 *         ]
	 *     },
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
	public function record()
	{
		$ret = array('count' => 0, 'list' => array());

		$topic = 4;

		$this->load->model('Income_model');

		$where = array('topic' => $topic);
		if($this->user_id){
			$where['user_id'] = $this->user_id;
		}

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Income_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,updated_at,item_title order_sn,item_id,amount,gold real_amount');
			$ret['list'] = $this->Income_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}
}
