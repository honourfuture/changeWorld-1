<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class User extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Users_model');
    }

    /**
     * @api {post} /api/admin/user/resetPassword 用户信息-重置密码
     * @apiVersion 1.0.0
     * @apiName resetPassword
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/resetPassword
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 会员唯一ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "data": "",
     *        "status": 0,
     *        "message": "成功"
     *    }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function resetPassword()
    {
        $ret = array();
        $id = $this->input->get_post('id');
        $password = $this->input->get_post('password');
        if( empty($password) ){
            $password = '123456';
        }
        $update = ['password'=>$this->Users_model->get_password($password)];
        $flag = $this->Users_model->update($id, $update);
        if($flag){
            $status = 0;
            $message = '成功';
        }else{
            $status = 1;
            $message = '失败';
        }
        $this->ajaxReturn($ret, $status, '操作'.$message);
    }

    /**
     * @api {post} /api/admin/user/save 用户信息-修改
     * @apiVersion 1.0.0
     * @apiName user_save
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/save
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 会员唯一ID
     * @apiParam {String} job 操作动作 [头像:header, 昵称:nickname, 停启用:enable]
     *
     * @apiDescription
     * header传递参数：header
     * nickname传递参数：nickname
     * enable传递参数：enable 0禁用 1启用
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "data": "",
     *        "status": 0,
     *        "message": "成功"
     *    }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function save()
    {
        $ret = array();
        $id = $this->input->get_post('id');
        $job = $this->input->get_post('job');
        $update = [];
        switch($job){
            case 'edit':
                $mobi = $this->input->get_post('mobi');
                $hasMobi = $this->Users_model->get_by(['mobi' => $mobi]);
                if($hasMobi && $hasMobi['id'] != $id){
                    $this->ajaxReturn([], 1, '该手机号码已被注册');
                }
                $update = array('mobi' => $mobi);

                $header = $this->input->get_post('header');
                if($header){
                    //$this->ajaxReturn([], 1, '请上传头像');
                    $update['header'] = $header;
                }

                $nickname = $this->input->get_post('nickname');
                if(!$nickname){
                    $this->ajaxReturn([], 1, '请输入昵称');
                }
                $update['nickname'] = $nickname;

                $point = $this->input->get_post('point');
                if($point){
                    $update['point'] = $point;
                }
                

                $exp = $this->input->get_post('exp');
                if($exp){
                    $update['exp'] = $exp;
                    $this->load->model('Users_model');
                    $user = $this->Users_model->get($id);
                    $this->load->model('Grade_rule_model');
                    $this->load->model('Rank_rule_model');
                    
                    
                    $data['user_id'] = $id;
                    $data['rule_name'] = 'admin';
                    $data['value'] = ($exp - $user['exp']);
                    $this->Users_grade_model->insert($data);
                    $nextRankRule = $this->Rank_rule_model->getNextRankRule($exp, $user['rank_rule_id']);
                    if($nextRankRule){
                        $to = $nextRankRule['id'];
                        $update['rank_rule_id'] = $to;
                        /**
                        if(($to <= 2) || ($user['rank_rule_id']>=3)){
                            $update['rank_rule_id'] = $to;
                        }
                        */
                    }
                    
                }


                break;
            case 'enable':
                $enable = $this->input->get_post('enable');
                if(!in_array($enable, array(0, 1))){
                    $this->ajaxReturn([], 1, '0禁用 1启用');
                }
                $update = array('enable' => $enable);
                break;
            default :
                $this->ajaxReturn([], 1, '未知操作');
                break;
        }

        $flag = $this->Users_model->update($id, $update);
        if($flag){
            $status = 0;
            $message = '成功';
        }else{
            $status = 1;
            $message = '失败';
        }
        $this->ajaxReturn($ret, $status, '操作'.$message);
    }

    /**
     * @api {get} /api/admin/user 用户管理-列表
     * @apiVersion 1.0.0
     * @apiName user
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user
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
     *     "data": {},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function index()
    {
        $ret = ['list' => []];

        $ret['sex'] = $this->Users_model->sex();
        $ret['anchor_status'] = $this->Users_model->anchor();
        $ret['seller_status'] = $this->Users_model->seller();

        $where = [];
        // $where['1 >'] = 0;
        $where['robot'] = 0;

        $order_by = array('id' => 'desc');
        $this->search();
        $ret['count'] = $this->Users_model->count_by($where);
        if($ret['count']){
            $this->db->select('id,created_at,updated_at,mobi,account,header,nickname,v,anchor,seller,exp,reg_ip,balance,point,gold,headhunter,reward_point,enable');
            $this->search();
            $ret['list'] = $this->Users_model->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
        }

        $this->ajaxReturn($ret);
    }
    
    /**
     * 取得所有子成员
     * @param unknown $user_id
     */
    public function getSons()
    {
        $user_id = $this->input->get_post('user_id');
        $sons = array_values($this->Users_model->getSons($user_id));
        $this->ajaxReturn($sons);
    }
    
    /**
     * @api {post} /api/admin/team 用户管理-我的团队
     * @apiVersion 1.0.0
     * @apiName team
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/team
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} mobile 手机号
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {'count'=>0, 'list'=>{}},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function team()
    {
        $ret = ['list' => [], 'status'=>-100, 'message'=>'未知错误'];
        
        $export = $this->input->get_post('export');
        $keyword = $this->input->get_post('keyword');
        $cur_page = $this->input->get_post('cur_page');
        if( empty($cur_page) ){
            $cur_page = 1;
        }
        $per_page = $this->input->get_post('per_page');
        if( empty($per_page) ){
            $per_page = 10;
        }
        try{
            $where = [];
            $where[] = "u.robot=0";
            if( !empty($keyword) ){
                $where[] = "(u.`id` LIKE '%{$keyword}%' OR u.`nickname` LIKE '%{$keyword}%' OR u.`mobi` LIKE '%{$keyword}%')";
            }
            $sql = "SELECT COUNT(1) AS cnt FROM users u WHERE " . implode(' AND ', $where);
            $record = $this->db->query($sql)->row_array();
            $ret['count'] = $record['cnt'];
            if( empty($ret['count']) ){
                $this->ajaxReturn($ret);
            }
            $start = ($cur_page - 1) * $per_page;
            $fields = "if(sum(i.amount), amount, 0) as amount, i.cnt, u.id, pid, u.created_at, u.updated_at, u.mobi, u.account, u.header, u.nickname, 
            u.v, u.anchor, u.seller, u.exp, u.reg_ip, u.balance, u.point, u.gold, u.headhunter, u.reward_point, u.enable";
            $sql = "select {$fields} from users u LEFT join (
                select user_id, sum(amount) as amount, count(1) as cnt from income group by user_id
            ) i on u.id = i.user_id where ". implode(' AND ', $where) ." group by u.id order by amount desc";
            if( !$export ){
                $sql .= " LIMIT {$start}, {$per_page}";
            }
            $list = $this->db->query($sql)->result_array();
            $arrUserIds = [];
            foreach($list as $k=>$user){
                $arrUserIds[] = $user['id'];
                //当前用户的直属上/下级用户
                $user['parent'] = '-';
                $user['son'] = '-';
                $arrRelation = $this->Users_model->getNearByUser($user['id'], $user['pid']);
                if( isset($arrRelation[$user['pid']]) ){
                    $user['parent'] = $arrRelation[$user['pid']]['nickname'];
                    unset($arrRelation[$user['pid']]);
                }
                if( !empty($arrRelation) ){
                    $son = current($arrRelation);
                    $user['son'] = $son['nickname'];
                }
                $user['point'] = floor($user['point']);
                $user['gold'] = floor($user['gold']);
                $sons = [];
                $user['sons'] = array_values($this->Users_model->getSons($user['id'], $sons));
                $user['sons_count'] = count($user['sons']);
                $ret['list'][] = $user;
            }
            $ret['status'] = 0;
            $ret['message'] = 'success';
        }
        catch (\Exception $e){
            $ret['list'] = [];
            $ret['incomes'] = [];
            $ret['status'] = $e->getCode();
            $ret['message'] = $e->getMessage();
        }       
        if( $export ){
            return $ret;
        } 
        $this->ajaxReturn($ret);
    }

    protected function search()
    {
        $keyword = $this->input->get_post('keyword');
        if(! empty($keyword)){
            $this->db->group_start();
            $this->db->like('nickname', $keyword);
            $this->db->or_like('mobi', $keyword);
            $this->db->group_end();
        }
    }

    /**
     * @api {get} /api/admin/user/view 用户管理-详情
     * @apiVersion 1.0.0
     * @apiName user_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/view
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function view()
    {
        $id = $this->input->get_post('id');
        if($info = $this->Users_model->get($id)){
            $this->ajaxReturn($info);
        }else{
            $this->ajaxReturn([], 1, '查看用户详情ID错误');
        }
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

    /**
     * @api {get} /api/admin/user/get_child 根据手机号与id 显示用户下级总人数及列表
     * @apiVersion 1.0.0
     * @apiName user_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/get_child
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
     * @apiParam {Number} mobile 用户的手机号码
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function get_child(){
        $id = $this->input->get_post('id');
        //手机号码
        $mobile = $this->input->get_post('mobile');
        if(empty($id) && empty($mobile)){
            $this->ajaxReturn([], 1, 'id或mobile参数缺失');
        }
        if(empty($id) && !empty($mobile)){
            $mobileResult = $this->Users_model->get_by("mobi",$mobile);
            if(!empty($mobileResult)){
                $id = intval($mobileResult["id"]);
            }
        }
        $temps = $this->Users_model->under($id);
        $result = [] ;
        $total= 0 ;
        if(!empty($temps)){
            $result = $this->Users_model->get_many_user($temps);
            $total = count($result);
        }
        $return = [];
        if(!empty($result)){
            $return["count"] = $total ;
            $return["data"] = array_values($result);
        }
        $this->ajaxReturn($return);
    }


    /**
     * @api {get} /api/admin/user/super_and_child 根据手机号与id 获取用户的直接上级与直接下级列表
     * @apiVersion 1.0.0
     * @apiName user_view
     * @apiGroup admin
     *
     * @apiSampleRequest /api/admin/user/super_and_child
     *
     * @apiParam {Number} admin_id 管理员唯一ID
     * @apiParam {String} account 登录账号
     * @apiParam {String} sign 校验签名
     * @apiParam {Number} id 用户唯一ID
     * @apiParam {Number} mobile 用户的手机号码
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {},
     *     "status": 0,
     *     "message": "成功"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * {
     *        "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function super_and_child(){
        $id = $this->input->get_post('id');
        //手机号码
        $mobile = $this->input->get_post('mobile');
        if(empty($id) && empty($mobile)){
            $this->ajaxReturn([], 1, 'id或mobile参数缺失');
        }
        if(empty($id) && !empty($mobile)){
            $mobileResult = $this->Users_model->get_by("mobi",$mobile);
            if(!empty($mobileResult)){
                $id = intval($mobileResult["id"]);
            }
        }
        $parents= $this->Users_model->parent($id);
        $child = $this->Users_model->get_many_by([
            "pid"=>$id
        ]);
        $result["parents"] = $parents;
        $result["child"] = $child;
        $this->ajaxReturn($result);
    }


    private function _exportTeam($data)
    {
        $arrHeaderTitle = [
            ['title'=>'用户ID', 'field'=>'id'],
            ['title'=>'昵称', 'field'=>'nickname'],
            ['title'=>'手机号', 'field'=>'mobi'],
            ['title'=>'积分', 'field'=>'point'],							
            ['title'=>'余额', 'field'=>'balance'],
            ['title'=>'经验值', 'field'=>'exp'],
            ['title'=>'金币', 'field'=>'gold'],
            ['title'=>'直属上级', 'field'=>'parent'],
            ['title'=>'直属下级', 'field'=>'son'],
            ['title'=>'团队成员', 'field'=>'sons_count'],
            ['title'=>'累计收益', 'field'=>'amount'],
            ['title'=>'注册时间', 'field'=>'created_at']
        ];
        $this->load->library('PHPExcel');
        $this->load->library('PHPExcel/IOFactory');
        $objPHPExcel = new PHPExcel();
        // 以下内容是excel文件的信息描述信息
        $file = '团队数据导出-' . date('YmdHi');
        $objPHPExcel->getProperties()->setTitle($file);
        $objPHPExcel->getProperties()->setDescription("none");
        $objPHPExcel->getProperties()->setCreator(''); //设置创建者
        $objPHPExcel->getProperties()->setLastModifiedBy(''); //设置修改者
        $objPHPExcel->getProperties()->setSubject(''); //设置主题
        $objPHPExcel->getProperties()->setDescription(''); //设置描述
        $objPHPExcel->getProperties()->setKeywords('');//设置关键词
        $objPHPExcel->getProperties()->setCategory('');//设置类型
        $objPHPExcel->setActiveSheetIndex(0);
        
        //处理表头
        foreach ($arrHeaderTitle as $k=>$item){
            $cell = chr(ord('A') + $k) . "1";
            $objPHPExcel->getActiveSheet()->setCellValue($cell, $item['title']);
        }
        //处理表数据（第n(n>=2, n∈N*)行数据）
        foreach ($data['list'] as $key => $item) {
            foreach ($arrHeaderTitle as $k=>$v) {
                $cell = chr(ord('A') + $k) . ($key + 2);
                $value = $item[$v['field']];
                switch($v['field']){
                    case 'nickname':
                        $value = preg_replace_callback(
                            '/./u',
                            function (array $match) {
                                return strlen($match[0]) >= 4 ? '' : $match[0];
                            },
                            $value);
                            $value = strpos($value, '=') === false ? $value : str_replace("=", "＝", $value);
                        break;
                    default:                    
                }
                $objPHPExcel->getActiveSheet()->setCellValueExplicit($cell, $value, \PHPExcel_Cell_DataType::TYPE_STRING);//将其设置为文本格式
            }
        }
        $objWriter = IOFactory::createWriter($objPHPExcel, 'Excel5');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="'. $file .'.xls"');
        header('Cache-Control: max-age=0');
        $objWriter->save('php://output');
    }

    /**
     * 导出
     */
    public function export()
    {
        $type = $this->input->get_post('type');
        switch($type){
            case 1:
                $data = $this->team();
                $this->_exportTeam($data);
                break;
        }
    }

}
