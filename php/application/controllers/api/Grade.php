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
        $this->load->model('Grade_level_model');
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
	 * @apiSuccess {String} data.level.rule 权益说明
	 * @apiSuccess {String} data.level.icon 图标
	 * @apiSuccess {String} data.level.remark 等级说明
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "grade": {
	 *             "before_grade_name": "",
	 *             "grade_name": "",
	 *             "after_grade_name": "1",
	 *             "diff": 10000,
	 *             "exp": "0"
	 *         },
     *      "level": {
     *             "before_level_name": "",
     *             "level_name": "",
     *             "level_rule": "",
     *             "level_icon": "",
     *             "level_remark": "",
     *             "after_level_name": "至尊王者",
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
		$diff = $this->Grade_model->exp_diff($user['exp']);
		print_r($diff);die;
        $ret['grade'] = [
            'before_grade_name' => isset($diff['before']['grade_name']) ? $diff['before']['grade_name'] : 0,
            'grade_name' => isset($diff['this']['grade_name']) ? $diff['this']['grade_name'] : 0,
            'after_grade_name' => isset($diff['after']['grade_name']) ? $diff['after']['grade_name'] : 0,
            'diff' => isset($diff['diff']) ? $diff['diff'] : 0,
            'exp' => $user['exp'],
        ];

        $ret['level'] = [
            'before_level_name' => isset($diff['before']['name']) ? $diff['before']['name'] : '',
            'before_level_rule' => isset($diff['before']['rule']) ? $diff['before']['rule'] : '',
            'level_name' => isset($diff['this']['name']) ? $diff['before']['name'] : '',
            'level_rule' => isset($diff['this']['rule']) ? $diff['this']['rule'] : '',
            'level_icon' => isset($diff['this']['grade_logo']) ? config_item('base_url') . $diff['this']['grade_logo'] : '',
            'level_remark' => isset($diff['this']['level_remark']) ? $diff['this']['level_remark'] : '',
            'after_level_rule' => isset($diff['after']['rule']) ? $diff['after']['rule'] : '',
            'after_level_name' => isset($diff['after']['name']) ? $diff['after']['name'] : '',
            'diff' => isset($diff['diff']) ? $diff['diff'] : 0,
            'exp' => $user['exp'],
        ];

        $ret['rule'] = $this->Grade_model->rule();

		$this->ajaxReturn($ret);
	}

    /**
     * @api {get} /api/grade/level 会员等级-列表
     * @apiVersion 1.0.0
     * @apiName vip
     * @apiGroup api
     *
     * @apiSampleRequest /api/grade/level
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object[]} data 接口数据集
     * @apiSuccess {String} data.id 唯一ID
     * @apiSuccess {String} data.name 等级名称
     * @apiSuccess {String} data.rule 会员权益说明
     * @apiSuccess {String} data.brokerage 自购佣金 百分比
     * @apiSuccess {String} data.icon 图标
     * @apiSuccess {String} data.remark 等级说明
     * @apiSuccess {String} data.grade_demand 会员门槛
     * @apiSuccess {String} data.direct_brokerage 直属代理佣金
     * @apiSuccess {String} data.under_gt_brokerage 会员等级大于下属
     * @apiSuccess {String} data.under_eq_brokerage 会员等级等于下属最高
     * @apiSuccess {String} data.under_lt_brokerage 会员等级小于下属最高
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": [
     *         {
     *             "id": "1",
     *             "name": "至尊王者",
     *             "rule": "权益说明",
     *             "brokerage": "1.00",
     *             "grade_demand": "122",
     *             "direct_brokerage": "1",
     *             "icon": "",
     *             "under_gt_brokerage": "0.1",
     *             "under_eq_brokerage": "0.5",
     *             "under_lt_brokerage": "0.4"
     *         }
     *     ],
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
    public function level()
    {
        $order_by = array('sort' => 'desc', 'id' => 'desc');
        $this->db->select('id,name,rule,brokerage,icon,remark,direct_brokerage,under_gt_brokerage,under_eq_brokerage,under_lt_brokerage');
        $ret = $this->Grade_level_model->order_by($order_by)->get_many_by('enable', 1);
        $this->ajaxReturn($ret);
    }
}
