<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use JPush\Client;
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
	 * @apiParam {Number} sub_topic 主题类型 = 2时传递 10下载[10声音, 11专辑] 20已购[20声音, 21专辑] 30喜欢 40商品 50订阅
	 * @apiParam {Number} t_user_id 查看指定用户ID 0表示查看自己
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
		$t_user_id = (int)$this->input->get_post('t_user_id');
		if(!$t_user_id){
			$t_user_id = $this->user_id;
		}
		$ret = array('count' => 0, 'list' => array());
		$topic = (int)$this->input->get_post('topic');

		$this->load->model('Users_collection_model');
		$field = 't_id';
		$where = array('topic' => $topic);

		$a_id = array();
		switch($topic){
			case 1:
				$t_id = (int)$this->input->get_post('t_id');
				if($t_id){
					$field = 'user_id as t_id';
					$where['t_id'] = $t_user_id;
				}else{
					$where['user_id'] = $t_user_id;
				}

				// $this->db->group_by('t_id');
				$ret['count'] = $this->Users_collection_model->count_by($where);
				$rows = array();
				if($ret['count']){
					$this->db->select($field);
					if($t_id){
						$this->db->group_by('user_id');
					}else{
						$this->db->group_by('t_id');
					}

					$rows = $this->Users_collection_model->order_by('id', 'DESC')->limit($this->per_page, $this->offset)->get_many_by($where);
				}
				if($rows){
					foreach($rows as $item){
						$a_id[] = $item['t_id'];
					}

					$this->load->model('Users_model');
					$this->db->select('id,nickname,header,v,exp,summary,pretty_id');
					$ret['list'] = $this->Users_model->get_many($a_id);
					if($ret['list']){
						$fans = $this->Users_collection_model->get_many_count_fans($a_id);
						$this->load->model('Grade_model');
						$this->load->model('Room_audio_model');
	                	$audio = $this->Room_audio_model->get_many_count_music($a_id);
						foreach($ret['list'] as $key=>$item){
							$ret['list'][$key]['fans'] = isset($fans[$item['id']]) ? $fans[$item['id']] : 0;
							$ret['list'][$key]['music'] = isset($audio[$item['id']]) ? $audio[$item['id']] : 0;
							$ret['list'][$key]['hasFans'] = $this->Users_collection_model->check_fans($t_user_id, $item['id']);

							$grade = $this->Grade_model->getExpRank($item['exp']);
							$ret['list'][$key]['lv'] = $grade['grade_name'];
						}
					}
				}
				break;
			case 2:
				$sub_topic = (int)$this->input->get_post('sub_topic');
				$where['sub_topic'] = $sub_topic;
				$where['user_id'] = $t_user_id;

				$ret['count'] = $this->Users_collection_model->count_by($where);
				$rows = array();
				if($ret['count']){
					$this->db->select($field);
					$rows = $this->Users_collection_model->order_by('id', 'DESC')->limit($this->per_page, $this->offset)->get_many_by($where);

					foreach($rows as $item){
						$a_id[] = $item['t_id'];
					}
					$ret['list'] = $this->Users_collection_model->favorite($sub_topic, $a_id);
				}
				break;
			default :
				$this->ajaxReturn([], 1, '关联类型不存在');
				break;
		}

		$this->ajaxReturn($ret);
	}

    /**
	 * @api {post} /api/user/collection/save 收藏&关注-保存OR取消
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
	 * @apiParam {Number} sub_topic 子主题类型(关注不用传) 10下载[10声音, 11专辑] 20已购[20声音, 21专辑] 30喜欢 40商品 50订阅
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
			$this->Users_collection_model->delete($info['id']);

			//添加极光标签
			if($topic == 1){
				$this->load->model('Users_model');
				$user = $this->Users_model->get($this->user_id);
				$cid = $user['device_uuid'];
                if(!empty($cid)){
                    $setting = config_item('push');
                    $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);

                    $result = $client->device()
                                     ->removeTags($cid, $this->Users_model->live_group_tag($t_id));
                }
			}
			$this->ajaxReturn([], 0, '取消成功');
		}else{
			if($this->Users_collection_model->insert($where)){
				//添加极光标签
				if($topic == 1){
					$this->load->model('Users_model');
					$user = $this->Users_model->get($this->user_id);
					$cid = $user['device_uuid'];
                    if(!empty($cid)){
                        $setting = config_item('push');
                        $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);

                        $result = $client->device()
                                         ->addTags($cid, $this->Users_model->live_group_tag($t_id));
                    }
				}
				$this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 3, '保存异常请重试');
			}
		}
	}
}
