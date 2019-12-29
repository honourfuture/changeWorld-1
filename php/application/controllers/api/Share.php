<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Share extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->point = 1000;
    }

    public function index()
    {
    	$ret = [];

    	$ret['point'] = $this->point;

    	$this->load->model('App_version_model');
    	$this->db->select('platform,url');
    	$this->db->group_by('platform');
    	$ret['app'] = $this->App_version_model->order_by('id', 'desc')->get_many_by(['enable' => 1]);

    	$this->ajaxReturn($ret);
    }

	/**
	 * @api {post} /api/share/register 分享-领取积分登记
	 * @apiVersion 1.0.0
	 * @apiName share_register
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/share/register
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
     * @apiParam {Number} type 分享类型 1 分享音频
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": [],
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
	public function register()
	{
		$params = elements(
			array(
				'mobi', 'invite_uid','user_id','type'
			),
			$this->input->post(),
			0
		);
//		if(! $params['mobi']){
//			$this->ajaxReturn([], 1, '请输入有效手机号');
//		}
		/**
		$this->load->model('Share_record_model');
		if($record = $this->Share_record_model->get_by(['mobi' => $params['mobi']])){
			$this->ajaxReturn([], 2, '每个手机限定领取一次');
		}
		$params['point'] = $this->point;
		$this->Share_record_model->insert($params);
        */
		//只有分享音频的时候给奖励
		if($params['type'] == 1){
            $this->checkCalculation('share',true,true);
            $this->AddCalculation($params["user_id"],'share',[]);
        }
		$this->ajaxReturn();
	}
}
