<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Security_question extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Security_question_model');
    }

    /**
	 * @api {get} /api/security_question 密保-列表
	 * @apiVersion 1.0.0
	 * @apiName security_question
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/security_question
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.question 密保问题列表
	 * @apiSuccess {String} data.question.id 密保唯一ID
	 * @apiSuccess {String} data.question.title 密保名称
	 * @apiSuccess {String} data.security 密保答案 json 空置表示没有设置 格式：问题ID：答案
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": {
	 *	        "question": [
	 *	            {
	 *	                "id": "1",
	 *	                "title": "你的出生地址"
	 *	            },
	 *	            {
	 *	                "id": "2",
	 *	                "title": "你的母亲生日"
	 *	            },
	 *	            {
	 *	                "id": "3",
	 *	                "title": "你的身份证号"
	 *	            }
	 *	        ],
	 *	        "security": "{\"1\":\"中国\", \"2\":\"10.1\", \"3\":\"1024\"}"
	 *	    },
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
		$ret = array('question' => array(), 'security' => '');
		if($this->user_id){
			$this->load->model('Users_model');
			$user = $this->Users_model->get($this->user_id);
			$ret['security'] = $user['security_question'];
		}
		$deleted = (int)$this->input->get('deleted');
		if($this->user_id){
			$this->db->select('id,title');
		}
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret['question'] = $this->Security_question_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/security_question/query 密保-设置
	 * @apiVersion 1.0.0
	 * @apiName security_question_query
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/security_question/query
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Object} security_question 密保问题答案json {密保问题ID:密保答案, 密保问题ID:密保答案}
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
	public function query()
	{
		$security_question = $this->input->get_post('security_question');
		if($this->user_id && $a_security_question = json_decode($security_question, true)){
			$this->load->model('Users_model');
			$flag = $this->Users_model->update($this->user_id, array('security_question' => $security_question));
			if($flag){
				$status = 0;
				$message = '成功';
			}else{
				$status = 1;
				$message = '失败';
			}
		}else{
			$status = 1;
			$message = '失败，参数错误';
		}

		$this->ajaxReturn([], $status, '操作'.$message);
	}

	/**
	 * @api {post} /api/security_question/save 密保-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName security_question_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/security_question/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} title 密保名称
	 * @apiParam {Number} sort 排序 降序排列
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
					'title', 'sort', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Security_question_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Security_question_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'title', 'sort'
				),
				$this->input->post(),
				''
			);
			$this->check_params('add', $params);
			if($flag = $this->Security_question_model->insert($params)){
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
				if(empty($params['title']) || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '名称参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
