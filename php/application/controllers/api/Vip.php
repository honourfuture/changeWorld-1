<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Vip extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Vip_model');
    }

    /**
	 * @api {get} /api/vip 贵族-列表
	 * @apiVersion 1.0.0
	 * @apiName vip
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/vip
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 贵族唯一ID
	 * @apiSuccess {String} data.name 贵族名称
	 * @apiSuccess {String} data.first_fee 首开费用
	 * @apiSuccess {String} data.first_gold 首开金币
	 * @apiSuccess {String} data.renew_fee 续费费用
	 * @apiSuccess {String} data.renew_gold 续费金币
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "name": "男爵",
	 *             "first_fee": "100.00",
	 *             "first_gold": "10000",
	 *             "renew_fee": "80.00",
	 *             "renew_gold": "12000",
	 *             "icon": ""
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
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$this->db->select('id,name,first_fee,first_gold,renew_fee,renew_gold,icon');
		$ret = $this->Vip_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}
}
