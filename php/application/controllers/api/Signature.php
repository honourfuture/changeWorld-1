<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Signature extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/signature/qcloud 签名-腾讯云(视频)
	 * @apiVersion 1.0.0
	 * @apiName signature_qcloud
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/signature/qcloud
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.qcloud 融云qcloud
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "signature": "NyZXRJZD0mY3VycmVudFRpbWVTdGFtcD0xNTIxNTk2Mzk2JmV4cGlyZVRpbWU9MTUyMTY4Mjc5NiZyYW5kb209MTU0OQ=="
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
	public function qcloud()
	{
		$config = config_item('live');

		// 确定签名的当前时间和失效时间
		$current = time();
		$expired = $current + 86400;  // 签名有效期：1天

		// 向参数列表填入参数
		$arg_list = array(
		    "secretId" => $config['secret_id'],
		    "currentTimeStamp" => $current,
		    "expireTime" => $expired,
		    "random" => rand()
		);

		// 计算签名
		$orignal = http_build_query($arg_list);
		$signature = base64_encode(hash_hmac('SHA1', $orignal, $config['secret_key'], true).$orignal);

		$this->ajaxReturn(['signature' => $signature]);
	}
}
