<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Partner_city extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Users_model');
    }

	/**
	 * @api {get} /api/admin/partner_city 城市合伙人-待审核
	 * @apiVersion 1.0.0
	 * @apiName partner_city
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/partner_city
	 *
	 * @apiParam {Number} admin_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "nickname": "aicode",
	 *         "header": "",
	 *         "check_city_partners": "0"
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
		$ret = array('count' => 0, 'list' => array());

		$where = array('check_city_partners' => 1);

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Users_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,updated_at,nickname,header,v,anchor,point,balance');
			$ret['list'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/admin/partner_city/save 城市合伙人-审核
	 * @apiVersion 1.0.0
	 * @apiName partner_city_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/partner_city/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID
	 * @apiParam {Number} check_status 审核状态 0不通过 2通过
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
		$id = (int)$this->input->get_post('id');
		$check_status = (int)$this->input->get_post('check_status');
		if(! in_array($check_status, [0, 2])){
			$this->ajaxReturn([], 1, '审核状态错误');
		}

		if($this->Users_model->update($id, array('check_city_partners' => $check_status))){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '提交审核操作失败');
		}
	}
}
