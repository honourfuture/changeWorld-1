<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Headhunter extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Headhunter_model');
    }

    /**
	 * @api {get} /api/user/headhunter 猎头用户-列表
	 * @apiVersion 1.0.0
	 * @apiName headhunter
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/headhunter
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
	 *     "data": {
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-04-02 15:56:26",
	 *                 "updated_at": "2018-04-02 15:56:26",
	 *                 "deleted": "0",
	 *                 "status": "0",
	 *                 "enable": "1",
	 *                 "sort": "0",
	 *                 "url": "http://ww.baidu.com"
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
		$ret = ['count' => 0, 'list' => []];

		$order_by = array('id' => 'desc');
		$where = ['user_id' => $this->user_id];
		$ret['count'] = $this->Headhunter_model->count_by($where);
		if($list = $this->Headhunter_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
			$a_uid = [];
			foreach($list as $item){
				$a_uid[] = $item['to_user_id'];
			}

			$this->load->model('Users_model');
			$user = $this->Users_model->get_many_user($a_uid, 'id,nickname,header,mobi,exp,address');
			$this->load->model('Grade_model');
			foreach($list as $item){
				$item['nickname'] = '';
				$item['header'] = '';
				$item['mobi'] = '';
				$item['exp'] = 0;
				isset($user[$item['to_user_id']]) && $item = array_merge($item, $user[$item['to_user_id']]);

				$grade = $this->Grade_model->exp_to_grade($item['exp']);
				$item['lv'] = $grade['grade_name'];

				$ret['list'][] = $item;
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/user/headhunter/withdraw 猎头用户-返利列表
	 * @apiVersion 1.0.0
	 * @apiName headhunter_withdraw
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/headhunter/withdraw
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} to_user_id 猎头会员ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-04-02 15:56:26",
	 *                 "updated_at": "2018-04-02 15:56:26",
	 *                 "deleted": "0",
	 *                 "status": "0",
	 *                 "enable": "1",
	 *                 "sort": "0",
	 *                 "url": "http://ww.baidu.com"
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
	public function withdraw()
	{
		$ret = ['count' => 0, 'list' => [], 'total' => 0];

		$to_user_id = $this->input->get_post('to_user_id');
		$where = [
			'from_user_id' => $to_user_id,
			'to_user_id' => $this->user_id
		];

		$this->load->model('Withdraw_headhunter_model');
		$ret['count'] = $this->Withdraw_headhunter_model->count_by($where);
		if($ret['count']){
			$this->db->select('sum(reward_amount) total');
			$row = $this->Withdraw_headhunter_model->get_by($where);
			$ret['total'] = $row['total'];

			$order_by = ['id' => 'desc'];
			$this->db->select('id,updated_at,withdraw_amount,reward_amount');
			if($list = $this->Withdraw_headhunter_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
				$ret['list'] = $list;
			}
		}

		$this->ajaxReturn($ret);
	}
}
