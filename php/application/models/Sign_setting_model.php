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

    public function getAllByWhere($where){
        return $this->get_many_by($where);
    }

    public function getInfoByDays($continue){
        $days = [
            $continue,
            'max_limit'
        ];
        //1 经验 2 积分
        $where = [
            'days'=>$days,
            'type'=>2
        ];
        $result =  $this->get_many_by($where);
        $day_limits = 0 ;
        $days = 0 ;
        foreach ($result as $key=>$value){
            if($value["days"] == $continue){
                $days = $value['value'];
            }
            if($value['days'] == 'max_limit'){
                $day_limits = $value['value'];
            }
        }
        //有设置天数了返回相应的天数 否则返回最大的
        if($days != 0){
            return $days;
        }
        return $day_limits ;
    }

}
