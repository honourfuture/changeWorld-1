<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Activity extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Activity_model');
    }

    /**
	 * @api {get} /api/user/activity/init 商家活动-发布初始页
	 * @apiVersion 1.0.0
	 * @apiName activity_init
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/activity/init
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.class 活动类型
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "class": [
	 *             {
	 *                 "id": "7",
	 *                 "name": "庆典"
	 *             },
	 *             {
	 *                 "id": "6",
	 *                 "name": "节日"
	 *             }
	 *         ]
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
    public function init()
    {
    	$ret = array('class' => array());

    	$this->load->model('Activity_class_model');
    	$order_by = array('sort' => 'desc', 'id' => 'desc');
		$this->db->select('id,name');
    	$ret['class'] = $this->Activity_class_model->order_by($order_by)->get_many_by('enable', 1);

    	$this->ajaxReturn($ret);
    }

	/**
	 * @api {post} /api/user/activity/save 商家活动-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName activity_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/activity/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} title 活动标题
	 * @apiParam {String} details 活动详情
	 * @apiParam {String} photos 活动照 json
	 * @apiParam {String} time_start 活动开始时间戳
	 * @apiParam {String} time_end 活动结束时间戳
	 * @apiParam {String} prize 奖项 json [{'goods_id':100, 'name':'一等奖', 'num':10}]
	 * @apiParam {String} activity_class 活动分类ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
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
	public function save()
	{
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'title', 'details', 'photos', 'time_start', 'time_end', 'prize', 'activity_class', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			$params['summary'] = mb_substr(strip_tags($params['details']), 0, 88);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Activity_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Activity_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'title', 'details', 'photos', 'time_start', 'time_end', 'prize', 'activity_class'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$params['summary'] = mb_substr(strip_tags($params['details']), 0, 88);
			if($flag = $this->Activity_model->insert($params)){
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
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '活动标题必填');
				}
				if($params['time_start'] === '' || $params['time_start'] == UPDATE_VALID || $params['time_end'] === '' || $params['time_end'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请选择活动截止时间');
				}
				if($params['prize'] === '' || $params['prize'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请设置活动奖项');
				}
				if(! json_decode($params['prize'], true)){
					$this->ajaxReturn([], 501, '活动奖项格式错误');
				}
				if($params['activity_class'] === '' || $params['activity_class'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请选择活动类型');
				}
				break;
			case 'edit':
				break;
		}
	}
}
