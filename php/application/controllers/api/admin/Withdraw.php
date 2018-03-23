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

        $this->check_operation();
        $this->load->model('Withdraw_model');
    }

	/**
	 * @api {get} /api/admin/withdraw/record 提现管理-记录
	 * @apiVersion 1.0.0
	 * @apiName withdraw_record
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/withdraw/record
	 *
	 * @apiParam {Number} admin_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.id 记录ID
	 * @apiSuccess {String} data.created_at 申请时间
	 * @apiSuccess {String} data.status 状态 0待处理 1已汇款 2异常
	 * @apiSuccess {String} data.admin_name 收款人
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} message 接口信息描述
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
	 *                 "admin_name": "sz.ljx",
	 *                 "admin_card": "112233445566778899",
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

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Withdraw_model->count_all();
		if($ret['count']){
			$ret['list'] = $this->Withdraw_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_all();
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/admin/withdraw/save 提现管理-操作
	 * @apiVersion 1.0.0
	 * @apiName withdraw_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/withdraw/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} s_id 记录唯一ID 多个英文逗号分割：1,2,3
	 * @apiParam {Number} status 状态 0待处理 1已汇款 2异常
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function save()
	{
		$params = elements(
			array(
				's_id', 'status'
			),
			$this->input->post(),
			''
		);

		$params['s_id'] = explode(',', trim($params['s_id']));
		if(! $params['s_id']){
			$this->ajaxReturn([], 1, '选择记录操作');
		}
		$status = $this->Withdraw_model->status();
		if(! isset($status[$params['status']])){
			$this->ajaxReturn([], 2, '状态错误');
		}

		if($this->Withdraw_model->update_many($params['s_id'], ['status' => $params['status']])){
			$this->ajaxReturn([]);
		}else{
			$this->ajaxReturn([], 3, '操作失败');
		}
	}
}
