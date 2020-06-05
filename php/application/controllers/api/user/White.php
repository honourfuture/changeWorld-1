<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class White extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->type = $this->input->get_post('type');
		$this->t_id = $this->input->get_post('t_id');
    }

    /**
	 * @api {get} /api/user/white/search 白名单-搜索
	 * @apiVersion 1.0.0
	 * @apiName white_search
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/white/search
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type 1直播 2专辑
	 * @apiParam {String} t_id 被关联唯一ID，直播传直播ID，专辑传专辑ID
	 * @apiParam {String} keyword 搜索词 支持：会员号，手机号，昵称
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.user_id 为0表示添加的城市场控手机号未注册
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "3",
	 *             "nickname": "꯭諾꯭",
	 *             "mobi": "13923771616",
	 *             "header": "http://thirdwx.qlogo.cn/mmopen/vi_32//132",
	 *             "sex": "0",
	 *             "summary": ""
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
	public function search()
	{
		$ret = [];
		$keyword = trim($this->input->get_post('keyword'));
		if($keyword){
			$this->load->model('Users_model');

			$this->db->select('id,nickname,mobi,header,sex,summary,exp,pretty_id');
			$this->db->where('id', $keyword);
			$this->db->or_where('pretty_id', $keyword);
			$this->db->or_like('nickname', $keyword);
			$this->db->or_like('mobi', $keyword);
			if($result = $this->Users_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_all()){
				$this->load->model('Grade_model');
				$this->load->model('White_model');
				foreach($result as $key=>$item){
					$row = $this->White_model->get_by(['t_id' => $this->t_id, 'type' => $this->type, 'uid' => $item['id']]);
					$item['white'] = $row ? 1 : 0;

					$grade = $this->Grade_model->getExpRank($item['exp']);
					$item['lv'] = $grade['grade_name'];

					$ret[] = $item;
				}
			}
		}

		$this->ajaxReturn($ret);
	}

    /**
	 * @api {get} /api/user/white 白名单-列表
	 * @apiVersion 1.0.0
	 * @apiName white
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/white
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type 1直播 2专辑
	 * @apiParam {String} t_id 被关联唯一ID，直播传直播ID，专辑传专辑ID
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

		$this->load->model('White_model');
		$where = array('type' => $this->type, 't_id' => $this->t_id);

		$a_id = array();

		$ret['count'] = $this->White_model->count_by($where);
		$rows = array();
		if($ret['count']){
			$field = 'uid';
			$this->db->select($field);
			$rows = $this->White_model->order_by('id', 'DESC')->limit($this->per_page, $this->offset)->get_many_by($where);
		}
		if($rows){
			foreach($rows as $item){
				$a_id[] = $item['uid'];
			}

			$this->load->model('Users_model');
			$this->db->select('id,nickname,header,v,exp,summary,pretty_id');
			$list = $this->Users_model->get_many($a_id);
			if($list){
				$ret['list'] = $list;
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/user/white/save 白名单-添加删除
	 * @apiVersion 1.0.0
	 * @apiName white_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/white/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} uid 白名单会员ID
	 * @apiParam {String} t_id 被关联唯一ID，直播传直播ID，专辑传专辑ID
	 * @apiParam {String} type 1直播 2专辑
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
	public function save()
	{
		$uid = $this->input->get_post('uid');
		$type = $this->input->get_post('type');
		$t_id = $this->input->get_post('t_id');

		if($uid && $type && $t_id){
			$this->load->model('White_model');
			$a_type = $this->White_model->type();
			if(!isset($a_type[$type])){
				$this->ajaxReturn([], 1, '白名单类型错误');
			}

			$where = ['t_id' => $t_id, 'type' => $type, 'uid' => $uid];
			if($this->White_model->get_by($where)){
				$flag = $this->White_model->delete_by($where);
			}else{
				$where['user_id'] = $this->user_id;
				$flag = $this->White_model->insert($where);
			}

			if($flag){
				$this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 3, '操作失败');
			}
		}else{
			$this->ajaxReturn([], 2, '参数错误');
		}
	}
}
