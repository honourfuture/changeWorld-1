<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Resource extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Resource_model');
    }

    /**
	 * @api {get} /api/user/resource 主播资源-列表
	 * @apiVersion 1.0.0
	 * @apiName resource
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/resource
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} type 资源类型 0:ppt 1:bg_music
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.count 总数
	 * @apiSuccess {Object[]} data.list 资源列表
	 * @apiSuccess {Number} data.list.id 资源唯一ID
	 * @apiSuccess {String} data.list.updated_at 更新时间
	 * @apiSuccess {String} data.list.name 名称
	 * @apiSuccess {String} data.list.content 资源内容 ppt(json) bg_music(url)
	 * @apiSuccess {Number} data.list.other 补充信息 示例：时长
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "62",
	 *                 "updated_at": "2018-03-22 12:01:17",
	 *                 "name": "工商银行",
	 *                 "content": "没意见，挺好的",
	 *                 "other": ""
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
		$ret = array('count' => 0, 'list' => array());

		$type = $this->input->get_post('type');
		$a_type = $this->Resource_model->type();
		if(! isset($a_type[$type])){
			$this->ajaxReturn([], 1, '资源类型错误');
		}

		$where = array('user_id' => $this->user_id, 'type' => $type);
		$ret['count'] = $this->Resource_model->count_by($where);
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$this->db->select('id,updated_at,name,content,other');
			$ret['list'] = $this->Resource_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/resource/add 主播资源-新增
	 * @apiVersion 1.0.0
	 * @apiName resource_add
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/resource/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} type 资源类型 0:ppt 1:bg_music
	 * @apiParam {String} name 名称
	 * @apiParam {String} content 资源内容 ppt(json) bg_music(url)
	 * @apiParam {String} other 补充信息 示例：时长
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *	   },
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
	public function add()
	{
		$params = elements(
			array(
				'type', 'name', 'content', 'other'
			),
			$this->input->post(),
			''
		);
		$params['user_id'] = $this->user_id;

		$a_type = $this->Resource_model->type();
		if(! isset($a_type[$params['type']])){
			$this->ajaxReturn([], 1, '资源类型错误');
		}

		if(empty($params['name'])){
			$this->ajaxReturn([], 2, '资源名称必传');
		}

		if(empty($params['content'])){
			$this->ajaxReturn([], 3, '资源内容必传');
		}

		if($params['type'] == 0 && !$content = json_decode($params['content'])){
			$this->ajaxReturn([], 3, 'ppt资源格式错误');
		}

		if($params['type'] == 1 && empty($params['other'])){
			$this->ajaxReturn([], 4, '背景音乐时长必传');
		}

		if($this->Resource_model->insert($params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 5, '保存资源失败');
		}

	}

	/**
	 * @api {post} /api/user/resource/del 主播资源-删除
	 * @apiVersion 1.0.0
	 * @apiName resource_del
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/resource/del
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} type 资源类型 0:ppt 1:bg_music
	 * @apiParam {String} s_id 资源ID 多个英文逗号分割：1,2,3
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *	   },
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
	public function del()
	{
		$params = elements(
			array(
				'type', 's_id'
			),
			$this->input->post(),
			''
		);
		$params['user_id'] = $this->user_id;
		$params['s_id'] = trim($params['s_id']);

		$a_type = $this->Resource_model->type();
		if(! isset($a_type[$params['type']])){
			$this->ajaxReturn([], 1, '资源类型错误');
		}

		if(empty($params['s_id'])){
			$this->ajaxReturn([], 2, '资源ID必传');
		}
		$a_id = explode(',', $params['s_id']);

		$where = array('id' => $a_id, 'user_id' => $this->user_id, 'type' => $params['type']);

		if($this->Resource_model->delete_by($where)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 5, '删除资源失败');
		}

	}
}
