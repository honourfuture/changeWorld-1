<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Bag extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->field = 'gold';
        $this->load->model('Bag_model');
    	$this->load->model('Users_bag_model');
    	$this->load->model('Users_model');
    	$this->load->model('Gold_log_model');
    }

    /**
	 * @api {post} /api/user/bag 红包-发布
	 * @apiVersion 1.0.0
	 * @apiName bag
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bag
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} amount 总金额
	 * @apiParam {String} num 总数量
	 * @apiParam {String} room_id 房间号
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "bag_id": 7,
	 *         "amount": 100,
	 *         "num": 2
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
    public function add()
    {
    	$amount = (float)$this->input->get_post('amount');
    	$num = (int)$this->input->get_post('num');
    	$room_id = (int)$this->input->get_post('room_id');
    	$type = 0;//(int)$this->input->get_post('type');

    	if($amount < 0.01 || $num < 1){
    		$this->ajaxReturn([], 1, '发红包设置错误');
    	}

    	$user = $this->get_user();
    	if($type){//固定红包
    		$sum = round($amount * $num, 2);
    	}else{
    		$sum = $amount;
    	}

    	if(!$user || $user[$this->field] < $sum){
    		$this->ajaxReturn([], 2, '钱包金币不足');
    	}

    	$this->db->trans_start();

    	//扣除
    	$this->Users_model->update($user['id'], [$this->field => round($user[$this->field] - $sum, 2)]);
    	//记录
    	$bag_id = $this->Bag_model->insert(['user_id' => $user['id'], 'amount' => $sum, 'num' => $num, 'room_id' => $room_id]);
    	//批量预生成
    	$bag_init = $this->Bag_model->init($bag_id, $room_id, $amount, $num, $type);
    	$this->Users_bag_model->insert_many($bag_init);

    	$this->db->trans_complete();
    	if($this->db->trans_status() === FALSE){
    		$this->ajaxReturn([], 3, '发红包失败，稍后重试');
    	}else{
    		$this->ajaxReturn(['bag_id' => $bag_id, 'amount' => $amount, 'num' => $num]);
    	}
    }

	/**
	 * @api {get} /api/user/bag 红包-详情
	 * @apiVersion 1.0.0
	 * @apiName bag
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bag
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} bag_id 红包ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.amount 红包额度
	 * @apiSuccess {String} data.num 红包数量
	 * @apiSuccess {String} data.header 发红包者头像
	 * @apiSuccess {String} data.nickname 发红包者昵称
	 * @apiSuccess {Object} data.list 领取列表
	 * @apiSuccess {Object} data.count 领取总数
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "id": "1",
	 *         "user_id": "3",
	 *         "amount": "100.00",
	 *         "num": "1",
	 *         "header": "",
	 *         "nickname": "aicode",
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "header": "http://thirdwx.qlogo.cn/mmopen/vi_32/",
	 *                 "nickname": "小树",
	 *                 "amount": "100.00"
	 *             }
	 *         ],
	 *         "count": 1
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
		$ret = [];
		$id = (int)$this->input->get_post('bag_id');
		$this->db->select('id,user_id,amount,num');
		if($bag = $this->Bag_model->get($id)){
			//发红包者
			$this->db->select('header,nickname');
			if($user = $this->Users_model->get($bag['user_id'])){
				$ret = array_merge($bag, $user, $this->_more($bag['id']));
				$this->ajaxReturn($ret);
			}else{
				$this->ajaxReturn([], 2, '该红包异常错误');
			}
		}else{
			$this->ajaxReturn([], 1, '红包已过期');
		}
	}

	/**
	 * @api {get} /api/user/bag/more 红包-详情-更多（翻页）
	 * @apiVersion 1.0.0
	 * @apiName bag_more
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bag/more
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} bag_id 红包ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.list 领取列表
	 * @apiSuccess {Object} data.count 领取总数
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "list": [
	 *             {
	 *                 "id": "1",
	 *                 "header": "http://thirdwx.qlogo.cn/mmopen/vi_32/",
	 *                 "nickname": "小树",
	 *                 "amount": "100.00"
	 *             }
	 *         ],
	 *         "count": 1
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
	public function more()
	{
		$id = (int)$this->input->get_post('bag_id');
		$ret = $this->_more($id);
		$this->ajaxReturn($ret);
	}

	protected function _more($bag_id)
	{
		$ret = ['list' => []];
		//领取情况
		$a_uid = [];
		$k_bag = [];
		$order_by = array('id' => 'desc');
		$where = ['bag_id' => $bag_id, 'user_id >' => 0];
		$ret['count'] = $this->Users_bag_model->count_by($where);
		if($ret['count']){
			$this->db->select('user_id,amount');
			$users_bag = $this->Users_bag_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
			if($users_bag){
				foreach($users_bag as $item){
					$k_bag[$item['user_id']] = $item['amount'];
					$a_uid[] = $item['user_id'];
				}
			}
		}

		if($a_uid){
			$this->db->select('id,header,nickname');
			if($user = $this->Users_model->get_many($a_uid)){
				foreach($user as $key=>$item){
					$item['amount'] = isset($k_bag[$item['id']]) ? $k_bag[$item['id']] : '0.00';
					$ret['list'][] = $item;
				}
			}
		}

		return $ret;
	}

	/**
	 * @api {get} /api/user/bag/receive 红包-领取
	 * @apiVersion 1.0.0
	 * @apiName bag_receive
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bag/receive
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} bag_id 红包ID
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.amount 领取数量
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "amount": "31.61"
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
	public function receive()
	{
		$id = (int)$this->input->get_post('bag_id');

		if($users_bag = $this->Users_bag_model->order_by('id', 'asc')->get_by(['bag_id' => $id, 'user_id' => 0])){
			if($this->Users_bag_model->order_by('id', 'asc')->get_by(['bag_id' => $id, 'user_id' => $this->user_id])){
				$this->ajaxReturn([], 1, '每个用户限定领取一次');
			}

			if(! $bag = $this->Bag_model->get($id)){
				$this->ajaxReturn([], 2, '红包已过期');
			}

			$this->db->trans_start();

	    	$this->db->set($this->field, $this->field.'+'.$users_bag['amount'], false);
	    	$this->db->where('id', $this->user_id);
	    	$this->db->update($this->Users_model->table());

	    	$this->Users_bag_model->update($users_bag['id'], ['user_id' => $this->user_id]);

	    	//流水
	    	$this->Gold_log_model->insert([
	    		'topic' => 4,
	    		'from_user_id' => $bag['user_id'],
	    		'to_user_id' => $this->user_id,
	    		'item_title' => '领取红包，金额：'.$users_bag['amount'],
	    		'item_id' => $bag['id'],
	    		'gold' => $users_bag['amount']
	    	]);

	    	$this->db->trans_complete();
	    	if($this->db->trans_status() === FALSE){
	    		$this->ajaxReturn([], 2, '领取红包失败，请重试');
	    	}else{
	    		$this->ajaxReturn(['amount' => $users_bag['amount']]);
	    	}
		}else{
			$this->ajaxReturn([], 1, '红包已领取完');
		}
	}
}
