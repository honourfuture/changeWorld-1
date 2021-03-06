<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use QCloud\Live\Task;
class Room extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Room_model');
    }

    /**
	 * @api {get} /api/admin/room/stop 直播间-禁播
	 * @apiVersion 1.0.0
	 * @apiName room_stop
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/room/stop
	 *
	 * @apiParam {Number} admin_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 直播间ID
	 * @apiParam {String} msg 说明原因
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
	public function stop()
	{
		$id = (int)$this->input->get_post('id');
		$msg = trim($this->input->get_post('msg'));
		if($id && $msg){
			if($room = $this->Room_model->get($id)){
				$this->Room_model->update($id, ['status' => 3, 'msg' => $msg]);

				$QLive = new Task();
		        $config = config_item('live');
		        $QLive->setAppInfo($config['appid'], $config['api_key'], $config['push_key'], $config['bizid']);
		        $channel_id = $this->Room_model->channel_id($room['anchor_uid'], $id);
		        $QLive->Live_Channel_SetStatus($channel_id, 0);
		        $this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 2, '直播间不存在');
			}
		}else{
			$this->ajaxReturn([], 1, '操作参数错误');
		}
	}

    public function top()
    {
    	$id = $this->input->get_post('id');

    	$max = $this->Room_model->order_by('sort', 'desc')->get_by(['id >' => 0]);
    	$sort = $max['sort'] + 10;
    	if($this->Room_model->update($id, ['sort' => $sort])){
    		$this->ajaxReturn();
    	}else{
    		$this->ajaxReturn([], 1, '置顶失败');
    	}
    }

    public function untop()
    {
    	$id = $this->input->get_post('id');

    	if($this->Room_model->update($id, ['sort' => 0])){
    		$this->ajaxReturn();
    	}else{
    		$this->ajaxReturn([], 1, '取消置顶失败');
    	}
    }

    /**
	 * @api {get} /api/admin/room 直播间-列表
	 * @apiVersion 1.0.0
	 * @apiName room
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/room
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status -1全部
	 * @apiParam {String} type [uid, title]
	 * @apiParam {String} keyword 搜索词
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {},
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

		$where = [];
		$status = $this->input->get_post('status');
		if($status < 0){
			$where['1 >'] = 0;
		}else{
			if($status == 1){
				$where['status'] = $status;
			}else{
				$where['status !='] = 1;
			}
		}

		$this->search();
		$ret['count'] = $this->Room_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			$list = $this->Room_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
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

	public function chat_file()
	{
		$id = $this->input->get_post('id');
		$filename = $this->input->get_post('filename');
		$origin_filename = $this->input->get_post('origin_filename');
		$file = FCPATH.$filename;
		if($id){
			if(file_exists($file)){
				if(! $a_line = file($file)){
					$this->ajaxReturn([], 3, '读取文件失败: '.$file);
				}
				$this->Room_model->update($id, ['chat_file' => $file, 'chat_line' => 0, 'origin_filename' => $origin_filename]);
				$this->ajaxReturn();
			}else{
				$this->ajaxReturn([], 2, '聊天文件(TXT)未上传');
			}
		}else{
			$this->ajaxReturn([], 1, '直播间ID错误');
		}
	}

	public function chat_stop()
	{
		$id = $this->input->get_post('id');
		$val = (int)$this->input->get_post('val');
		if($this->Room_model->update($id, ['chat_stop' => $val])){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '操作失败');
		}
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				break;
			case 'edit':
				break;
		}
	}
}
