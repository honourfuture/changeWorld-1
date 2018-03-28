<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Grade extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Grade_model');
    }

    /**
	 * @api {get} /api/grade 等级经验-我的等级
	 * @apiVersion 1.0.0
	 * @apiName grade
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/grade
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.grade 我的等级
	 * @apiSuccess {String} data.grade.before_grade_name 前一级等级
	 * @apiSuccess {String} data.grade.grade_name 当前等级
	 * @apiSuccess {String} data.grade.after_grade_name 下一级等级
	 * @apiSuccess {String} data.grade.diff 升级差值
	 * @apiSuccess {String} data.grade.exp 当前经验值
	 * @apiSuccess {String} data.rule 等级说明
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "grade": {
	 *             "before_grade_name": "",
	 *             "grade_name": "",
	 *             "after_grade_name": "钻石",
	 *             "diff": 10000,
	 *             "exp": "0"
	 *         },
	 *         "rule": ""
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

		$this->load->model('Grade_model');
		$ret['grade'] = $this->Grade_model->exp_to_grade($user['exp']);
		$ret['rule'] = $this->Grade_model->rule();

		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}
}
