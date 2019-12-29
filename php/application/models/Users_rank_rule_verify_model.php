<?php


class Users_rank_rule_verify_model extends MY_Model
{
    public $_table        = 'users_rank_rule_verify';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at');
    public $protected_attributes = array('id');


    public function getInfoByWhere($where){
        return $this->get_by($where);
    }
    
    public function getAllByWhere($where){
        return $this->get_many_by($where);
    }



}
