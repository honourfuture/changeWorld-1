<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Team_Management extends API_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Users_model');

    }
    /**
     * @api {get} /api/team_management/get_child  团队管理-显示用户下级总人数及列表
     * @apiVersion 1.0.0
     * @apiName team_management_child
     * @apiGroup admin
     *
     * @apiSampleRequest /api/team_management/get_child
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
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
    public function get_child(){

        $temps = $this->Users_model->under($this->user_id);
        $result = [] ;
        $total= 0 ;
        $return = [];
        if(!empty($temps)){
            $result = $this->Users_model->get_many_user($temps);
            $total = count($result);
            if(!empty($result)){
                $return["count"] = $total ;
                $return["data"] = array_values($result);
            }
        }
        $this->ajaxReturn($return);
    }
    /**
     * @api {get} /api/team_management/super_and_child 团队管理-获取用户的直接上级与直接下级列表
     * @apiVersion 1.0.0
     * @apiName super_and_child
     * @apiGroup admin
     *
     * @apiSampleRequest /api/team_management/super_and_child
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
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
    public function super_and_child(){
        $parents= $this->Users_model->parent($this->user_id);
        $child = $this->Users_model->get_many_by([
            "pid"=>$this->user_id
        ]);
        if(!empty($child)){
            foreach ($child as $key=>&$value){
                unset($value["password"]);
            }
        }
        if(!empty($parents)){
            unset($parents["password"]);
        }
        $result["parents"] = $parents;
        $result["child"] = $child;
        $this->ajaxReturn($result);
    }


}