<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Anchor extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Users_anchor_model');
    }

    /**
	 * @api {get} /api/user/anchor 讲师认证-初始页
	 * @apiVersion 1.0.0
	 * @apiName anchor
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/anchor
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.class 主播类型
	 * @apiSuccess {Object} data.anchor 主播信息 空表示未提交过
	 * @apiSuccess {Object} data.certificate 证件
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *			"class": [],
	 *			"anchor": {},
	 *			"certificate": {}
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
    	$ret = array('class' => array(), 'anchor' => array(), 'certificate' => array());

    	$this->load->model('Anchor_class_model');
    	$order_by = array('sort' => 'desc', 'id' => 'desc');
    	if($this->user_id){
			$this->db->select('id,name');
		}
    	$ret['class'] = $this->Anchor_class_model->order_by($order_by)->get_many_by('enable', 1);

    	$ret['anchor'] = $this->Users_anchor_model->get_by('user_id', $this->user_id);

    	$ret['certificate'] = $this->Users_anchor_model->certificate();

    	$this->ajaxReturn($ret);
    }

	/**
	 * @api {post} /api/user/anchor/save 讲师认证-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName anchor_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/anchor/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} mobi 手机号
	 * @apiParam {String} email 邮箱
	 * @apiParam {String} nickname 昵称
	 * @apiParam {String} realname 真实姓名
	 * @apiParam {Number} certificate_type 证件类型
	 * @apiParam {String} certificate_no 证件号
	 * @apiParam {String} certificate_photo 证件照
	 * @apiParam {Number} class_id 主播类型
	 * @apiParam {String} summary 简介
	 * @apiParam {String} other 其他说明
	 * @apiParam {String} anchor_photo 主播照 json
	 * @apiParam {String} anchor_video 主播视频 json
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *			"points_reg": "会员注册",
	 *			"points_login": "会员登录"
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
	public function save()
	{
		$params = elements(
			array(
				'mobi', 'email', 'nickname', 'realname', 'certificate_type', 'certificate_no', 'certificate_photo',
				'class_id', 'summary', 'other', 'anchor_photo', 'anchor_video'
			),
			$this->input->post(),
			UPDATE_VALID
		);
		// $params['certificate_type'] = 1;//默认身份证
		$params['user_id'] = $this->user_id;

		if($anchor = $this->Users_anchor_model->get_by('user_id', $this->user_id)){
			if($anchor['status'] == 1){
				$this->ajaxReturn([], 1, '已认证请勿重复提交信息');
			}

			$params['status'] = 0;//初始化
			$this->Users_anchor_model->update($anchor['id'], $params);
		}else{
			$this->Users_anchor_model->insert($params);
		}

		$this->ajaxReturn();
	}
}
