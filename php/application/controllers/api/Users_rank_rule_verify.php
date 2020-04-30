<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 用户级别 设置表
 *
 * Class Sign_setting
 */
class Users_rank_rule_verify extends API_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Users_rank_rule_verify_model');
    }


    /**
     * @api {post} /api/users_rank_rule_verify/upgrade 用户等级-升级
     * @apiVersion 1.0.0
     * @apiName grade_rule_save
     * @apiGroup admin
     *
     * @apiSampleRequest /api/users_rank_rule_verify/upgrade
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {String} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *        "data": "",
     *        "status": ,
     *        "message": ""
     *    }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function upgrade()
    {
        $user_id = $this->user_id ;
        $this->load->model('Users_model');
        $this->load->model('Users_rank_rule_verify_model');
        //如何目前有正在审核中的 不允许提交
        $check = $this->Users_rank_rule_verify_model->get_by([
            'user_id'=>$user_id,
            'status'=>1
        ]);

        if(!empty($check)){
            $this->ajaxReturn([],-1,"当前有正在审核中的");
        }
        //当前
        $userInfo = $this->get_user();
        $this->load->model('Rank_rule_model');
        $from = $userInfo['rank_rule_id'];
        $nextRankRule = $this->Rank_rule_model->getNextRankRule($userInfo['exp'], $from);
        if(empty($nextRankRule)){
            $this->ajaxReturn([],2,"不满足升级条件");
        }
        $setting = config_item('push');
        $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);
        $cid = $userInfo['device_uuid'];
        $to = $nextRankRule['id'];
        if(($to <= 2) || ($from>=3)){//非跨界
            $result = $client->push()
                ->setPlatform('all')
                ->addRegistrationId($cid)
                ->setNotificationAlert('升级成功')
                ->send();
            $this->Users_model->update($userInfo['id'], ['rank_rule_id' => $to]);
            $this->ajaxReturn([], 0, '升级成功');
        }
        //跨界
        $ret = [
            'user_id'=>$this->user_id,
            'from'=>$from,
            'to'=>$to,
            'status'=>1,
            'created_at'=>date("Y-m-d H:i:s"),
            'updated_at'=>date("Y-m-d H:i:s")
        ];
        $id = $this->Users_rank_rule_verify_model->insert($ret);
        $result = $client->push()
            ->setPlatform('all')
            ->addRegistrationId($cid)
            ->setNotificationAlert('升级成功')
            ->send();
        $this->ajaxReturn(array('id' => $id), 0, '操作成功');
    }
    
}
