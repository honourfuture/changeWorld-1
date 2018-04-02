<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class App_map extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('App_map_model');
    }

    /**
	 * @api {get} /api/admin/app_map 应用引导图-列表
	 * @apiVersion 1.0.0
	 * @apiName app_map
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/app_map
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
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-04-02 15:56:26",
	 *                 "updated_at": "2018-04-02 15:56:26",
	 *                 "deleted": "0",
	 *                 "status": "0",
	 *                 "enable": "1",
	 *                 "sort": "0",
	 *                 "url": "http://ww.baidu.com"
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
	public function index()
	{
		$ret = [];

		$deleted = (int)$this->input->get('deleted');
		$order_by = array('id' => 'desc');
		$ret['list'] = $this->App_map_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/app_map/save 应用引导图-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName app_map_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/app_map/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} sort 排序
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} url 链接地址
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
					'deleted', 'enable', 'sort', 'url'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->App_map_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->App_map_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'url', 'sort'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->App_map_model->insert($params)){
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
				if($params['url'] === '' || $params['url'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请选择上传图片');
				}
				break;
			case 'edit':
				break;
		}
	}
}
