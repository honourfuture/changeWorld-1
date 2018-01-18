<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 公共接口
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

class Normal extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {get} /api/normal/images 通用-广告图
     * @apiVersion 1.0.0
     * @apiName normal_images
     * @apiGroup api
     *
     * @apiSampleRequest /api/normal/images
     *
     * @apiParam {Number} images_id 短信模板 0注册
     * @apiParam {String} job 应用区间{guid: '引导页', startup: '启动页'}
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Objet[]} data 接口数据集
     * @apiSuccess {String} data.title 标题
     * @apiSuccess {String} data.link 链接
     * @apiSuccess {String} data.image 图片
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "data": [
     *        {
     *            "title": "22",
     *            "link": "",
     *            "image": ""
     *        }
     *    ],
     *    "status": 0,
     *    "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": 1,
     *     "message": "验证码发送频率为: 180秒/次"
     * }
     */
    public function images()
    {
        $ret = array();
        $job = $this->input->get_post('job');
        switch($job){
            case 'guid'://引导页(3-5张)
                $ad_position_id = 3;
                $ret = $this->ad($ad_position_id, 3);
                break;
            case 'startup'://启动页(1张)
                $ad_position_id = 3;
                $ret = $this->ad($ad_position_id);
                break;
            default :
                $this->ajaxReturn('', 1, '请求应用区间未知');
                break;
        }

        $this->ajaxReturn($ret);
    }
}
