<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Room extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Room_model');
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
		$ret['count'] = $this->Room_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
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
