<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
class Crontab extends API_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Order_model');
        $this->load->model('Order_items_model');
        $this->load->model('Users_model');
        $this->load->model('Income_model');

    }

    /**
	 * @api {get} /api/crontab 计划任务跑订单数据
	 * @apiVersion 1.0.0
	 * @apiName crontab
	 * @apiGroup api
	 *
	 * @apiSampleRequest /api/crontab
	 *
	 * @apiParam {String} sign 校验签名
	 *
	 * @apiSuccess {Number} status 接口状态 0成功 其他异常
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * {
	 *	}
	 *
	 * @apiErrorExample {json} Error-Response:
	 * {
	 * }
	 */
	public function index()
	{
        $sign = $this->input->get('sign');
        if($sign != 'crontab_key') {
            echo 'sign error !';die;
        }

        //自购比例
        $selfPercent = [
            '0' => 0,
            '1' => 1,
            '2' => 1.6,
            '3' => 2,
            '4' => 3,
            '5' => 4
        ];
        //直属比例
        $underPercent = [
            '0' => 0,
            '1' => 0.2,
            '2' => 0.4,
            '3' => 0.4,
            '4' => 0.6,
            '5' => 0.8
        ];
        //下属佣金提成比例(大于)
        $branch = [
            '0' => 0,
            '1' => 0.2,
            '2' => 0.25,
            '3' => 0.25,
            '4' => 0.35,
            '5' => 0.5
        ];
        //下属佣金提成比例(等于)
        $branchEq = [
            '0' => 0,
            '1' => 0.2,
            '2' => 0.05,
            '3' => 0.05,
            '4' => 0.07,
            '5' => 0.1
        ];

        $orders = $this->Order_items_model->crontabOrder();
        $insert = [];
        foreach ($orders as $order){

            $user = $this->Users_model->get_by('id', $order['buyer_uid']);
            if(!$user['pid']){
                $this->Order_items_model->update($order['id'], ['is_income' => 3]);
                echo $user['id'].' <- id没有pid不参与分销';
                continue;
            }
            if(!$user){
                $this->Order_items_model->update($order['id'], ['is_income' => 2]);
                continue;
            }
            $this->load->model('Users_model');
            $levelUsers = $this->Users_model->parent($user['pid'], [$user]);

            $levelIds = [];
            foreach ($levelUsers as $k => $levelUser){

                if($levelUser['id'] == $user['id']){
                    //自购佣金
                    $addPrice = isset($selfPercent[$levelUser['rank_rule_id']]) ? $selfPercent[$levelUser['rank_rule_id']] * $order['goods_price'] : 0;
                }else if($levelUser['id'] == $user['pid']){
                    //直属
                    $addPrice = isset($underPercent[$levelUser['rank_rule_id']]) ? $underPercent[$levelUser['rank_rule_id']] * $order['goods_price']: 0;
                }else{
                    $maxLevelId = max($levelIds);
                    if($maxLevelId > $levelUser['rank_rule_id']){
                        continue;
                    }else if($maxLevelId == $levelUser['rank_rule_id']){
                        $addPrice = isset($branchEq[$levelUser['rank_rule_id']]) ? $branchEq[$levelUser['rank_rule_id']] * $order['goods_price'] : 0;
                    }else{
                        $addPrice = isset($branch[$levelUser['rank_rule_id']]) ? $branch[$levelUser['rank_rule_id']] * $order['goods_price'] : 0;
                    }
                }
                $addPrice = $order['base_percent'] / 100 * $addPrice;
                $addPrice = round($addPrice, 2);
                if($addPrice){
                    $this->_setBalance($levelUser['id'], $addPrice);

                    $this->checkCalculation('per_income',true,true);
                    $this->AddCalculation($levelUser['id'], 'per_income', ['price' => $addPrice]);
                    $insert[] = [
                        'topic' => 2,
                        'sub_topic' => 0,
                        'user_id' => $levelUser['id'],
                        'name' => $levelUser['nickname'],
                        'mobi' => $levelUser['mobi'],
                        'amount' => $addPrice,
                        'type' => 2,
                        'item' => json_encode($order),
                        'level' => count($levelIds),
                        'shop_id' => $order['seller_uid'],
                        'from_id' => $user['id']
                    ];
                }
                $levelIds[] = $levelUser['rank_rule_id'];

            }

            if($insert){
                $this->Income_model->insert_many($insert);
            }
            $this->Order_items_model->update($order['id'], ['is_income' => 1]);
            //每元消费
            $this->checkCalculation('per_dollar',true,true);
            $this->AddCalculation($order['buyer_uid'], 'per_dollar', ['price' => $order['goods_price']]);
        }
    }

    private function _setBalance($uid, $balance)
    {
        $balance = round($balance , 2);
        $this->db->set('balance', 'balance +'.$balance, false);
        $this->db->where('id', $uid);
        $this->db->update($this->Users_model->table());
    }



}
