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
	 * @apiParam {Number} user_bank_id 用户银行卡ID 默认0(取最新记录) 其他表示选择指定卡
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "balance": "0.00",
	 *         "bank": {
	 *             "id": "1",
	 *             "user_name": "sz.ljx",
	 *             "user_card": "112233445566778899",
	 *             "bank_id": "1",
	 *             "mobi": "13830332488",
	 *             "bank_name": "工商银行"
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

		$user_bank_id = (int)$this->input->get_post('user_bank_id');
		$this->load->model('Users_bank_model');
		$where = [
			'user_id' => $this->user_id,
		];
		if($user_bank_id){
			$where['id'] = $user_bank_id;
		}else{
			$where['enable'] = 1;
		}

		$order_by = array('updated_at' => 'desc');
		$this->db->select('id,user_name,user_card,bank_id,mobi');

		if($bank = $this->Users_bank_model->order_by($order_by)->get_by($where)){
			$ret['bank'] = $bank;

			$this->load->model('Bank_model');
			$this->db->select('id,name');
			$bank = $this->Bank_model->get($bank['bank_id']);
			$ret['bank']['bank_name'] = $bank['name'];
		}else{
			$ret['bank'] = (object)$ret['bank'];
		}

		$ret['withdraw_tips'] = '到账时间以银行为准';

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/withdraw/add 提现-提交
	 * @apiVersion 1.0.0
	 * @apiName withdraw_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/withdraw/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} user_bank_id 用户银行卡ID
	 * @apiParam {String} amount 提现金额
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
	public function add()
	{
		$amount = floatval($this->input->post('amount'));
		$user_bank_id = intval($this->input->post('user_bank_id'));
		if($amount < 0.01){
			$this->ajaxReturn([], 1, '请输入提现金额');
		}
		$user = $this->get_user();
		if($amount > $user['balance']){
			$this->ajaxReturn([], 2, '提现金额超过余额');
		}

		$this->load->model('Users_bank_model');
		$where = [
			'user_id' => $this->user_id,
		];
		$where['id'] = $user_bank_id;
		$this->db->select('id,user_name,user_card,bank_id,mobi');
		if(! $user_bank = $this->Users_bank_model->get_by($where)){
			$this->ajaxReturn([], 3, '提现账户信息不存在');
		}

		$this->load->model('Bank_model');
		$this->db->select('id,name');
		if(! $bank = $this->Bank_model->get($user_bank['bank_id'])){
			$this->ajaxReturn([], 4, '提现银行信息不存在');
		}

		// 事务
		$this->db->trans_start();
		// 扣除余额
		$this->Users_model->update($this->user_id, ['balance' => round($user['balance'] - $amount, 2)]);

		// 新增记录
		$data = [
			'user_id' => $this->user_id,
			'user_name' => $user_bank['user_name'],
			'user_card' => $user_bank['user_card'],
			'bank_id' => $user_bank['bank_id'],
			'bank_name' => $bank['name'],
			'mobi' => $user_bank['mobi'],
			'amount' => $amount
		];
		$this->load->model('Withdraw_model');
		$this->Withdraw_model->insert($data);

		$this->db->trans_complete();
		if($this->db->trans_status() === FALSE){
			$this->ajaxReturn([], 5, '网络服务异常');
		}else{
			$this->ajaxReturn([]);
		}
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
	 * @apiSuccess {String} data.id 记录ID
	 * @apiSuccess {String} data.created_at 申请时间
	 * @apiSuccess {String} data.status 状态 0待处理 1已汇款 2异常
	 * @apiSuccess {String} data.user_name 收款人
	 * @apiSuccess {String} data.user_card 收款账号
	 * @apiSuccess {String} data.mobi 预留手机号
	 * @apiSuccess {String} data.bank_name 卡户银行
	 * @apiSuccess {String} data.amount 提现金额
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "3",
	 *                 "created_at": "2018-03-23 10:22:22",
	 *                 "status": "0",
	 *                 "user_name": "sz.ljx",
	 *                 "user_card": "112233445566778899",
	 *                 "mobi": "13830332488",
	 *                 "bank_name": "工商银行",
	 *                 "amount": "100.00"
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

		$this->load->model('Withdraw_model');
		$where = [
			'user_id' => $this->user_id
		];
		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Withdraw_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,created_at,status,user_name,user_card,mobi,bank_name,amount');
			$ret['list'] = $this->Withdraw_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}
}
