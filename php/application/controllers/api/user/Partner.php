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
		$ret['pretty_id'] = $user['pretty_id'];
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
	 * @api {post} /api/user/partner/add 分销-人员添加(我的加盟商&城市合伙人)
	 * @apiVersion 1.0.0
	 * @apiName partner_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner/add
	 *
	 * @apiParam {Number} user_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} type 0城市合伙人 1我的加盟商
	 * @apiParam {String} mobi 手机号
	 * @apiParam {String} area 省市区 英文逗号分割 我的加盟商不用传，城市合伙人必传
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

		$type = $this->Partner_model->type();
		if(!isset($type[$params['type']])){
			$this->ajaxReturn([], 1, '分销类型错误');
		}

		switch($params['type']){
			case 1:
				if(! $params['mobi']){
					$this->ajaxReturn([], 2, '我的加盟商手机号必传');
				}
				$this->check_params('add', $params);
				break;
			case 0:
				if(! $params['mobi'] || ! $params['area']){
					$this->ajaxReturn([], 2, '城市合伙人手机号和地址必传');
				}
				$this->check_params('add', $params);
				break;
			default :
				$this->ajaxReturn([], 1, '分销类型错误');
				break;
		}

		$params['user_id'] = $this->user_id;

		$where = [
			'user_id' => $params['user_id'],
			'type' => $params['type'],
			'mobi' => $params['mobi'],
		];
		if($this->Partner_model->get_by($where)){
			$this->ajaxReturn([], 3, '请勿重复添加');
		}

		if($this->Partner_model->insert($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 2, '保存分销人信息失败');
		}
	}

	/**
	 * @api {get} /api/user/partner/record 分销-人员列表(加盟商&城市合伙人)
	 * @apiVersion 1.0.0
	 * @apiName partner_record
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner/record
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} type 分销类型 0城市合伙人 1加盟商
	 * @apiParam {Number} project 我的XXX 我是XXX（默认：0） 0：我的 1：我是
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.user_id 为0表示添加的城市合伙人手机号未注册
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 3,
	 *         "list": [
	 *             {
	 *                 "id": "3",
	 *                 "mobi": "13888888888",
	 *                 "area": "湖南省,衡阳市,珠晖区",
	 *                 "user_id": 0
	 *             },
	 *             {
	 *                 "id": "1",
	 *                 "mobi": "13430332489",
	 *                 "area": "广东省,深圳市,南山区",
	 *                 "user_id": "1",
	 *                 "nickname": "aicode",
	 *                 "header": "",
	 *                 "v": "0",
	 *                 "exp": "0"
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
	public function record()
	{
		$ret = array('count' => 0, 'list' => array());

		$project = (int)$this->input->get_post('project');
		$type = $this->input->get_post('type');
		$a_type = $this->Partner_model->type();
		if(! isset($a_type[$type])){
			$this->ajaxReturn([], 1, '分销类型错误');
		}

		$where = array('type' => $type);
		if($project){
			$user = $this->get_user();
			if(!$user || !$user['mobi']){
				$this->ajaxReturn($ret);
			}
			$where['mobi'] = $user['mobi'];
			$filed = 'user_id';
		}else{
			$where['user_id'] = $this->user_id;
			$filed = 'mobi';
		}

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Partner_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,mobi,area,user_id');
			$ret['list'] = $this->Partner_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_mobi = [];
			foreach($ret['list'] as $key=>$item){
				// $ret['list'][$key]['user_id'] = 0;
				$a_mobi[] = $item[$filed];
			}

			$this->load->model('Users_model');
			$this->db->select('id user_id,nickname,header,v,exp,mobi,pretty_id');
			if($project){
				$users = $this->Users_model->get_many($a_mobi);
			}else{
				$users = $this->Users_model->get_many_by(['mobi' => $a_mobi]);
			}
			if($users){
				$k_users = [];
				$this->load->model('Grade_model');
				foreach($users as $item){
					$grade = $this->Grade_model->exp_to_grade($item['exp']);
					$item['lv'] = $grade['grade_name'];

					$k_users[$item[$filed]] = $item;
				}

				foreach($ret['list'] as $key=>$item){
					isset($k_users[$item[$filed]]) && $ret['list'][$key] = array_merge($item, $k_users[$item[$filed]]);
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($this->Partner_model->get_by(['user_id' => $this->user_id, 'mobi' => $params['mobi']])){
					$this->ajaxReturn([], 3, '手机号已存在');
				}
				break;
			case 'edit':
				break;
		}
	}

	/**
	 * @api {post} /api/user/partner/member 推荐人-列表(加盟商详情)
	 * @apiVersion 1.0.0
	 * @apiName partner_member
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner/member
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} shop_id 店铺ID
	 * @apiParam {String} invite_uid 邀请人ID(加盟商用户ID)
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
	public function member()
	{
		$ret = array('count' => 0, 'list' => array());

		$shop_id = (int)$this->input->get_post('shop_id');
    	$invite_uid = (int)$this->input->get_post('invite_uid');
    	if($shop_id && $invite_uid){
    		$this->load->model('Bind_shop_user_model');
    		$where = ['shop_id' => $shop_id, 'invite_uid' => $invite_uid];

    		$order_by = array('id' => 'desc');
			$ret['count'] = $this->Bind_shop_user_model->count_by($where);
			if($ret['count']){
				$this->db->select('user_id');
				$rows = $this->Bind_shop_user_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

				if($rows){
					$a_user = [];
					foreach($rows as $item){
						$a_user[] = $item['user_id'];
					}

					$this->load->model('Users_model');
					$this->db->select('id user_id,nickname,header,v,exp,mobi,pretty_id');
					$users = $this->Users_model->get_many(array_values($a_user));
					if($users){
						$k_users = [];
						$this->load->model('Grade_model');
						foreach($users as $item){
							$grade = $this->Grade_model->exp_to_grade($item['exp']);
							$item['lv'] = $grade['grade_name'];

							$ret['list'][] = $item;
						}
					}
				}
			}
    	}

    	$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/partner/member_add 推荐人-添加
	 * @apiVersion 1.0.0
	 * @apiName partner_member_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner/member_add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} shop_id 店铺ID
	 * @apiParam {String} invite_uid 邀请人ID(加盟商用户ID)
	 * @apiParam {String} mobi 推荐人手机号
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
	public function member_add()
    {
    	$shop_id = (int)$this->input->get_post('shop_id');
    	$invite_uid = (int)$this->input->get_post('invite_uid');
    	$mobi = $this->input->get_post('mobi');

    	if($shop_id && $invite_uid && $mobi){
    		$this->load->model('Users_model');
    		if($user = $this->Users_model->get_by(['mobi' => $mobi])){
	    		$this->load->model('Bind_shop_user_model');
	    		$where = ['shop_id' => $shop_id, 'user_id' => $user['id']];
	    		if($this->Bind_shop_user_model->get_by($where)){
	    			$this->ajaxReturn([], 3, '推荐人已是加盟商会员');
	    		}else{
	    			$where['invite_uid'] = $invite_uid;
	    			$this->Bind_shop_user_model->insert($where);

	    			$this->ajaxReturn();
	    		}
    		}else{
    			$this->ajaxReturn([], 2, '推荐人手机号未注册');
    		}
    	}else{
    		$this->ajaxReturn([], 1, '添加推荐人参数错误');
    	}
    }
}
