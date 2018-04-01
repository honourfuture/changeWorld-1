<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class User extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Users_model');
    }

    /**
	 * @api {get} /api/admin/user 用户管理-列表
	 * @apiVersion 1.0.0
	 * @apiName user
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/user
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {},
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

		$ret['sex'] = $this->Users_model->sex();

		$where = [];
		$where['1 >'] = 0;

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Users_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,created_at,updated_at,mobi,account,header,nickname,v,anchor,seller,exp,reg_ip,balance,point,gold');
			$ret['list'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/admin/user/view 用户管理-详情
	 * @apiVersion 1.0.0
	 * @apiName user_view
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/user/view
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 用户唯一ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {},
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
		if($info = $this->Users_model->get($id)){
			$this->ajaxReturn($info);
		}else{
			$this->ajaxReturn([], 1, '查看用户详情ID错误');
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
