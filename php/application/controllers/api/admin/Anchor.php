<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Anchor extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Users_anchor_model');
    }

    /**
	 * @api {get} /api/admin/anchor 主播管理-列表
	 * @apiVersion 1.0.0
	 * @apiName anchor
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/anchor
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status 0待审核 1通过 2拒绝 -1全部
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "status": [
	 *             "待审核",
	 *             "已通过",
	 *             "已拒绝"
	 *         ],
	 *         "count": 3,
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-02-07 11:06:17",
	 *                 "updated_at": "2018-03-23 09:30:50",
	 *                 "status": "0",
	 *                 "mobi": "123123",
	 *                 "email": "2313@qq.com",
	 *                 "nickname": "Sad",
	 *                 "realname": "Qqqqqq"
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
		$ret = ['list' => []];

		$ret['status'] = $this->Users_anchor_model->status();

		$where = [];
		$status = $this->input->get_post('status');
		if(isset($ret['status'][$status])){
			$where['status'] = $status;
		}else{
			$where['1 >'] = 0;
		}

		$order_by = array('id' => 'desc');
		$this->search();
		$ret['count'] = $this->Users_anchor_model->count_by($where);
		if($ret['count']){
			$this->search();
			$this->db->select('id,created_at,updated_at,status,mobi,email,nickname,realname,user_id');
			if($list = $this->Users_anchor_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
				$a_uid = [];
				foreach($list as $item){
					$a_uid[] = $item['user_id'];
				}
				$this->load->model('Users_collection_model');
				$fans = $this->Users_collection_model->get_many_count_fans($a_uid);
				$this->load->model('Users_model');
				$user = $this->Users_model->get_many_user($a_uid, 'id,reward_point,nickname,pretty_id,is_hot');
				foreach($list as $item){
					$item['fans'] = isset($fans[$item['user_id']]) ? $fans[$item['user_id']] : 0;
					$item['reward_point'] = isset($user[$item['user_id']]) ? $user[$item['user_id']]['reward_point'] : 0;
					$item['nickname'] = isset($user[$item['user_id']]) ? $user[$item['user_id']]['nickname'] : 0;
					$item['pretty_id'] = isset($user[$item['user_id']]) ? $user[$item['user_id']]['pretty_id'] : 0;
					$item['is_hot'] = isset($user[$item['user_id']]) ? $user[$item['user_id']]['is_hot'] : 0;
					$ret['list'][] = $item;
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$keyword = $this->input->get_post('keyword');
		if(! empty($keyword)){
			$this->load->model('Users_model');
			$this->db->select('id');
			$this->db->like('nickname', $keyword);
			if($row = $this->Users_model->get_by(['1 >' => 0])){
				$keyword = $row['id'];
			}
			$this->db->group_start();
			$this->db->like('user_id', $keyword);
			// $this->db->or_like('nickname', $keyword);
			$this->db->or_like('mobi', $keyword);
			$this->db->group_end();
		}
	}

	/**
	 * @api {get} /api/admin/anchor/view 主播管理--详情
	 * @apiVersion 1.0.0
	 * @apiName anchor_view
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/anchor/view
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 讲师唯一ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "id": "3",
	 *         "created_at": "2018-03-14 11:12:31",
	 *         "updated_at": "2018-03-19 14:49:06",
	 *         "deleted": "0",
	 *         "status": "2",
	 *         "enable": "1",
	 *         "mobi": "13242424244",
	 *         "email": "288484847@qq.com",
	 *         "nickname": "3737",
	 *         "realname": "呵呵呵",
	 *         "certificate_type": "1",
	 *         "certificate_no": "8393939933",
	 *         "certificate_photo": "/uploads/2018/03/14/147e8912da401d7bf2c9fd097169a3b7.png",
	 *         "class_id": "1",
	 *         "summary": "444",
	 *         "other": null,
	 *         "anchor_photo": "[\"/uploads/2018/03/19/d2dcf2cead34b8abd43d5e769ae54042.jpg\"]",
	 *         "anchor_video": null,
	 *         "user_id": "31",
	 *         "job": "",
	 *         "province_id": "0",
	 *         "city_id": "0",
	 *         "area_id": "0",
	 *         "address": ""
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
	public function view()
	{
		$id = $this->input->get_post('id');
		if($info = $this->Users_anchor_model->get($id)){
			$this->ajaxReturn($info);
		}else{
			$this->ajaxReturn([], 1, '查看讲师详情ID错误');
		}
	}

	/**
	 * @api {post} /api/admin/anchor/onoff 主播-开关
	 * @apiVersion 1.0.0
	 * @apiName anchor_onoff
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/anchor/onoff
	 *
	 * @apiParam {Number} suid 账号唯一ID
	 * @apiParam {String} suid_type 账号类型
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID
	 * @apiParam {String} name 字段名称[is_hot]
	 * @apiParam {Number} value [0, 1]
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
	public function onoff()
	{
		$id = (int)$this->input->get_post('id');
		$name = trim($this->input->get_post('name'));
		$value = (int)$this->input->get_post('value');

		if(!$info = $this->Users_anchor_model->get($id)){
			$this->ajaxReturn([], 1, '参数ID错误');
		}
		switch ($name) {
			case 'is_hot':
				$update = [$name => $value];
				break;
			default:
				$update = [];
				break;
		}

		$flag = false;
		if($update){
			$this->load->model('Users_model');
			$flag = $this->Users_model->update($info['user_id'], $update);
		}

		if($flag){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '操作失败');
		}
	}

	/**
	 * @api {post} /api/admin/anchor/save 主播管理--编辑
	 * @apiVersion 1.0.0
	 * @apiName anchor_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/anchor/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status 1通过 2拒绝
	 * @apiParam {Number} id 申请ID
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
	public function save()
	{
		$id = $this->input->get_post('id');
		$status = $this->input->get_post('status');

		$a_status = $this->Users_anchor_model->status();
		if(! isset($a_status[$status])){
			$this->ajaxReturn([], 1, '审核状态错误');
		}

		if($anchor = $this->Users_anchor_model->get($id)){
			if($anchor['status'] == 1){
				if($this->Users_anchor_model->update($id, ['status' => $status])){
					$this->load->model('Users_model');
					//主播通过、直接开店 modify 2018/05/18
					$update = ['anchor' => $status, 'seller' => $status];
					if($status == 2){
						$update['nickname'] = $anchor['nickname'];
						$update['summary'] = $anchor['summary'];

						//创建机器人任务
						$this->load->model('Config_model');
						$siteConfig = $this->Config_model->siteConfig();
						if(isset($siteConfig['tpl_anchor_fans']) && is_array($siteConfig['tpl_anchor_fans']) && $siteConfig['tpl_anchor_fans']){
							$rand = mt_rand(0, count($siteConfig['tpl_anchor_fans']) - 1);
							$tpl = $siteConfig['tpl_anchor_fans'][$rand];
							$tpl['id'] = $anchor['user_id'];

							$queue = [
					            'main_type' => 'fans',
					            'sub_type'  => $tpl['id'],
					            'params'    => json_encode($tpl),
					            'status' => 0
					        ];
					        $this->load->model('Queue_model');
					        $this->Queue_model->insert($queue);
						}
					}
					$this->Users_model->update($anchor['user_id'], $update);

					$this->ajaxReturn();
				}else{
					$this->ajaxReturn([], 3, '操作失败');
				}
			}else{
				$this->ajaxReturn([], 2, '请勿重复审核');
			}
		}else{
			$this->ajaxReturn([], 1, '讲师ID错误');
		}

	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				break;
			case 'edit':
				break;
		}
	}
}
