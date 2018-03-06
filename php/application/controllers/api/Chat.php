<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use RongCloud\RongCloud;
class Chat extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        //融云
        $config = config_item('rongcloud');
    	$this->rongCloud = new RongCloud($config['app_key'], $config['app_secret']);
    }

	/**
	 * @api {get} /api/chat/token 融云-获取token
	 * @apiVersion 1.0.0
	 * @apiName chat_token
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/chat/token
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.token 融云token
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "token": "OV/rMsT5+bU8tsuVLAExKFPVSOwECud2tsMN8Xc0GyUbpMpKxxspaz7dwTRsWKWa2sMrptl+mtrN6oRHZET/Rw=="
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
	public function token()
	{
		$ret = array();
    	//token
    	$user = $this->get_user();
    	if(! $user){
    		$this->ajaxReturn([], 1, '用户不存在');
    	}
    	$this->load->model('Users_model');
    	$response = $this->rongCloud->user()->getToken(
    		$this->user_id,
    		$user['nickname'],
    		$this->Users_model->get_header($user['header'])
    	);
    	$token = '';
    	if($response && $result = json_decode($response, true)){
    		if($result['code'] == 200){
    			$token = $result['token'];
    		}
    	}

    	if(empty($token)){
    		$this->ajaxReturn([], 2, '获取授权token失败');
    	}
    	$ret['token'] = $token;

		$this->ajaxReturn($ret);
	}
}
