<?php
/*
 * 收益
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */
use JPush\Client;

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
     * 计算可提现余额
     */
    public function getWithrawAvailable($userId)
    {

    	$this->load->model('Withdraw_model');
    	$this->load->model('Users_model');
    	$user = $this->Users_model->get($userId);
    	$valIncomeSum = $this->getIncomeSum($user['id'], $user['created_at']);//累计收益
    	$valWithrawed = $this->Withdraw_model->getWithdrawed($userId);//已提现金额
    	$inclomeAvailable = $valIncomeSum - $valWithrawed;
    	$inclomeAvailable = ($inclomeAvailable>=0 ? $inclomeAvailable : 0);
    	return $inclomeAvailable;
    }
    
    /**
     * 计算总收益
     */
    public function getIncomeSum($user_id, $created_at, $type=0, $where=[])
    {
        $created_at = empty($created_at) ? date('Y-m-d H:i:s', 0) : $created_at;
        $where['created_at >= '] = $created_at;
        if( IS_PROD ){
            $where['created_at <= '] = date('Y-m-d 23:59:59', strtotime("-1 sunday"));
        }
        else{
            $where['created_at <= '] = date('Y-m-d H:i:s', time() - 300);//测试时取到五分钟前的所有收益
        }

        $arrIncomes = $this->sum_income_topic_group($user_id, $type, $where);
        return array_sum( array_values( $arrIncomes ) );
    }

    /**
     * 取得用户累计收益
     * @param $arrUserIds
     */
    public function getUserTotalIncome($arrUserIds)
    {
        $arrUserIncome = [];
        if( empty($arrUserIds) ){
            return $arrUserIncome;
        }
        $sql = "SELECT SUM(amount) AS amount, user_id FROM income WHERE user_id IN(". implode(',', $arrUserIds) .") GROUP BY user_id";
        $cursor = $this->db->query($sql)->result_array();
        foreach ($cursor as $k=>$v){
            $arrUserIncome[$v['user_id']] = $v['amount'];
        }
        $arrAddon = array_diff($arrUserIds, array_keys($arrUserIncome));
        foreach ($arrAddon as $k=>$v){
            $arrUserIncome[$v] = 0.00;
        }
        return $arrUserIncome;
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
        $queryFields = [];
        foreach ($arrFields as $field){
            $queryFields[] = (strstr($field, '.') === false ? 'income.' . $field : $field);
        }
        array_push($queryFields, 'users.nickname, users.mobi as mobile, goods.id as goods_id, goods.name as goods_name, goods.default_image as goods_image');
        $fields = implode(',', $queryFields);

        $arrWhere = [];
        foreach ($where as $field => $value){
            $arrWhere[] = (strstr($field, ' ') === false ? "income.{$field} = '{$value}'" : "income.{$field} '{$value}'");
        }
        $where = implode(' AND ', $arrWhere);

        $arrOrders = explode(',', $order);
        $orderFields = [];
        foreach ($arrOrders as $orderField){
            $orderFields[] = "income." . $orderField;
        }
        $orders = implode(',', $orderFields);

        $sql = "SELECT {$fields} FROM {$this->table()} LEFT JOIN users ON income.from_id = users.id LEFT JOIN goods ON goods.id = income.item_id WHERE {$where} ORDER BY {$orders} LIMIT {$offset}, {$per_page} ";
        $query=$this->db->query($sql);
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

    /**
     * 作废
     */
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


    /**
     * 超过最大分配佣金,除自购者外其他人按比例重新分析
     */
    private function _rePrice($arrPriceList, $maxPrice, $sumPrice)
    {
        foreach ($arrPriceList as $userId => $price){
            $arrPriceList[$userId] = $price / $sumPrice * $maxPrice;
        }
        return $arrPriceList;
    }
    
    private function _setBalance($uid, $balance, $increase=1)
    {
        $balance = round($balance , 2);
        $operate = $increase == 1 ? '+' : '-';
        $this->db->set('balance', "balance {$operate} {$balance}", false);
        $this->db->where('id', $uid);
        $this->db->update($this->Users_model->table());
    }

    public function getIncomeRate()
    {
        return $this->_initIncomeRate();
    }
    
    private function _initIncomeRate()
    {
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
        return [
            'selfPercent' => $selfPercent,
            'underPercent' => $underPercent,
            'branch' => $branch,
            'branchEq' => $branchEq,
        ];
    }
    
    /**
     * 佣金计算
     */
    public function income($orderInfo)
    {
        $arrIncomeRates = $this->_initIncomeRate();
        //自购比例
        $selfPercent = $arrIncomeRates['selfPercent'];
        //直属比例
        $underPercent = $arrIncomeRates['underPercent'];
        //下属佣金提成比例(大于)
        $branch = $arrIncomeRates['branch'];
        //下属佣金提成比例(等于)
        $branchEq = $arrIncomeRates['branchEq'];

        $this->load->model('Users_model');
        $this->load->model('Order_model');
        $this->load->model('Order_items_model');
        $this->load->model('Config_model');
        
        $insert = [];
        $arrUsers = [];
        $order_id = $orderInfo['id'];
        //当前用户
        $buyer_uid = $orderInfo['buyer_uid'];
        $userBuyer = $this->Users_model->get_by('id', $buyer_uid);
        //分销用户树
        $levelUsers = $this->Users_model->parent($userBuyer['pid'], [$userBuyer]);
        //卖家用户
        $seller_uid = $orderInfo['seller_uid'];
        $userSeller = $this->Users_model->get_by('id', $seller_uid);
        //快递费合计
        $query = $this->db->query("SELECT SUM(freight_fee) AS freight_fee FROM order_items WHERE order_sn='{$orderInfo['order_sn']}'");
        $row = $query->row_array();
        $freight_fee = $row['freight_fee'];
        //订单实付金额(不含快递费)
        $orderTotalAmount = $orderInfo['real_total_amount'] - $freight_fee;
        //平台提成
        $configCommissioin = $this->Config_model->get_by(['name' => 'distribution_commission']);
        $platformPrice = round($orderTotalAmount * $configCommissioin['value'] / 100, 2);
        //商家实际收入
        $sellerIncome = $orderInfo['real_total_amount'] - $platformPrice;
        //每收益的积分/经验
        $ruleIncomeToPoint = $this->db->query("SELECT * FROM `points_rule` WHERE `name`='per_income'")->row_array();
        $ruleIncomeToExp = $this->db->query("SELECT * FROM `grade_rule` WHERE `name`='per_income'")->row_array();
        //用户累计分佣
        $commissionUsers = 0;
        $orderItems = $this->Order_items_model->getOrderItems($order_id);
        foreach ($orderItems as $item){
            if( $item['base_percent']<=0 ){
                continue;
            }
            $user = $this->Users_model->get_by('id', $item['buyer_uid']);
            if( !$user ){//商家及买家都不获得收益
                $this->Order_items_model->update($item['id'], ['is_income' => 2]);
                return false;
            }
            if( !$user['pid'] ){//没有pid不参与分销
                $this->Order_items_model->update($item['id'], ['is_income' => 3]);
                continue;
            }
        
            $levelIds = [];
            $arrPriceList = [];
            foreach ($levelUsers as $k => $levelUser){
                $arrUsers[$levelUser['id']] = $levelUser;
                $addPrice = 0;
                if($levelUser['id'] == $user['id']){//自购佣金
                    $addPrice = isset($selfPercent[$levelUser['rank_rule_id']]) ? $selfPercent[$levelUser['rank_rule_id']] * $item['goods_price'] * $item['num'] * $item['base_percent'] / 100 : 0;
                }else if($levelUser['id'] == $user['pid']){//直属
                    if( $levelUser['rank_rule_id'] >= $user['rank_rule_id'] ){
                        $addPrice = isset($underPercent[$levelUser['rank_rule_id']]) ? $underPercent[$levelUser['rank_rule_id']] * $item['goods_price'] * $item['num'] * $item['base_percent'] / 100: 0;
                    }
                }else{
                    $maxLevelId = max($levelIds);
                    if($maxLevelId > $levelUser['rank_rule_id']){
                        continue;
                    }else if($maxLevelId == $levelUser['rank_rule_id']){
                        $addPrice = isset($branchEq[$levelUser['rank_rule_id']]) ? $branchEq[$levelUser['rank_rule_id']] * $item['goods_price'] * $item['num'] * $item['base_percent'] / 100 : 0;
                    }else{
                        $addPrice = isset($branch[$levelUser['rank_rule_id']]) ? $branch[$levelUser['rank_rule_id']] * $item['goods_price'] * $item['num'] * $item['base_percent'] / 100 : 0;
                    }
                }
                $addPrice = round($addPrice, 2);
                if($addPrice>0){
                    $arrPriceList[$levelUser['id']] = $addPrice;
                }
                $levelIds[] = $levelUser['rank_rule_id'];
            }
            $sumPrice = array_sum($arrPriceList);
            //当前商品所支付的平台佣金
            $_platformPrice = $platformPrice * ($item['goods_price'] * $item['num'] / ($orderInfo['real_total_amount']-$freight_fee));
            //平台收入
            $this->setPlatformIncome($orderInfo, $item, $_platformPrice);
            $maxPrice = $item['rebate_percent'] / 100 * $item['goods_price'] * $item['num'] - $_platformPrice;//扣除服务费后可分佣金额
            if($sumPrice > $maxPrice){//超过可分佣最大值，除自购者外，其他人重新分析
                $buyerPrice = $arrPriceList[$user['id']];
                unset($arrPriceList[$user['id']]);
                $_maxPrice = $maxPrice - $buyerPrice;
                $_sumPrice = array_sum($arrPriceList);
                $arrPriceList = $this->_rePrice($arrPriceList, $_maxPrice, $_sumPrice);
                $arrPriceList[$user['id']] = $buyerPrice;
            }
            $sumPrice = array_sum($arrPriceList);
            $sellerIncome -= $sumPrice;
            

            $setting = config_item('push');
            $client = new Client($setting['app_key'], $setting['master_secret'], $setting['log_file']);
            
            
            foreach ($arrPriceList as $userId=>$price){

                $userInfo = $this->Users_model->get($userId);
                $cid = $userInfo['device_uuid'];
                $result = $client->push()
                            ->setPlatform('all')
                            ->addRegistrationId($cid)
                            ->setNotificationAlert($userInfo['nickname']."，您的佣金{$price}已经到到账，请注意查收")
                            ->send();
                
                $this->_setBalance($arrUsers[$userId]['id'], $price);
                $insert[] = [
                    'topic' => 2,
                    'sub_topic' => 0,
                    'user_id' => $arrUsers[$userId]['id'],
                    'name' => $arrUsers[$userId]['nickname'],
                    'mobi' => $arrUsers[$userId]['mobi'],
                    'amount' => $price,
                    'type' => 2,
                    'item_id' => isset($item['id']) ? $item['id'] : 0,
                    'item_title' => isset($item['title']) ? $item['title'] : '',
                    'item' => json_encode([$item], JSON_UNESCAPED_UNICODE),
                    'level' => count($levelIds),
                    'shop_id' => $item['seller_uid'],
                    'from_id' => $user['id'],
                    'order_id' => $orderInfo['id'],
                    'point' => floor($price * (empty($ruleIncomeToPoint) ? 50 : $ruleIncomeToPoint['value'])),
                    'exp' => floor($price * (empty($ruleIncomeToExp) ? 5 : $ruleIncomeToExp['value'])),
                ];
            }
            if($insert){
                $this->insert_many($insert);
            }
            $this->Order_items_model->update($item['id'], ['is_income' => 1]);
            $commissionUsers += (array_sum($arrPriceList));
        }
        $ruleDollarToPoint = $this->db->query("SELECT * FROM `points_rule` WHERE `name`='per_dollar'")->row_array();
        $ruleDollarToExp = $this->db->query("SELECT * FROM `grade_rule` WHERE `name`='per_dollar'")->row_array();
        //商家收入(商家卖商品，不计经验及积分)
        $arrSeller = $this->setSellerIncome($orderInfo, $userSeller, $userBuyer, $sellerIncome, $orderItems, $ruleIncomeToPoint, $ruleIncomeToExp);
        //买家消费产生的积分及经验
        $point = floor($orderInfo['real_total_amount'] * (empty($ruleDollarToPoint) ? 100 : $ruleDollarToPoint['value']));
        $exp = floor($orderInfo['real_total_amount'] * (empty($ruleDollarToExp) ? 10 : $ruleDollarToExp['value']));

        $sql = "UPDATE `{$this->Order_model->table()}` SET commission={$platformPrice}, commission_users={$commissionUsers}, seller_income={$arrSeller['amount']}, seller_exp={$arrSeller['exp']}, seller_point={$arrSeller['point']}, freight_fee = {$freight_fee}, point={$point}, exp={$exp} WHERE id={$orderInfo['id']}";
        $this->db->query($sql);
        /**
         * 商家卖商品，不计经验及积分
         */
        /**
        if( isset($arrPriceList[$seller_uid]) ){
            $arrPriceList[$seller_uid] += $orderTotalAmount;
        }
        else{
            $arrPriceList[$seller_uid] = $orderTotalAmount;
        }
        */
        return $arrPriceList;
    }

    /**
     * 记录平台收入
     * @param $orderInfo
     * @param $orderItemInfo
     * @param $platformIncome
     */
    public function setPlatformIncome($orderInfo, $orderItemInfo, $platformIncome)
    {
        if( empty($platformIncome) ){
            return false;
        }
        $this->load->model('Config_model');
        $this->load->model('Income_platform_model');
        if($this->Config_model->get_by(['name' => 'commission'])){
            $sql = "UPDATE {$this->Config_model->table()} SET `value` = `value` + {$platformIncome} WHERE `name`='commission';";
            $this->db->query($sql);
        }else{
            $this->Config_model->insert(['name' => 'commission', 'value' => $platformIncome, 'remark' => '平台提成']);
        }
        $item = [
            'amount' => $platformIncome,
            'from_id' => $orderInfo['buyer_uid'],
            'order_id' => $orderInfo['id'],
            'item_id' => $orderItemInfo['id'],
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];
        $this->Income_platform_model->insert($item);
    }

    /**
     * 商家收入
     */
    public function setSellerIncome($orderInfo, $sellerInfo, $buyerInfo, $amount, $orderItems, $ruleIncomeToPoint, $ruleIncomeToExp)
    {
        $item = [
            'topic' => 2,
            'sub_topic' => 0,
            'user_id' => $sellerInfo['id'],
            'name' => $sellerInfo['nickname'],
            'mobi' => $sellerInfo['mobi'],
            'amount' => $amount,
            'type' => 0,
            'item' => json_encode($orderItems, JSON_UNESCAPED_UNICODE),
            'shop_id' => $sellerInfo['id'],
            'from_id' => $buyerInfo['id'],
            'order_id' => $orderInfo['id'],
            'point' => 0,//floor($amount * (empty($ruleIncomeToPoint) ? 50 : $ruleIncomeToPoint['value'])),
            'exp' => 0,//floor($amount * (empty($ruleIncomeToExp) ? 5 : $ruleIncomeToExp['value'])),
        ];
        $this->insert($item);
        return ['amount'=>$amount, 'exp'=>$item['exp'], 'point'=>$item['point']];
    }
    
    //商品销售收益
    /**
     * 业务废弃不再使用
     */
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

    /**
     * 收益明细
     * @param $topic
     * @param $userId
     */
    public function getIncomeList($topic, $userId, $offset=1, $pagesize=10, $startDate=false, $endDate=false)
    {
        $ret = ['total'=>['amount'=>0], 'count'=>0, 'list'=>[]];
        if( empty($userId) ){
            return $ret;
        }
        $where['user_id'] = $userId;
        if($topic == 2){
            $where['amount >'] = 0;
            $field = 'id,updated_at,sub_topic,name,mobi,amount,gold,item,item_id, item_title, level,user_id,shop_id,from_id';
        }else{
            $where['service_amount >'] = 0;
            $field = 'id,updated_at,sub_topic,name,mobi,service_amount as amount,gold,item,item_id, item_title, level,user_id,shop_id,from_id';
        }
        if($startDate && $endDate){
            $startDate = date('Y-m-d 00:00:00', strtotime($startDate));
            $endDate = date('Y-m-d 23:59:59', strtotime($endDate));
            $where['created_at >= '] = $startDate;
            $where['created_at <= '] = $endDate;
        }

        //统计
        $ret['total'] = ['member' => 0, 'amount' => 0];

        $this->db->group_by('user_id');
        $where_count = $where;
        $ret['total']['member'] = $this->count_by($where_count);

        if($topic == 2){
            $this->db->select('sum(amount) amount');
            $result = $this->get_by($where_count);
            $ret['total']['amount'] = $result['amount'] ? $result['amount'] : 0;
        }
        else{
            $this->db->select('sum(service_amount) service_amount');
            $result = $this->get_by($where_count);
            $ret['total']['amount'] = $result['service_amount'] ? $result['service_amount'] : 0;
        }


        $ret['count'] = $this->count_by($where);
        //$order_by = array('id' => 'desc');
        //$this->db->select($field);
        //$list = $this->order_by($order_by)->limit($this->per_page, $this->offset)->get_many_by($where);
        $order_by = "id DESC";
        $list = $this->getIncomes($field, $where, $order_by, $pagesize, $offset);
        foreach($list as $key=>$item){
            $arrItems = json_decode($item['item'], TRUE);
            $item['lv_name'] = '';
            if( is_array($arrItems) && !empty($arrItems)){
                $key_first = current(array_keys($arrItems));
                if( !is_numeric($key_first) ){
                    $arrItems = [$arrItems];
                }
                $item['item'] = $arrItems;
            }
            else{
                $item['item'] = [];
            }

            $ret['list'][] = $item;
        }
        return $ret;
    }
}
