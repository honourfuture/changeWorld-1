<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Bank extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Bank_model');
    }

    /**
	 * @api {get} /api/bank 银行-列表
	 * @apiVersion 1.0.0
	 * @apiName bank
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/bank
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} page 页面展示类，不传取所有 帮助：help
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 银行唯一ID
	 * @apiSuccess {String} data.name 银行名称
	 * @apiSuccess {String} data.icon 银行图标
	 * @apiSuccess {String} data.first_letter 首字母
	 * @apiSuccess {String} data.pinyin 拼音
	 * @apiSuccess {String} data.color 背景色
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
		$where = array();
		$deleted = (int)$this->input->get('deleted');
		$where['deleted'] = $deleted;

		if($this->user_id){
			$this->db->select('id,name,icon,first_letter,pinyin,color');
		}
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret = $this->Bank_model->order_by($order_by)->get_many_by($where);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/bank/save 银行-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName bank_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/bank/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} name 银行名称
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} icon 银行图标
	 * @apiParam {String} is_hot 热门 0否 1是
	 * @apiParam {String} first_letter 首字母
	 * @apiParam {String} pinyin 拼音
	 * @apiParam {String} color 背景色 #666666
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
		// $this->check_operation();
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'name', 'sort', 'deleted', 'enable', 'icon', 'is_hot', 'first_letter', 'pinyin', 'color'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Bank_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$params['first_letter'] && $params['first_letter'] = strtoupper($params['first_letter']);
				$flag = $this->Bank_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'sort', 'icon', 'is_hot', 'first_letter', 'pinyin', 'color'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$params['first_letter'] = strtoupper($params['first_letter']);
			if($flag = $this->Bank_model->insert($params)){
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
				if($params['name'] === '' || $params['name'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '银行名称必传');
				}
				if($params['first_letter'] === '' || $params['first_letter'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '首字母必传');
				}
				if($params['color'] === '' || $params['color'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '背景色必传');
				}
				break;
			case 'edit':
				break;
		}
	}
}
