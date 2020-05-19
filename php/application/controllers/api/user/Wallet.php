<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Wallet extends API_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {get} /api/user/wallet 我的钱包
     * @apiVersion 1.0.0
     * @apiName wallet
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/wallet
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {String} data.balance 余额
     * @apiSuccess {String} data.withdraw 可提现金额
     * @apiSuccess {String} data.point 积分
     * @apiSuccess {String} data.gold 金币
     * @apiSuccess {Object} data.income 收益
     * @apiSuccess {String} data.income.goods 商品
     * @apiSuccess {String} data.income.knowledge 知识
     * @apiSuccess {Object} data.todayIncome 今日收益
     * @apiSuccess {String} data.todayIncome.goods 商品
     * @apiSuccess {String} data.todayIncome.knowledge 知识
     *
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "balance": "9802.00",
     *         "point": "950",
     *         "income": {
     *             "knowledge": "210.00",
     *             "goods": "2000.00"
     *         },
     *         "todayIncome": {
     *             "knowledge": "210.00",
     *             "goods": "2000.00"
     *         },
     *         "gold": "9800",
     *         "withdraw" : "1000",
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
        $ret = [
            'balance' => 0,
            'point' => 0,
            'income' => []
        ];

        $user = $this->get_user();

        //计算可提现余额
        $this->load->model('Income_model');
        $inclomeAvailable = $this->Income_model->getWithrawAvailable($this->user_id);
        $ret['withdraw'] = numformat($inclomeAvailable, 2);

        $ret['balance'] = numformat($user['balance'] + $inclomeAvailable, 2);
        $ret['point'] = round($user['point'], 0);
        $ret['gold'] = $user['gold'];

        $this->load->model('Income_model');
        $this->load->model('Withdraw_model');
        
        $ret['income'] = $this->Income_model->sum_income_topic_group($this->user_id);

        
        //今日
        $where['created_at >= '] = date('Y-m-d 00:00:00');
        $where['created_at <= '] = date('Y-m-d 23:59:59');
        $ret['todayIncome'] = $this->Income_model->sum_income_topic_group($this->user_id, 0, $where);

        $this->ajaxReturn($ret);
    }
}
