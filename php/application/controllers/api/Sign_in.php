<?php
defined('BASEPATH') or exit ('No direct script access allowed');

class Sign_in extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Sign_in_model');
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
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *	    "data": [],
     *	    "status": 0,
     *	    "message": "成功"
     *	}
     *
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
            $startDate = date('Y-m-d', strtotime('-7 days'));
        }

        if(!$endDate){
            $endDate = date('Y-m-d', time());
        }

        $startTime = strtotime($startDate);
        $endTime = strtotime($endDate);

        $results = [];
        for($time = $startTime; $time <= $endTime; $time+=86400){
            $key = date('Y-m-d', $time);
            $results[$key] = [
                'date' => $key,
                'continue' => 0,
            ];
        }

        $where = [
            'user_id' => $this->user_id,
            'date >= ' => $startDate,
            'date <= ' => $endDate,
        ];

        $data = $this->Sign_in_model->get($where);
        foreach ($data as $datum){
            if(isset($results[$datum['date']])){
                $results[$datum['date']]['continue'] = $datum['continue'];
            }
        }
        $results = array_values($results);
        return $this->ajaxReturn($results);

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
            if($continue == 1){
                $value = 10;
            }else{
                $value = 10 + $continue * 5;
                $value = $value > 40 ? 40 : $value;
            }

            $this->pointsCalculation($this->user_id, $value, 'sign_in', '签到增加');
            return $this->ajaxReturn([], 0, '签到成功');
        } else {
            return $this->ajaxReturn([], 3, '服务器出错');
        }
    }
}

?>