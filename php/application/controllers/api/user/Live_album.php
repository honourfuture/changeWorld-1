<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Live_album extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Album_model');
    }

    public function top()
    {
    	$id = $this->input->get_post('id');

    	$max = $this->Album_model->order_by('sort', 'desc')->get_by(['id >' => 0]);
    	$sort = $max['sort'] + 10;
    	if($this->Album_model->update($id, ['sort' => $sort])){
    		$this->ajaxReturn();
    	}else{
    		$this->ajaxReturn([], 1, '置顶失败');
    	}
    }

    /**
	 * @api {get} /api/user/live_album 我的专辑-列表
	 * @apiVersion 1.0.0
	 * @apiName live_album
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live_album
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type [uid, title]
	 * @apiParam {String} keyword 搜索词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.count 总数
	 * @apiSuccess {Object[]} data.list 专辑列表
	 * @apiSuccess {Number} data.list.id 专辑唯一ID
	 * @apiSuccess {String} data.list.updated_at 更新时间
	 * @apiSuccess {String} data.list.cover_image 专家背景
	 * @apiSuccess {String} data.list.title 专辑标题
	 * @apiSuccess {Number} data.list.price 门票价
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "7",
	 *                 "updated_at": "2018-03-01 14:11:29",
	 *                 "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *                 "title": "你的出生地址",
	 *                 "price": "10000.00"
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

		$where = array('enable' => 1);
		if($this->user_id){
			$where['anchor_uid'] = $this->user_id;
		}

		$this->search();
		$ret['count'] = $this->Album_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			if($this->user_id){
				$this->db->select('id,updated_at,cover_image,title,price,anchor_uid');
			}
			$this->search();
			$list = $this->Album_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
			if($list){
				$a_uid = [];
				foreach($list as $item){
					$a_uid[] = $item['anchor_uid'];
					$ret['list'][] = $item;
				}

				if($this->admin_id){
					$this->load->model('Users_model');
					$ret['user'] = $this->Users_model->get_many_user($a_uid);
				}
			}
		}
		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$type = $this->input->get_post('type');
		if(in_array($type, ['uid', 'title'])){
			$keyword = $this->input->get_post('keyword');
			if($keyword){
				if($type == 'uid'){
					$this->db->where('anchor_uid', $keyword);
				}else{
					$this->db->like('title', $keyword);
				}
			}
		}
	}

	/**
	 * @api {get} /api/user/live_album/view 我的专辑-查看
	 * @apiVersion 1.0.0
	 * @apiName live_album_view
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/user/live_album/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 专辑ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "id": "7",
	 *         "cover_image": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *         "title": "你的出生地址",
	 *         "album_class": "3",
	 *         "album_tag": ",配音,铃声,",
	 *         "price": "10000.00",
	 *         "city_partner_rate": "0.00",
	 *         "two_level_rate": "0.00",
	 *         "public": "1",
	 *         "album_class_name": "知识"
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
	public function view()
	{
		$id = (int)$this->input->get_post('id');
		$this->db->select('id,cover_image,title,album_class,album_tag,price,city_partner_rate,two_level_rate,public,summary');
		$info = $this->Album_model->get($id);
		if($info){
			$info['summary'] = $info['summary'] ? json_decode($info['summary'], true) : [];
			$info['album_class_name'] = '';
			if($info['album_class']){
				$this->load->model('Album_class_model');
				$album_class = $this->Album_class_model->get($info['album_class']);
				$info['album_class_name'] = $album_class ? $album_class['name'] : '';
			}
		}

		$this->ajaxReturn($info);
	}

    /**
	 * @api {post} /api/user/live_album/save 我的专辑-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName live_album_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/live_album/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} cover_image 封面图
	 * @apiParam {String} title 标题
	 * @apiParam {String} album_class 专辑类型
	 * @apiParam {String} album_tag 专辑标签 ,配音,铃声,
	 * @apiParam {Number} price 门票价格
	 * @apiParam {Number} city_partner_rate 城市分销比例
	 * @apiParam {Number} two_level_rate 二级分销比例
	 * @apiParam {Number} public 是否公开 0否 1是
	 * @apiParam {Number} deleted 删除 1删除 不传或0不处理
	 * @apiParam {String} summary 简介图 json
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
	 * }
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
					'cover_image', 'title', 'album_class', 'album_tag', 'price',
					'city_partner_rate', 'two_level_rate', 'public', 'deleted', 'summary'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$where = ['id' => $id];
				if($this->user_id){
					$where['anchor_uid'] = $this->user_id;
				}
				$flag = $this->Album_model->update_by($where, $update);
			}else{
				unset($params['deleted']);
				$flag = $this->Album_model->update_by(array('anchor_uid' => $this->user_id, 'id' => $id), $params);
			}
		}else{
			$params = elements(
				array(
					'cover_image', 'title', 'album_class', 'album_tag', 'price',
					'city_partner_rate', 'two_level_rate', 'public', 'summary'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			$params['anchor_uid'] = $this->user_id;
			if($flag = $this->Album_model->insert($params)){
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
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请输入专辑标题');
				}
				break;
			case 'edit':
				break;
		}
	}
}
