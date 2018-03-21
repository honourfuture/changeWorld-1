<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Partner extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Partner_model');
    }

    /**
	 * @api {get} /api/user/partner 分销-主页
	 * @apiVersion 1.0.0
	 * @apiName partner
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner
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
	 * @api {post} /api/user/partner/apply 分销-申请(城市合伙人)
	 * @apiVersion 1.0.0
	 * @apiName partner_apply
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner/apply
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
	public function apply()
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

	/**
	 * @api {post} /api/user/partner/add 分销-人员添加(二级&合伙人)
	 * @apiVersion 1.0.0
	 * @apiName partner_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner/add
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type 0二级分销 1城市合伙人
	 * @apiParam {String} mobi 合伙人手机号
	 * @apiParam {String} area 省市区 英文逗号分割 二级分销不用传，城市合伙人必传
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
		$params = elements(
			array(
				'type', 'mobi', 'area'
			),
			$this->input->post(),
			''
		);

		switch($type){
			case 0:
				if(! $mobi){
					$this->ajaxReturn([], 2, '二级分销手机号必传');
				}
				$this->check_params('add', $params);
				break;
			case 1:
				if(! $mobi || ! $area){
					$this->ajaxReturn([], 2, '城市合伙人手机号和地址必传');
				}
				$this->check_params('add', $params);
				break;
			default :
				$this->ajaxReturn([], 1, '分销类型错误');
				break;
		}

		$params['user_id'] = $this->user_id;

		if($this->Partner_model->insert($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '保存分销人信息失败');
		}
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($this->Partner_model->get_by(['user_id' => $this->user_id, 'mobi' => $mobi])){
					$this->ajaxReturn([], 3, '手机号已存在');
				}
				break;
			case 'edit':
				break;
		}
	}
}
