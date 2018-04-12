<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Shop extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Shop_model');
    }

    /**
	 * @api {get} /api/admin/shop/check_list 店铺管理-待审核列表
	 * @apiVersion 1.0.0
	 * @apiName shop_check_list
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/shop/check_list
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status 0待审核 1通过 2拒绝 -1全部
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "status": [
	 *             "待审核",
	 *             "通过",
	 *             "拒绝"
	 *         ],
	 *         "total": 1,
	 *         "list": [
	 *             {
	 *                 "mobi": "13430332489",
	 *                 "sex": "0",
	 *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *                 "nickname": "aicode",
	 *                 "summary": "",
	 *                 "v": "0",
	 *                 "exp": "0",
	 *                 "id": "1",
	 *                 "created_at": "2018-03-30 23:20:50",
	 *                 "updated_at": "2018-03-30 23:20:52",
	 *                 "status": "0",
	 *                 "user_id": "1"
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
	public function check_list()
	{
		$ret = [];

		$ret['status'] = $this->Shop_model->status();

		$where = [];
		$status = $this->input->get_post('status');
		if(isset($ret['status'][$status])){
			$where['shop.status'] = $status;
		}else{
			$where['1 >'] = 0;
		}

		$ret = array_merge($ret, $this->Shop_model->seller($where, $this->per_page, $this->offset));

		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/shop/check 店铺管理-审核
	 * @apiVersion 1.0.0
	 * @apiName shop_check
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/shop/check
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status 1通过 2拒绝
	 * @apiParam {Number} id 申请ID
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
	public function check()
	{
		$id = $this->input->get_post('id');
		$status = $this->input->get_post('status');

		$a_status = $this->Shop_model->status();
		if(! isset($a_status[$status])){
			$this->ajaxReturn([], 1, '审核状态错误');
		}

		if($shop = $this->Shop_model->get($id)){
			if($shop['status'] == 1){
				if($this->Shop_model->update($id, ['status' => $status])){
					$this->load->model('Users_model');
					$this->Users_model->update($shop['user_id'], ['seller' => $status]);

					$this->ajaxReturn();
				}else{
					$this->ajaxReturn([], 3, '操作失败');
				}
			}else{
				$this->ajaxReturn([], 2, '请勿重复审核');
			}
		}else{
			$this->ajaxReturn([], 1, '店铺申请ID错误');
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
