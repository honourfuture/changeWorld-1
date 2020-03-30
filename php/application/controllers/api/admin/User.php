<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class User extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Users_model');
    }

    /**
     * @api {post} /api/admin/user/save 用户信息-修改
     * @apiVersion 1.0.0
     * @apiName user_save
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/save
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 会员唯一ID
     * @apiParam {String} job 操作动作 [头像:header, 昵称:nickname, 停启用:enable]
     *
     * @apiDescription
     * header传递参数：header
     * nickname传递参数：nickname
     * enable传递参数：enable 0禁用 1启用
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "data": "",
     *        "status": 0,
     *        "message": "成功"
     *    }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function save()
    {
        $ret = array();
        $id = $this->input->get_post('id');
        $job = $this->input->get_post('job');
        $update = [];
        switch($job){
            case 'edit':
                $mobi = $this->input->get_post('mobi');
                $hasMobi = $this->Users_model->get_by(['mobi' => $mobi]);
                if($hasMobi && $hasMobi['id'] != $id){
                    $this->ajaxReturn([], 1, '该手机号码已被注册');
                }
                $update = array('mobi' => $mobi);

                $header = $this->input->get_post('header');
                if(!$header){
                    $this->ajaxReturn([], 1, '请上传头像');
                }
                $update['header'] = $header;

                $nickname = $this->input->get_post('nickname');
                if(!$nickname){
                    $this->ajaxReturn([], 1, '请输入昵称');
                }
                $update['nickname'] = $nickname;

                $point = $this->input->get_post('point');
                if($point){
                    $update['point'] = $point;
                }


                break;
            case 'enable':
                $enable = $this->input->get_post('enable');
                if(!in_array($enable, array(0, 1))){
                    $this->ajaxReturn([], 1, '0禁用 1启用');
                }
                $update = array('enable' => $enable);
                break;
            default :
                $this->ajaxReturn([], 1, '未知操作');
                break;
        }

        $flag = $this->Users_model->update($id, $update);
        if($flag){
            $status = 0;
            $message = '成功';
        }else{
            $status = 1;
            $message = '失败';
        }
        $this->ajaxReturn($ret, $status, '操作'.$message);
    }

    /**
     * @api {get} /api/admin/user 用户管理-列表
     * @apiVersion 1.0.0
     * @apiName user
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user
     *
     * @apiParam {Number} admin_id 管理员唯一ID
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
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
        $ret = ['list' => []];

        $ret['sex'] = $this->Users_model->sex();
        $ret['anchor_status'] = $this->Users_model->anchor();
        $ret['seller_status'] = $this->Users_model->seller();

        $where = [];
        // $where['1 >'] = 0;
        $where['robot'] = 0;

        $order_by = array('id' => 'desc');
        $this->search();
        $ret['count'] = $this->Users_model->count_by($where);
        if($ret['count']){
            $this->db->select('id,created_at,updated_at,mobi,account,header,nickname,v,anchor,seller,exp,reg_ip,balance,point,gold,headhunter,reward_point,enable');
            $this->search();
            $ret['list'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
        }

        $this->ajaxReturn($ret);
    }
    
    
    /**
     * @api {post} /api/admin/team 用户管理-我的团队
     * @apiVersion 1.0.0
     * @apiName team
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/team
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} mobile 手机号
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {'count'=>0, 'list'=>{}},
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
    public function team()
    {
        $ret = ['list' => [], 'status'=>-100, 'message'=>'未知错误'];
        
        $user_id = $this->input->get_post('user_id');
        $mobile = $this->input->get_post('mobile');
        try{
            $where = [];
            // $where['1 >'] = 0;
            $where['robot'] = 0;
    
            $order_by = array('id' => 'desc');
            $this->search();
            $ret['count'] = $this->Users_model->count_by($where);
            if( empty($ret['count']) ){
                $this->ajaxReturn($ret);
            }
            $this->db->select('id, pid, created_at,updated_at,mobi,account,header,nickname,v,anchor,seller,exp,reg_ip,balance,point,gold,headhunter,reward_point,enable');
            $this->search();
            $list = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
            foreach($list as $k=>$user){
                //当前用户的直属上/下级用户
                $user['parent'] = '-';
                $user['son'] = '-';
                $arrRelation = $this->Users_model->getNearByUser($user['id']);
                if( isset($arrRelation[$user['pid']]) ){
                    $user['parent'] = $arrRelation[$user['pid']]['nickname'];
                    unset($arrRelation[$user['pid']]);
                }
                if( !empty($arrRelation) ){
                    $son = current($arrRelation);
                    $user['son'] = $son['nickname'];
                }
                $user['sons'] = $this->Users_model->getSons($user['id']);
                $user['sons_count'] = count($user['sons']);
                $ret['list'][] = $user;
            }
            $ret['status'] = 0;
            $ret['message'] = 'success';
        }
        catch (\Exception $e){
            $ret['list'] = '';
            $ret['status'] = $e->getCode();
            $ret['message'] = $e->getMessage();
        }        
        $this->ajaxReturn($ret);
    }

    protected function search()
    {
        $keyword = $this->input->get_post('keyword');
        if(! empty($keyword)){
            $this->db->group_start();
            $this->db->like('nickname', $keyword);
            $this->db->or_like('mobi', $keyword);
            $this->db->group_end();
        }
    }

    /**
     * @api {get} /api/admin/user/view 用户管理-详情
     * @apiVersion 1.0.0
     * @apiName user_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/view
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
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
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function view()
    {
        $id = $this->input->get_post('id');
        if($info = $this->Users_model->get($id)){
            $this->ajaxReturn($info);
        }else{
            $this->ajaxReturn([], 1, '查看用户详情ID错误');
        }
    }

    protected function check_params($act, $params)
    {
        switch($act){
            case 'add':
                break;
            case 'edit':
                break;
        }
    }

    /**
     * @api {get} /api/admin/user/get_child 根据手机号与id 显示用户下级总人数及列表
     * @apiVersion 1.0.0
     * @apiName user_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/get_child
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
     * @apiParam {Number} mobile 用户的手机号码
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
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function get_child(){
        $id = $this->input->get_post('id');
        //手机号码
        $mobile = $this->input->get_post('mobile');
        if(empty($id) && empty($mobile)){
            $this->ajaxReturn([], 1, 'id或mobile参数缺失');
        }
        if(empty($id) && !empty($mobile)){
            $mobileResult = $this->Users_model->get_by("mobi",$mobile);
            if(!empty($mobileResult)){
                $id = intval($mobileResult["id"]);
            }
        }
        $temps = $this->Users_model->under($id);
        $result = [] ;
        $total= 0 ;
        if(!empty($temps)){
            $result = $this->Users_model->get_many_user($temps);
            $total = count($result);
        }
        $return = [];
        if(!empty($result)){
            $return["count"] = $total ;
            $return["data"] = array_values($result);
        }
        $this->ajaxReturn($return);
    }


    /**
     * @api {get} /api/admin/user/super_and_child 根据手机号与id 获取用户的直接上级与直接下级列表
     * @apiVersion 1.0.0
     * @apiName user_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/super_and_child
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
     * @apiParam {Number} mobile 用户的手机号码
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
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function super_and_child(){
        $id = $this->input->get_post('id');
        //手机号码
        $mobile = $this->input->get_post('mobile');
        if(empty($id) && empty($mobile)){
            $this->ajaxReturn([], 1, 'id或mobile参数缺失');
        }
        if(empty($id) && !empty($mobile)){
            $mobileResult = $this->Users_model->get_by("mobi",$mobile);
            if(!empty($mobileResult)){
                $id = intval($mobileResult["id"]);
            }
        }
        $parents= $this->Users_model->parent($id);
        $child = $this->Users_model->get_many_by([
            "pid"=>$id
        ]);
        $result["parents"] = $parents;
        $result["child"] = $child;
        $this->ajaxReturn($result);
    }




}
