<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Users_bank extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Users_bank_model');
    }

    /**
	 * @api {get} /api/user/users_bank 银行-列表
	 * @apiVersion 1.0.0
	 * @apiName bank
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/users_bank
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
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
			$this->db->select('id,user_name,user_card,bank_id,mobi');
		}
		$order_by = array('id' => 'desc');
		$ret = $this->Users_bank_model->order_by($order_by)->get_many_by($where);
		if($ret){
			$a_bank_id = [];
			foreach($ret as $key=>$item){
				$a_bank_id[] = $item['bank_id'];
			}

			$this->load->model('Bank_model');
			$this->db->select('id,name');
			$bank = $this->Bank_model->get_many($a_bank_id);
			$k_bank = [];
			foreach($bank as $item){
				$k_bank[$item['id']] = $item['name'];
			}

			foreach($ret as $key=>$item){
				$ret[$key]['bank_name'] = isset($k_bank[$item['bank_id']]) ? $k_bank[$item['bank_id']] : '';
			}
		}
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/user/users_bank/save 银行-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName users_bank_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/users_bank/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} user_name 持卡人
	 * @apiParam {String} user_card 持卡号
	 * @apiParam {String} bank_id 持卡银行
	 * @apiParam {String} mobi 预留手机号
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
		// $this->check_operation();
		$id = (int)$this->input->get_post('id');
		if($id){
			$where = ['user_id' => $this->user_id, 'id' => $id];
			$params = elements(
				array(
					'user_name', 'user_card', 'bank_id', 'mobi', 'deleted'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Users_bank_model->update_by($where, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Users_bank_model->update_by($where, $params);
			}
		}else{
			$params = elements(
				array(
					'user_name', 'user_card', 'bank_id', 'mobi'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$params['user_id'] = $this->user_id;
			if($flag = $this->Users_bank_model->insert($params)){
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
			case 'edit':
				if($params['user_name'] === '' || $params['user_name'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '持卡人必传');
				}
				if($params['user_card'] === '' || $params['user_card'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '持卡号必传');
				}
				if($params['bank_id'] === '' || $params['bank_id'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '开户行必传');
				}
				break;
		}
	}
}
