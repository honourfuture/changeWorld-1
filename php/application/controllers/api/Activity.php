<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 活动
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

class Activity extends API_Controller
{
    protected $enter_id = 0;
    protected $a_user_id = [];

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {get} /api/activity 活动-首页
     * @apiVersion 1.0.0
     * @apiName activity
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} activity_class_id 活动分类ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Object[]} data.recommend 推荐活动列表
     * @apiSuccess {Object[]} data.notice 中奖公告
     * @apiSuccess {Number} data.count 其他活动总数
     * @apiSuccess {Object[]} data.list 其他活动列表
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "recommend": [],
     *         "count": 1,
     *         "list": [
     *             {
     *                 "id": "1",
     *                 "title": "6.1儿童来免单",
     *                 "summary": "大朋友带小朋友，小朋友免单",
     *                 "prize": [
     *                     {
     *                         "goods_id": 1,
     *                         "name": "一等奖",
     *                         "num": 10,
     *                         "goods_name": "测试商品",
     *                         "sale_price": "1.00",
     *                         "default_image": "/uploads/2018/05/18/b6102dc8ad0039f8ee7a219bebbb069f.png"
     *                     }
     *                 ]
     *             }
     *         ],
     *         "notice": []
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
        $ret = array('recommend' => [], 'count' => 0, 'list' => array());

        $activity_class_id = (int)$this->input->get_post('activity_class_id');
        if($activity_class_id){
            $this->load->model('Activity_model');
            $now_time = time();
            $common_where = array(
                'enable' => 1,
                'activity_class' => $activity_class_id,
                'time_start <' => $now_time,
                'time_end >' => $now_time
            );
            //推荐
            $where = $common_where;
            $where['is_recommend'] = 1;
            $order_by = array('id' => 'desc');
            $this->db->select('id,photos,title,summary');
            if($recommend = $this->Activity_model->order_by($order_by)->get_many_by($where)){
                foreach($recommend as $item){
                    $item['photos'] = json_decode($item['photos'], true);
                    $ret['recommend'][] = $item;
                }
            }

            //广告图
            $ret['ad'] = [];
            $where = $common_where;
            $where['is_ad'] = 1;
            $order_by = array('id' => 'desc');
            $this->db->select('id,ad_image');
            if($ad = $this->Activity_model->order_by($order_by)->get_by($where)){
                $ret['ad'] = $ad;
            }

            //奖励公告
            $ret['notice'] = [];

            //常规活动
            $where = $common_where;
            $where['is_recommend'] = 0;
            $where['is_ad'] = 0;
            $ret['count'] = $this->Activity_model->count_by($where);
            if($ret['count']){
                $order_by = array('id' => 'desc');
                $this->db->select('id,title,summary,prize');
                $ret['list'] = $this->Activity_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

                $this->Activity_model->common($ret);
            }
            $this->ajaxReturn($ret);
        }else{
            $this->ajaxReturn([], 1, '活动分类ID错误');
        }
    }

    /**
     * @api {get} /api/activity/details 活动-详情
     * @apiVersion 1.0.0
     * @apiName activity_details
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity/details
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 活动ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Object[]} data.recommend 推荐活动列表
     * @apiSuccess {Object[]} data.notice 中奖公告
     * @apiSuccess {Number} data.count 其他活动总数
     * @apiSuccess {Object[]} data.list 其他活动列表
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "recommend": [],
     *         "count": 1,
     *         "list": [
     *             {
     *                 "id": "1",
     *                 "title": "6.1儿童来免单",
     *                 "summary": "大朋友带小朋友，小朋友免单",
     *                 "prize": [
     *                     {
     *                         "goods_id": 1,
     *                         "name": "一等奖",
     *                         "num": 10,
     *                         "goods_name": "测试商品",
     *                         "sale_price": "1.00",
     *                         "default_image": "/uploads/2018/05/18/b6102dc8ad0039f8ee7a219bebbb069f.png"
     *                     }
     *                 ]
     *             }
     *         ],
     *         "notice": []
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function details()
    {
        $ret = [];
        $id = (int)$this->input->get_post('id');
        if($id){
            $this->load->model('Activity_model');
            $this->db->select('id,title,details,photos,time_end,prize,views,rule,user_name,user_id');
            $list = ['list' => []];
            $list['list'][] = $this->Activity_model->get($id);

            $this->Activity_model->common($list);
            $ret['info'] = $list['list'][0];

            $ret['info']['total'] = 0;
            foreach($ret['info']['prize'] as $item){
                $ret['info']['total'] = round($item['num'] * $item['sale_price'] + $ret['info']['total'], 2);
            }

            //投票数
            $this->load->model('Activity_vote_model');
            $ret['vote_count'] = $this->Activity_vote_model->count_by(['activity_id' => $id]);

            //报名数
            $this->load->model('Activity_enter_model');
            $ret['enter_count'] = $this->Activity_enter_model->count_by(['activity_id' => $id]);

            $vote_user_id = $this->input->get_post('vote_user_id');
            if($vote_user_id){
                $this->load->model('Users_model');
                $this->db->select('nickname,header,v,exp');
                $ret['user'] = $this->Users_model->get($vote_user_id);

                $this->load->model('Activity_vote_model');
                $ret['vote'] = $this->Activity_vote_model->count_by(['activity_id' => $id, 'user_id' => $vote_user_id]);
            }else{
                //赞助商

                //报名用户
                $ret['enter_list'] = $this->activity_enter($id);
            }

            $this->ajaxReturn($ret);
        }else{
            $this->ajaxReturn([], 1, '查看活动详情参数错误');
        }
    }

    /**
     * @api {post} /api/activity/vote 活动-投票
     * @apiVersion 1.0.0
     * @apiName activity_vote
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity/vote
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} activity_id 活动ID
     * @apiParam {String} vote_user_id 拉票用户ID
     * @apiParam {String} mobi 投票手机号
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "data": "",
     *      "status": 0,
     *      "message": "成功"
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function vote()
    {
        $activity_id = $this->input->get_post('activity_id');
        $vote_user_id = $this->input->get_post('vote_user_id');
        $mobi = $this->input->get_post('mobi');
        if(! $mobi){
            $this->ajaxReturn([], 1, '投票手机号必填');
        }

        $this->load->model('Activity_enter_model');
        if($enter = $this->Activity_enter_model->get_by(['activity_id' => $activity_id, 'user_id' => $vote_user_id])){
            $this->load->model('Activity_vote_model');
            $data = [
                'activity_id' => $activity_id,
                'user_id' => $vote_user_id,
                'mobi' => $mobi,
                'ip' => $this->input->ip_address()
            ];
            $this->Activity_vote_model->insert($data);

            $this->Activity_enter_model->update($enter['id'], ['vote' => $enter['vote'] + 1]);

            $this->ajaxReturn();
        }else{
            $this->ajaxReturn([], 2, '该用户未报名活动');
        }
    }

    /**
     * @api {get} /api/activity/more 活动详情=更多选手
     * @apiVersion 1.0.0
     * @apiName activity_more
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity/more
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 活动ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Number} data.enter_count 总报名人数
     * @apiSuccess {Object[]} data.enter_list 报名人列表
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "enter_count": 1,
     *         "enter_list": {
     *             "id": "2",
     *             "user_id": "2",
     *             "photos": [
     *                 {
     *                     "url": "/uploads/2018/05/21/2d803788c1fa7fe6ff815fa0cf18cded.png",
     *                     "width": 746,
     *                     "height": 518
     *                 },
     *                 {
     *                     "url": "/uploads/2018/05/21/2e2bb341f3d6744c402244a39962e673.png",
     *                     "width": 624,
     *                     "height": 620
     *                 }
     *             ],
     *             "vote": "0",
     *             "nickname": "三斤叔",
     *             "header": "/uploads/2018/05/19/0a6f179af5ac8a3a13698aaff961777d.png"
     *         }
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function more()
    {
        $ret = [];
        $id = (int)$this->input->get_post('id');
        $this->load->model('Activity_enter_model');
        $ret['enter_count'] = $this->Activity_enter_model->count_by(['activity_id' => $id]);

        $ret['enter_list'] = $this->activity_enter($id);

        $this->ajaxReturn($ret);
    }

    /**
     * @api {get} /api/activity/search 活动详情=搜索选手
     * @apiVersion 1.0.0
     * @apiName activity_search
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity/search
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 活动ID
     * @apiParam {String} keyword 搜索词 选手号、会员ID号、名称
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Number} data.enter_count 总报名人数
     * @apiSuccess {Object[]} data.enter_list 报名人列表
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "enter_count": 1,
     *         "enter_list": {
     *             "id": "2",
     *             "user_id": "2",
     *             "photos": [
     *                 {
     *                     "url": "/uploads/2018/05/21/2d803788c1fa7fe6ff815fa0cf18cded.png",
     *                     "width": 746,
     *                     "height": 518
     *                 },
     *                 {
     *                     "url": "/uploads/2018/05/21/2e2bb341f3d6744c402244a39962e673.png",
     *                     "width": 624,
     *                     "height": 620
     *                 }
     *             ],
     *             "vote": "0",
     *             "nickname": "三斤叔",
     *             "header": "/uploads/2018/05/19/0a6f179af5ac8a3a13698aaff961777d.png"
     *         }
     *     },
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function search()
    {
        $ret = ['enter_count' => 0, 'enter_list' => []];
        $keyword = $this->input->get_post('keyword');
        if($keyword){
            $this->load->model('Users_model');
            $this->db->select('GROUP_CONCAT(id) as s_user_id');
            $this->db->like('nickname', $keyword);
            $row = $this->db->get($this->Users_model->table())->row_array();
            $a_user_id = [];
            if($row){
                $a_user_id = explode(',', $row['s_user_id']);
            }

            if(is_numeric($keyword)){
                $a_user_id[] = $keyword;
                $this->enter_id = $keyword;
            }
            $this->a_user_id = $a_user_id;

            $id = (int)$this->input->get_post('id');
            $this->load->model('Activity_enter_model');

            $where = [];
            $where['activity_id'] = $id;
            $this->search_group();
            $ret['enter_count'] = $this->Activity_enter_model->count_by($where);

            $ret['enter_list'] = $this->activity_enter($id);
        }

        $this->ajaxReturn($ret);
    }

    protected function search_group()
    {
        if($this->a_user_id){
            $this->db->group_start();
            $this->db->where_in('user_id', $this->a_user_id);
            if($this->enter_id){
                $this->db->or_group_start();
                $this->db->where('id', $this->enter_id);
                $this->db->group_end();
            }
            $this->db->group_end();
        }
    }

    protected function activity_enter($id)
    {
        $enter_list = [];
        $this->db->select('id,user_id,photos,vote');
        $this->search_group();
        $enter = $this->Activity_enter_model->order_by('vote', 'desc')->limit($this->per_page, $this->offset)->get_many_by(['activity_id' => $id]);
        if($enter){
            $a_user_id = [];
            foreach($enter as $item){
                $a_user_id[] = $item['user_id'];
            }
            $this->load->model('Users_model');
            $user = $this->Users_model->get_many_user($a_user_id);

            foreach($enter as $item){
                $item['photos'] = json_decode($item['photos'], true);
                $item['nickname'] = '';
                isset($user[$item['user_id']]) && $item['nickname'] = $user[$item['user_id']]['nickname'];
                isset($user[$item['user_id']]) && $item['header'] = $user[$item['user_id']]['header'];

                $enter_list = $item;
            }
        }

        return $enter_list;
    }
}
