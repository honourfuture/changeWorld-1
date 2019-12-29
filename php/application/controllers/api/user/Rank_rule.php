<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 用户级别 设置表
 *
 * Class Sign_setting
 */
class Rank_rule extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Rank_rule_model');
    }

    /**
	 * @api {get} /api/admin/rank_rule 获取用户等级表
	 * @apiVersion 1.0.0
	 * @apiName grade_rule
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/rank_rule/
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
     * @apiParam {Number} type 类型 1 经验 2 积分
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *			"grade_login": "50",
	 *			"grade_evaluate": "20"
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
	public function index()
	{
	    $where = [
	        'status'=>0
        ];
	    $result = $this->Rank_rule_model->getAllByWhere($where);
		$this->ajaxReturn($result);
	}



}
