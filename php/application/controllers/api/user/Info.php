<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Info extends API_Controller {

	public function __construct()
    {
        parent::__construct();

        $this->load->model('Users_model');
    }

    public function onoff()
    {
    	$ret = [];
    	$this->load->model('Config_model');
    	$config = $this->Config_model->siteConfig();
    	$ret['onoff'] = isset($config['gift']) ? $config['gift'] : 0;

    	$this->ajaxReturn($ret);
    }

    /**
	 * @api {post} /api/user/info/bind_device_uuid 用户信息-绑定极光registration_id
	 * @apiVersion 1.0.0
	 * @apiName info_bind_device_uuid
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info/bind_device_uuid
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} registration_id 个推唯一码
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *	{
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": "成功"
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * 	   "data": "",
	 *     "status": -1,
	 *     "message": "签名校验错误"
	 * }
	 */
    public function bind_device_uuid()
    {
    	$registration_id = trim($this->input->get_post('registration_id'));
    	if($registration_id){
    		$this->Users_model->update($this->user_id, ['device_uuid' => $registration_id]);
    	}

    	$this->ajaxReturn();
    }

    /**
	 * @api {get} /api/user/info/bitch 用户信息-批量获取
	 * @apiVersion 1.0.0
	 * @apiName info_bitch
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info/bitch
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} s_uid 批量用户ID，实例：1,2,3
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.header 用户头像
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.sex 性别 1男 2女 0保密
	 * @apiSuccess {String} data.birth 出生日期
	 * @apiSuccess {String} data.summary 简介
	 * @apiSuccess {String} data.age 年龄
	 * @apiSuccess {Object[]} data.bind 已绑定账号 0手机 1微信 2QQ 3微博
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "header": "",
	 *         "nickname": "aicode",
	 *         "sex": "0",
	 *         "birth": "2018-01-12",
	 *         "summary": "",
	 *         "age": 0,
	 *         "bind": [
	 *             "0"
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
	public function bitch()
	{
		$ret = array();

		$s_uid = $this->input->get_post('s_uid');
		$a_uid = explode(',', $s_uid);
		if($a_uid){
			$this->load->model('Users_model');
			$this->db->select('id,nickname,header,summary,exp,pretty_id,address,created_at');
			$rows = $this->Users_model->get_many($a_uid);
			if($rows){
				$this->load->model('Grade_model');
				foreach($rows as $item){
					$grade = $this->Grade_model->exp_to_grade($item['exp']);
					$item['lv'] = $grade['grade_name'];
					$ret[] = $item;
				}
			}
		}

		$this->ajaxReturn($ret);
	}


    /**
     * @api {get} /api/user/info/invite 用户信息查询-根据邀请码
     * @apiVersion 1.0.0
     * @apiName info_invite
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/info/invite
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     * @apiParam {String} invite_code 邀请码，实例：1234567
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     * @apiSuccess {String} data.header 用户头像
     * @apiSuccess {String} data.nickname 用户昵称
     * @apiSuccess {String} data.sex 性别 1男 2女 0保密
     * @apiSuccess {String} data.birth 出生日期
     * @apiSuccess {String} data.summary 简介
     * @apiSuccess {String} data.age 年龄
     * @apiSuccess {Object[]} data.bind 已绑定账号 0手机 1微信 2QQ 3微博
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *     "data": {
     *         "header": "",
     *         "nickname": "aicode",
     *         "sex": "0",
     *         "birth": "2018-01-12",
     *         "summary": "",
     *         "age": 0,
     *         "bind": [
     *             "0"
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
    public function invite()
    {
        $ret = array();

        $a_uid = $this->input->get_post('invite_code');
        if($a_uid){
            $this->load->model('Users_model');
            $this->db->select('id,nickname,header,summary,exp,pretty_id,address,created_at');
            $item = $this->Users_model->get_by(array('invite_code'=>$a_uid));
            if($item){
                $this->load->model('Grade_model');
                $grade = $this->Grade_model->exp_to_grade($item['exp']);
                $item['lv'] = $grade['grade_name'];
                $ret[] = $item;
            }
        }

        $this->ajaxReturn($ret);
    }



    /**
	 * @api {get} /api/user/info 用户中心
	 * @apiVersion 1.0.0
	 * @apiName info
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object} data.user 用户关联属性
	 * @apiSuccess {String} data.user.id 用户唯一ID
	 * @apiSuccess {String} data.user.nickname 用户昵称
	 * @apiSuccess {String} data.user.header 用户头像
	 * @apiSuccess {String} data.user.v V标识 0否 1是
	 * @apiSuccess {String} data.user.anchor 讲师标识 0:'未申请', 1:'待审核', 2:'已通过', 3:'已拒绝'
	 * @apiSuccess {String} data.user.seller 卖家 0:'未申请', 1:'待审核', 2:'已通过', 3:'已拒绝'
	 * @apiSuccess {String} data.user.invite_code 邀请码
	 * @apiSuccess {String} data.user.invite_url 邀请链接
	 * @apiSuccess {String} data.user.exp 经验值
	 * @apiSuccess {String} data.vip 贵族信息 id=0表示无贵族
	 * @apiSuccess {String} data.collection 收藏数量
	 * @apiSuccess {String} data.follow 关注数量
	 * @apiSuccess {String} data.fans 粉丝数量
     * @apiSuccess {String} data.user.invite_user_id 邀请人id
     * @apiSuccess {String} data.user.invite_user_header 邀请人昵称
     * @apiSuccess {String} data.user.invite_user_nickname 邀请人头像
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "user": {
	 *             "id": "1",
	 *             "nickname": "aicode",
	 *             "invite_code": "122112",
	 *             "invite_url": "邀请链接",
	 *             "header": "/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png",
	 *             "v": "0",
	 *             "anchor": "1",
	 *             "seller": "1",
	 *             "exp": "0"
     *             "exp": "0"
	 *         },
	 *         "vip": {
	 *             "name": "",
	 *             "icon": "",
	 *             "id": 0
	 *         },
	 *         "collection": 3,
	 *         "follow": 18,
	 *         "fans": 1
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
		$ret = array();

		$user = $this->get_user();
        $invite_url = $config = config_item('invite_url');//邀请链接
		$ret['user'] = array(
			'id' => $user['id'],
			'nickname' => $user['nickname'],
			'header' => $user['header'],
			'v' => $user['v'],
			'anchor' => $user['anchor'],
			'seller' => $user['seller'],
			'invite_code' => $user['invite_code'],
			'invite_url' => $invite_url.$user['invite_code'],
			'exp' => $user['exp'],
			'mobi' => $user['mobi'],
			'pretty_id' => $user['pretty_id'],
			'address' => $user['address'],
			'bg_image' => $user['bg_image'],
			'sex' => $user['sex'],
			'headhunter' => $user['headhunter'],
		);
        //查询邀请人信息
        if(!empty($user['pid'])){
            $this->load->model('Users_model');
            $invite_user = $this->Users_model->get($user['pid']);
            $ret['user']['invite_user_id'] = $user['pid'];
            $ret['user']['invite_user_header'] = $invite_user['header'];
            $ret['user']['invite_user_nickname'] = $invite_user['nickname'];
        }else{
            $ret['user']['invite_user_id'] = '';
            $ret['user']['invite_user_header'] = '';
            $ret['user']['invite_user_nickname'] = '';
        }

		$this->load->model('Grade_model');
		$grade = $this->Grade_model->exp_to_grade($user['exp']);
		$ret['lv'] = $grade['grade_name'];

		$this->load->model('Grade_model');
		$ret['vip'] = $this->Grade_model->exp($user['rank_rule_id']);
		$this->load->model('Users_collection_model');
		$where = array('user_id' => $this->user_id, 'topic' => 2);
		$ret['collection'] = $this->Users_collection_model->count_by($where);
		$where = array('user_id' => $this->user_id, 'topic' => 1);
		$ret['follow'] = $this->Users_collection_model->count_by($where);
		$where = array('t_id' => $this->user_id, 'topic' => 1);
		$ret['fans'] = $this->Users_collection_model->count_by($where);

        $where = [
            'user_id' => $this->user_id,
            'date' => date('Y-m-d'),
        ];
        $this->load->model('Sign_in_model');
        $sign = $this->Sign_in_model->get_by($where);
        $ret['toDaySign'] = isset($sign) ? 1 : 0;
		$this->ajaxReturn($ret);
	}

    /**
	 * @api {get} /api/user/info/view 用户信息-查看
	 * @apiVersion 1.0.0
	 * @apiName info_view
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info/view
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {String} data.header 用户头像
	 * @apiSuccess {String} data.nickname 用户昵称
	 * @apiSuccess {String} data.sex 性别 1男 2女 0保密
	 * @apiSuccess {String} data.birth 出生日期
	 * @apiSuccess {String} data.summary 简介
	 * @apiSuccess {String} data.age 年龄
	 * @apiSuccess {Object[]} data.bind 已绑定账号 0手机 1微信 2QQ 3微博
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "header": "",
	 *         "nickname": "aicode",
	 *         "sex": "0",
	 *         "birth": "2018-01-12",
	 *         "summary": "",
	 *         "age": 0,
     *         "collection": 0,
     *         "follow": 0,
     *         "fans": 0,
	 *         "bind": [
	 *             "0"
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
	public function view()
	{
		$ret = array();

		$ret = elements(
			array(
				'header', 'nickname', 'sex', 'birth', 'summary', 'address', 'bg_image', 'invite_code'
			),
			$this->get_user(),
			''
		);
		$ret['age'] = $this->Users_model->age($ret['birth']);

		$this->load->model('Users_bind_model');
		$ret['bind'] = $this->Users_bind_model->get_user_bind_list($this->user_id);
        $ret['collection'] = 0;
        $ret['follow'] = 0;
        $ret['fans'] = 0;
		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/info/save 用户信息-修改
	 * @apiVersion 1.0.0
	 * @apiName info_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/info/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} act 操作动作 [修改密码:password, 支付密码:pay_password, 头像:header, 昵称:nickname, 性别:sex 0保密 1男 2女, 出生日期:birth 2018-01-12, 简介:summary, 地址:address（省市区名称），背景图：bg_image，邀请人绑定：invite_code]
	 *
	 * @apiDescription
	 * password传递参数: old_password,new_password,confirm_password
	 * pay_password传递参数: pay_password,confirm_password
	 * header传递参数：header
	 * nickname传递参数：nickname
	 * sex传递参数：sex
	 * birth传递参数：birth 接口返回age
	 * summary传递参数：summary
	 * address传递参数：address
	 * bg_image传递参数：bg_image
     *
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *	{
	 *	    "data": "",
	 *	    "status": 0,
	 *	    "message": "成功"
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
		$ret = array();
		$act = $this->input->get_post('act');
		switch($act){
			case 'password':
				$old_password = $this->input->get_post('old_password');
				$new_password = $this->input->get_post('new_password');
				$confirm_password = $this->input->get_post('confirm_password');
				if(!$old_password){
					$this->ajaxReturn([], 1, '请输入旧密码');
				}
				if(!$new_password){
					$this->ajaxReturn([], 1, '请输入新密码');
				}
				if($new_password != $confirm_password){
					$this->ajaxReturn([], 2, '确认密码不一致');
				}

				$user = $this->get_user();
				if($user['password'] != $this->Users_model->get_password($old_password)){
					$this->ajaxReturn([], 3, '旧密码错误');
				}

				$update = array('password' => $this->Users_model->get_password($new_password));
				break;
			case 'pay_password':
				$pay_password = $this->input->get_post('pay_password');
				$confirm_password = $this->input->get_post('confirm_password');
				if(!$pay_password){
					$this->ajaxReturn([], 1, '请输入支付密码');
				}
				if($pay_password != $confirm_password){
					$this->ajaxReturn([], 2, '确认密码不一致');
				}

				$update = array('pay_password' => $this->Users_model->get_password($pay_password));
				break;
			case 'header':
				$header = $this->input->get_post('header');
				if(!$header){
					$this->ajaxReturn([], 1, '请上传头像');
				}
				$update = array('header' => $header);
				break;
			case 'nickname':
				$nickname = $this->input->get_post('nickname');
				if(!$nickname){
					$this->ajaxReturn([], 1, '请输入昵称');
				}

				$this->load->model('Users_model');
				if($this->Users_model->get_by(['nickname' => $nickname])){
					$this->ajaxReturn([], 1, '昵称已存在');
				}
				$this->load->model('Users_anchor_model');
				if($this->Users_anchor_model->get_by(['nickname' => $nickname])){
					$this->ajaxReturn([], 1, '昵称已存在');
				}

				$update = array('nickname' => $nickname);
				break;
			case 'sex':
				$sex = $this->input->get_post('sex');
				if(!in_array($sex, array(0, 1, 2))){
					$this->ajaxReturn([], 1, '性别仅支持: 男女保密');
				}
				$update = array('sex' => $sex);
				break;
			case 'birth':
				$birth = $this->input->get_post('birth');
				if(!$birth){
					$this->ajaxReturn([], 1, '请选择出生日期');
				}
				$update = array('birth' => $birth);

				$ret['age'] = $this->Users_model->age($birth);
				break;
			case 'summary':
				$summary = $this->input->get_post('summary');
				$update = array('summary' => $summary);
				break;
			case 'address':
				$address = $this->input->get_post('address');
				$update = array('address' => $address);
				break;
			case 'bg_image':
				$bg_image = $this->input->get_post('bg_image');
				$update = array('bg_image' => $bg_image);
				break;
			case 'invite_code'://邀请人绑定
				$invite_code = $this->input->get_post('invite_code');
                $user = $this->get_user();
                if(!empty($user['pid'])){
                    $this->ajaxReturn([], 1, '已经添加了绑定关系');
                }
                $temp_user = $this->Users_model->get_by(['invite_code' => $invite_code]);
                if(empty($temp_user)){
                    $this->ajaxReturn([], 1, '邀请人信息不存在');
                }
				$update = array('pid' => $temp_user['id']);
				break;
			default :
				$this->ajaxReturn([], 1, '未知操作');
				break;
		}

		$flag = $this->Users_model->update($this->user_id, $update);
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
     * @api {post} /api/user/info/ironfans 我的铁粉-列表
     * @apiVersion 1.0.0
     * @apiName partner_ironfans
     * @apiGroup user
     *
     * @apiSampleRequest /api/user/info/ironfans
     *
     * @apiParam {Number} user_id 用户唯一ID
     * @apiParam {String} sign 校验签名
     *
     * @apiSuccess {Number} status 接口状态 0成功 其他异常
     * @apiSuccess {String} message 接口信息描述
     * @apiSuccess {Object} data 接口数据集
     *
     * @apiSuccessExample {json} Success-Response:
     *	{
     *	    "data": {
     *                   "count": 3,
     *                   "list": [{
     *                       "user_id": "14949284",
     *                       "nickname": "你是我每天的梦",
     *                       "address": "",
     *                       "header": "/uploads/2018/07/24/61462ff1562314965983604bc72048c4.jpg",
     *                       "v": "0",
     *                       "exp": "0",
     *                       "mobi": "",
     *                       "pretty_id": "",
     *                       "pid": "14951233",
     *                       "lv": "1",
     *                       "is_star": "1" //可以据此判断是否显示星星
     *                       }]
     *          },
     *	    "status": 0,
     *	    "message": "成功"
     *	}
     *
     * @apiErrorExample {json} Error-Response:
     * {
     * 	   "data": "",
     *     "status": -1,
     *     "message": "签名校验错误"
     * }
     */
    public function ironfans()
    {
        $ret = array('count' => 0, 'list' => array());
        $user = $this->Users_model->get($this->user_id);
        if($user){
            $temps = $this->Users_model->under($user['id']);
            if($temps){
                $this->db->where_in('id', $temps);
                $this->load->model('Users_model');
                $ret['count'] = $this->db->count_all_results($this->Users_model->table(), false);

                $this->db->select('id,nickname,address,header,v,exp,mobi,pretty_id,pid,created_at');
                //$this->db->order_by('id', 'desc');
                $this->db->limit($this->per_page, $this->offset);
                $users = $this->db->get()->result_array();
                if($users){
                    $this->load->model('Grade_model');
                    foreach($users as $item){
                        $grade = $this->Grade_model->exp_to_grade($item['exp']);
                        $item['lv'] = $grade['grade_name'];
                        $item['is_star'] = $item['pid'] == $this->user_id ? 1 : 0;//据此判断是否是一级
                        $item['date'] = date('Y-m-d', strtotime($item['created_at']));
                        $ret['list'][] = $item;
                    }
                }
            }else{
                $ret['list'] = [];
                $ret['count'] = 0;
            }

        }
        $this->ajaxReturn($ret);
    }
}
