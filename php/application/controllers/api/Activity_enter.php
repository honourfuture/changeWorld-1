<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 活动报名
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

class Activity_enter extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {post} /api/activity_enter/add 活动-报名
     * @apiVersion 1.0.0
     * @apiName activity_enter_add
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity_enter/add
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} activity_id 活动ID
     * @apiParam {String} summary 一句话介绍
     * @apiParam {String} photos 个人展示图 [{'url':'', 'width':'400', 'height':600}]
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
    public function add()
    {
        $params = elements(
            array(
                'activity_id', 'summary', 'photos', 'user_id'
            ),
            $this->input->post(),
            UPDATE_VALID
        );

        $this->load->model('Activity_model');
        if($this->Activity_model->get($params['activity_id'])){
            if(!$params['summary'] || $params['summary'] == UPDATE_VALID){
                $this->ajaxReturn([], 2, '一句话介绍自己');
            }
            if($params['photos'] === '' || $params['photos'] == UPDATE_VALID){
                $this->ajaxReturn([], 501, '请上传报名展示图');
            }
            if(! json_decode($params['photos'], true)){
                $this->ajaxReturn([], 501, '报名展示图格式错误');
            }

            $this->user_id && $params['user_id'] = $this->user_id;
            $this->load->model('Activity_enter_model');
            if($this->Activity_enter_model->get_by(['activity_id' => $params['activity_id'], 'user_id' => $params['user_id']])){
                $this->ajaxReturn([], 3, '请勿重复报名');
            }

            if($this->Activity_enter_model->insert($params)){
                $this->ajaxReturn();
            }else{
                $this->ajaxReturn([], 3, '活动报名失败');
            }
        }else{
            $this->ajaxReturn([], 1, '活动不存在');
        }
    }

    /**
     * @api {post} /api/activity_enter/details 活动-报名用户详情
     * @apiVersion 1.0.0
     * @apiName activity_enter_details
     * @apiGroup api
     *
     * @apiSampleRequest /api/activity_enter/details
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} activity_id 活动ID
     * @apiParam {Number} enter_user_id 活动报名用户ID
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
    public function details()
    {
        $params = elements(
            array(
                'activity_id', 'enter_user_id'
            ),
            $this->input->post(),
            UPDATE_VALID
        );

        $this->load->model('Activity_enter_model');
        if($info = $this->Activity_enter_model->get_by(['activity_id' => $params['activity_id'], 'user_id' => $params['enter_user_id']])){
            $ret = [];

            $info['photos'] = json_decode($info['photos'], true);
            $ret['activity'] = $info;

            $this->load->model('Users_model');
            $this->db->select('nickname,header,v,exp');
            $ret['user'] = $this->Users_model->get($info['user_id']);

            $this->ajaxReturn($ret);
        }else{
            $this->ajaxReturn([], 1, '用户未报名改活动');
        }
    }
}
