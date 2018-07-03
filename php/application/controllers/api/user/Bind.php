<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */

use EasyWeChat\Foundation\Application;

class Bind extends API_Controller {

	public function __construct()
    {
        parent::__construct();
    }

    /**
	 * @api {post} /api/user/bind/share 会员绑定-分享
	 * @apiVersion 1.0.0
	 * @apiName bind_share
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bind/share
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} shop_id 店铺ID
	 * @apiParam {String} invite_uid 邀请人ID
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
    public function share()
    {
    	$shop_id = (int)$this->input->get_post('shop_id');
    	$invite_uid = (int)$this->input->get_post('invite_uid');
    	if($shop_id && $invite_uid){
    		$this->load->model('Bind_shop_user_model');
    		$where = ['shop_id' => $shop_id, 'invite_uid' => $invite_uid, 'user_id' => $this->user_id];
    		if(! $this->Bind_shop_user_model->get_by($where)){
    			$this->Bind_shop_user_model->insert($where);
    		}
    	}

    	$this->ajaxReturn();
    }

    /**
	 * @api {get} /api/user/bind 账号绑定-列表
	 * @apiVersion 1.0.0
	 * @apiName bind
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bind
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 * @apiSuccess {String} message 接口信息描述
	 * @apiSuccess {Object} data 接口数据集
	 * @apiSuccess {Object[]} data.account_type 所有绑定账号总集
	 * @apiSuccess {Object[]} data.list 已绑定账号集
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *     "data": {
	 *         "account_type": [
	 *             "手机",
	 *             "微信",
	 *             "QQ",
	 *             "微博"
	 *         ],
	 *         "list": [
	 *             {
	 *                 "account_type": "0",
	 *                 "unique_id": "13430331489",
	 *                 "other": []
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
		$ret = array('account_type' => [], 'list' => []);

		$this->load->model('Users_bind_model');
		$ret['account_type'] = $this->Users_bind_model->account_type();
		// unset($ret['account_type'][0]);

		$this->db->select('account_type,unique_id,other');
		$ret['list'] = $this->Users_bind_model->get_many_by('user_id', $this->user_id);
		if($ret['list']){
			foreach($ret['list'] as $key=>$item){
				if($item['other']){
					$ret['list'][$key]['other'] = json_decode($item['other'], true);
				}else{
					$other = $item;
					unset($other['other']);
					$ret['list'][$key]['other'] = $other;
				}
			}
		}

		$this->ajaxReturn($ret);
	}

	/**
	 * @api {post} /api/user/bind/save 账号绑定-修改
	 * @apiVersion 1.0.0
	 * @apiName bind_save
	 * @apiGroup user
	 *
	 * @apiSampleRequest /api/user/bind/save
	 *
	 * @apiParam {Number} user_id 用户唯一ID
	 * @apiParam {String} sign 校验签名
	 * @apiParam {String} act 操作动作 [mobi:手机, qq:QQ, wechat:微信, weibo:新浪微博]
	 *
	 * @apiDescription
	 * mobi传递参数: mobi,code
	 * qq传递参数: 
	 * wechat传递参数: code码
	 * weibo传递参数: 
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
		$this->nickname = '';
		$this->load->model('Users_model');

		$act = $this->input->get_post('act');
		switch($act){
			case 'mobi':
				$mobi = $this->input->get_post('mobi');
				$code = $this->input->get_post('code');
				if(!$mobi || !$code){
					$this->ajaxReturn([], 1, '手机号绑定参数错误');
				}

		        $user = $this->Users_model->get_by('mobi', $mobi);
		        if($user){
		            $this->ajaxReturn([], 2, '手机号已被注册');
		        }

		        $this->load->model('Sms_email_record_model');
				$info = $this->Sms_email_record_model->order_by('id', 'DESC')->get_by('account', $mobi);
				if($info){
					if($info['verify'] == $code){
						$update = array('mobi' => $mobi);
					}else{
						$this->ajaxReturn([], 4, '验证码错误');
					}
				}else{
					$this->ajaxReturn([], 3, '先获取验证码绑定');
				}

				$this->nickname = $mobi;
				break;
			case 'qq':
				$update = array('qq_uid' => $id);
				break;
			case 'wechat':
				$open_user = $this->wechat();
				$update = $this->open_update($open_user);
				break;
			case 'weibo':
				$update = array('weibo_uid' => $id);
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
		$this->ajaxReturn(['nickname' => $this->nickname], $status, '操作'.$message);
	}

	protected function wechat()
	{
		$account_type = 1;
    	if(!$code = $this->input->get_post('code')){
    		$this->ajaxReturn([], 1, 'code码必传');
    	}

    	$this->setting = config_item('wechat');
    	$app = new Application($this->setting);
        $oauth = $app->oauth;
        if($user = $oauth->user()){
            $user = $user->toArray();

            //判断是否已绑定
            $where = [
                'account_type' => $account_type,
                'unique_id' => $user['id']
            ];
            $this->load->model('Users_bind_model');
            $this->db->select('id,user_id');
            $user_id = 0;
            $user_bind = $this->Users_bind_model->get_by($where);
            if($user_bind && $user_bind['user_id']){
            	$this->ajaxReturn([], 2, '账号已被绑定请勿重复绑定');
            }else{//未绑定账号
            	if($user_bind){
            		$this->Users_bind_model->delete($user_bind['id']);
            	}
            	$data = [
            		'user_id' => $this->user_id,
	                'account_type' => $account_type,
	                'unique_id' => $user['original']['openid'],
	                'other' => json_encode($user['original']),
	            ];
	            if($this->Users_bind_model->insert($data)){
	            	return $user['original'];
	            }else{
	            	$this->ajaxReturn([], 2, '绑定资料失败');
	            }
            }
        }else{
        	log_message('error', 'wechat oauth failed'.var_export($user, true));
            $this->ajaxReturn([], 1, '微信授权登录异常错误');
        }
	}

	protected function open_update($open_user)
	{
		isset($open_user['nickname']) && $this->nickname = $open_user['nickname'];

		$update = [];
		$user = $this->get_user();
		if(! $user['header']){
			isset($open_user['headimgurl']) && $update['header'] = $open_user['headimgurl'];
		}
		if(! $user['nickname']){
			isset($open_user['nickname']) && $update['nickname'] = $open_user['nickname'];
		}
		if(! $user['sex']){
			isset($open_user['sex']) && $update['sex'] = $open_user['sex'];
		}

		return $update;
	}
}
