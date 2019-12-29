<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 经验与积分的 设置表
 *
 * Class Sign_setting
 */
class Sign_setting extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Sign_setting_model');
    }

    /**
	 * @api {get} /api/admin/sign_setting 签到设置列表
	 * @apiVersion 1.0.0
	 * @apiName grade_rule
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/sign_setting
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
	    $type = $this->input->get_post('type');
	    $result = $this->Sign_setting_model->order_by('days', 'desc')->getAll($type);
		$this->ajaxReturn($result);
	}


	/**
	 * @api {post} /api/admin/sign_setting/save 等级经验规则-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName grade_rule_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/sign_setting/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
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
                    'type', 'days','value'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('edit', $params);
            $flag = $this->Sign_setting_model->update($id, $params);
        }else{
            $params = elements(
                array(
                    'type', 'days', 'value'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('add', $params);
            //check
            $where = [
                'days'=>$params["days"],
                'type'=>$params['type']
            ];
            $check = $this->Sign_setting_model->getInfoByWhere($where);
            if(!empty($check)){
                $this->ajaxReturn([], 1, '操作失败此数据已经增加');
            }
            if($flag = $this->Sign_setting_model->insert($params)){
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
