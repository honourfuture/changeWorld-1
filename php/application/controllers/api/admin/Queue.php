<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Queue extends API_Controller {
	protected $a_task = ['fans', 'audio_play', 'album_collection', 'activity', 'activity_vote', 'live_join', 'audio_comment'];

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Queue_model');

        $this->task = trim($this->input->get_post('task'));
        if(!in_array($this->task, $this->a_task)){
        	$this->ajaxReturn([], 500, '任务类型错误');
        }
    }

    /**
	 * @api {get} /api/admin/queue/index 任务管理-列表
	 * @apiVersion 1.0.0
	 * @apiName queue_index
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/queue/index
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} task 任务类型 ['fans', 'audio_play', 'album_collection', 'activity', 'live_join', 'activity_vote']
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
    	$ret = ['count' => 0, 'list' => []];

    	$ret['status'] = $this->Queue_model->status();

    	$where = ['main_type' => $this->task];
    	$ret['count'] = $this->Queue_model->count_by($where);

    	if($ret['count'] > 0){
	    	switch ($this->task) {
	    		case 'audio_comment':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Room_audio_model');
	    				$this->load->model('Album_audio_comment_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['play_times'] = $item['views'] = 0;
	    					$item['video_url'] = $item['title'] = '';

	    					$this->db->select('play_times,video_url,title,cover_image');
	    					if($audio = $this->Room_audio_model->get($item['params']['id'])){
	    						$item = array_merge($item, $audio);
	    					}
	    					$item['views'] = $this->Album_audio_comment_model->count_by(['audio_id' => $item['params']['id']]);

	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		case 'fans':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Users_collection_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['fans'] = $this->Users_collection_model->count_by(['topic' => 1, 't_id' => $item['params']['id']]);
	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		case 'audio_play':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Room_audio_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['play_times'] = 0;
	    					$item['video_url'] = $item['title'] = '';

	    					$this->db->select('play_times,video_url,title');
	    					if($audio = $this->Room_audio_model->get($item['params']['id'])){
	    						$item = array_merge($item, $audio);
	    					}
	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		case 'album_collection':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Users_collection_model');
	    				$this->load->model('Album_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['favorite'] = $this->Users_collection_model->count_by(['topic' => 2, 'sub_topic' => 50, 't_id' => $item['params']['id']]);

	    					$item['title'] = '';
	    					$this->db->select('title');
	    					if($album = $this->Album_model->get($item['params']['id'])){
	    						$item = array_merge($item, $album);
	    					}

	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		case 'activity':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Activity_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['views'] = 0;
	    					$item['title'] = '';

	    					$this->db->select('views,title');
	    					if($activity = $this->Activity_model->get($item['params']['id'])){
	    						$item = array_merge($item, $activity);
	    					}
	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		case 'activity_vote':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Activity_enter_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['views'] = 0;
	    					$item['title'] = '';

	    					$this->db->select('vote as views,summary as title');
	    					if($activity = $this->Activity_enter_model->get($item['params']['id'])){
	    						$item = array_merge($item, $activity);
	    					}
	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		case 'live_join':
	    			$list = $this->Queue_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where);
	    			if($list){
	    				$this->load->model('Room_model');
	    				foreach($list as $item){
	    					$item['params'] = json_decode($item['params'], true);

	    					$item['views'] = 0;
	    					$item['play_url'] = [];
	    					$item['title'] = '';

	    					$this->db->select('views,title,play_url');
	    					if($room = $this->Room_model->get($item['params']['id'])){
	    						$room['play_url'] = json_decode($room['play_url'], true);
	    						$item = array_merge($item, $room);
	    					}
	    					$ret['list'][] = $item;
	    				}
	    			}
	    			break;
	    		default:
	    			# code...
	    			break;
	    	}
    	}

    	$this->ajaxReturn($ret);
    }

    /**
	 * @api {post} /api/admin/queue/add 任务管理-新增
	 * @apiVersion 1.0.0
	 * @apiName queue_add
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/queue/add
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} task 任务类型 ['fans', 'audio_play', 'album_collection', 'activity', 'live_join']
	 * @apiParam {Number} id 模块唯一ID ['主播ID', '音频ID', '专辑ID', '活动ID', '直播间ID']
	 * @apiParam {Number} step_times 秒/次
	 * @apiParam {String} step_num 变动值 支持格式： 5 或者 10-99
	 * @apiParam {Number} max 任务最大值
	 * @apiParam {String} range 浮动范围 支持格式： 10-99
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
			['id', 'step_times', 'step_num', 'max', 'range'],
			$this->input->post(),
			0
		);

		switch ($this->task) {
			case 'audio_comment'://id 音频ID
				$this->load->model('Room_audio_model');
    			$audio = $this->Room_audio_model->get($params['id']);
    			if(! $audio){
    				$this->ajaxReturn([], 1, '音频ID错误');
    			}

    			$params['album_id'] = $audio['album_id'];
    			$params['filename'] = $this->input->get_post('filename');
    			$params['origin_filename'] = $this->input->get_post('origin_filename');

    			$file = FCPATH.$params['filename'];
    			if(file_exists($file)){
					if(! $a_line = file($file)){
						$this->ajaxReturn([], 3, '读取文件失败: '.$file);
					}
				}else{
					$this->ajaxReturn([], 2, '评论文件(TXT)未上传');
				}
				break;
    		case 'fans'://id 主播ID
				$this->load->model('Users_model');
		    	$user = $this->Users_model->get($params['id']);
		    	if(! $user){
		    		$this->ajaxReturn([], 1, '主播ID错误');
		    	}
    			break;
    		case 'audio_play'://id 音频ID
    			$this->load->model('Room_audio_model');
    			$audio = $this->Room_audio_model->get($params['id']);
    			if(! $audio){
    				$this->ajaxReturn([], 1, '音频ID错误');
    			}
    			break;
    		case 'album_collection'://id 专辑ID
    			$this->load->model('Album_model');
    			$album = $this->Album_model->get($params['id']);
    			if(! $album){
    				$this->ajaxReturn([], 1, '专辑ID错误');
    			}
    			break;
    		case 'activity'://id 活动ID
    			$this->load->model('Activity_model');
    			$activity = $this->Activity_model->get($params['id']);
    			if(! $activity){
    				$this->ajaxReturn([], 1, '活动ID错误');
    			}
    			break;
    		case 'activity_vote'://id 活动报名ID
    			$this->load->model('Activity_enter_model');
    			$activity = $this->Activity_enter_model->get($params['id']);
    			if(! $activity){
    				$this->ajaxReturn([], 1, '活动ID错误');
    			}
    			break;
    		case 'live_join'://id 直播间ID
    			$this->load->model('Room_model');
    			$room = $this->Room_model->get($params['id']);
    			if(! $room){
    				$this->ajaxReturn([], 1, '直播间ID错误');
    			}
    			if($room['status'] != 1){
    				$this->ajaxReturn([], 2, '直播间未在直播中');
    			}
    			break;
    		default:
    			# code...
    			break;
    	}

        $queue = [
            'main_type' => $this->task,
            'sub_type'  => $params['id'],
            'params'    => json_encode($params),
            'status' => 5
        ];

        if($this->Queue_model->insert($queue)){
        	$this->ajaxReturn();
        }else{
        	$this->ajaxReturn([], 1, '操作失败');
        }
    }

    /**
	 * @api {post} /api/admin/queue/start 任务管理-开始
	 * @apiVersion 1.0.0
	 * @apiName queue_start
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/queue/start
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 任务唯一ID
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
    public function start()
    {
    	$id = $this->input->get_post('id');
    	if($this->Queue_model->update($id, ['status' => 0])){
    		$this->ajaxReturn();
    	}else{
    		$this->ajaxReturn([], 1, '操作失败');
    	}
    }

    /**
	 * @api {post} /api/admin/queue/stop 任务管理-暂停
	 * @apiVersion 1.0.0
	 * @apiName queue_stop
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/queue/stop
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 任务唯一ID
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
    public function stop()
    {
    	$id = $this->input->get_post('id');
    	if($this->Queue_model->update($id, ['status' => 4])){
    		$this->ajaxReturn();
    	}else{
    		$this->ajaxReturn([], 1, '操作失败');
    	}
    }

    /**
	 * @api {post} /api/admin/queue/del 任务管理-删除
	 * @apiVersion 1.0.0
	 * @apiName queue_del
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/queue/del
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 任务唯一ID
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
    	$id = $this->input->get_post('id');
    	if($this->Queue_model->delete($id)){
    		$this->ajaxReturn();
    	}else{
    		$this->ajaxReturn([], 1, '操作失败');
    	}
    }
}
