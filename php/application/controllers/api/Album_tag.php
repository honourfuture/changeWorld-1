<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Album_tag extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Album_tag_model');
    }

    /**
	 * @api {get} /api/album_tag 专辑标签-列表
	 * @apiVersion 1.0.0
	 * @apiName album_tag
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/album_tag
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "1": {
	 *             "name": "内容",
	 *             "limit": "3",
	 *             "list": [
	 *                 {
	 *                     "6": "广告"
	 *                 },
	 *                 {
	 *                     "5": "铃声"
	 *                 },
	 *                 {
	 *                     "4": "配音"
	 *                 },
	 *                 {
	 *                     "3": "声音日记"
	 *                 }
	 *             ]
	 *         },
	 *         "2": {
	 *             "name": "播讲",
	 *             "limit": "2",
	 *             "list": [
	 *                 {
	 *                     "8": "体育"
	 *                 },
	 *                 {
	 *                     "7": "广告"
	 *                 },
	 *                 {
	 *                     "9c": "天天快递"
	 *                 }
	 *             ]
	 *         }
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
		$ret = array();
		$deleted = (int)$this->input->get('deleted');
		$tag_user = array();
		if($this->user_id){
			$this->db->select('concat(id, "c") as id,name,pid');
			$this->load->model('Album_tag_user_model');
			$tag_user = $this->Album_tag_user_model->get_many_by('user_id', $this->user_id);

			$this->db->select('id,name,pid,limit');
		}
		$order_by = array('pid' => 'asc', 'sort' => 'desc', 'id' => 'desc');
		$tag = $this->Album_tag_model->order_by($order_by)->get_many_by('deleted', $deleted);
		!empty($tag_user) && $tag = array_merge($tag, $tag_user);//合并用户自定义
		if($tag){
			foreach($tag as $item){
				if($item['pid'] == 0){
					$ret[$item['id']] = $this->user_id ? array('id' => $item['id'], 'name' => $item['name'], 'limit' => $item['limit']) : $item;
					$ret[$item['id']]['list'] = array();
				}else{
					if(isset($ret[$item['pid']])){
						$ret[$item['pid']]['list'][] = $this->user_id ? array('id' => $item['id'], 'name' => $item['name']) : $item;
					}
				}
			}

			if($this->user_id){
				$formatData = array();
				foreach($ret as $item){
					$formatData[] = $item;
				}
				$ret = $formatData;
			}
		}
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/album_tag/add 专辑标签-自定义
	 * @apiVersion 1.0.0
	 * @apiName album_tag_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/album_tag/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} name 标签名称
	 * @apiParam {Number} pid 父级ID
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
	public function add()
	{
		$params = elements(
			array(
				'name', 'pid'
			),
			$this->input->post(),
			UPDATE_VALID
		);
		if($params['name'] === '' || $params['name'] == UPDATE_VALID){
			$this->ajaxReturn([], 501, '名称参数错误');
		}
		if($params['pid'] === '' || $params['pid'] == UPDATE_VALID){
			$this->ajaxReturn([], 501, '请传父级ID');
		}
		$params['user_id'] = $this->user_id;

		$this->load->model('Album_tag_user_model');
		if($id = $this->Album_tag_user_model->insert($params)){
			$this->ajaxReturn(['id' => $id.'c']);
		}else{
			$this->ajaxReturn([], 1, '保存失败');
		}
	}

	/**
	 * @api {post} /api/album_tag/del 专辑标签-自定义删除
	 * @apiVersion 1.0.0
	 * @apiName album_tag_del
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/album_tag/del
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 自定义标签ID
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
	public function del()
	{
		$id = intval($this->input->get_post('id'));
		if($id){
			$this->load->model('Album_tag_user_model');
			$this->Album_tag_user_model->delete_by(['id' => $id, 'user_id' => $this->user_id]);

			$this->ajaxReturn([]);
		}else{
			$this->ajaxReturn([], 1, '参数ID错误');
		}
	}

	/**
	 * @api {post} /api/album_tag/save 专辑标签-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName album_tag_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/album_tag/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} name 专辑标签名称
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {Number} pid 父级ID 0顶级
	 * @apiParam {Number} limit 限制选择数量
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
					'name', 'sort', 'deleted', 'enable', 'pid', 'limit'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Album_tag_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Album_tag_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'name', 'sort', 'pid', 'limit'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Album_tag_model->insert($params)){
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
				break;
			case 'edit':
				break;
		}
	}
}
