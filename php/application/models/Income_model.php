<?php
/*
 * 收益
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Income_model extends MY_Model
{
    public $_table        = 'income';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function gold($user, $order, $invite_uid, $topic = 1, $sub_topic = 0)
    {
        $this->load->model('Users_model');
        $anchor = $this->Users_model->get($user['to_user_id']);

        $item = [];
        $item[] = [
            'id' => $order['id'],
            'title' => $order['title'],
            'gold' => $order['real_total_amount'],
            'anchor' => $anchor ? $anchor['nickname'] : ''
        ];
        $this->load->model('Config_model');
        $this->load->model('Shop_model');
        $siteConfig = $this->Config_model->siteConfig();
        // $siteConfig = $this->Shop_model->get_shop_by_user($user['to_user_id']);
        //平台提成
        $distribution_commission = isset($siteConfig['distribution_commission']) ? $siteConfig['distribution_commission'] : 0;
        $price_1 = round($order['real_total_amount'] * $distribution_commission * 0.01, 2);
        if($price_1 > 0){
            if($this->Config_model->get_by(['name' => 'commission_gold'])){
                $this->db->set('value', 'value +'.$price_1, false);
                $this->db->where('name', 'commission_gold');
                $this->db->update($this->Config_model->table());
            }else{
                $this->Config_model->insert(['name' => 'commission_gold', 'value' => $price_1, 'remark' => '平台提成']);
            }
        }

        $insert = [];
        //分销
        $price_2 = $price_3 = 0;
        if($invite_uid){
            //1级分销
            $distribution_one = isset($siteConfig['distribution_one']) ? $siteConfig['distribution_one'] : 0;
            $price_2 = round($order['real_total_amount'] * $distribution_one * 0.01, 2);
            if($price_2 > 0){
                $this->db->set('gold', 'gold +'.$price_2, false);
                $this->db->where('id', $invite_uid);
                $this->db->update($this->Users_model->table());

                $insert[] = [
                    'topic' => $topic,
                    'sub_topic' => $sub_topic,
                    'user_id' => $invite_uid,
                    'name' => $user['nickname'],
                    'mobi' => $user['mobi'],
                    'gold' => $price_2,
                    'type' => 1,
                    'item' => json_encode($item),
                    'level' => 1
                ];
            }

            //2级分销
            /*$p_user = $this->Users_model->get($invite_uid);
            if($p_user && $p_user['pid']){
                $distribution_two = isset($siteConfig['distribution_two']) ? $siteConfig['distribution_two'] : 0;
                $price_3 = round($order['real_total_amount'] * $distribution_two * 0.01, 2);
                if($price_3 > 0){
                    $this->db->set('gold', 'gold +'.$price_3, false);
                    $this->db->where('id', $p_user['pid']);
                    $this->db->update($this->Users_model->table());

                    $insert[] = [
                        'topic' => $topic,
                        'sub_topic' => $sub_topic,
                        'user_id' => $p_user['pid'],
                        'name' => $user['nickname'],
                        'mobi' => $user['mobi'],
                        'gold' => $price_3,
                        'type' => 1,
                        'item' => json_encode($item),
                        'level' => 2
                    ];
                }
            }*/
        }

        //销售收益
        $price = round($order['real_total_amount'] - $price_1 - $price_2 - $price_3, 2);
        //修正设置不合理导致数据异常
        $price = max($price, 0);
        if($price > 0){
            $this->db->set('gold', 'gold +'.$price, false);
            // $this->db->set('real_amount', 'real_amount +'.$price, false);
            // $this->db->set('sales_amount', 'sales_amount +'.$order['real_total_amount'], false);
            $this->db->where('id', $user['to_user_id']);
            $this->db->update($this->Users_model->table());

            $insert[] = [
                'topic' => $topic,
                'sub_topic' => $sub_topic,
                'user_id' => $user['to_user_id'],
                'name' => $user['nickname'],
                'mobi' => $user['mobi'],
                'gold' => $price,
                'type' => 0,
                'item' => json_encode($item),
            ];
        }

        if($insert){
            $this->insert_many($insert);
        }
    }

    //商品销售收益
    public function goods($user, $order, $invite_uid, $topic = 2, $sub_topic = 0)
    {
        if(!is_array($order['id'])){
            $order_id = [$order['id']];
        }else{
            $order_id = $order['id'];
        }
        $this->load->model('Order_items_model');
        $order_item = $this->Order_items_model->get_many_by(['order_id' => $order_id]);
        $item = $goods = [];
        foreach($order_item as $val){
            $item[] = [
                'id' => $val['goods_id'],
                'title' => $val['name'],
                'price' => $val['total_price']
            ];
            !isset($goods[$val['seller_uid']]) && $goods[$val['seller_uid']] = [];
            $goods[$val['seller_uid']][] = [
                'id' => $val['goods_id'],
                'title' => $val['name'],
                'price' => $val['total_price']
            ];
        }

        $this->load->model('Users_model');
        $this->load->model('Config_model');
        $this->load->model('Shop_model');
        $siteConfig = $this->Config_model->siteConfig();
        // $siteConfig = $this->Shop_model->get_shop_by_user($user['to_user_id']);
        //平台提成
        $distribution_commission = isset($siteConfig['distribution_commission']) ? $siteConfig['distribution_commission'] : 0;
        $price_1 = round($order['real_total_amount'] * $distribution_commission * 0.01, 2);
        if($price_1 > 0){
            if($this->Config_model->get_by(['name' => 'commission'])){
                $this->db->set('value', 'value +'.$price_1, false);
                $this->db->where('name', 'commission');
                $this->db->update($this->Config_model->table());
            }else{
                $this->Config_model->insert(['name' => 'commission', 'value' => $price_1, 'remark' => '平台提成']);
            }
        }

        $insert = [];
        //分销
        $price_2 = $price_3 = 0;
        if($invite_uid){
            //1级分销
            $distribution_one = isset($siteConfig['distribution_one']) ? $siteConfig['distribution_one'] : 0;
            $price_2 = round($order['real_total_amount'] * $distribution_one * 0.01, 2);
            if($price_2 > 0){
                $this->db->set('balance', 'balance +'.$price_2, false);
                $this->db->where('id', $invite_uid);
                $this->db->update($this->Users_model->table());

                $insert[] = [
                    'topic' => $topic,
                    'sub_topic' => $sub_topic,
                    'user_id' => $invite_uid,
                    'name' => $user['nickname'],
                    'mobi' => $user['mobi'],
                    'amount' => $price_2,
                    'type' => 1,
                    'item' => json_encode($item),
                    'level' => 1
                ];
            }

            //2级分销
            /*$p_user = $this->Users_model->get($invite_uid);
            if($p_user && $p_user['pid']){
                $distribution_two = isset($siteConfig['distribution_two']) ? $siteConfig['distribution_two'] : 0;
                $price_3 = round($order['real_total_amount'] * $distribution_two * 0.01, 2);
                if($price_3 > 0){
                    $this->db->set('balance', 'balance +'.$price_3, false);
                    $this->db->where('id', $p_user['pid']);
                    $this->db->update($this->Users_model->table());

                    $insert[] = [
                        'topic' => $topic,
                        'sub_topic' => $sub_topic,
                        'user_id' => $p_user['pid'],
                        'name' => $user['nickname'],
                        'mobi' => $user['mobi'],
                        'amount' => $price_3,
                        'type' => 1,
                        'item' => json_encode($item),
                        'level' => 2
                    ];
                }
            }*/
        }

        //销售收益
        $this->load->model('Order_model');
        $order = $this->Order_model->get_many($order_id);
        foreach($order as $seller){
            $price = round($seller['real_total_amount'] - $price_1 - $price_2 - $price_3, 2);
            //修正设置不合理导致数据异常
            $price = max($price, 0);
            if($price > 0){
                $this->db->set('balance', 'balance +'.$price, false);
                $this->db->set('real_amount', 'real_amount +'.$price, false);
                $this->db->set('sales_amount', 'sales_amount +'.$seller['real_total_amount'], false);
                $this->db->where('id', $seller['seller_uid']);
                $this->db->update($this->Users_model->table());

                $insert[] = [
                    'topic' => $topic,
                    'sub_topic' => $sub_topic,
                    'user_id' => $seller['seller_uid'],
                    'name' => $user['nickname'],
                    'mobi' => $user['mobi'],
                    'amount' => $price,
                    'type' => 0,
                    'item' => json_encode($goods[$seller['seller_uid']])
                ];
            }
        }

        if($insert){
            $this->insert_many($insert);
        }
    }

    public function type()
    {
        return [
            '销售',
            '加盟商',
            '城市合伙人'
        ];
    }

    public function topic()
    {
    	return [
    		'知识',
    		'直播',
    		'商品'
    	];
    }

    public function sub_topic()
    {
    	return [
    		[1 => '专辑', 2 => '音频']
    	];
    }

    public function sum_income_topic_group($user_id = 0, $type = 0)
    {
    	$ret = [
			'knowledge' => 0,
            'goods' => 0,
    	];
    	$this->db->select('topic,sum(amount) amount');
    	if($user_id){
    		$this->db->where('user_id', $user_id);
    	}
        $this->db->where('type', $type);
    	$this->db->group_by('topic');
    	if($result = $this->db->get($this->table())->result_array()){
    		foreach($result as $item){
    			switch($item['topic']){
    				case 0:
    					$ret['knowledge'] = $item['amount'];
    					break;
    				case 2:
    					$ret['goods'] = $item['amount'];
    					break;
    			}
    		}
    	}

    	return $ret;
    }
}
