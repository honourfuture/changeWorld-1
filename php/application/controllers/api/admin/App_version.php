<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class App_version extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('App_version_model');
    }

    /**
	 * @api {get} /api/admin/app_version 应用版本-列表
	 * @apiVersion 1.0.0
	 * @apiName app_version
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/app_version
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.platform 平台
	 * @apiSuccess {Object} data.channel 渠道
	 * @apiSuccess {Object} data.list 应用版本列表
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "platform": [
	 *             "IOS",
	 *             "Android"
	 *         ],
	 *         "channel": [],
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "created_at": "2018-04-02 15:41:19",
	 *                 "updated_at": "2018-04-02 15:41:19",
	 *                 "deleted": "0",
	 *                 "enable": "1",
	 *                 "version": "10000",
	 *                 "version_alias": "0",
	 *                 "platform": "0",
	 *                 "explain": null,
	 *                 "url": "",
	 *                 "channel": "0"
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

		$ret['platform'] = $this->App_version_model->platform();
		$ret['verifyStatus'] = $this->App_version_model->verifyStatus();
		$ret['channel'] = $this->App_version_model->channel();

		$deleted = (int)$this->input->get('deleted');
		$order_by = array('id' => 'desc');
		$ret['list'] = $this->App_version_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/app_version/save 应用版本-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName app_version_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/app_version/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} version 版本号 整数
	 * @apiParam {String} version_alias 版本代号
	 * @apiParam {String} platform 平台
	 * @apiParam {String} channel 渠道 预留字段
	 * @apiParam {String} explain 版本说明
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
					'deleted', 'enable', 'version', 'version_alias', 'platform', 'explain', 'url', 'channel', 'verify_status'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->App_version_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->App_version_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'version', 'version_alias', 'platform', 'explain', 'url', 'channel', 'verify_status'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->App_version_model->insert($params)){
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
				if($params['version'] === '' || $params['version'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '版本号必填');
				}
				if(! is_numeric($params['version'])){
					$this->ajaxReturn([], 501, '版本号格式错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
