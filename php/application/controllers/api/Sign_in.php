<?php
defined('BASEPATH') or exit ('No direct script access allowed');

class Sign_in extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Sign_in_model');
        $this->load->model('Users_model');
    }

    /**
     * @api {get} /api/sign_in/signList 签到列表（默认7天）
     * @apiVersion 1.0.0
     * @apiName sign_list
     * @apiGroup sign
     *
     * @apiSampleRequest /api/sign_in/signList
     *
     * @apiParam {String} start_date 开始时间
     * @apiParam {String} end_date 结束时间
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常 设置成功直接登录成功
     * @apiSuccess {Number} data.countSignIn 总签到天数
     * @apiSuccess {Number} data.signRule 签到规则
     * @apiSuccess {Number} data.continuousSign 连续签到天数
     * @apiSuccess {Number} data.countPoint 总积分
     * @apiSuccess {Number} data.list 近七天签到记录
     * @apiSuccess {String} data.list.point 获取的积分
     * @apiSuccess {String} data.list.continue 连续签到天数大于0为签到
     *
     * @apiSuccessExample {json} Success-Response:
     *{
     *    "data": {
     *        "list": [
     *            {
     *                "date": "2019-11-13",
     *                "continue": 0,
     *                "point": 2
     *            },
     *            {
     *                "date": "2019-11-14",
     *                "continue": 0,
     *                "point": 4
     *            },
     *            {
     *                "date": "2019-11-15",
     *                "continue": 0,
     *                "point": 2
     *            },
     *            {
     *                "date": "2019-11-16",
     *                "continue": 0,
     *                "point": 2
     *            },
     *            {
     *                "date": "2019-11-17",
     *                "continue": 0,
     *                "point": 4
     *            },
     *            {
     *                "date": "2019-11-18",
     *                "continue": 0,
     *                "point": 3
     *            },
     *            {
     *                "date": "2019-11-19",
     *                "continue": "1",
     *                "point": 4
     *            },
     *            {
     *                "date": "2019-11-20",
     *                "continue": 0,
     *                "point": 1
     *            }
     *        ],
     *        "continuousSign" : 1,
     *        "countSignIn": 1,
     *        "countPoint": "10.00"
     *    },
     *    "status": 0,
     *    "message": "成功"
     *}
     * @apiErrorExample {json} Error-Response:
     * {
     * 	   "data": [],
     *     "status": 4,
     *     "message": "服务器错误"
     * }
     */
    public function signList()
    {
        $startDate = $this->input->get('start_date');
        $endDate = $this->input->get('end_date');
        if(!$startDate){
            $startDate = date('Y-m-d', strtotime('-1 days'));
        }

        if(!$endDate){
            $endDate = date('Y-m-d', strtotime('5 days'));
        }

        $startTime = strtotime($startDate);
        $endTime = strtotime($endDate);

        $results = [];

        //根据日期获取相应的日期的可以获得的积分
        $where = [
            'user_id' => $this->user_id,
            'date >= ' => $startDate,
            'date <= ' => $endDate,
        ];

        $whereCount['user_id'] = $this->user_id;
        $whereCount['continue >'] = 0;
        //总的签到
        $count = $this->Sign_in_model->count_by($whereCount);
        $user = $this->Users_model->get($this->user_id);
        $dataInfo['continuousSign'] = 0;
        $data = $this->Sign_in_model->get($where);
        $signInfo = [];
        $dataInfo['continuousSign'] = max(array_column($data, 'continue'));
        $this->load->model('Sign_setting_model') ;
        $sign_result = $this->Sign_setting_model->getAll(2);
        $signSetting = [];
        $max = 0;
        foreach ($sign_result as $sign){
            if($sign['days'] > $max){
                $max = $sign['days'];
            }
            $signSetting[$sign['days']] = $sign;
        }
        foreach ($data as $datum){
            $signInfo[$datum['date']] = $datum;
        }
        $today = date('Y-m-d');
        $days = 0;
        for($time = $startTime; $time <= $endTime; $time+=86400){
            $key = date('Y-m-d', $time);
            if(isset($signInfo[$key])){
                $continue = $signInfo[$key]['continue'];
                $continuePoint = $continue > $max ? $max : $continue;
                $results[$key] = [
                    'date' => $key,
                    'continue' => $continue,
                    'point' => isset($signSetting[$continuePoint]) ? $signSetting[$continuePoint]['value'] : 0,
                ];
                $days = $continue;
            }else{
                $days++;
                $continuePoint = $days > $max ? $max : $days;
                $results[$key] = [
                    'date' => $key,
                    'continue' => 0,
                    'point' => isset($signSetting[$continuePoint]) ? $signSetting[$continuePoint]['value'] : 0,
                ];
            }
        }


        $dataInfo['signRule'] = '签到规则';
        $dataInfo['list'] = array_values($results);
        $dataInfo['countSignIn'] = $count;
        //用户的总的积分
        $dataInfo['countPoint'] = $user['point'];
        return $this->ajaxReturn($dataInfo);

    }
    /**
     * @api {post} /api/sign_in/add 新增签到
     * @apiVersion 1.0.0
     * @apiName sign_add
     * @apiGroup sign
     *
     * @apiSampleRequest /api/sign_in/add
     *
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} user_id 用户唯一ID
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
    public function add()
    {
        $where = [
            'date' => date('Y-m-d', time()),
            'user_id' => $this->user_id
        ];

        $data = $this->Sign_in_model->findByAttributes($where);
        if($data){
            return $this->ajaxReturn([], 1, '您已经签到过了！');
        }

        $where = [
            'date' => date('Y-m-d', strtotime("-1 day")),
            'user_id' => $this->user_id
        ];

        $lastData = $this->Sign_in_model->findByAttributes($where);
        $continue = 1;
        if($lastData){
            $continue = $lastData['continue'] + 1;
        }
        $data = [
            'date' => date('Y-m-d', time()),
            'user_id' => $this->user_id,
            'continue' => $continue
        ];


        if($this->Sign_in_model->create($data)) {
            $this->checkCalculation('sign_in',true,true);
            $this->AddCalculation($this->user_id,'sign_in', ['continue'=>$continue]);
            return $this->ajaxReturn([], 0, '签到成功');
        } else {
            return $this->ajaxReturn([], 3, '服务器出错');
        }
    }
}

?>