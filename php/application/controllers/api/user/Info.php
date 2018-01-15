<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Info extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Users_model');
    }

    /**
	 * @api {get} /api/user/info 用户中心
	 * @apiVersion 1.0.0
	 * @apiName info
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.user 用户关联属性
	 * @apiSuccess {String} data.user.id 用户唯一ID
	 * @apiSuccess {String} data.user.nickname 用户昵称
	 * @apiSuccess {String} data.user.header 用户头像
	 * @apiSuccess {String} data.user.v 用户V认证 0未认证 1待审核 2未通过 3通过
	 * @apiSuccess {String} data.user.anchor 讲师标识 0未认证 1待审核 2未通过 3通过
	 * @apiSuccess {String} data.user.shop 开店 0否 1待审核 2未通过 3通过
	 * @apiSuccess {String} data.user.exp 经验值
	 * @apiSuccess {String} data.user.vip_id 贵族级别 0无
	 * @apiSuccess {String} data.collection 收藏数量
	 * @apiSuccess {String} data.follow 关注数量
	 * @apiSuccess {String} data.fans 粉丝数量
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *    "data": {
	 *        "user": {
	 *            "id": "1",
	 *            "nickname": "aicode",
	 *            "header": "",
	 *            "v": "0",
	 *            "anchor": "0",
	 *            "shop": "0",
	 *            "exp": "0",
	 *            "vip_id": "0"
	 *        },
	 *        "collection": 0,
	 *        "follow": 4,
	 *        "fans": 1
	 *    },
	 *    "status": 0,
	 *    "message": "成功"
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
		$ret = array();

		$user = $this->get_user();
		$ret['user'] = array(
			'id' => $user['id'],
			'nickname' => $user['nickname'],
			'header' => $user['header'],
			'v' => $user['v'],
			'anchor' => $user['anchor'],
			'shop' => $user['shop'],
			'exp' => $user['exp'],
			'vip_id' => $user['vip_id'],
		);

		$this->load->model('Users_collection_model');
		$where = array('user_id' => $this->user_id, 'topic' => 2, 'enable' => 1);
		$ret['collection'] = $this->Users_collection_model->count_by($where);
		$where = array('user_id' => $this->user_id, 'topic' => 1, 'enable' => 1);
		$ret['follow'] = $this->Users_collection_model->count_by($where);
		$where = array('t_id' => $this->user_id, 'topic' => 1, 'enable' => 1);
		$ret['fans'] = $this->Users_collection_model->count_by($where);

		$this->ajaxReturn($ret);
	}

    /**
	 * @api {get} /api/user/info/view 用户信息-查看
	 * @apiVersion 1.0.0
	 * @apiName info_view
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.header 用户头像
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.sex 性别 1男 2女 0保密
	 * @apiSuccess {String} data.birth 出生日期
	 * @apiSuccess {String} data.summary 简介
	 * @apiSuccess {String} data.mobi 绑定手机 空表示未绑定
	 * @apiSuccess {String} data.qq_uid 绑定QQ 空表示未绑定
	 * @apiSuccess {String} data.weixin_uid 绑定微信 空表示未绑定
	 * @apiSuccess {String} data.weibo_uid 绑定微博 空表示未绑定
	 * @apiSuccess {String} data.age 年龄
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *	{
	 *	    "data": {
	 *	        "header": "",
	 *	        "nickname": "aicode",
	 *	        "sex": "0",
	 *	        "birth": "2018-01-12",
	 *	        "summary": "",
	 *	        "mobi": "13430332489",
	 *	        "qq_uid": "",
	 *	        "weixin_uid": "",
	 *	        "weibo_uid": "",
	 *	        "age": 0
	 *	    },
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
	public function view()
	{
		$ret = array();

		$ret = elements(
			array(
				'header', 'nickname', 'sex', 'birth', 'summary', 'mobi', 'qq_uid', 'weixin_uid', 'weibo_uid'
			),
			$this->get_user(),
			''
		);
		$ret['age'] = $this->age($ret['birth']);
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/info/save 用户信息-修改
	 * @apiVersion 1.0.0
	 * @apiName info_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} act 操作动作 [修改密码:password, 支付密码:pay_password]
	 *
	 * @apiDescription
	 * password传递参数: old_password,new_password,confirm_password
	 * pay_password传递参数: pay_password,confirm_password
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
			case 'password':
				$old_password = $this->input->get_post('old_password');
				$new_password = $this->input->get_post('new_password');
				$confirm_password = $this->input->get_post('confirm_password');
				if(!$old_password){
					$this->ajaxReturn('', 1, '请输入旧密码');
				}
				if(!$new_password){
					$this->ajaxReturn('', 1, '请输入新密码');
				}
				if($new_password != $confirm_password){
					$this->ajaxReturn('', 2, '确认密码不一致');
				}

				$user = $this->get_user();
				if($user['password'] != $this->Users_model->get_password($old_password)){
					$this->ajaxReturn('', 3, '旧密码错误');
				}

				$update = array('password' => $this->Users_model->get_password($new_password));
				break;
			case 'pay_password':
				$pay_password = $this->input->get_post('pay_password');
				$confirm_password = $this->input->get_post('confirm_password');
				if(!$pay_password){
					$this->ajaxReturn('', 1, '请输入支付密码');
				}
				if($pay_password != $confirm_password){
					$this->ajaxReturn('', 2, '确认密码不一致');
				}

				$update = array('pay_password' => $this->Users_model->get_password($pay_password));
				break;
			default :
				$this->ajaxReturn('', 1, '未知操作');
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
		$this->ajaxReturn('', $status, '操作'.$message);
	}
}
