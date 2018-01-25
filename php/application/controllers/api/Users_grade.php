<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Users_grade extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/users_grade 经验值明细
	 * @apiVersion 1.0.0
	 * @apiName users_grade
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/users_grade
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.user 会员信息
	 * @apiSuccess {Object} data.grade.count 经验值变动总数
	 * @apiSuccess {Object[]} data.grade.list 经验值变动记录
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
		$ret = array('user' => array(), 'grade' => array('count' => 0, 'list' => array()));

		$where = array();
		if($this->user_id){
			$where['user_id'] = $this->user_id;
		}
		$this->load->model('Users_grade_model');
		$this->search();
		$ret['grade']['count'] = $this->Users_grade_model->count_by($where);
		if($ret['grade']['count']){
			$order_by = array('id' => 'desc');
			$this->search();
			$ret['grade']['list'] = $this->Users_grade_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_user = array();
			if($ret['grade']['list']){
				foreach($ret['grade']['list'] as $key=>$item){
					$ret['grade']['list'][$key]['rule_name_text'] = $this->formatGradeName($item['rule_name']);
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

	protected function formatGradeName($name)
	{
		$this->load->model('Grade_rule_model');
		$init = $this->Grade_rule_model->init();
		return isset($init[$name]) ? $init[$name] : '未知';
	}
}
