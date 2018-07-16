<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Robot extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /********************头像管理********************/

    /**
	 * @api {get} /api/admin/robot/header_list 机器人-头像列表
	 * @apiVersion 1.0.0
	 * @apiName robot_header_list
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/header_list
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
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
	public function header_list()
	{
		$ret = array('count' => 0, 'list' => array());

		$this->load->model('Robot_header_model');
		$ret['count'] = $this->Robot_header_model->count_all();
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$ret['list'] = $this->Robot_header_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_all();
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/admin/robot/header_batch_add 机器人-头像批上传
	 * @apiVersion 1.0.0
	 * @apiName robot_header_batch_add
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/header_batch_add
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} headers 头像集 json
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
	public function header_batch_add()
	{
		$headers = $this->input->get_post('headers');
		if($headers){
			if($a_header = json_decode($headers ,true)){
				$rows = [];
				$date = date("Y-m-d H:i:s");
				foreach($a_header as $header){
					$header = trim($header);
					if($header){
						$rows[] = [
							'created_at' => $date,
							'updated_at' => $date,
							'header' => $header
						];
					}
				}

				$count = count($rows);
				if($rows){
					$this->load->model('Robot_header_model');
					$this->db->insert_batch($this->Robot_header_model->table(), $rows);
				}

				$this->ajaxReturn([], 0, '成功上传图片数: '.$count);
			}else{
				$this->ajaxReturn([], 2, '参数格式错误');
			}
		}else{
			$this->ajaxReturn([], 1, '请上传头像');
		}
	}

	/********************昵称管理********************/

	/**
	 * @api {get} /api/admin/robot/nickname_list 机器人-昵称列表
	 * @apiVersion 1.0.0
	 * @apiName robot_nickname_list
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/nickname_list
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
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
	public function nickname_list()
	{
		$ret = array('count' => 0, 'list' => array());

		$this->load->model('Robot_nickname_model');
		$ret['count'] = $this->Robot_nickname_model->count_all();
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$ret['list'] = $this->Robot_nickname_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_all();
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/admin/robot/nickname_import 机器人-昵称导入
	 * @apiVersion 1.0.0
	 * @apiName robot_nickname_import
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/nickname_import
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} filename txt文件地址
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
	public function nickname_import()
	{
		$filename = $this->input->get_post('filename');
		if($filename){
			$file = FCPATH.$filename;
			if(file_exists($file)){
				if($a_line = file($file)){
					$rows = [];
					$date = date("Y-m-d H:i:s");
					foreach($a_line as $nickname){
						$nickname = trim($nickname);
						if($nickname){
							$rows[] = [
								'created_at' => $date,
								'updated_at' => $date,
								'nickname' => $nickname
							];
						}
					}

					$count = count($rows);
					if($rows){
						$this->load->model('Robot_nickname_model');
						$this->db->insert_batch($this->Robot_nickname_model->table(), $rows);
					}
					$this->ajaxReturn([], 0, '成功导入: '.$count);
				}else{
					$this->ajaxReturn([], 3, '读取文件失败: '.$file);
				}
			}else{
				$this->ajaxReturn([], 2, '上传txt文件不存在: '.$file);
			}
		}else{
			$this->ajaxReturn([], 1, '请上传txt文件');
		}
	}

	/********************机器人管理********************/

    /**
	 * @api {get} /api/admin/robot/users 机器人-列表
	 * @apiVersion 1.0.0
	 * @apiName robot_users
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/users
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
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
	public function users()
	{
		$this->load->model('Users_model');
		$ret = ['list' => []];

		$ret['sex'] = $this->Users_model->sex();
		$ret['anchor_status'] = $this->Users_model->anchor();
		$ret['seller_status'] = $this->Users_model->seller();

		$where = [];
		// $where['1 >'] = 0;
		$where['robot'] = 1;

		$order_by = array('id' => 'desc');
		$this->search();
		$ret['count'] = $this->Users_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,created_at,updated_at,mobi,account,header,nickname,v,anchor,seller,exp,reg_ip,balance,point,gold,headhunter,reward_point');
			$this->search();
			$ret['list'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		$keyword = $this->input->get_post('keyword');
		if(! empty($keyword)){
			$this->db->group_start();
			$this->db->like('nickname', $keyword);
			$this->db->or_like('mobi', $keyword);
			$this->db->group_end();
		}
	}

	/**
	 * @api {post} /api/admin/robot/users_random 机器人-生成
	 * @apiVersion 1.0.0
	 * @apiName robot_users_random
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/users_random
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} num 生成数量
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
	public function users_random()
	{
		$num = (int)$this->input->get_post('num');
		if($num){
			$this->load->model('Users_model');
			$rows = [];
			$date = date("Y-m-d H:i:s");
			$password = 'aicode.org.cn';

			$this->load->model('Robot_header_model');
			$this->db->select('header');
			$a_header = $this->Robot_header_model->get_all();
			if(!$a_header){
				$this->ajaxReturn([], 5, '请先上传机器人头像');
			}

			$this->load->model('Robot_nickname_model');
			$this->db->select('nickname');
			$a_nickname = $this->Robot_nickname_model->get_all();
			if(!$a_nickname){
				$this->ajaxReturn([], 5, '请先上传机器人昵称');
			}

			$c_header = count($a_header) - 1;
			$c_nickname = count($a_nickname) - 1;
			for($i = 0; $i < $num; $i++){
				$k_header = mt_rand(0, $c_header);
				$header = $a_header[$k_header]['header'];

				$k_nickname = mt_rand(0, $c_nickname);
				$nickname = $a_nickname[$k_nickname]['nickname'];

				$rows[] = [
					'created_at' => $date,
					'updated_at' => $date,
					'account' => $nickname,
					'password' => $this->Users_model->get_password($password),
					'header' => $header,
					'nickname' => $nickname,
					'sex' => mt_rand(0, 2),
					'robot' => 1
				];
			}

			$count = count($rows);
			if($rows){
				$this->db->insert_batch($this->Users_model->table(), $rows);
			}
			$this->ajaxReturn([], 0, '生成机器人数: '.$count);
		}else{
			$this->ajaxReturn([], 1, '请输入本次生成机器人数量');
		}
	}
}
