<?php
/*
 * 会员阅读表
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Users_read_model extends MY_Model
{
    public $_table        = 'users_read';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at', 'updated_valid');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function initType()
    {
        return array(
            1 => '站内信'
        );
    }

    public function save($user_id, $type, $id)
    {
        if($user_id && $type && $id){
            $where = array('user_id' => $user_id, 'type' => $type);
            $info = $this->get_by($where);
            if($info){
                if(strpos($info['ids'], ','.$id.',') === false){
                    return $this->update($info['id'], array('ids' => $info['ids'].$id.','));
                }else{
                    return true;
                }
            }else{
                $where['ids'] = ','.$id.',';
                return $this->insert($where);
            }
        }

        return false;
    }
}
