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
            $where = array(
                'enable' => 1,
                'activity_class' => $activity_class_id,
                'time_start <' => $now_time,
                'time_end >' => $now_time
            );
            //推荐
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

            //奖励公告
            $ret['notice'] = [];

            //常规活动
            $where['is_recommend'] = 0;
            $ret['count'] = $this->Activity_model->count_by($where);
            if($ret['count']){
                $order_by = array('id' => 'desc');
                $this->db->select('id,title,summary,prize');
                $ret['list'] = $this->Activity_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

                $this->common($ret);
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

            $this->common($list);
            $ret['info'] = $list['list'][0];

            $ret['info']['total'] = 0;
            foreach($ret['info']['prize'] as $item){
                $ret['info']['total'] = round($item['num'] * $item['sale_price'] + $ret['total'], 2);
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

    public function more()
    {
        $id = (int)$this->input->get_post('id');
        $this->load->model('Activity_enter_model');
        $ret['enter_count'] = $this->Activity_enter_model->count_by(['activity_id' => $id]);

        $ret['enter_list'] = $this->activity_enter($id);

        $this->ajaxReturn($ret);
    }

    protected function activity_enter($id)
    {
        $enter_list = [];
        $this->db->select('id,user_id,photos,vote');
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

                $enter_list = $item;
            }
        }

        return $enter_list;
    }

    protected function common(&$ret)
    {
        if($ret['list']){
            $a_goods_id = [];
            foreach($ret['list'] as $key=>$item){
                if(isset($item['photos'])){
                    $ret['list'][$key]['photos'] = json_decode($item['photos'], true);
                }
                $prize = json_decode($item['prize'], true);
                foreach($prize as $row){
                    $a_goods_id[] = $row['goods_id'];
                }

                $ret['list'][$key]['prize'] = $prize;
            }

            //查询商品
            $this->load->model('Goods_model');
            $this->db->select('id,name goods_name,sale_price,default_image');
            $k_goods = [];
            if($goods = $this->Goods_model->get_many($a_goods_id)){
                foreach($goods as $item){
                    $goods_id = $item['id'];
                    unset($item['id']);
                    $k_goods[$goods_id] = $item;
                }
            }

            //格式化数据
            if($k_goods){
                foreach($ret['list'] as $key=>$item){
                    foreach($ret['list'][$key]['prize'] as $id=>$goods){
                        isset($k_goods[$goods['goods_id']]) && $ret['list'][$key]['prize'][$id] = array_merge($ret['list'][$key]['prize'][$id], $k_goods[$goods['goods_id']]);
                    }
                }
            }
        }
    }
}
