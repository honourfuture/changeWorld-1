<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Express extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Express_model');
    }

    /**
	 * @api {get} /api/express 快递公司-列表
	 * @apiVersion 1.0.0
	 * @apiName express
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/express
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status 状态 1常用 其他不限
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 快递公司唯一ID
	 * @apiSuccess {String} data.name 快递公司名称
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
		$deleted = (int)$this->input->get('deleted');
		$status = (int)$this->input->get('status');

		$where = array('deleted' => $deleted);
		if($status == 1){
			$where['status'] = $status;
		}
		if($this->user_id){
			$this->db->select('id,name');
		}
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret = $this->Express_model->order_by($order_by)->get_many_by($where);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/express/save 快递公司-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName express_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/express/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} name 导航类名称
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} status 状态 0初始化 1常用 其他
	 * @apiParam {String} pinyin 拼音首字母
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
					'name', 'sort', 'status', 'pinyin', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Express_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$this->setExpressInfo($params);
				$flag = $this->Express_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'sort', 'status', 'pinyin'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$this->setExpressInfo($params);
			if($flag = $this->Express_model->insert($params)){
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

	protected function setExpressInfo(&$params)
	{
		$params['pinyin'] && $params['pinyin'] = strtoupper($params['pinyin']);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['name'] === '' || $params['name'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '快递公司名称必填');
				}
				if($params['pinyin'] === '' || $params['pinyin'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '拼音首字母必填');
				}
				break;
			case 'edit':
				break;
		}
	}
}
