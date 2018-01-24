<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Search_words extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Search_words_model');
    }

    /**
	 * @api {get} /api/search_words 热搜词-列表
	 * @apiVersion 1.0.0
	 * @apiName search_words
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/search_words
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 热搜词唯一ID
	 * @apiSuccess {String} data.keyword 热搜词
	 * @apiSuccess {String} data.keyword_alias 显示词词
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "created_at": "2018-01-23 11:16:47",
	 *             "updated_at": "2018-01-23 11:16:47",
	 *             "deleted": "0",
	 *             "enable": "1",
	 *             "sort": "0",
	 *             "keyword": "童装",
	 *             "keyword_alias": "六一儿童"
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

		$where = array('deleted' => $deleted);
		if($this->user_id){
			$this->db->select('id,keyword,keyword_alias');
		}
		$order_by = array('sort' => 'desc', 'id' => 'desc');
		$ret = $this->Search_words_model->order_by($order_by)->get_many_by($where);
		$this->ajaxReturn($ret);
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/search_words/save 热搜词-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName search_words_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/search_words/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} keyword 搜索词
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} keyword_alias 显示词
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
					'keyword', 'sort', 'keyword_alias', 'deleted', 'enable'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Search_words_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Search_words_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'keyword', 'sort', 'keyword_alias'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Search_words_model->insert($params)){
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
				if($params['keyword'] === '' || $params['keyword'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '热搜词必填');
				}
				if($params['keyword_alias'] === '' || $params['keyword_alias'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '显示词必填');
				}
				break;
			case 'edit':
				break;
		}
	}
}
