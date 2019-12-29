<?php


class Sign_setting_model extends MY_Model
{
    public $_table        = 'sign_setting';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at');
    public $protected_attributes = array('id');


    public function getAll($type){
        $where = ['type'=>$type];
        return $this->get_many_by($where);
    }

    public function getInfoByWhere($where){
        return $this->get_by($where);
    }

}
