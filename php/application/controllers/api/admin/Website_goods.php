<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Website_goods extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Website_goods_model');
    }

    /**
	 * @api {get} /api/admin/website_goods 网站-列表
	 * @apiVersion 1.0.0
	 * @apiName website_goods
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/website_goods
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
		$ret = array('count' => 0, 'list' => array());

		$deleted = (int)$this->input->get('deleted');
		$where = array('deleted' => $deleted);
		$this->search();
		$ret['count'] = $this->Website_goods_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			$ret['list'] = $this->Website_goods_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
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
	 * @api {post} /api/admin/website_goods/save 网站-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName website_goods_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/website_goods/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑(网站禁止编辑)
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} title 标题
	 * @apiParam {String} sub_title 副标题
	 * @apiParam {String} link 链接地址
	 * @apiParam {String} image 展示图
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
					'sort', 'title', 'sub_title', 'link', 'image', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$info = $this->Website_goods_model->get($id);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Website_goods_model->update($id, $update);
			}else{
				$this->check_params('edit', $params);
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Website_goods_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'sort', 'title', 'sub_title', 'link', 'image'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Website_goods_model->insert($params)){
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
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '输入标题');
				}
				if($params['image'] === '' || $params['image'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '上传展示图');
				}
				break;
		}
	}
}
