<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Users_points extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {get} /api/users_points 积分明细
	 * @apiVersion 1.0.0
	 * @apiName users_points
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/users_points
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} type 类型 income：收入 used：使用 all：全部
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Number} data.total 当前积分余额
	 * @apiSuccess {Number} data.count 总记录数
	 * @apiSuccess {Object} data.list 列表
	 * @apiSuccess {String} data.list.id 积分明细ID
	 * @apiSuccess {String} data.list.updated_at 更新时间
	 * @apiSuccess {String} data.list.value 变更值
	 * @apiSuccess {String} data.list.remark 备注描述
	 * @apiSuccess {String} data.list.point 当前积分余额
	 * @apiSuccess {String} data.list.rule_name_text 变更类型
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "total": 50,
	 *         "count": 5,
	 *         "list": [
	 *             {
	 *                 "id": "5",
	 *                 "updated_at": "2018-03-14 20:06:18",
	 *                 "user_id": "1",
	 *                 "value": "-20",
	 *                 "rule_name": "goods_exchange",
	 *                 "remark": "商品抵扣现金",
	 *                 "point": "140",
     *                 "rule_name_text": "消费抵扣"
	 *             },
	 *             {
	 *                 "id": "4",
	 *                 "updated_at": "2018-03-14 19:59:13",
	 *                 "user_id": "1",
	 *                 "value": "10",
	 *                 "rule_name": "points_pay",
	 *                 "remark": "商品消费立返",
     *                 "point": "160",
	 *                 "rule_name_text": "消费立返"
	 *             },
	 *             {
	 *                 "id": "3",
	 *                 "updated_at": "2018-03-14 19:49:27",
	 *                 "user_id": "1",
	 *                 "value": "50",
	 *                 "rule_name": "points_evaluate",
	 *                 "remark": "商品订单评论",
     *                 "point": "170",
	 *                 "rule_name_text": "订单评论"
	 *             },
	 *             {
	 *                 "id": "2",
	 *                 "updated_at": "2018-03-14 15:46:05",
	 *                 "user_id": "1",
	 *                 "value": "20",
	 *                 "rule_name": "points_login",
	 *                 "remark": "每天首次登录",
     *                 "point": "120",
	 *                 "rule_name_text": "会员登陆"
	 *             },
	 *             {
	 *                 "id": "1",
	 *                 "updated_at": "2018-03-14 13:01:09",
	 *                 "user_id": "1",
	 *                 "value": "100",
	 *                 "rule_name": "points_reg",
	 *                 "remark": "新用户首次注册",
     *                 "point": "100",
	 *                 "rule_name_text": "会员注册"
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
		$ret = array('points' => array('total'=>0,'count' => 0, 'list' => array()));

		$where = array();
		$type = $this->input->get_post('type');
		if($type == 'income'){
			$where['value >'] = 0;
		}elseif($type == 'used'){
			$where['value <'] = 0;
		}

		if($this->user_id){
			$where['user_id'] = $this->user_id;
		}
        //查询当前用户积分总余额
        $this->load->model('Users_model');
		if($this->user_id){
            $user = $this->Users_model->get($this->user_id);
            $ret['points']['total'] = $user->point;
        }

		$this->load->model('Users_points_model');
		$this->search();
		$ret['points']['count'] = $this->Users_points_model->count_by($where);
		if($ret['points']['count']){
			$order_by = array('id' => 'desc');
			$this->search();
			$this->db->select('id,updated_at,user_id,value,rule_name,remark,point');
			$ret['points']['list'] = $this->Users_points_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
			$a_user = array();
			if($ret['points']['list']){
				foreach($ret['points']['list'] as $key=>$item){
					$ret['points']['list'][$key]['value'] = round($item['value'], 0);
					$ret['points']['list'][$key]['rule_name_text'] = $this->formatPointsName($item['rule_name']);
					$item['user_id'] && $a_user[] = $item['user_id'];
				}
			}

            if(!$this->user_id && $a_user){
				$this->load->model('Users_model');
				$ret['user'] = $this->Users_model->get_many_user($a_user);
			}
		}

		//结果一致性
		$this->ajaxReturn($this->user_id ? $ret['points'] : $ret);
	}

	protected function search()
	{
		
	}

	protected function formatPointsName($name)
	{
		$this->load->model('Points_rule_model');
		$init = $this->Points_rule_model->init();
		return isset($init[$name]) ? $init[$name] : '未知';
	}

	/**
	 * @api {get} /api/users_points/save 积分增减
	 * @apiVersion 1.0.0
	 * @apiName users_points_save
	 * @apiGroup admin
	 *
	 * @apiSampleRequest /api/users_points/save
	 *
	 * @apiParam {Number} admin_id 管理员唯一ID
	 * @apiParam {String} account 登录账号
	 * @apiParam {String} sign 校验签名
	 * @apiParam {Number} c_user_id 会员唯一ID
	 * @apiParam {String} type 类型 1增 2减
	 * @apiParam {String} points 积分值
	 * @apiParam {String} remark 操作备注
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
		$this->check_operation();
		$params = elements(
			array(
				'c_user_id', 'type', 'points', 'remark'
			),
			$this->input->post(),
			UPDATE_VALID
		);

		$this->load->model('Users_model');
		$user = $this->Users_model->get($params['c_user_id']);
		if(! $user){
			$this->ajaxReturn([], 1, '会员不存在');
		}
		if(! in_array($params['type'], array(1, 2))){
			$this->ajaxReturn([], 2, '增加类型不支持');
		}
		$params['points'] = intval($params['points']);
		if(! $params['points']){
			$this->ajaxReturn([], 3, '请输入有效积分值');
		}
		if(! $params['remark']){
			$this->ajaxReturn([], 4, '变动备注必填');
		}

		$this->load->model('Users_points_model');
		$data = array();
		$data['value'] = abs($params['points']);
		$points = 0;
		if($params['type'] == 2){
			$data['value'] *= -1;
			if($data['value'] > $user['point']){
				$update = array('point' => 0);
			}else{
				$update = array('point' => $user['point'] - $data['value']);
                $points = $user['point'] - $data['value'];
			}
		}else{
			$update = array('point' => $user['point'] + $data['value']);
            $points = $user['point'] - $data['value'];
		}

		$data['user_id'] = $params['c_user_id'];
		$data['remark'] = $params['remark'];
		$data['point'] = $points;
		$this->Users_points_model->insert($data);

		$this->Users_model->update_by(array('id' => $data['user_id']), $update);

		$this->ajaxReturn();
	}

    /**
     * @api {get} /api/users_points/todayPoint 今日积分
     * @apiVersion 1.0.0
     * @apiName users_points_todayPoint
     * @apiGroup api
     *
     * @apiSampleRequest /api/users_points/todayPoint
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {Number} data.countPoint 总积分
     * @apiSuccess {Object} data.today
     * @apiSuccess {String} data.today.count 积分上线
     * @apiSuccess {String} data.today.value 已增加积分
     * @apiSuccess {String} data.today.remark 名称
     *
     * @apiSuccessExample {json} Success-Response:
     *{
     *    "data": {
     *        "countPoint": "10.00",
     *        "today": [
     *            {
     *                "count": 100,
     *                "value": "10",
     *                "remark": "签到增加"
     *            }
     *        ]
     *    },
     *    "status": 0,
     *    "message": "成功"
     *}
     *
     * @apiErrorExample {json} Error-Response:
     * {
     * 	   "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function todayPoint()
    {
        $this->load->model('Users_points_model');
        $this->load->model('Users_model');

        $start = date('Y-m-d 00:00:00', time());
        $end = date('Y-m-d 23:59:59', time());
        $where = [
            'user_id' => $this->user_id,
            'created_at >= ' => $start,
            'created_at <= ' => $end,
        ];

        $user = $this->Users_model->get($this->user_id);
        $dataInfo['countPoint'] = $user['point'];

        $points = $this->Users_points_model->get_many_by($where);
        $this->load->model('Points_rule_model');
        $pointsRule = $this->Points_rule_model->get_many_by(['enable'=>1,'deleted'=>0,'show_name !='=>'']);
        $limit_day = [];
        foreach ($pointsRule as $key=>$value){
            $limit_day[$value["name"]] = $value["days_limit"];
        }
        $result = [];
        $todayPoint = 0 ;
        foreach ($points as $point){
            $todayPoint +=$point["value"];
            if(isset($result[$point['rule_name']])){
                $result[$point['rule_name']]['value'] += $point['value'];
            }else{
                $result[$point['rule_name']] = [
                    'count' => isset($limit_day[$point['rule_name']]) ? $limit_day[$point['rule_name']] : 0,
                    'value' => $point['value'],
                    'remark' => $point['remark']
                ];
            }
        }
        $rule_list = array_keys($result);
        foreach ($pointsRule as $key=>$value){
            if(!in_array($value["name"],$rule_list)){
                $result[] = [
                    'count'=>$limit_day[$value["name"]],
                    'value'=>0,
                    'remark'=>$value["show_name"]
                ];
            }
        }
        $dataInfo["todayPoint"] = $todayPoint;
        $dataInfo['today'] = array_values($result);
        $this->ajaxReturn($dataInfo);
    }
}
