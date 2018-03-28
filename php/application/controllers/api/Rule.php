<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Rule extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {post} /api/rule 规则说明
	 * @apiVersion 1.0.0
	 * @apiName rule
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/rule
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} rule 规则项 point: 积分
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "rule_point": ""
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
		$ret = [];

		$rule = 'rule_';
		$rule .= $this->input->get_post('rule');

		switch($rule){
			case 'rule_point':
				$this->load->model('Config_model');
				$config = $this->Config_model->siteConfig();

				$ret[$rule] = isset($config[$rule]) ? $config[$rule] : '';
				break;
			default :
				break;
		}

		$this->ajaxReturn($ret);
	}
}
