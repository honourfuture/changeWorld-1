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
	 * @api {get} /api/admin/grade 等级经验设置-列表
	 * @apiVersion 1.0.0
	 * @apiName grade
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/grade
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 等级经验设置唯一ID
	 * @apiSuccess {String} data.grade_name 等级名称
	 * @apiSuccess {String} data.grade_demand 晋级值
	 * @apiSuccess {String} data.grade_logo 等级图片
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "grade_name": "热门",
	 				"grade_demand": "500",
	 				"grade_logo": "",
	 *	        }
	 *	    ],
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
	public function index()
	{
		$deleted = (int)$this->input->get('deleted');
		$order_by = array('id' => 'desc');
		$ret = $this->Grade_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/grade/save 等级经验设置-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName grade_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/grade/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} grade_name 等级经验设置等级名称
	 * @apiParam {Number} grade_demand 晋级值
	 * @apiParam {String} grade_logo 等级图
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
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
		$this->check_operation();
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'grade_name', 'grade_demand', 'grade_logo', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Grade_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Grade_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'grade_name', 'grade_demand', 'grade_logo'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Grade_model->insert($params)){
				$id = $flag;
			}
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['grade_name'] === '' || $params['grade_name'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '等级名称参数错误');
				}
				if($params['grade_demand'] === '' || $params['grade_demand'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '等级值参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
