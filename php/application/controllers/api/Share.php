<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Share extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {post} /api/share/register 分享-领取积分登记
	 * @apiVersion 1.0.0
	 * @apiName share_register
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/share/register
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
	 *     "data": [],
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
	public function register()
	{
		$params = elements(
			array(
				'point', 'mobi', 'invite_uid'
			),
			$this->input->post(),
			0
		);
		if(! $params['mobi']){
			$this->ajaxReturn([], 1, '请输入有效手机号');
		}

		$this->load->model('Share_record_model');
		$this->Share_record_model->insert($params);

		$this->ajaxReturn();
	}
}
