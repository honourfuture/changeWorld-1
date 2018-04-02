<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Admin_log extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Admin_log_model');
    }

    /**
	 * @api {get} /api/admin/admin_log 系统日志-列表
	 * @apiVersion 1.0.0
	 * @apiName admin_log
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/admin_log
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-04-02 15:56:26",
	 *                 "updated_at": "2018-04-02 15:56:26",
	 *                 "deleted": "0",
	 *                 "status": "0",
	 *                 "enable": "1",
	 *                 "sort": "0",
	 *                 "url": "http://ww.baidu.com"
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
	public function index()
	{
		$ret = array('count' => 0, 'list' => array());

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Admin_log_model->count_all();
		if($ret['count']){
			$ret['list'] = $this->Admin_log_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_all();
		}

		$this->ajaxReturn($ret);
	}
}
