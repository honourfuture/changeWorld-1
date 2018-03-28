<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Vip extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Vip_model');
    }

    /**
	 * @api {get} /api/admin/vip 贵族-列表
	 * @apiVersion 1.0.0
	 * @apiName vip
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/vip
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 贵族唯一ID
	 * @apiSuccess {String} data.name 贵族名称
	 * @apiSuccess {String} data.first_fee 首开费用
	 * @apiSuccess {String} data.first_gold 首开金币
	 * @apiSuccess {String} data.renew_fee 续费费用
	 * @apiSuccess {String} data.renew_gold 续费金币
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "created_at": "2018-03-28 15:39:31",
	 *             "updated_at": "2018-03-28 15:42:09",
	 *             "deleted": "0",
	 *             "enable": "1",
	 *             "sort": "0",
	 *             "name": "男爵",
	 *             "first_fee": "100.00",
	 *             "first_gold": "10000",
	 *             "renew_fee": "80.00",
	 *             "renew_gold": "12000",
	 *             "icon": ""
	 *         }
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
		$deleted = (int)$this->input->get('deleted');
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret = $this->Vip_model->order_by($order_by)->get_many_by('deleted', $deleted);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/vip/save 贵族-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName vip_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/vip/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} sort 排序 降序
	 * @apiParam {String} name 贵族名称
	 * @apiParam {String} first_fee 首开费用
	 * @apiParam {String} first_gold 首开金币
	 * @apiParam {String} renew_fee 续费费用
	 * @apiParam {String} renew_gold 续费金币
	 * @apiParam {String} icon icon图标
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
					'deleted', 'enable', 'sort', 'name', 'first_fee',
					'first_gold', 'renew_fee', 'renew_gold', 'icon'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Vip_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Vip_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'sort', 'name', 'first_fee',
					'first_gold', 'renew_fee', 'renew_gold', 'icon'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Vip_model->insert($params)){
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
					$this->ajaxReturn([], 501, '名称参数错误');
				}
				if($params['first_fee'] === '' || $params['first_fee'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '首开费用参数错误');
				}
				if($params['first_gold'] === '' || $params['first_gold'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '首开金币参数错误');
				}
				if($params['renew_fee'] === '' || $params['renew_fee'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '续费费用参数错误');
				}
				if($params['renew_gold'] === '' || $params['renew_gold'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '续费金币参数错误');
				}
				if($params['icon'] === '' || $params['icon'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, 'icon图标参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
