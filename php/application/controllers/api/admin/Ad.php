<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Ad extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Ad_model');
    }

    /**
	 * @api {get} /api/admin/ad 广告-列表
	 * @apiVersion 1.0.0
	 * @apiName ad
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/ad
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 广告唯一ID
	 * @apiSuccess {String} data.name 广告名称
	 * @apiSuccess {String} data.size 广告尺寸
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
		$ret = array('ad_position' => array(), 'ad' => array('count' => 0, 'list' => array()));
		$this->load->model('Ad_position_model');
		$order_by = array('id' => 'desc');
		$ret['ad_position'] = $this->Ad_position_model->order_by($order_by)->get_many_by('deleted', 0);

		$deleted = (int)$this->input->get('deleted');
		$where = array('deleted' => $deleted);
		$this->search();
		$ret['ad']['count'] = $this->Ad_model->count_by($where);
		if($ret['ad']['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			$ret['ad']['list'] = $this->Ad_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
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
	 * @api {post} /api/admin/ad/save 广告-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName ad_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/ad/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} title 广告名称
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {String} link 链接地址
	 * @apiParam {String} image 广告图
	 * @apiParam {Number} start_time 开始时间
	 * @apiParam {Number} end_time 结束时间
	 * @apiParam {Number} ad_position_id 广告位ID
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
					'sort', 'title', 'link', 'image', 'start_time', 'end_time', 'deleted', 'enable', 'ad_position_id'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Ad_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Ad_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'sort', 'title', 'link', 'image', 'start_time', 'end_time', 'ad_position_id'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Ad_model->insert($params)){
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
				if((empty($params['title']) || $params['title'] == UPDATE_VALID) && (empty($params['image']) || $params['image'] == UPDATE_VALID)){
					$this->ajaxReturn('', 501, '标题或图片必须传一个');
				}
				if($params['ad_position_id'] == UPDATE_VALID){
					$this->ajaxReturn('', 501, '广告位参数错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
