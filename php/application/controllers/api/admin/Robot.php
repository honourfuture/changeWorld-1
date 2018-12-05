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

	/**
	 * @api {get} /api/admin/robot/save 机器人-编辑
	 * @apiVersion 1.0.0
	 * @apiName robot_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 机器人唯一ID
	 * @apiParam {String} nickname 昵称
	 * @apiParam {String} header 头像
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
		$params = elements(
			array(
				'nickname', 'header', 'id'
			),
			$this->input->post(),
			''
		);
		$id = $params['id'];
		unset($params['id']);
		$this->load->model('Users_model');
		if($this->Users_model->update($id, $params)){
			$this->ajaxReturn();
		}else{
			$this->ajaxReturn([], 1, '操作失败');
		}
	}

	protected function search()
	{
		$type = $this->input->get_post('type');
		if(in_array($type, ['uid', 'title'])){
			$keyword = $this->input->get_post('keyword');
			if($keyword){
				if($type == 'uid'){
					$this->db->where('id', $keyword);
				}else{
					$this->db->like('account', $keyword);
				}
			}
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
		set_time_limit(0);
		$num = (int)$this->input->get_post('num');
		$num = min($num, 1000);
		if($num){
			$this->load->driver('cache');

			$this->load->model('Users_model');
            $rows = [];
            // $date = date("Y-m-d H:i:s");
            $password = 'aicode.org.cn';
            $password = $this->Users_model->get_password($password);

            $this->load->model('Robot_header_model');
            $this->load->model('Robot_nickname_model');
            // $this->db->select('header');
            $a_header = $this->Robot_header_model->count_all();
            if(!$a_header){
                $this->ajaxReturn([], 5, '请先上传机器人头像');
            }
            $cache_id_header = 'robot_header';
            $max_header_id = $this->cache->file->get($cache_id_header);
            if(!$max_header_id){
                $max_header_id = 0;
            }


            // $this->db->select('nickname');
            $a_nickname = $this->Robot_nickname_model->count_all();
            if(!$a_nickname){
                $this->ajaxReturn([], 5, '请先上传机器人昵称');
            }
            $cache_id_nickname = 'robot_nickname';
            $max_nickname_id = $this->cache->file->get($cache_id_nickname);
            if(!$max_nickname_id){
                $max_nickname_id = 0;
            }

            $count = 0;
            /*$c_header = count($a_header) - 1;
            $c_nickname = count($a_nickname) - 1;*/
            for($i = 0; $i < $num; $i++){
                /*$k_header = mt_rand(0, $c_header);
                $header = $a_header[$k_header]['header'];*/
                $this->db->select('id,header');
                // $row_header = $this->Robot_header_model->order_by('', 'RANDOM')->limit(1)->get_by(['1 >' => 0]);
                $row_header = $this->Robot_header_model->order_by('id', 'asc')->limit(1)->get_by(['id >' => $max_header_id]);
                if(!$row_header){
                    break;
                }
                $header = $row_header['header'];

                /*$k_nickname = mt_rand(0, $c_nickname);
                $nickname = $a_nickname[$k_nickname]['nickname'];*/
                $this->db->select('id,nickname');
                // $row = $this->Robot_nickname_model->order_by('', 'RANDOM')->limit(1)->get_by(['1 >' => 0]);
                $row = $this->Robot_nickname_model->order_by('id', 'asc')->limit(1)->get_by(['id >' => $max_nickname_id]);
                if(!$row){
                    break;
                }
                $nickname = $row['nickname'];
                $max_nickname_id = $row['id'];
                $max_header_id = $row_header['id'];

                $get_next_id = $this->Users_model->get_next_id();
                $rows = [
                    'id' => mt_rand($get_next_id, $get_next_id + 50),
                    // 'created_at' => $date,
                    // 'updated_at' => $date,
                    'account' => $nickname,
                    'password' => $password,
                    'header' => $header,
                    'nickname' => $nickname,
                    'sex' => mt_rand(0, 2),
                    'robot' => 1
                ];
                $this->Users_model->insert($rows);
                $count++;

                if($i && $i % 99 == 0){
                    // usleep(5000);
                    sleep(1);
                }
            }

            $this->cache->file->save($cache_id_header, $max_header_id, 0);
            $this->cache->file->save($cache_id_nickname, $max_nickname_id, 0);

            /*$count = count($rows);
            if($rows){
                $this->db->insert_batch($this->Users_model->table(), $rows);
            }*/
            $this->ajaxReturn([], 0, '生成机器人数: '.$count);
		}else{
			$this->ajaxReturn([], 1, '请输入本次生成机器人数量');
		}
	}


	/********************评论管理********************/

	/**
	 * @api {get} /api/admin/robot/comment_list 机器人-评论列表
	 * @apiVersion 1.0.0
	 * @apiName robot_comment_list
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/comment_list
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} topic 评论主题
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
	public function comment_list()
	{
		$ret = array('count' => 0, 'list' => array());

		$topic = (int)$this->input->get_post('topic');
		$where = ['topic' => $topic];

		$keyword = $this->input->get_post('keyword');
		if($keyword){
			$this->db->like('comment', $keyword);
		}

		$this->load->model('Robot_comment_model');
		$ret['count'] = $this->Robot_comment_model->count_by($where);
		if($ret['count']){
			$order_by = array('id' => 'desc');
			$ret['list'] = $this->Robot_comment_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}

	public function comment_del()
	{
		$id = $this->input->get_post('id');

		$this->load->model('Robot_comment_model');
		$this->Robot_comment_model->delete($id);

		$this->ajaxReturn();
	}

	/**
	 * @api {post} /api/admin/robot/comment_import 机器人-评论导入
	 * @apiVersion 1.0.0
	 * @apiName robot_comment_import
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/robot/comment_import
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
	public function comment_import()
	{
		$filename = $this->input->get_post('filename');
		if($filename){
			$file = FCPATH.$filename;
			if(file_exists($file)){
				if($a_line = file($file)){
					$topic = (int)$this->input->get_post('topic');
					$rows = [];
					$date = date("Y-m-d H:i:s");
					foreach($a_line as $comment){
						$comment = trim($comment);
						if($comment){
							$rows[] = [
								'created_at' => $date,
								'updated_at' => $date,
								'comment' => $comment,
								'topic' => $topic
							];
						}
					}

					$count = count($rows);
					if($rows){
						$this->load->model('Robot_comment_model');
						$this->db->insert_batch($this->Robot_comment_model->table(), $rows);
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
}
