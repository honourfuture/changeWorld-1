<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Ad_position extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Ad_position_model');
    }

    /**
	 * @api {get} /api/admin/ad_position 广告位-列表
	 * @apiVersion 1.0.0
	 * @apiName ad_position
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/ad_position
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 广告位唯一ID
	 * @apiSuccess {String} data.name 广告位名称
	 * @apiSuccess {String} data.size 广告位尺寸
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": [
	 *	        {
	 *	            "id": "1",
	 *	            "name": "热门",
	 				"size": "300 X 400",
	 *	        },
	 *	        {
	 *	            "id": "2",
	 *	            "name": "靓号",
	 *	            "size": "300 X 400",
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
		$ret = $this->Ad_position_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/ad_position/save 广告位-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName ad_position_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/ad_position/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} name 广告位名称
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} size 广告位尺寸
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
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'name', 'deleted', 'enable', 'size'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Ad_position_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Ad_position_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'size'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Ad_position_model->insert($params)){
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
				if($params['name'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '名称参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
