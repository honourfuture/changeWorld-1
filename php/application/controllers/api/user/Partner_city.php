<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Partner_city extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Partner_model');
    }

	/**
	 * @api {get} /api/user/partner_city 城市合伙人-列表
	 * @apiVersion 1.0.0
	 * @apiName partner_city
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/partner_city
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.user_id 为0表示添加的城市合伙人手机号未注册
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "count": 3,
	 *         "list": [
	 *             {
	 *                 "id": "3",
	 *                 "mobi": "13888888888",
	 *                 "area": "湖南省,衡阳市,珠晖区",
	 *                 "user_id": 0
	 *             },
	 *             {
	 *                 "id": "1",
	 *                 "mobi": "13430332489",
	 *                 "area": "广东省,深圳市,南山区",
	 *                 "user_id": "1",
	 *                 "nickname": "aicode",
	 *                 "header": "",
	 *                 "v": "0",
	 *                 "exp": "0"
	 *             }
	 *         ]
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
	public function index()
	{
		$ret = array('count' => 0, 'list' => array());

		$where = array('user_id' => $this->user_id);

		$order_by = array('id' => 'desc');
		$ret['count'] = $this->Partner_model->count_by($where);
		if($ret['count']){
			$this->db->select('id,mobi,area');
			$ret['list'] = $this->Partner_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);

			$a_mobi = [];
			foreach($ret['list'] as $key=>$item){
				$ret['list'][$key]['user_id'] = 0;
				$a_mobi[] = $item['mobi'];
			}

			$this->load->model('Users_model');
			$this->db->select('id user_id,nickname,header,v,exp,mobi');
			if($users = $this->Users_model->get_many_by(['mobi' => $a_mobi])){
				$k_users = [];
				foreach($users as $item){
					$k_users[$item['mobi']] = $item;
				}

				foreach($ret['list'] as $key=>$item){
					isset($k_users[$item['mobi']]) && $ret['list'][$key] = array_merge($item, $k_users[$item['mobi']]);
				}
			}
		}

		$this->ajaxReturn($ret);
	}
}
