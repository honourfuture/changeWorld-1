<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Recharge extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Recharge_model');
    }

    /**
	 * @api {get} /api/admin/recharge 充值优惠-列表
	 * @apiVersion 1.0.0
	 * @apiName recharge
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/recharge
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 充值优惠唯一ID
	 * @apiSuccess {String} money 充
	 * @apiSuccess {String} free 送金额
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "created_at": "2018-03-16 14:30:08",
	 *             "updated_at": "2018-03-16 14:30:08",
	 *             "deleted": "0",
	 *             "status": "0",
	 *             "enable": "1",
	 *             "sort": "0",
	 *             "money": "500.00",
	 *             "free": "50.00"
	 *         }
	 *     ],
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
		$deleted = (int)$this->input->get('deleted');
		$order_by = array('id' => 'desc');
		$ret = $this->Recharge_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/recharge/save 充值优惠-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName recharge_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/recharge/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} money 充
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} free 送金额
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
		$this->check_operation();
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'money', 'deleted', 'enable', 'free'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Recharge_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Recharge_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'money', 'free'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Recharge_model->insert($params)){
				$id = $flag;
			}
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
			case 'edit':
				if($params['money'] === '' || $params['money'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '支付金额必传');
				}
				break;
		}
	}
}
