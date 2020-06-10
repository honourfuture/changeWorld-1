<?php


class Rank_rule_model extends MY_Model
{
    public $_table        = 'rank_rule';
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

    public function getNextRankRule($exp, $current_rank_id){
        $sql = "SELECT * FROM `rank_rule` where `exp`<={$exp} order by exp DESC LIMIT 1;";
        $record = $this->db->query($sql)->row_array();
        return $record;
        /**
        $result = $this->get_by(['id'=>$current_rank_id+1]) ;
        if($exp > $result['exp']){
            return $result;
        }
        return [];
        */
    }


}
