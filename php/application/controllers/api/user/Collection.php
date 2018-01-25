<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Collection extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/user/collection 收藏&关注-列表
	 * @apiVersion 1.0.0
	 * @apiName collection
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/collection
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} topic 主题类型 1关注 2收藏
	 * @apiParam {Number} t_id 主题类型 = 1时传递 [0关注 1粉丝]
	 * @apiParam {Number} sub_topic 主题类型 = 2时传递 10下载[10声音, 11专辑] 20已购[10声音, 11专辑] 30喜欢 40商品 50订阅
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
	public function index()
	{
		$ret = array('count' => 0, 'list' => array());
		$topic = (int)$this->input->get_post('topic');

		$this->load->model('Users_collection_model');
		$field = 't_id';
		$where = array('topic' => $topic, 'enable' => 1);

		$a_id = array();
		switch($topic){
			case 1:
				$t_id = (int)$this->input->get_post('t_id');
				if($t_id){
					$field = 'user_id as t_id';
					$where['t_id'] = $this->user_id;
				}else{
					$where['user_id'] = $this->user_id;
				}

				$ret['count'] = $this->Users_collection_model->count_by($where);
				$rows = array();
				if($ret['count']){
					$this->db->select($field);
					$rows = $this->Users_collection_model->order_by('id', 'DESC')->limit($this->per_page, $this->offset)->get_many_by($where);
				}
				if($rows){
					foreach($rows as $item){
						$a_id[] = $item['t_id'];
					}

					$this->load->model('Users_model');
					$this->db->select('id,nickname,header,v,exp,summary');
					$ret['list'] = $this->Users_model->get_many($a_id);
					if($ret['list']){
						$fans = $this->Users_collection_model->get_many_count_fans($a_id);
						foreach($ret['list'] as $key=>$item){
							$ret['list'][$key]['fans'] = isset($fans[$item['id']]) ? $fans[$item['id']] : 0;
						}
					}
				}
				break;
			case 2:
				$sub_topic = (int)$this->input->get_post('sub_topic');
				$where['sub_topic'] = $sub_topic;

				$ret['count'] = $this->Users_collection_model->count_by($where);
				$rows = array();
				if($ret['count']){
					$this->db->select($field);
					$rows = $this->Users_collection_model->order_by('id', 'DESC')->limit($this->per_page, $this->offset)->get_many_by($where);
				}
				if($rows){
					foreach($rows as $item){
						$a_id[] = $item['t_id'];
					}
				}
				break;
			default :
				$this->ajaxReturn([], 1, '关联类型不存在');
				break;
		}

		$this->ajaxReturn($ret);
	}

    /**
	 * @api {post} /api/user/collection/save 收藏&关注-保存
	 * @apiVersion 1.0.0
	 * @apiName collection_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/collection/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} t_id 被关联唯一ID
	 * @apiParam {Number} topic 主题类型 1关注 2收藏
	 * @apiParam {Number} sub_topic 子主题类型(关注不用传) 10下载[10声音, 11专辑] 20已购[10声音, 11专辑] 30喜欢 40商品 50订阅
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
		$t_id = (int)$this->input->get_post('t_id');
		$topic = (int)$this->input->get_post('topic');
		$sub_topic = (int)$this->input->get_post('sub_topic');
		if(!$t_id || !$topic){
			$this->ajaxReturn([], 1, '参数错误');
		}
		if($topic != 1 && !$sub_topic){
			$this->ajaxReturn([], 1, '子类型参数错误');
		}
		if($topic == 1 && $this->user_id == $t_id){
			$this->ajaxReturn([], 1, '请勿关注自己');
		}

		$this->load->model('Users_collection_model');
		$where = array(
			'user_id' => $this->user_id,
			't_id' => $t_id,
			'topic' => $topic,
			'sub_topic' => $sub_topic
		);
		if($info = $this->Users_collection_model->get_by($where)){
			$this->ajaxReturn([], 2, '已关联请勿重复操作');
		}
		if($this->Users_collection_model->insert($where)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 3, '保存异常请重试');
		}
	}
}
