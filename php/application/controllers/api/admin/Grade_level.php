<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author itmrlu
 * @email itmrlu@163.com
 * @link www.aicode.org.cn
 */
class Grade_level extends API_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Grade_level_model');
    }

    /**
     * @api {get} /api/admin/grade_level 会员等级设置-列表
     * @apiVersion 1.0.0
     * @apiName grade
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/grade_level
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object[]} data 接口数据集
     * @apiSuccess {String} data.id 等级经验设置唯一ID
     * @apiSuccess {String} data.grade_name 等级名称
     * @apiSuccess {String} data.grade_demand 晋级值
     * @apiSuccess {String} data.grade_logo 等级图片
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *	    "data": [
     *	        {
     *	            "id": "1",
     *	            "grade_name": "热门",
     *              "grade_demand": "500",
     *              "grade_logo": "",
     *	        }
     *	    ],
     *	    "status": 0,
     *	    "message": "成功"
     *	}
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
        $deleted = (int)$this->input->get('deleted');
        $order_by = array('sort' => 'asc');//, 'id' => 'desc'
        $ret = $this->Grade_level_model->order_by($order_by)->get_many_by('deleted', $deleted);
        $this->ajaxReturn($ret);
    }

    // 查看
    public function view()
    {

    }

    /**
     * @api {post} /api/admin/grade_level/save 会员等级设置-编辑 OR 新增
     * @apiVersion 1.0.0
     * @apiName grade_save
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/grade_level/save
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 记录唯一ID 0表示新增 其他表示编辑
     * @apiParam {String} name 会员等级名称
     * @apiParam {String} rule 等级权益说明
     * @apiParam {String} brokerage 自购佣金
     * @apiParam {String} direct_brokerage 直属代理佣金
     * @apiParam {String} under_gt_brokerage 会员等级大于下属
     * @apiParam {String} under_eq_brokerage 会员等级等于下属最高
     * @apiParam {String} under_lt_brokerage 会员等级小于下属最高
     * @apiParam {String} remark 等级说明备注
     * @apiParam {Number} grade_demand 晋级值
     * @apiParam {String} icon 等级图
     * @apiParam {Number} enable 启用 1是 0否
     * @apiParam {Number} deleted 是否删除 1是 0否（为1时其他字段可不传）
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
        $this->check_operation();
        $id = (int)$this->input->get_post('id');
        if($id){
            $params = elements(
                array(
                    'name', 'rule', 'brokerage', 'direct_brokerage', 'under_gt_brokerage','under_eq_brokerage','under_lt_brokerage','remark','grade_demand','icon'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('edit', $params);
            if($params['deleted'] == 1){
                $update = array('deleted' => 1, 'enable' => 0);
                $flag = $this->Grade_model->update($id, $update);
            }else{
                unset($params['deleted']);
                if(isset($params['enable']) && $params['enable']){
                    $params['deleted'] = 0;
                }
                $flag = $this->Grade_model->update($id, $params);
            }
        }else{
            $params = elements(
                array(
                    'name', 'rule', 'brokerage', 'direct_brokerage', 'under_gt_brokerage','under_eq_brokerage','under_lt_brokerage','remark','grade_demand','icon'
                ),
                $this->input->post(),
                UPDATE_VALID
            );
            $this->check_params('add', $params);
            if($flag = $this->Grade_model->insert($params)){
                $id = $flag;
            }
        }

        if($flag){
            $status = 0;
            $message = '成功';
        }else{
            $status = 1;
            $message = '失败';
        }
        $this->ajaxReturn(array('id' => $id), $status, '操作'.$message);
    }



    protected function check_params($act, $params)
    {
        switch($act){
            case 'add':
                if($params['name'] === '' || $params['name'] == UPDATE_VALID){
                    $this->ajaxReturn([], 501, '等级名称参数错误');
                }
                if($params['rule'] === '' || $params['rule'] == UPDATE_VALID){
                    $this->ajaxReturn([], 501, '等级值参数错误');
                }
                break;
            case 'edit':
                break;
        }
    }
}
