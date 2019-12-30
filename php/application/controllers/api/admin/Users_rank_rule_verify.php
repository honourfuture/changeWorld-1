<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 用户等级提交审核表
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
	 * @api {get} /api/admin/users_rank_rule_verify 获取用户等级表
	 * @apiVersion 1.0.0
	 * @apiName users_rank_rule_verify
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/users_rank_rule_verify
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
     * @apiParam {Number} type 类型 1 经验 2 积分
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *			"grade_login": "50",
	 *			"grade_evaluate": "20"
	 *	   },
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
	public function index()
	{
        $ret =  array('count' => 0, 'list' => array());
        $status = $this->input->get_post('status',-1);
        $where = array(
        );
        if($status >= 0 ){
            $where['status'] = $status ;
        }
        $user_id = $this->input->get_post('user_id');
        if($user_id){
            $where['user_id'] = $user_id;
        }
        $this->load->model('Users_rank_rule_verify_model');
        $ret['count'] = $this->Users_rank_rule_verify_model->count_by($where);
        if($ret['count']){
            $order_by = array('id' => 'desc');
            $ret['list'] = $this->Users_rank_rule_verify_model->order_by($order_by)
                ->limit($this->per_page, $this->offset)->get_many_by($where);
            $user_id_list = [] ;
            $rank_rule_id = [];
            if($ret['list']){
                foreach($ret['list'] as $key=>$item){
                    $user_id_list[] = $item['user_id'];
                    $rank_rule_id[] = $item['from'] ;
                    $rank_rule_id[] = $item['to'] ;
                }
            }
            if($user_id_list){
                $this->load->model('Users_model');
                $user_where = [
                    'id'=>$user_id_list
                ];
                $userResult = $this->Users_model->get_many_by($user_where);
                $userList = [];
                foreach ($userResult as $key=>$value){
                    $userList[$value['id']] = $value ;
                }
                $this->load->model('Rank_rule_model');
                $rankResult = $this->Rank_rule_model->get_many_by(
                    ['id'=>$rank_rule_id]
                );
                $ranklist = [];
                foreach ($rankResult as $key=>$value){
                    $ranklist[$value['id']] = $value ;
                }

                foreach ($ret['list'] as $k=>$v){
                    $ext = [];
                    $ext['account'] = $userList[$v['user_id']]['account'] ;
                    $ext['from_name'] = $ranklist[$v['from']]['name'];
                    $ext['to_name'] = $ranklist[$v['to']]['name'];
                    $ext['exp'] = $userList[$v['user_id']]['exp'];
                    //升级需要的经验
                    $ext['upgrade_exp'] =  $ranklist[$v['to']]['exp'];
                    unset($v['updated_at']);
                    $ret['list'][$k] = array_merge($v,$ext);
                }
            }
        }

        $this->ajaxReturn($ret);
	}


	/**
	 * @api {post} /api/admin/users_rank_rule_verify/save 审核
	 * @apiVersion 1.0.0
	 * @apiName users_rank_rule_verify_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/users_rank_rule_verify/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
     * @apiParam {Number} status 1 审核中 2 审核通过 3 审核拒绝
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {String} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": ""
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
	public function save()
	{
        $id = (int)$this->input->get_post('id');
        $params = elements(
            array(
                'status', 'id'
            ),
            $this->input->post(),
            UPDATE_VALID
        );
        $status = $params["status"];
        $this->load->model('Users_rank_rule_verify_model');
        $info = $this->Users_rank_rule_verify_model->get_by([
            'id'=>$id
        ]);
        $ret = [
            'status'=>-1
        ];
        if(empty($info)){
            $this->ajaxReturn($ret,-1,"内容不存在");
        }
        $user_id = $info['user_id'];
        if($status == 2){
            $this->load->model('Users_model');
            $this->Users_model->update($user_id,['rank_rule_id'=>$info['to']]);
            $this->Users_rank_rule_verify_model->update($info['id'],[
                'status'=>2
            ]);
        }
        else{
            $this->Users_rank_rule_verify_model->update($info['id'],[
                'status'=>$status
            ]);
        }
        $this->ajaxReturn(array('id' => $id), 0, '操作成功');
	}

}