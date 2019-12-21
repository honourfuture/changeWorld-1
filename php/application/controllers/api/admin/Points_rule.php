<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Points_rule extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Points_rule_model');
    }

    /**
	 * @api {get} /api/admin/points_rule 积分规则-列表
	 * @apiVersion 1.0.0
	 * @apiName points_rule
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/points_rule
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
	public function index()
	{
	    $result = $this->Points_rule_model->getAll();
		$this->ajaxReturn($result);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/points_rule/save 积分规则-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName points_rule_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/points_rule/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
     * @apiParam {String} name 后台
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
                    'value', 'days_limit','show_name', 'deleted','enable'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('edit', $params);
            if($params['deleted'] == 1){
                $update = array('deleted' => 1, 'enable' => 0);
                $flag = $this->Points_rule_model->update($id, $update);
            }else{
                unset($params['deleted']);
                if(isset($params['enable']) && $params['enable']){
                    $params['deleted'] = 0;
                }
                $flag = $this->Points_rule_model->update($id, $params);
            }
        }else{
            $params = elements(
                array(
                    'name', 'value', 'days_limit','show_name'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('add', $params);
            if($flag = $this->Points_rule_model->insert($params)){
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
				break;
			case 'edit':
				break;
		}
	}
}
