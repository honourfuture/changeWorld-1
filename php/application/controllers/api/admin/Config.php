<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Config extends API_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model('Config_model');
    }

    /**
	 * @api {get} /api/admin/config 系统配置-列表
	 * @apiVersion 1.0.0
	 * @apiName config
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/config
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
	 *     "data": {
	 *			"site_name": "爱码网"
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
		$this->ajaxReturn($this->Config_model->siteConfig());
	}

	/**
	 * @api {get} /api/admin/config/init 系统配置-查看字段
	 * @apiVersion 1.0.0
	 * @apiName config_init
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/config/init
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
	 *     "data": {
	 *         "site_name": "站点名称",
	 *         "icp_number": "ICP证书号",
	 *         "statistics_code": "第三方流量统计代码",
	 *         "copyright": "版权信息",
	 *         "site_status": "站点状态",
	 *         "closed_reason": "关闭原因",
	 *         "phone": "客服联系电话",
	 *         "email": "电子邮件",
	 *         "image_max_filesize": "图片文件大小",
	 *         "image_allow_ext": "文件扩展名",
	 *         "email_host": "SMTP 服务器",
	 *         "email_port": "SMTP 端口",
	 *         "email_addr": "发信人邮件地址",
	 *         "email_id": "SMTP 身份验证用户名",
	 *         "email_pass": "SMTP 身份验证密码",
	 *         "email_test": "测试接收的邮件地址",
	 *         "search_words": "默认搜索",
	 *         "logo_image": "网站Logo",
	 *         "buyer_image": "会员中心Logo",
	 *         "seller_image": "商家中心Logo"
	 *     },
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
	public function init()
	{
		$this->ajaxReturn($this->_init());
	}

	protected function _init()
	{
		$init = $this->Config_model->init();
		$field = [];
		foreach($init as $key=>$rows){
			if(is_array($rows)){
				foreach($rows as $t_key=>$row){
					$field[$t_key] = $row;
				}
			}else{
				$field[$key] = $rows;
			}
		}

		return $field;
	}

	// 查看
	public function view()
	{

	}

	/**
	 * @api {post} /api/admin/config/save 系统配置-编辑 OR 新增
	 * @apiVersion 1.0.0
	 * @apiName config_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/admin/config/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
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
		$field = $this->_init();

		$params = elements(
			array_keys($field),
			$this->input->post(),
			UPDATE_VALID
		);
		$this->check_params('add', $params);

		$a_name = array_keys($params);
		$a_name && $this->Config_model->delete_by('name', $a_name);
		$data = array();
		if($params){
			foreach($params as $key=>$val){
				// list($value, $remark) = explode('###', $val);
				$data[] = array('name' => $key, 'value' => $val, 'remark' => $field[$key]);
			}
		}

		$flag = true;
		if($data && $flag = $this->Config_model->insert_many($data)){
			$id = $flag;
		}

		if($flag){
			$status = 0;
			$message = '成功';
		}else{
			$status = 1;
			$message = '失败';
		}
		$this->ajaxReturn([], $status, '操作'.$message);
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
}
