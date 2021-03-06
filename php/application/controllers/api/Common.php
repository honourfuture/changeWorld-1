<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
 * 公共接口
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
use Gregwar\Captcha\CaptchaBuilder;
use Gregwar\Captcha\PhraseBuilder;
require_once(APPPATH.'vendor/james-heinrich/getid3/getid3/getid3.php');

class Common extends API_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @api {post} /api/common/version 应用版本
     * @apiVersion 1.0.0
     * @apiName common_version
     * @apiGroup api
     *
     * @apiSampleRequest /api/common/version
     *
     * @apiParam {int} platform 应用平台(0-IOS/1-安卓)
     * @apiParam {String} version_alias 版本编号(日期8+序号2)
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "data": [],
     *      "status": 0,
     *      "message": "成功"
     *  }
     * 
     */
    public function version()
    {
        $ret = [];

        $platform = $this->input->get_post('platform');
        $version_alias = $this->input->get_post('version_alias');
        if($platform !== '' && $version_alias){
            $sql = "SELECT `version`,version_alias,`explain`,url,verify_status FROM app_version WHERE platform={$platform} AND version_alias='{$version_alias}' AND deleted=0 AND `enable`=1";
            $row = $this->db->query($sql)->row_array();
            if($row){
                $ret = $row;
            }
        }

        $this->ajaxReturn($ret);
    }

    //验证码
    public function captcha()
    {
        $phraseBuilder = new PhraseBuilder(4, '0123456789');
        $builder = new CaptchaBuilder(null, $phraseBuilder);
        $builder->build(80, 44);
        $this->session->set_userdata('captcha', $builder->getPhrase());
        $this->ajaxReturn($builder->inline());
        exit();
    }

    protected function init_upload()
    {
        $config['upload_path'] = FCPATH.'uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg|apk|txt|mp3';
        //aac|amr|ape|flac|m4r|mmf|mp2|mp3|ogg|wav|wma|wv
        // $config['max_size'] = 2048;//K
        $config['file_ext_tolower'] = TRUE;
        $config['encrypt_name'] = TRUE;

        $relative_path = date("Y/m/d/");
        $config['upload_path'] .= $relative_path;

        $this->load->library('upload', $config);
        if(! $this->upload->validate_upload_path()){
            mkdir($this->upload->upload_path, 0777, true);
        }
    }

    /**
     * @api {post} /api/common/fileUpload File文件上传
     * @apiVersion 1.0.0
     * @apiName common_fileUpload
     * @apiGroup api
     *
     * @apiSampleRequest /api/common/fileUpload
     *
     * @apiParam {String} field file控件名称
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {String} data.file_url 文件相对网络路径
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "data": "",
     *      "status": 0,
     *      "message": "成功"
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": 1,
     *     "message": ""
     * }
     */
    public function fileUpload()
    {
        $ret = array();
        $field = $this->input->get_post('field');
        $this->init_upload();
        if($this->upload->do_upload($field)){
            $data = $this->upload->data();
            $ret['file_url'] = '/'.substr($data['full_path'], strpos($data['full_path'], 'uploads'));
            $ret['width'] = $data['image_width'];
            $ret['height'] = $data['image_height'];
            $this->formatResource($this->upload->file_ext, $ret);

            $audio = $this->input->get_post('audio');
            if($audio){
                $ret['name'] = str_replace($data['file_ext'], '', $data['client_name']);

                $getID3 = new getID3;
                $file_info = $getID3->analyze($data['full_path']);
                $ret['playtime_seconds'] = $file_info['playtime_seconds'];
                $ret['playtime_string'] = $file_info['playtime_string'];
            }

            $this->ajaxReturn($ret, 0, '', true);
        }else{
            $this->ajaxReturn($ret, 1, $this->upload->display_errors('', ''), true);
        }
    }

    protected function formatResource($file_ext, &$ret)
    {
        $ext = strtolower(ltrim($file_ext, '.'));
        if($ext == 'apk'){
            $ret['file_url'] = base_url($ret['file_url']);
        }
    }

    /**
     * @api {post} /api/common/base64FileUpload base64File文件上传
     * @apiVersion 1.0.0
     * @apiName common_base64FileUpload
     * @apiGroup api
     *
     * @apiSampleRequest /api/common/base64FileUpload
     *
     * @apiParam {String} base64_image_content base64文件编码
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {String} data.file_url 文件相对网络路径
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "data": "",
     *      "status": 0,
     *      "message": "成功"
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": 1,
     *     "message": ""
     * }
     */
    public function base64FileUpload()
    {
        $ret = array();
        $this->init_upload();
        $base64_image_content = $this->input->get_post('base64_image_content');
        //正则匹配出图片的格式
        if (!preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)) {
            $this->load->library('luoma');
            $logType = 'base64upload';
            $this->luoma->logger($_POST, $logType);
            $this->luoma->logger($base64_image_content, $logType);
            $this->luoma->logger($result, $logType);
            $this->ajaxReturn([], 2, '文件base64格式错误');
        }

        $this->upload->file_ext = '.'.strtolower($result[2]);//图片后缀
        $filename = ''; //文件名
        $filename = $this->upload->set_filename($this->upload->upload_path, $filename);
        $new_file = $this->upload->upload_path.$filename;
        //写入操作
        if ( !file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content))) ) {
            $this->ajaxReturn($ret, 1, '保存失败');
        }

        $ret['file_url'] = '/'.substr($new_file, strpos($new_file, 'uploads'));
        $this->upload->set_image_properties($new_file);
        $ret['width'] = $this->upload->image_width;
        $ret['height'] = $this->upload->image_height;
        $this->ajaxReturn($ret);
    }

    /**
     * @api {get} /api/common/sms 短信
     * @apiVersion 1.0.0
     * @apiName common_sms
     * @apiGroup api
     *
     * @apiSampleRequest /api/common/sms
     *
     * @apiParam {Number} sms_id 短信模板 0注册 1找回密码 2绑定 3解绑
     * @apiParam {String} mobi 获取验证码手机号
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {String} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "data": "",
     *      "status": 0,
     *      "message": "成功"
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": 1,
     *     "message": "验证码发送频率为: 180秒/次"
     * }
     */
    public function sms()
    {
        $sms_id = (int)$this->input->get_post('sms_id');
        $mobi = $this->input->get_post('mobi');
        if(!$mobi){
            $this->ajaxReturn([], 1, '获取验证码手机号错误');
        }
        if($sms_id == 0){
            $this->load->model('Users_model');
            $user = $this->Users_model->get_by('mobi', $mobi);
            if($user){
                $this->ajaxReturn([], 1, '手机号已注册');
            }
        }

        // 记录
        $this->load->model('Sms_email_record_model');
        $data = array('account' => $mobi);
        $this->load->helper('string');
        if(config_item('is_dev')){
            $data['verify'] = '6666';//开发模式验证码 6666
        }else{
            $data['verify'] = random_string('numeric', 4);
        }
        $this->Sms_email_record_model->insert($data);

        // 发送
        $this->load->library('sms');
        $result = $this->sms->send($mobi, array('code' => $data['verify']), $sms_id);

        $this->ajaxReturn([], $result['status'], $result['message']);
    }

    //发生邮件
    public function mail()
    {
        $sms_id = (int)$this->input->get_post('sms_id');
        $email = $this->input->get_post('email');

        $this->load->model('Sms_model');
        $this->load->helper('string');
        $code = random_string('numeric', 4);
        $timeout = 120;
        if($this->Sms_model->getLastVerify($email, $timeout)){
            $this->ajaxReturn([], 1, '发送邮件频率'.$timeout.'秒/次');
        }

        $ret = $this->Sms_model->send_mail($email, $sms_id, array('code' => $code));
        if($ret['status'] == 0){
            $this->ajaxReturn();
        }else{
            $this->ajaxReturn([], $ret['status'], $ret['message']);
        }
    }

    /**
     * @api {get} /api/common/area 地区
     * @apiVersion 1.0.0
     * @apiName common_area
     * @apiGroup api
     *
     * @apiSampleRequest /api/common/area
     *
     * @apiParam {Number} pid 上级ID 0表示顶级
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object[]} data 接口数据集
     * @apiSuccess {String} data.id 地区唯一ID
     * @apiSuccess {String} data.name 地区名称
     * @apiSuccess {String} data.pid 地区上级ID
     * @apiSuccess {String} data.first_letter 首字母
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *      "data": [
     *          {
     *               "id": "110000",
     *               "name": "北京",
     *               "pid": "0",
     *               "first_letter": "B"
     *           },
     *           {
     *               "id": "120000",
     *               "name": "天津",
     *               "pid": "0",
     *               "first_letter": "T"
     *           }
     *      ],
     *      "status": 0,
     *      "message": "成功"
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *     "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function area()
    {
        $pid = (int)$this->input->get_post('pid');
        $this->load->model('Area_model');
        $one_city = $this->Area_model->one_city();
        if(isset($one_city[$pid])){
            $area = [$one_city[$pid]];
        }else{
            $this->db->select('id,fullname name,pid,first_letter,pinyin');
            $area = $this->Area_model->get_many_by('pid', $pid);
        }

        $this->ajaxReturn($area);
    }
}
