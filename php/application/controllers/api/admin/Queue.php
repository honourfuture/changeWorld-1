<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Queue extends API_Controller {
	protected $a_task = ['fans', 'audio_play', 'album_collection', 'activity', 'live_join'];

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

    public function index()
    {
    	$ret = [];
    	$ret['status'] = $this->Queue_model->status();

    	switch ($this->task) {
    		case 'fans':
    			# code...
    			break;
    		case 'audio_play':
    			# code...
    			break;
    		case 'album_collection':
    			# code...
    			break;
    		case 'activity':
    			# code...
    			break;
    		case 'live_join':
    			# code...
    			break;
    		default:
    			# code...
    			break;
    	}
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
	 * @apiParam {Number} id 模块唯一ID
	 * @apiParam {Number} step_times 秒/次
	 * @apiParam {String} step_num 变动值 支持格式： 5 或者 10-99
	 * @apiParam {Number} max 任务最大值
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
			['id', 'step_times', 'step_num', 'max'],
			$this->input->post(),
			0
		);

		switch ($this->task) {
    		case 'fans'://id 主播ID
				$this->load->model('Users_model');
		    	$user = $this->Users_model->get($params['id']);
		    	if(! $user){
		    		$this->ajaxReturn([], 1, '主播ID错误');
		    	}
    			break;
    		case 'audio_play':
    			$this->load->model('Room_audio_model');
    			$audio = $this->Room_audio_model->get($params['id']);
    			if(! $audio){
    				$this->ajaxReturn([], 1, '音频ID错误');
    			}
    			break;
    		case 'album_collection':
    			$this->load->model('Album_model');
    			$album = $this->Album_model->get($params['id']);
    			if(! $album){
    				$this->ajaxReturn([], 1, '专辑ID错误');
    			}
    			break;
    		case 'activity':
    			$this->load->model('Activity_model');
    			$activity = $this->Activity_model->get($params['id']);
    			if(! $activity){
    				$this->ajaxReturn([], 1, '活动ID错误');
    			}
    			break;
    		case 'live_join':
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
