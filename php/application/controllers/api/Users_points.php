<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Users_points extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/users_points 积分明细
	 * @apiVersion 1.0.0
	 * @apiName users_points
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/users_points
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.user 会员信息
	 * @apiSuccess {Object} data.points.count 积分变动总数
	 * @apiSuccess {Object[]} data.points.list 积分变动记录
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": "",
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
		$ret = array('user' => array(), 'points' => array('count' => 0, 'list' => array()));

		$where = array();
		if($this->user_id){
			$where['user_id'] = $this->user_id;
		}
		$this->load->model('Users_points_model');
		$this->search();
		$ret['points']['count'] = $this->Users_points_model->count_by($where);
		if($ret['points']['count']){
			$order_by = array('id' => 'desc');
			$this->search();
			$ret['points']['list'] = $this->Users_points_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_user = array();
			if($ret['points']['list']){
				foreach($ret['points']['list'] as $key=>$item){
					$ret['points']['list'][$key]['rule_name_text'] = $item['remark'] ? $item['remark'] : $this->formatPointsName($item['rule_name']);
					$item['user_id'] && $a_user[] = $item['user_id'];
				}
			}
			if(!$this->user_id && $a_user){
				$this->load->model('Users_model');
				$ret['user'] = $this->Users_model->get_many_user($a_user);
			}
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		
	}

	protected function formatPointsName($name)
	{
		$this->load->model('Points_rule_model');
		$init = $this->Points_rule_model->init();
		return isset($init[$name]) ? $init[$name] : '未知';
	}

	/**
	 * @api {get} /api/users_points/save 积分增减
	 * @apiVersion 1.0.0
	 * @apiName users_points_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/users_points/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} user_id 会员唯一ID
	 * @apiParam {String} type 类型 1增 2减
	 * @apiParam {String} points 积分值
	 * @apiParam {String} remark 操作备注
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *			"points_reg": "会员注册",
	 *			"points_login": "会员登录"
	 *	   },
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
	public function save()
	{
		$this->check_operation();
		$params = elements(
			array(
				'user_id', 'type', 'points', 'remark'
			),
			$this->input->post(),
			UPDATE_VALID
		);

		$this->load->model('Users_model');
		$user = $this->Users_model->get($params['user_id']);
		if(! $user){
			$this->ajaxReturn([], 1, '会员不存在');
		}
		if(! in_array($params['type'], array(1, 2))){
			$this->ajaxReturn([], 2, '增加类型不支持');
		}
		$params['points'] = intval($params['points']);
		if(! $params['points']){
			$this->ajaxReturn([], 3, '请输入有效积分值');
		}
		if(! $params['remark']){
			$this->ajaxReturn([], 4, '变动备注必填');
		}

		$this->load->model('Users_points_model');
		$data = array();
		$data['value'] = abs($params['points']);
		if($params['type'] == 2){
			$data['value'] *= -1;
			if($data['value'] > $user['point']){
				$update = array('point' => 0);
			}else{
				$update = array('point' => $user['point'] - $data['value']);
			}
		}else{
			$update = array('point' => $user['point'] + $data['value']);
		}
		$data['user_id'] = $params['user_id'];
		$data['remark'] = $params['remark'];
		$this->Users_points_model->insert($data);

		$this->Users_model->update_by(array('id' => $data['user_id']), $update);


		$this->ajaxReturn();
	}
}
