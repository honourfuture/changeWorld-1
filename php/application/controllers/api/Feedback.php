<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Feedback extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Feedback_model');
    }

    /**
	 * @api {get} /api/feedback 意见反馈-列表
	 * @apiVersion 1.0.0
	 * @apiName feedback
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/feedback
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 意见反馈唯一ID
	 * @apiSuccess {String} data.name 意见反馈名称
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "name": "热门"
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "name": "靓号"
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
		$ret = array('user' => array(), 'count' => 0, 'list' => array());
		$where = array();
		$deleted = (int)$this->input->get('deleted');
		$where['deleted'] = $deleted;
		if($this->user_id){
			$where['user_id'] = $this->user_id;
		}

		$ret['count'] = $this->Feedback_model->count_by($where);
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$ret['list'] = $this->Feedback_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_user = array();
			if($ret['list']){
				foreach($ret['list'] as $key=>$item){
					$ret['list'][$key]['photos'] && $ret['list'][$key]['photos'] = json_decode($ret['list'][$key]['photos'], true);
					$item['user_id'] && $a_user[] = $item['user_id'];
				}
			}
			if($a_user){
				$this->load->model('Users_model');
				$ret['user'] = $this->Users_model->get_many_user($a_user);
			}
		}
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/feedback/add 意见反馈-新增
	 * @apiVersion 1.0.0
	 * @apiName feedback_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/feedback/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} content 意见反馈内容
	 * @apiParam {String} photos 展示图 json
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
	public function add()
	{
		$id = 0;
		$params = elements(
			array(
				'content', 'photos'
			),
			$this->input->post(),
			UPDATE_VALID
		);
		$params['user_id'] = $this->user_id;
		$this->check_params('add', $params);
		if($flag = $this->Feedback_model->insert($params)){
			$id = $flag;
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
				if($params['content'] === '' || $params['content'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '意见反馈内容必传');
				}
				break;
			case 'edit':
				break;
		}
	}
}
