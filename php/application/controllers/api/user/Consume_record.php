<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Consume_record extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	/**
	 * @api {get} /api/user/consume_record 消费记录
	 * @apiVersion 1.0.0
	 * @apiName consume_record
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/consume_record
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.count 记录总数
	 * @apiSuccess {Object} data.list 记录列表
	 * @apiSuccess {Object} data.type 消费类型
	 * @apiSuccess {Object} data.topic 消费主题
	 * @apiSuccess {Object} data.payment_type 支付类型
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 5,
	 *         "list": [
	 *             {
	 *                 "id": "740",
	 *                 "created_at": "2018-06-13 13:26:19",
	 *                 "type": "0",
	 *                 "user_id": "3",
	 *                 "item_title": "666666",
	 *                 "item_id": "19",
	 *                 "item_amount": "999.00",
	 *                 "order_sn": "110077289973048003",
	 *                 "topic": "1",
	 *                 "payment_type": "alipay"
	 *             }
	 *         ],
	 *         "type": [
	 *             "人民币",
	 *             "金币"
	 *         ],
	 *         "topic": [
	 *             "贵族",
	 *             "靓号",
	 *             "直播",
	 *             "音频",
	 *             "专辑",
	 *             "商品",
	 *             "赞助"
	 *         ],
	 *         "payment_type": {
	 *             "gold": "金币",
	 *             "balance": "余额",
	 *             "wechat": "微信",
	 *             "alipay": "支付宝"
	 *         }
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
		$ret = ['count' => 0, 'list' => []];

		$this->load->model('Consume_record_model');
		$ret['type'] = $this->Consume_record_model->type();
		$ret['topic'] = $this->Consume_record_model->topic();
		$ret['payment_type'] = $this->Consume_record_model->payment_type();

		$where = ['user_id' => $this->user_id];
		$ret['count'] = $this->Consume_record_model->count_by($where);
		if($ret['count']){
			if($list = $this->Consume_record_model->order_by('id', 'desc')->limit($this->per_page, $this->offset)->get_many_by($where)){
				$ret['list'] = $list;
			}
		}

		$this->ajaxReturn($ret);
	}
}
