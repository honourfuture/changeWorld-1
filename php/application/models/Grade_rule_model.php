<?php
/*
 * 等级经验规则
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Grade_rule_model extends MY_Model
{
    public $_table        = 'grade_rule';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function init()
    {
    	return array(
    		'grade_login' => '会员登录',
    		'grade_evaluate' => '会员评论',
    		'grade_pay' => '消费',
    		'grade_order' => '订单上限',
            'gift' => '送礼物',
            'live' => '开直播',
            'live_view' => '听直播',
            'audio' => '听音频',
            'buyer' => '买东西',
            'sign_in' => '签到'
    	);
    }

    public function exp($type, $value = 1)
    {
        switch ($type) {
            case 'gift'://送礼 1金币=1经验
                $exp = 1 * $value;
                break;
            case 'live'://开播 1分钟=1经验
                $exp = 1 * $value;
                break;
            case 'live_view'://听播 1分钟=1经验
                $exp = 1 * $value;
                break;
            case 'audio'://听音频 1分钟=1经验
                $exp = 1 * $value;
                break;
            case 'buyer'://消费 1元=1经验
                $exp = 1 * $value;
                break;
            case 'sign_in'://消费 1元=1经验
                $exp = $value;
                break;
            default:
                $exp = 0;
                break;
        }

        return $exp;
    }

    public function add($user_id, $type, $value = 1)
    {
        if($exp = $this->exp($type, $value)){
            $this->load->model('Users_grade_model');
            $data = [
                'user_id' => $user_id,
                'value' => $exp,
                'rule_name' => $type
            ];
            $this->Users_grade_model->insert($data);

            $this->load->model('Users_model');
            $this->db->set('exp', 'exp +'.$exp, false);
            $this->db->where('id', $user_id);
            $this->db->update($this->Users_model->table());
        }
    }
}
