<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Album_audio_comment extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Album_audio_comment_model');
    }

    /**
	 * @api {get} /api/admin/album_audio_comment 评价管理-专辑列表
	 * @apiVersion 1.0.0
	 * @apiName album_audio_comment
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/album_audio_comment
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} status -1全部
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
		$ret = ['list' => [], 'user' => []];

		$ret['status'] = $this->Album_audio_comment_model->status();

		$where = [];
		$status = $this->input->get_post('status');
		if(isset($ret['status'][$status])){
			$where['status'] = $status;
		}else{
			$where['1 >'] = 0;
		}

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Album_audio_comment_model->count_by($where);
		if($ret['count']){
			$this->db->select('*');
			if($ret['list'] = $this->Album_audio_comment_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
				$a_uid = $a_album = $a_audio = [];
				foreach($ret['list'] as $key=>$item){
					$a_uid[] = $item['user_id'];
					$a_album[] = $item['album_id'];
					$a_audio[] = $item['audio_id'];
				}
				$k_user = [];
				//用户信息
				$this->load->model('Users_model');
				$this->db->select('id,mobi,header,nickname,v,exp,sex,balance,point,gold');
				$users = $this->Users_model->get_many($a_uid);
				foreach($users as $item){
					$ret['user'][$item['id']] = $item;
				}
				//专辑信息
				$this->load->model('Album_model');
				$this->db->select('id,title,price');
				$order = $this->Album_model->get_many($a_album);
				foreach($order as $item){
					$ret['album'][$item['id']] = $item;
				}
				//音频信息
				$this->load->model('Room_audio_model');
				$this->db->select('id,title,price');
				$order = $this->Room_audio_model->get_many($a_audio);
				foreach($order as $item){
					$ret['audio'][$item['id']] = $item;
				}
			}else{
				$ret['list'] = [];
			}
		}

		$this->ajaxReturn($ret);
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

	public function del()
	{
		$id = (int)$this->input->get_post('id');
		$this->Album_audio_comment_model->delete($id);
		$this->ajaxReturn();
	}
}
