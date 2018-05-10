<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Address extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Address_model');
    }

    /**
	 * @api {get} /api/address 个人地址-列表
	 * @apiVersion 1.0.0
	 * @apiName address
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/address
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 个人地址唯一ID
	 * @apiSuccess {String} data.is_default 是否默认地址 0否 1是
	 * @apiSuccess {String} data.username 收货人
	 * @apiSuccess {String} data.mobi 联系电话
	 * @apiSuccess {String} data.province_id 省ID
	 * @apiSuccess {String} data.province 省名
	 * @apiSuccess {String} data.city_id 市ID
	 * @apiSuccess {String} data.city 市名
	 * @apiSuccess {String} data.area_id 地区ID
	 * @apiSuccess {String} data.area 地区名
	 * @apiSuccess {String} data.address 详细地址
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *   "data": [
	 *       {
	 *           "id": "3",
	 *           "is_default": "1",
	 *           "username": "龙建新-1024",
	 *           "mobi": "13430332489",
	 *           "province_id": "110000",
	 *           "province": "北京市",
	 *           "city_id": "110101",
	 *           "city": "东城区",
	 *           "area_id": "0",
	 *           "area": "",
	 *           "address": "清华园1024号",
	 *       }
	 *  ],
	 *  "status": 0,
	 *  "message": "成功"
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
		$deleted = (int)$this->input->get('deleted');
		$where = array('user_id' => $this->user_id, 'deleted' => $deleted);
		$order_by = array('is_default' => 'desc', 'updated_at' => 'desc');
		$this->db->select('id,is_default,username,mobi,province_id,province,city_id,city,area_id,area,address');
		if(! $ret = $this->Address_model->order_by($order_by)->get_many_by($where)){
			$ret = [];
		}
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/address/save 个人地址-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName address_save
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/address/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} is_default 默认设置 1是 0否
	 * @apiParam {String} username 收货人
	 * @apiParam {String} mobi 联系电话
	 * @apiParam {Number} province_id 省ID
	 * @apiParam {String} province 省名称
	 * @apiParam {Number} city_id 市ID
	 * @apiParam {String} city 市名称
	 * @apiParam {Number} area_id 区ID 没有传0
	 * @apiParam {String} area 区名称 没有传空
	 * @apiParam {String} address 详细地址
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
					'is_default', 'username', 'mobi', 'province_id', 'province',
					'city_id', 'city', 'area_id', 'area', 'address', 'deleted'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1);
				$flag = $this->Address_model->update_by(array('user_id' => $this->user_id, 'id' => $id), $update);
			}else{
				unset($params['deleted']);
				$this->set_default($params);
				$flag = $this->Address_model->update_by(array('user_id' => $this->user_id, 'id' => $id), $params);
			}
		}else{
			$params = elements(
				array(
					'is_default', 'username', 'mobi', 'province_id', 'province',
					'city_id', 'city', 'area_id', 'area', 'address'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$params['user_id'] = $this->user_id;
			$this->set_default($params);
			if($flag = $this->Address_model->insert($params)){
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

	protected function set_default($params)
	{
		if($params['is_default'] == 1){
			$this->Address_model->update_by(array('user_id' => $this->user_id), array('is_default' => 0));
		}
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['username'] === '' || $params['username'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入收货人');
				}
				if($params['mobi'] === '' || $params['mobi'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入联系电话');
				}
				if($params['province_id'] === '' || $params['province_id'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '选择省');
				}
				if($params['city_id'] === '' || $params['city_id'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '选择市');
				}
				if($params['address'] === '' || $params['address'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入详细地址');
				}
				break;
			case 'edit':
				break;
		}
	}
}
