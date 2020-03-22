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
    
    const INCOME_TYPE_4_KNOWLEDGE = 0;//知识
    const INCOME_TYPE_4_LIVE = 1;//直播 
    const INCOME_TYPE_4_GOOD = 2;//商品

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 积分明细
     * @param unknown $fields
     * @param unknown $where
     * @param unknown $order
     * @param unknown $per_page
     * @param unknown $offset
     */
    public function getIncomes($fields, $where, $order, $per_page, $offset)
    {
    	$arrFields = explode(',', trim($fields));
    	array_push($arrFields, 'users.nickname');
    	$fields = implode('income.', $arrFields);
    	$order = implode('income.', explode(',', trim($order)) );
    	$arrWhere = [];
    	$query = $this->db->select($fields)->get($this->table())->join('users', 'income.from_id = users.id');
    	foreach($where as $field => $value){
    		$query = $query->where("income.{$field}", $value);
    	}
    	return $query->result_array();
    }
    
    public function city($user_id, $address)
    {
        $uid = 0;
        if(! $address){
            return $uid;
        }
        $a_addr = explode(' ', $address);
        if(count($a_addr) == 2){
            $city = $a_addr[0];
        }elseif(count($a_addr) > 2){
            $city = $a_addr[1];
        }else{
            return $uid;
        }

        $this->load->model('Partner_model');
        $where = [
            'user_id' => $user_id,
            'type' => 0
        ];
        $this->db->like('area', $city);
        if($row = $this->Partner_model->limit(1)->get_by($where)){
            $this->load->model('Users_model');
            if($user = $this->Users_model->get_by(['mobi' => $row['mobi']])){
                $uid = $user['id'];
            }
        }

        return $uid;
    }

    public function service($user, $order, $invite_uid, $topic = 0, $sub_topic = 0)
    {
        $item = [];
        $item[] = [
            'id' => $order['id'],
            'title' => $order['title'],
            'price' => $order['price'],
            'service' => $order['service']
        ];

        if($order['service']){
            if($order['service'] == 1){
                $sub_topic = 2;
            }else{
                $sub_topic = 1;
            }
        }
        $this->load->model('Users_model');
        $this->load->model('Config_model');
        $this->load->model('Shop_model');

        $siteConfig = [
            'distribution_one' => $order['two_level_rate'],
            'distribution_commission' => 0,
            'city_partner_rate' => $order['city_partner_rate']
        ];
        // $siteConfig = $this->Config_model->siteConfig();
        // $siteConfig = $this->Shop_model->get_shop_by_user($user['to_user_id']);
        //平台提成
        $distribution_commission = isset($siteConfig['distribution_commission']) ? $siteConfig['distribution_commission'] : 0;
        $price_1 = round($order['price'] * $distribution_commission * 0.01, 2);
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
            $price_2 = round($order['price'] * $distribution_one * 0.01, 2);
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
                    'service_amount' => $price_2,
                    'type' => 1,
                    'item' => json_encode($item),
                    'level' => 1,
                    'shop_id' => $user['to_user_id'],
                    'from_id' => $user['id']
                ];
            }

            //2级分销
            /*$p_user = $this->Users_model->get($invite_uid);
            if($p_user && $p_user['pid']){
                $distribution_two = isset($siteConfig['distribution_two']) ? $siteConfig['distribution_two'] : 0;
                $price_3 = round($order['price'] * $distribution_two * 0.01, 2);
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
                        'service_amount' => $price_3,
                        'type' => 1,
                        'item' => json_encode($item),
                        'level' => 2
                    ];
                }
            }*/
        }

        //城市合伙人
        if($uid = $this->city($user['to_user_id'], $user['address'])){
            $price_3 = round($order['price'] * $siteConfig['city_partner_rate'] * 0.01, 2);
            if($price_3 > 0){
                $this->db->set('balance', 'balance +'.$price_3, false);
                $this->db->where('id', $uid);
                $this->db->update($this->Users_model->table());

                $insert[] = [
                    'topic' => $topic,
                    'sub_topic' => $sub_topic,
                    'user_id' => $uid,
                    'name' => $user['nickname'],
                    'mobi' => $user['mobi'],
                    'service_amount' => $price_3,
                    'type' => 2,
                    'item' => json_encode($item),
                    'level' => 1,
                    'shop_id' => $user['to_user_id'],
                    'from_id' => $user['id']
                ];
            }
        }

        //销售收益
        $price = round($order['price'] - $price_1 - $price_2 - $price_3, 2);
        //修正设置不合理导致数据异常
        $price = max($price, 0);
        if($price > 0){
            $this->db->set('balance', 'balance +'.$price, false);
            $this->db->set('real_amount', 'real_amount +'.$price, false);
            $this->db->set('sales_amount', 'sales_amount +'.$order['price'], false);
            $this->db->where('id', $user['to_user_id']);
            $this->db->update($this->Users_model->table());

            $insert[] = [
                'topic' => $topic,
                'sub_topic' => $sub_topic,
                'user_id' => $user['to_user_id'],
                'name' => $user['nickname'],
                'mobi' => $user['mobi'],
                'service_amount' => $price,
                'type' => 0,
                'item' => json_encode($item),
                'shop_id' => $user['to_user_id'],
                'from_id' => $user['id']
            ];
        }

        if($insert){
            $this->insert_many($insert);
        }
    }

    public function gold($user, $order, $invite_uid, $topic = 1, $sub_topic = 0)
    {
        return true;
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
                    'level' => 1,
                    'shop_id' => $user['to_user_id'],
                    'from_id' => $user['id']
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

        //城市合伙人
        if($uid = $this->city($user['to_user_id'], $user['address'])){
            $city_partner_rate = isset($siteConfig['city_partner_rate']) ? $siteConfig['city_partner_rate'] : 0;
            $price_3 = round($order['real_total_amount'] * $city_partner_rate * 0.01, 2);
            if($price_3 > 0){
                $this->db->set('balance', 'balance +'.$price_3, false);
                $this->db->where('id', $uid);
                $this->db->update($this->Users_model->table());

                $insert[] = [
                    'topic' => $topic,
                    'sub_topic' => $sub_topic,
                    'user_id' => $uid,
                    'name' => $user['nickname'],
                    'mobi' => $user['mobi'],
                    'amount' => $price_3,
                    'type' => 2,
                    'item' => json_encode($item),
                    'level' => 1,
                    'shop_id' => $user['to_user_id'],
                    'from_id' => $user['id']
                ];
            }
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
                'shop_id' => $user['to_user_id'],
                'from_id' => $user['id']
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

        $this->load->model('Users_model');
        $this->load->model('Config_model');
        $this->load->model('Shop_model');
        $siteConfig = [
            'distribution_commission' => 0,
            'distribution_one' => 0,
            'city_partner_rate' => 0
        ];
        // $siteConfig = $this->Config_model->siteConfig();
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
        //销售收益
        $this->load->model('Goods_model');
        $this->load->model('Order_items_model');
        $this->load->model('Order_model');
        $order = $this->Order_model->get_many($order_id);
        $goods = [];
        foreach($order as $seller){
            $sum = 0;
            $order_item = $this->Order_items_model->get_many_by(['order_id' => $seller['id']]);
            $orderFreightFee = $this->Order_items_model->getFreightFee($seller['id']);
            foreach($order_item as $val){
                $goods_row = $this->Goods_model->get($val['goods_id']);
                if($goods_row){
                    $siteConfig['distribution_one'] = $goods_row['two_level_rate'];
                    $siteConfig['city_partner_rate'] = $goods_row['city_partner_rate'];
                }

                $item = [];
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


                $rate = $seller['total_amount'] > 0 ? (($seller['real_total_amount']-$orderFreightFee['freight_fee']) * $val['total_price']) / $seller['total_amount'] : 0;
                //分销
                $price_2 = $price_3 = 0;
                if($invite_uid){
                    //1级分销
                    $distribution_one = isset($siteConfig['distribution_one']) ? $siteConfig['distribution_one'] : 0;
                    $price_2 = round($rate * $distribution_one * 0.01, 2);
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
                            'level' => 1,
                            'shop_id' => $user['to_user_id'],
                            'from_id' => $user['id']
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

                //城市合伙人
                if($uid = $this->city($user['to_user_id'], $user['address'])){
                    $city_partner_rate = isset($siteConfig['city_partner_rate']) ? $siteConfig['city_partner_rate'] : 0;
                    $price_3 = round($rate * $city_partner_rate * 0.01, 2);
                    if($price_3 > 0){
                        $this->db->set('balance', 'balance +'.$price_3, false);
                        $this->db->where('id', $uid);
                        $this->db->update($this->Users_model->table());

                        $insert[] = [
                            'topic' => $topic,
                            'sub_topic' => $sub_topic,
                            'user_id' => $uid,
                            'name' => $user['nickname'],
                            'mobi' => $user['mobi'],
                            'amount' => $price_3,
                            'type' => 2,
                            'item' => json_encode($item),
                            'level' => 1,
                            'shop_id' => $user['to_user_id'],
                            'from_id' => $user['id']
                        ];
                    }
                }

                $sum = $sum + $price_2 + $price_3;
            }

            $price = round($seller['real_total_amount'] - $price_1 - $sum, 2);
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
                    'item' => json_encode($goods[$seller['seller_uid']]),
                    'shop_id' => $user['to_user_id'],
                    'from_id' => $user['id']
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

    public function sum_income_topic_group($user_id = 0, $type = 0, $where=[])
    {
    	$ret = [
			'knowledge' => 0,
            'goods' => 0,
    	];
    	$this->db->select('topic,sum(amount) amount');
    	if($user_id){
    		$this->db->where('user_id', $user_id);
    	}
    	if($type){
            $this->db->where('type', $type);
        }

    	if($where){
            $this->db->where($where);
        }

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
