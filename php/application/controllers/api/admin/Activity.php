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
	 * @api {get} /api/admin/activity 活动-列表
	 * @apiVersion 1.0.0
	 * @apiName activity
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/activity
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
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
	public function index()
	{
		$ret = ['list' => [], 'class' => []];

		$this->load->model('Activity_class_model');
		$this->db->select('id,name');
		if($class = $this->Activity_class_model->get_all()){
			foreach($class as $item){
				$ret['class'][$item['id']] = $item['name'];
			}
		}


		$this->search();
		$ret['count'] = $this->Activity_model->count_all();
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$this->search();
			if($ret['list'] = $this->Activity_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_all()){
				$this->Activity_model->common($ret);

				$a_user_id = [];
				foreach($ret['list'] as $key=>$item){
					$a_user_id[] = $item['user_id'];
				}

				$this->load->model('Users_model');
				$users = $this->Users_model->get_many_user($a_user_id);
				foreach($ret['list'] as $key=>$item){
					$ret['list'][$key]['user'] = isset($users[$item['user_id']]) ? $users[$item['user_id']] : [];
					$ret['list'][$key]['activity_class_name'] = isset($ret['class'][$item['activity_class']]) ? $ret['class'][$item['activity_class']] : '';
				}
			}else{
				$ret['list'] = [];
			}
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$title = $this->input->get_post('title');
		if(! empty($title)){
			$this->db->like('title', $title);
		}
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/activity/recommend 活动-推荐设置
	 * @apiVersion 1.0.0
	 * @apiName activity_recommend
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/activity/recommend
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 活动ID
	 * @apiParam {Number} is_recommend 推荐 0否 1是
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
	public function recommend()
	{
		$id = (int)$this->input->get_post('id');
		$is_recommend = (int)$this->input->get_post('is_recommend');
		if($this->Activity_model->update($id, ['is_recommend' => $is_recommend])){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '操作失败');
		}
	}

	/**
	 * @api {post} /api/admin/activity/hot 活动-热门设置
	 * @apiVersion 1.0.0
	 * @apiName activity_hot
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/activity/hot
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 活动ID
	 * @apiParam {Number} is_hot 推荐 0否 1是
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
	public function hot()
	{
		$id = (int)$this->input->get_post('id');
		$is_hot = (int)$this->input->get_post('is_hot');
		if($this->Activity_model->update($id, ['is_hot' => $is_hot])){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '操作失败');
		}
	}

	/**
	 * @api {post} /api/admin/activity/img 活动-广告设置
	 * @apiVersion 1.0.0
	 * @apiName activity_img
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/activity/img
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 活动ID
	 * @apiParam {Number} is_ad 广告图 0否 1是
	 * @apiParam {String} ad_image 图片地址
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
	public function img()
	{
		$id = (int)$this->input->get_post('id');
		$is_ad = (int)$this->input->get_post('is_ad');
		$ad_image = $this->input->get_post('ad_image');

		$update = ['is_ad' => $is_ad];
		if($is_ad){
			if(!$ad_image){
				$this->ajaxReturn([], 1, '设置活动广告位必须传图');
			}

			$update['ad_image'] = $ad_image;
		}
		if($this->Activity_model->update($id, $update)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '操作失败');
		}
	}
}
