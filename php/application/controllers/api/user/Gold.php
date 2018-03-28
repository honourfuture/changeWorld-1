<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Gold extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/gold 转余额
	 * @apiVersion 1.0.0
	 * @apiName gold
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/gold
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.gold_to_rmb_rate 金币转余额倍率
	 * @apiSuccess {String} data.gold 总金币量
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "gold": "10000",
	 *         "gold_to_rmb_rate": 100
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

		$user = $this->get_user();
		$ret['gold'] = $user['gold'];

		$ret['gold_to_rmb_rate'] = $this->Users_model->gold_to_rmb_rate();

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/gold/add 转余额-提交
	 * @apiVersion 1.0.0
	 * @apiName gold_add
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/user/gold/add
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} amount 转余额金币量
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
            array(
                'amount'
            ),
            $this->input->post(),
            0
        );

        $params['amount'] = intval($params['amount']);

        $user = $this->get_user();
        if($params['amount'] > $user['gold']){
        	$this->ajaxReturn([], 1, '输入金额超过总金币数');
        }

        $amount = $this->Users_model->gold_to_rmb($params['amount']);
        if($amount < 0.01){
            $this->ajaxReturn([], 2, '金币转余额额度不能少于0.01');
        }

        $this->db->trans_start();
        $gold = floor($user['gold'] - $params['amount']);
        $this->Users_model->update($user['id'], ['gold' => $gold, 'balance' => round($user['balance'] + $amount, 2)]);

        //资金明细
        $gold_log = [
            'topic' => 1,
            'from_user_id' => $this->user_id,
            'to_user_id' => $this->user_id,
            'item_title' => $amount,
            'item_id' => 0,
            'gold' => $params['amount']
        ];
        $this->load->model('Gold_log_model');
        $this->Gold_log_model->insert($gold_log);
        $this->db->trans_complete();

        if($this->db->trans_status() === FALSE){
        	$this->ajaxReturn([], 3, '提交转换余额失败');
        }else{
        	$this->ajaxReturn();
        }
    }

	/**
	 * @api {get} /api/user/gold/record 转余额-记录
	 * @apiVersion 1.0.0
	 * @apiName gold_record
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/gold/record
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 2,
	 *         "list": [
	 *             {
	 *                 "id": "13",
	 *                 "updated_at": "2018-03-23 15:45:44",
	 *                 "money": "1",
	 *                 "gold": "100.00"
	 *             },
	 *             {
	 *                 "id": "12",
	 *                 "updated_at": "2018-03-23 15:44:14",
	 *                 "money": "1",
	 *                 "gold": "100.00"
	 *             }
	 *         ]
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
	public function record()
	{
		$ret = array('count' => 0, 'list' => array());

		$this->load->model('Gold_log_model');
		$topic = 1;
		$where = array('topic' => $topic, 'from_user_id' => $this->user_id);

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Gold_log_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,updated_at,item_title money,gold');
			$ret['list'] = $this->Gold_log_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {get} /api/user/gold/gift 礼物-记录
	 * @apiVersion 1.0.0
	 * @apiName gold_gift
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/gold/gift
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type in:收到 out:送出
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 1,
	 *         "list": [
	 *             {
	 *                 "id": "15",
	 *                 "updated_at": "2018-03-28 23:54:57",
	 *                 "item_title": "游轮",
	 *                 "gold": "10000.00"
	 *             }
	 *         ]
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
	public function gift()
	{
		$ret = array('count' => 0, 'list' => array());

		$type = $this->input->get_post('type');
		$topic = 2;
		$where = array('topic' => $topic);
		switch($type){
			case 'in':
				$where['to_user_id'] = $this->user_id;
				break;
			case 'out':
				$where['from_user_id'] = $this->user_id;
				break;
			default :
				$this->ajaxReturn([], 1, '礼物方式错误');
				break;
		}

		$this->load->model('Gold_log_model');

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Gold_log_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,updated_at,item_title,gold');
			$ret['list'] = $this->Gold_log_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
		}

		$this->ajaxReturn($ret);
	}
}
