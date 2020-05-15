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
        $ret = $this->Income_model->getIncomeList($topic, $this->user_id, $startDate, $endDate);
        $this->ajaxReturn($ret);
    }

    /**
     * @api {get} /api/user/income/distribution 收益明细-我是
     * @apiVersion 1.0.0
     * @apiName income_distribution
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/income/distribution
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} type 0销售 1加盟商 2城市合伙人
     * @apiParam {Number} shop_id 店铺ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Number} data.count 总记录数
     * @apiSuccess {Object} data.list 列表
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "count": 4,
     *         "list": [
     *             {
     *                 "id": "7",
     *                 "updated_at": "2018-07-03 00:57:13",
     *                 "nickname": "k哥",
     *                 "mobi": "13430332489",
     *                 "topic": "1",
     *                 "amount": "0.00",
     *                 "gold": "1.00",
     *                 "from_id": "3",
     *                 "header": "http://thirdwx.qlogo.cn/mmopen/vi_32//132"
     *             }
     *         ],
     *         "topic": [
     *             "知识",
     *             "直播",
     *             "商品"
     *         ],
     *         "total": {
     *             "member": 1,
     *             "live": "3.00",
     *             "video": 0,
     *             "goods": "9.60",
     *             "sum": 12.6
     *         }
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
    public function distribution()
    {
        $ret = array('count' => 0, 'list' => array());

        $type = $this->input->get_post('type');
        $shop_id = $this->input->get_post('shop_id');

        $this->load->model('Income_model');
        $ret['topic'] = $this->Income_model->topic();

        $a_type = $this->Income_model->type();
        if(! isset($a_type[$type])){
            $this->ajaxReturn([], 1, '收益类型错误');
        }

        $where = array('type' => $type, 'shop_id' => $shop_id);
        if($this->user_id){
            $where['user_id'] = $this->user_id;
            //统计
            $ret['total'] = ['member' => 0, 'live' => 0, 'video' => 0, 'goods' => 0];

            $this->db->group_by('from_id');
            $where_count = $where;
            $ret['total']['member'] = $this->Income_model->count_by($where_count);

            $this->db->select('sum(gold) gold');
            $where_count['topic'] = 1;
            $result = $this->Income_model->get_by($where_count);
            $ret['total']['live'] = $result['gold'] ? $result['gold'] : 0;

            $this->db->select('sum(service_amount) service_amount');
            $where_count['topic'] = 0;
            $result = $this->Income_model->get_by($where_count);
            $ret['total']['video'] = $result['service_amount'] ? $result['service_amount'] : 0;

            $this->db->select('sum(amount) amount');
            $where_count['topic'] = 2;
            $result = $this->Income_model->get_by($where_count);
            $ret['total']['goods'] = $result['amount'] ? $result['amount'] : 0;

            $ret['total']['sum'] = round($ret['total']['live'] + $ret['total']['video'] + $ret['total']['goods'], 2);
        }


        $order_by = array('id' => 'desc');
        $this->db->group_by('from_id');
        $ret['count'] = $this->Income_model->count_by($where);
        if($ret['count']){
            $this->db->select('id,updated_at,name nickname,mobi,topic,sum(amount) amount,sum(service_amount) service_amount,from_id');
            $this->db->group_by('from_id');
            if($list = $this->Income_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where)){
                $a_uid = [];
                foreach($list as $item){
                    $a_uid[] = $item['from_id'];
                }
                $this->load->model('Users_model');
                $users = $this->Users_model->get_many_user($a_uid);
                foreach($list as $item){
                    if(isset($users[$item['from_id']])){
                        $user = $users[$item['from_id']];
                    }else{
                        $user = [
                            // 'nickname' => '',
                            'header' => '',
                            // 'mobi' => ''
                        ];
                    }
                    $ret['list'][] = array_merge($item, $user);
                }
            }
        }

        $this->ajaxReturn($ret);
    }
}
