<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Live_gift extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Live_gift_model');
    }

    /**
	 * @api {get} /api/live_gift 直播礼物-列表
	 * @apiVersion 1.0.0
	 * @apiName live_gift
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/live_gift
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 直播礼物唯一ID
	 * @apiSuccess {String} data.title 直播礼物名称
	 * @apiSuccess {String} data.img 直播礼物图
	 * @apiSuccess {String} data.amount 兑换数量
	 * @apiSuccess {String} data.exchange_type 兑换类型 1金币 2积分
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "title": "棒棒糖",
	 *             "img": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *             "amount": "10000",
	 *             "exchange_type": "1"
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
	public function index()
	{
		$where = array();
		if($this->user_id){
			$where['enable'] = 1;
			$this->db->select('id,title,img,amount,exchange_type,gif');
		}else{
			$deleted = (int)$this->input->get('deleted');
			$where['deleted'] = $deleted;
		}
		$order_by = array('sort' => 'desc', 'id' => 'asc');
		$ret = $this->Live_gift_model->order_by($order_by)->get_many_by($where);
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/live_gift/send 直播礼物-送礼
	 * @apiVersion 1.0.0
	 * @apiName live_gift_send
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/live_gift/send
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} to_user_id 收礼用户ID
	 * @apiParam {Number} gift_id 礼物唯一ID
	 * @apiParam {Number} num 礼物数量
	 * @apiParam {Number} room_id 直播间ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object[]} data 接口数据集
	 * @apiSuccess {String} data.id 直播礼物唯一ID
	 * @apiSuccess {String} data.title 直播礼物名称
	 * @apiSuccess {String} data.img 直播礼物图
	 * @apiSuccess {String} data.amount 兑换数量
	 * @apiSuccess {String} data.exchange_type 兑换类型 1金币 2积分
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [
	 *         {
	 *             "id": "1",
	 *             "title": "棒棒糖",
	 *             "img": "/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png",
	 *             "amount": "10000",
	 *             "exchange_type": "1"
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
	public function send()
	{
		$gift_id = (int)$this->input->get_post('gift_id');
		$to_user_id = (int)$this->input->get_post('to_user_id');
		$num = (int)$this->input->get_post('num');
		$room_id = (int)$this->input->get_post('room_id');

		if(!$gift_id || !$to_user_id || !$num){
			$this->ajaxReturn([], 1, '参数错误');
		}

		if(! $gift = $this->Live_gift_model->get($gift_id)){
			$this->ajaxReturn([], 2, '礼物已下架');
		}
		if(! $gift['enable']){
			$this->ajaxReturn([], 2, '礼物已下架');
		}

		$this->load->model('Users_model');
		if(!$user_from = $this->Users_model->get($this->user_id)){
			$this->ajaxReturn([], 3, '数据异常错误');
		}

		$gold = $gift['amount'] * $num;
		if($user_from['gold'] < $gold){
			$this->ajaxReturn([], 4, '金币余额不足');
		}

		$this->db->trans_start();

		//送减
		$this->Users_model->update($user_from['id'], ['gold' => round($user_from['gold'] - $gold, 2)]);
		//收益明细
        $user_from['to_user_id'] = $to_user_id;
        $this->load->model('Bind_shop_user_model');
        if($bind = $this->Bind_shop_user_model->get_by(['shop_id' => $user_from['to_user_id'], 'user_id' => $user_from['id']])){
            $user_from['pid'] = $bind['invite_uid'];
        }else{
            $user_from['pid'] = 0;
        }
        $this->load->model('Income_model');
        $order_data = ['id' => $gift_id, 'real_total_amount' => $gold, 'title' => $gift['title']];
        $this->Income_model->gold($user_from, $order_data, $user_from['pid']);
		//收加
		/*$this->db->set('gold', 'gold + '.$gold, false);
		$this->db->where('id', $to_user_id);
		$this->db->update($this->Users_model->table());*/
		//直播间加
		$this->load->model('Room_model');
		$this->db->set('income_gold', 'income_gold + '.$gold, false);
		$this->db->where('id', $room_id);
		$this->db->update($this->Room_model->table());
		//金币明细
        $gold_log = [
            'topic' => 2,
            'from_user_id' => $user_from['id'],
            'to_user_id' => $to_user_id,
            'item_title' => $gift['title'],
            'item_id' => $gift['id'],
            'gold' => $gold
        ];
        $this->load->model('Gold_log_model');
        $this->Gold_log_model->insert($gold_log);
        //经验值
        $this->load->model('Grade_rule_model');
		$this->Grade_rule_model->add($this->user_id, 'gift', $gold);

        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE){
        	$this->ajaxReturn([], 5, '送礼服务异常请稍后重试');
        }else{
        	$this->ajaxReturn();
        }
	}

	/**
	 * @api {post} /api/live_gift/save 直播礼物-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName live_gift_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/live_gift/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
	 * @apiParam {String} title 直播礼物名称
	 * @apiParam {String} img 直播礼物图
	 * @apiParam {String} exchange_type 兑换类型 1金币 2积分
	 * @apiParam {String} amount 兑换数量
	 * @apiParam {Number} sort 排序 降序排列
	 * @apiParam {Number} enable 启用 1是 0否
	 * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
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
					'title', 'sort', 'img', 'exchange_type', 'amount', 'deleted', 'enable', 'gif'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('edit', $params);
			if($params['deleted'] == 1){
				$update = array('deleted' => 1, 'enable' => 0);
				$flag = $this->Live_gift_model->update($id, $update);
			}else{
				unset($params['deleted']);
				if(isset($params['enable']) && $params['enable']){
					$params['deleted'] = 0;
				}
				$flag = $this->Live_gift_model->update($id, $params);
			}
		}else{
			$params = elements(
				array(
					'title', 'sort', 'img', 'exchange_type', 'amount', 'gif'
				),
				$this->input->post(),
				UPDATE_VALID
			);
			$this->check_params('add', $params);
			if($flag = $this->Live_gift_model->insert($params)){
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
				if($params['title'] === '' || $params['title'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '名称参数错误');
				}
				if($params['img'] === '' || $params['img'] == UPDATE_VALID){
					$this->ajaxReturn([], 501, '请上传礼物图');
				}
				$exchange_type = $this->Live_gift_model->exchange_type();
				if($params['exchange_type'] === '' || $params['exchange_type'] == UPDATE_VALID || !isset($exchange_type[$params['exchange_type']])){
					$this->ajaxReturn([], 501, '兑换类型错误');
				}
				break;
			case 'edit':
				break;
		}
	}
}
