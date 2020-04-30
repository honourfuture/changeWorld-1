<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Album_audio_comment extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->reply['per_page'] = $this->per_page;
        $this->reply['offset'] = $this->offset;
    }

    /**
     * @api {get} /api/user/album_audio_comment/view 音频-评论详情
     * @apiVersion 1.0.0
     * @apiName album_audio_comment_view
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/album_audio_comment/view
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} cid 评论ID
     * @apiParam {String} audio_id 音频ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "id": "1",
     *         "user_id": "1",
     *         "comment": "双击666",
     *         "created_at": "2018-04-02 11:03:41",
     *         "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *         "nickname": "aicode",
     *         "likes": 0,
     *         "has_likes": 0,
     *         "reply": {
     *             "count": 2,
     *             "list": [
     *                 {
     *                     "id": "3",
     *                     "user_id": "1",
     *                     "comment": "送飞机、航母",
     *                     "created_at": "2018-04-02 13:11:39",
     *                     "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                     "nickname": "aicode"
     *                 },
     *                 {
     *                     "id": "2",
     *                     "user_id": "1",
     *                     "comment": "双击666",
     *                     "created_at": "2018-04-02 12:51:39",
     *                     "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                     "nickname": "aicode"
     *                 }
     *             ]
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
    public function view()
    {
        $cid = (int)$this->input->get_post('cid');
        if(! $cid){
            $this->ajaxReturn([], 1, '评论ID错误');
        }

        $this->select = 'id,user_id,comment,created_at';
        $result = $this->comment(['pid' => $cid]);
        if($result['list']){
            $ret = $result['list'][0];
        }else{
            $ret = [];
        }

        $this->ajaxReturn($ret);
    }

    protected function comment($where = [])
    {
        $result = ['count' => 0, 'list' => []];

        $audio_id = $this->input->get_post('audio_id');
        $this->load->model('Room_audio_model');
        if(! $audio = $this->Room_audio_model->get($audio_id)){
            $this->ajaxReturn($result);
        }

        $this->load->model('Album_audio_comment_model');
        $this->load->model('Album_audio_comment_likes_model');

        $pid = isset($where['pid']) ? $where['pid'] : NULL;

        if(is_null($pid)){
            $where['album_id'] = $audio['album_id'];
        }else{
            if($pid){
                $where = ['id' => $pid];
            }else{
                $where['audio_id'] = $audio['id'];
            }
        }

        $order_by = array('id' => 'desc');
        $result['count'] = $this->Album_audio_comment_model->count_by($where);
        if($result['count']){
            $this->db->select($this->select);
            $result['list'] = $this->Album_audio_comment_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

            $a_uid = [];
            foreach($result['list'] as $key=>$item){
                $result['list'][$key]['header'] = '';
                $result['list'][$key]['nickname'] = '';

                $item['user_id'] && $a_uid[] = $item['user_id'];

                //回复列表
                if(! is_null($pid)){
                    //点赞数
                    $result['list'][$key]['likes'] = $this->Album_audio_comment_likes_model->count_by(['cid' => $item['id']]);
                    //是否点赞
                    $result['list'][$key]['has_likes'] = $this->Album_audio_comment_likes_model->count_by(['cid' => $item['id'], 'user_id' => $this->user_id]);

                    //回复
                    $result['list'][$key]['reply'] = ['count' => 0, 'list' => []];
                    $result['list'][$key]['reply']['count'] = $this->Album_audio_comment_model->count_by(['pid' => $item['id']]);
                    if($result['list'][$key]['reply']['count']){
                        $this->db->select('id,user_id,comment,created_at');
                        $result['list'][$key]['reply']['list'] = $this->Album_audio_comment_model->order_by($order_by)->limit($this->reply['per_page'], $this->reply['offset'])->get_many_by(['pid' => $item['id']]);
                        foreach($result['list'][$key]['reply']['list'] as $key_reply=>$item_reply){
                            $result['list'][$key]['reply']['list'][$key_reply]['header'] = '';
                            $result['list'][$key]['reply']['list'][$key_reply]['nickname'] = '';

                            $item_reply['user_id'] && $a_uid[] = $item_reply['user_id'];
                        }
                    }
                }
            }

            if($a_uid){
                $this->load->model('Users_model');
                $this->db->select('id,header,nickname');
                if($users = $this->Users_model->get_many($a_uid)){
                    $k_user = [];
                    foreach($users as $item){
                        $user_id = $item['id'];
                        unset($item['id']);
                        $k_user[$user_id] = $item;
                    }

                    foreach($result['list'] as $key=>$item){
                        isset($k_user[$item['user_id']]) && $result['list'][$key] = array_merge($result['list'][$key], $k_user[$item['user_id']]);
                        //回复
                        if(isset($item['reply']) && $item['reply']['list']){
                            foreach($item['reply']['list'] as $key_reply=>$item_reply){
                                isset($k_user[$item_reply['user_id']]) && $result['list'][$key]['reply']['list'][$key_reply] = array_merge($result['list'][$key]['reply']['list'][$key_reply], $k_user[$item_reply['user_id']]);
                            }
                        }
                    }
                }
            }
        }

        return $result;
    }

    /**
     * @api {get} /api/user/album_audio_comment 音频-所有评论
     * @apiVersion 1.0.0
     * @apiName album_audio_comment
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/album_audio_comment
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} audio_id 音频ID
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
     *                 "id": "4",
     *                 "user_id": "1",
     *                 "comment": "主播能加个微信或留个电话吗",
     *                 "created_at": "2018-04-02 13:12:48",
     *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                 "nickname": "aicode",
     *                 "likes": 0,
     *                 "has_likes": 0,
     *                 "reply": {
     *                     "count": 0,
     *                     "list": []
     *                 }
     *             },
     *             {
     *                 "id": "1",
     *                 "user_id": "1",
     *                 "comment": "双击666",
     *                 "created_at": "2018-04-02 11:03:41",
     *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                 "nickname": "aicode",
     *                 "likes": 0,
     *                 "has_likes": 0,
     *                 "reply": {
     *                     "count": 2,
     *                     "list": [
     *                         {
     *                             "user_id": "1",
     *                             "comment": "送飞机、航母",
     *                             "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                             "nickname": "aicode"
     *                         },
     *                         {
     *                             "user_id": "1",
     *                             "comment": "双击666",
     *                             "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                             "nickname": "aicode"
     *                         }
     *                     ]
     *                 }
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
        $this->select = 'id,user_id,comment,created_at';
        $this->reply['per_page'] = 3;
        $this->reply['offset'] = 0;
        $ret = $this->comment(['pid' => 0]);

        $this->ajaxReturn($ret);
    }

    /**
     * @api {get} /api/user/album_audio_comment/barrage 音频-弹幕
     * @apiVersion 1.0.0
     * @apiName album_audio_comment_barrage
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/album_audio_comment/barrage
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} audio_id 音频ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "count": 4,
     *         "list": [
     *             {
     *                 "id": "4",
     *                 "user_id": "1",
     *                 "comment": "主播能加个微信或留个电话吗",
     *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                 "nickname": "aicode"
     *             },
     *             {
     *                 "id": "3",
     *                 "user_id": "1",
     *                 "comment": "送飞机、航母",
     *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                 "nickname": "aicode"
     *             },
     *             {
     *                 "id": "2",
     *                 "user_id": "1",
     *                 "comment": "双击666",
     *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                 "nickname": "aicode"
     *             },
     *             {
     *                 "id": "1",
     *                 "user_id": "1",
     *                 "comment": "双击666",
     *                 "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
     *                 "nickname": "aicode"
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
    public function barrage()
    {
        $this->select = 'id,user_id,comment';
        $ret = $this->comment();

        $this->ajaxReturn($ret);
    }

    /**
     * @api {post} /api/user/album_audio_comment/add 音频-发布评论
     * @apiVersion 1.0.0
     * @apiName album_audio_comment_add
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/album_audio_comment/add
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} audio_id 音频ID
     * @apiParam {String} comment 评论内容
     * @apiParam {String} pid 父级ID 默认0，大于0表示回复该评论
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *       },
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
    public function add()
    {
        $params = elements(
            array(
                'audio_id', 'comment', 'pid'
            ),
            $this->input->post(),
            ''
        );
        if(empty($params['comment'])){
            $this->ajaxReturn([], 1, '评论内容不能为空');
        }
        $params['audio_id'] = $this->input->get_post('audio_id');
        $this->load->model('Room_audio_model');
        if(! $audio = $this->Room_audio_model->get($params['audio_id'])){
            $this->ajaxReturn([], 1, '该音频文件已被删除');
        }
        $params['album_id'] = $audio['album_id'];
        $params['user_id'] = $this->user_id;

        $this->load->model('Album_audio_comment_model');
        $this->Album_audio_comment_model->insert($params);
        
        //积分规则
        $rulePoint = $this->db->query("SELECT * FROM `points_rule` WHERE `name`='comment'")->row_array();
        //经验规则
        $ruleGrade = $this->db->query("SELECT * FROM `grade_rule` WHERE `name`='comment'")->row_array();
        $start = date('Y-m-d 00:00:00');
        $end = date('Y-m-d 23:59:59');
        /**
         * 单天累计评论积分
         */
        $record = $this->db->query("SELECT SUM(`value`) AS pointDaySum FROM `users_points` WHERE `user_id`={$this->user_id} AND rule_name='{$rulePoint['name']}' AND created_at BETWEEN '{$start}' AND '{$end}'")->row_array();
        if( empty($record) ){
            $record['pointDaySum'] = 0;
        }
        $sumPoints = $rulePoint['value'] + $record['pointDaySum'];
        $point = ($sumPoints > $rulePoint['days_limit'] ? ($rulePoint['days_limit'] - $record['pointDaySum']) : $rulePoint['value']);
        /**
         * 单天累计评论经验
         */
        $record = $this->db->query("SELECT SUM(`value`) AS expDaySum FROM `users_points` WHERE `user_id`={$this->user_id} AND rule_name='{$ruleGrade['name']}' AND created_at BETWEEN '{$start}' AND '{$end}'")->row_array();
        if( empty($record) ){
            $record['expDaySum'] = 0;
        }
        $sumExps = $ruleGrade['value'] + $record['pointDaySum'];
        $exp = ($sumPoints > $ruleGrade['days_limit'] ? ($ruleGrade['days_limit'] - $record['expDaySum']) : $ruleGrade['value']);
        
        $this->db->trans_start();     
           
        if( $point > 0 ){
            $user = $this->get_user();
            $this->db->query("UPDATE users SET `point`=`point`+{$point} WHERE id={$this->user_id}");
            $this->load->model('Users_points_model');
            $point_log = [
                'user_id' => $this->user_id,
                'value' => $point,
                'point' => $user['exp'] + $point,
                'rule_name' => $rulePoint['name'],
                'remark' => $rulePoint['show_name'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
                'is_add' => 1
            ];
            $this->Users_points_model->insert($point_log);
        }
        
        if( $exp > 0 ){
            $user = $this->get_user();
            $this->db->query("UPDATE users SET `exp`=`exp`+{$exp} WHERE id={$this->user_id}");
            $this->load->model('Users_grade_model');
            $exp_log = [
                'user_id' => $this->user_id,
                'value' => $exp,
                'rule_name' => $ruleGrade['name'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            $this->Users_grade_model->insert($exp_log);
        }
        
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE){
            $this->ajaxReturn([], 5, '操作失败');
        }
        else{
            $this->ajaxReturn();
        }
    }
    
    /**
     * @api {post} /api/user/album_audio_comment/share 音频-转发
     * @apiVersion 1.0.0
     * @apiName album_audio_comment_share
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/album_audio_comment/share
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} audio_id 音频ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *       },
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
    public function share()
    {
        $params = elements(
            array(
                'audio_id', 'pid'
            ),
            $this->input->post(),
            ''
        );
        $params['audio_id'] = $this->input->get_post('audio_id');
        $this->load->model('Room_audio_model');
        if(! $audio = $this->Room_audio_model->get($params['audio_id'])){
            $this->ajaxReturn([], 1, '该音频文件已被删除');
        }
        $params['album_id'] = $audio['album_id'];
        $params['user_id'] = $this->user_id;
    
        //积分规则
        $rulePoint = $this->db->query("SELECT * FROM `points_rule` WHERE `name`='share'")->row_array();
        //经验规则
        $ruleGrade = $this->db->query("SELECT * FROM `grade_rule` WHERE `name`='share'")->row_array();
        $start = date('Y-m-d 00:00:00');
        $end = date('Y-m-d 23:59:59');
        /**
         * 单天累计经验
         */
        $record = $this->db->query("SELECT SUM(`value`) AS pointDaySum FROM `users_points` WHERE `user_id`={$this->user_id} AND rule_name='{$rulePoint['name']}' AND created_at BETWEEN '{$start}' AND '{$end}'")->row_array();
        if( empty($record) ){
            $record['pointDaySum'] = 0;
        }
        $sumPoints = $rulePoint['value'] + $record['pointDaySum'];
        $point = ($sumPoints > $rulePoint['days_limit'] ? ($rulePoint['days_limit'] - $record['pointDaySum']) : $rulePoint['value']);
        /**
         * 单天累计经验
         */
        $record = $this->db->query("SELECT SUM(`value`) AS expDaySum FROM `users_points` WHERE `user_id`={$this->user_id} AND rule_name='{$ruleGrade['name']}' AND created_at BETWEEN '{$start}' AND '{$end}'")->row_array();
        if( empty($record) ){
            $record['expDaySum'] = 0;
        }
        $sumExps = $ruleGrade['value'] + $record['pointDaySum'];
        $exp = ($sumPoints > $ruleGrade['days_limit'] ? ($ruleGrade['days_limit'] - $record['expDaySum']) : $ruleGrade['value']);
        
        $this->db->trans_start();     
           
        if( $point > 0 ){
            $user = $this->get_user();
            $this->db->query("UPDATE users SET `point`=`point`+{$point} WHERE id={$this->user_id}");
            $this->load->model('Users_points_model');
            $point_log = [
                'user_id' => $this->user_id,
                'value' => $point,
                'point' => $user['exp'] + $point,
                'rule_name' => $rulePoint['name'],
                'remark' => $rulePoint['show_name'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
                'is_add' => 1
            ];
            $this->Users_points_model->insert($point_log);
        }
        
        if( $exp > 0 ){
            $user = $this->get_user();
            $this->db->query("UPDATE users SET `exp`=`exp`+{$exp} WHERE id={$this->user_id}");
            $this->load->model('Users_grade_model');
            $exp_log = [
                'user_id' => $this->user_id,
                'value' => $exp,
                'rule_name' => $ruleGrade['name'],
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            $this->Users_grade_model->insert($exp_log);
        }
    
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE){
            $this->ajaxReturn([], 5, '操作失败');
        }
        else{
            $this->ajaxReturn();
        }
    }
    

    /**
     * @api {post} /api/user/album_audio_comment/likes 音频-评论点赞
     * @apiVersion 1.0.0
     * @apiName album_audio_comment_likes
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/album_audio_comment/likes
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} cid 评论ID 点赞/取消自动判断
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *       },
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
    public function likes()
    {
        $cid = (int)$this->input->get_post('cid');
        if(! $cid){
            $this->ajaxReturn([], 1, '评论ID错误');
        }

        $this->load->model('Album_audio_comment_likes_model');
        if($info = $this->Album_audio_comment_likes_model->get_by(['cid' => $cid, 'user_id' => $this->user_id])){
            $this->Album_audio_comment_likes_model->delete($info['id']);
        }else{
            $this->Album_audio_comment_likes_model->insert(['cid' => $cid, 'user_id' => $this->user_id]);
        }

        $this->ajaxReturn();
    }
}
