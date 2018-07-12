<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use JPush\Client;
class Push extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Push_model');
    }

    /**
	 * @api {get} /api/admin/push 系统极光推送-列表
	 * @apiVersion 1.0.0
	 * @apiName push
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/admin/push
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.count 记录数量
	 * @apiSuccess {Object[]} data.list 接口数据集
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
	public function index()
	{
		$ret = array('count' => 0, 'list' => array());

		$where = array();
		$deleted = (int)$this->input->get('deleted');
		$where['deleted'] = $deleted;

		$this->search();
		$ret['count'] = $this->Push_model->count_by($where);
		if($ret['count']){
			$order_by = array('sort' => 'desc', 'id' => 'desc');
			$this->search();
			if($list = $this->Push_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
				$ret['list'] = $list;
			}
		}

		$this->ajaxReturn($ret);
	}

	protected function search()
	{
		
	}

	/**
	 * @api {post} /api/admin/push/send 系统极光推送-发送
	 * @apiVersion 1.0.0
	 * @apiName push_send
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/push/send
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID
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
	public function send()
	{
		$id = (int)$this->input->get_post('id');
		if($id){
			if($row = $this->Push_model->get($id)){
				$setting = config_item('push');
		        $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);

		        $result = $client->push()
                                 ->setPlatform('all')
                                 ->addAllAudience()
                                 ->setNotificationAlert($row['summary'])
                                 ->send();

                $body = [];
                if($result['http_code'] == 200){
                	$body = $result['body'];
                }
		        $update = [
		        	'sendno' => isset($body['sendno']) ? $body['sendno'] : 0,
		        	'msg_id' => isset($body['msg_id']) ? $body['msg_id'] : '',
		        	'http_code' => $result['http_code'],
		        	'times' => $row['times'] + 1
		        ];
		        $this->Push_model->update($id, $update);

		        if($result['http_code'] == 200){
		        	$this->ajaxReturn();
		        }else{
		        	$this->ajaxReturn([], $result['http_code'], '消息推送失败');
		        }
			}else{
				$this->ajaxReturn([], 2, '消息记录不存在');
			}
		}else{
			$this->ajaxReturn([], 1, '参数ID错误');
		}
	}

	/**
	 * @api {post} /api/admin/push/save 系统极光推送-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName push_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/push/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
	 * @apiParam {String} summary 消息摘要
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
	public function save()
	{
		$this->check_operation();
		$id = (int)$this->input->get_post('id');
		if($id){
			$params = elements(
				array(
					'summary', 'deleted'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Push_model->update_by(array('id' => $id), $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Push_model->update_by(array('id' => $id), $params);
			}
		}else{
			$params = elements(
				array(
					'summary'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Push_model->insert($params)){
				$id = $flag;
			}
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
	}

	protected function check_params($act, $params)
	{
		switch($act){
			case 'add':
				if($params['summary'] === '' || $params['summary'] == UPDATE_VALID){
					$this->ajaxRetitleturn('', 501, '输入消息内容');
				}
				break;
			case 'edit':
				break;
		}
	}
}
