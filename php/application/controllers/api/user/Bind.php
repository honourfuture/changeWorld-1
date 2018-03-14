<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Bind extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/user/bind 账号绑定-列表
	 * @apiVersion 1.0.0
	 * @apiName bind
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bind
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.account_type 所有绑定账号总集
	 * @apiSuccess {Object[]} data.list 已绑定账号集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "account_type": [
	 *             "手机",
	 *             "微信",
	 *             "QQ",
	 *             "微博"
	 *         ],
	 *         "list": [
	 *             {
	 *                 "account_type": "0",
	 *                 "unique_id": "13430331489",
	 *                 "other": []
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
		$ret = array('account_type' => [], 'list' => []);

		$this->load->model('Users_bind_model');
		$ret['account_type'] = $this->Users_bind_model->account_type();
		$this->db->select('account_type,unique_id,other');
		$ret['list'] = $this->Users_bind_model->get_many_by('user_id', $this->user_id);
		if($ret['list']){
			foreach($ret['list'] as $key=>$item){
				if($item['other']){
					$ret['list'][$key]['other'] = json_decode($item['other'], true);
				}else{
					$ret['list'][$key]['other'] = [];
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/bind/save 账号绑定-修改
	 * @apiVersion 1.0.0
	 * @apiName bind_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bind/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} act 操作动作 [mobi:手机, qq:QQ, weixin:微信, weibo:新浪微博]
	 *
	 * @apiDescription
	 * mobi传递参数: mobi,code
	 * qq传递参数: 
	 * weixin传递参数: 
	 * weibo传递参数: 
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *	{
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": "成功"
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
		$act = $this->input->get_post('act');
		switch($act){
			case 'mobi':
				$mobi = $this->input->get_post('mobi');
				$code = $this->input->get_post('code');
				if(!$mobi || !$code){
					$this->ajaxReturn([], 1, '手机号绑定参数错误');
				}
				$this->load->model('Users_model');
		        $user = $this->Users_model->get_by('mobi', $mobi);
		        if($user){
		            $this->ajaxReturn([], 2, '手机号已被注册');
		        }

		        $this->load->model('Sms_email_record_model');
				$info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
				if($info){
					if($info['verify'] == $code){
						$update = array('mobi' => $mobi);
					}else{
						$this->ajaxReturn([], 4, '验证码错误');
					}
				}else{
					$this->ajaxReturn([], 3, '先获取验证码绑定');
				}
				break;
			case 'qq':
				$update = array('qq_uid' => $id);
				break;
			case 'weixin':
				$update = array('weixin_uid' => $id);
				break;
			case 'weibo':
				$update = array('weibo_uid' => $id);
				break;
			default :
				$this->ajaxReturn([], 1, '未知操作');
				break;
		}

		$flag = $this->Users_model->update($this->user_id, $update);
		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn([], $status, '操作'.$message);
	}
}
