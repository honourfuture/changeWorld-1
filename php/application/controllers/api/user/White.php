<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class White extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/white/save 白名单-添加删除
	 * @apiVersion 1.0.0
	 * @apiName white_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/white/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} uid 白名单会员ID
	 * @apiParam {String} t_id 被关联唯一ID，直播传直播ID，专辑传专辑ID
	 * @apiParam {String} type 1直播 2专辑
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
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
	public function save()
	{
		$uid = $this->input->get_post('uid');
		$type = $this->input->get_post('type');
		$t_id = $this->input->get_post('t_id');

		if($uid && $type && $t_id){
			$this->load->model('White_model');
			$a_type = $this->White_model->type();
			if(!isset($a_type[$type])){
				$this->ajaxReturn([], 1, '白名单类型错误');
			}

			$where = ['t_id' => $t_id, 'type' => $type, 'uid' => $uid];
			if($this->White_model->get_by($where)){
				$flag = $this->White_model->delete_by($where);
			}else{
				$where['user_id'] = $this->user_id;
				$flag = $this->White_model->insert($where);
			}

			if($flag){
				$this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 3, '操作失败');
			}
		}else{
			$this->ajaxReturn([], 2, '参数错误');
		}
	}
}
