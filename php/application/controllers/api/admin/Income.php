<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Income extends API_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {get} /api/user/income 收益明细
     * @apiVersion 1.0.0
     * @apiName income
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/income
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} topic 主题 0知识 1直播 2商品
     * @apiParam {String} startDate 开始时间
     * @apiParam {String} endDate 结束时间
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Number} data.count 总记录数
     * @apiSuccess {Object} data.list 列表
     * @apiSuccess {String} data.list.id 收益明细ID
     * @apiSuccess {String} data.list.updated_at 更新日期
     * @apiSuccess {String} data.list.sub_topic 知识主题才需要 1专辑 2音频
     * @apiSuccess {String} data.list.name 关联用户名称
     * @apiSuccess {String} data.list.mobi 关联用户手机
     * @apiSuccess {String} data.list.amount 收益金额
     * @apiSuccess {String} data.list.gold 收益金币
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "count": 2,
     *         "list": [
     *             {
     *                 "id": "4",
     *                 "updated_at": "2018-03-16 09:41:12",
     *                 "sub_topic": "2",
     *                 "name": "马化腾",
     *                 "mobi": "",
     *                 "item_title": "如果超人会飞",
     *                 "item_id": "1",
     *                 "amount": "10.00",
     *                 "gold": "0"
     *             },
     *             {
     *                 "id": "1",
     *                 "updated_at": "2018-03-16 09:29:09",
     *                 "sub_topic": "1",
     *                 "name": "马云",
     *                 "mobi": "",
     *                 "item_title": "[超人系列]",
     *                 "item_id": "1",
     *                 "amount": "200.00",
     *                 "gold": "0"
     *             }
     *         ]
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
        $ret = array('count' => 0, 'list' => array());
        $topic = $this->input->get_post('topic');
        $startDate = $this->input->get_post('startDate');
        $endDate = $this->input->get_post('endDate');
        $this->load->model('Income_model');
        $a_topic = $this->Income_model->topic();
        if(! isset($a_topic[$topic])){
            $this->ajaxReturn([], 1, '收益明细主题类型错误');
        }
        $cur_page = $this->input->get_post('cur_page');
        if( empty($cur_page) ){
            $cur_page = 1;
        }
        $per_page = $this->input->get_post('per_page');
        if( empty($per_page) ){
            $per_page = 10;
        }
        $start = ($cur_page - 1) * $per_page;
        $ret = $this->Income_model->getIncomeList($topic, $this->user_id, $start, $per_page, $startDate, $endDate);
        $this->ajaxReturn($ret);
    }

}
