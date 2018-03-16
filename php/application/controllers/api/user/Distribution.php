<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Distribution extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/distribution 分销页
	 * @apiVersion 1.0.0
	 * @apiName distribution
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/distribution
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.nickname 昵称
	 * @apiSuccess {String} data.header 头像
	 * @apiSuccess {String} data.check_city_partners 已开通城市合伙人 0否 1待审核 2是
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
		$ret = [];

		$user = $this->get_user();
		$ret['nickname'] = $user['nickname'];
		$ret['header'] = $user['header'];
		$ret['check_city_partners'] = $user['check_city_partners'];

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/distribution/add 城市合伙人-提交审核
	 * @apiVersion 1.0.0
	 * @apiName distribution_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/distribution/add
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} sign 校验签名
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
	public function add()
	{
		$user = $this->get_user();
		if($user['check_city_partners']){
			$this->ajaxReturn([], 1, '请勿重复提交');
		}
		if($this->Users_model->update($this->user_id, array('check_city_partners' => 1))){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '提交申请失败');
		}
	}
}
