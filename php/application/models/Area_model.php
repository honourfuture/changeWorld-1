<?php
/*
 * 地址库
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Area_model extends MY_Model
{
    public $_table        = 'area';
    public $primary_key   = 'id';
    public $before_create = array();
    public $before_update = array('updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }

    public function get_city($city_id)
    {
        if(empty($city_id)){
            return '';
        }

        $one_city_key = $this->one_city_key();
        if(isset($one_city_key[$city_id])){
            $city = $one_city_key[$city_id];
        }else{
            if(! $area = $this->get($city_id)){
                $city = '';
            }else{
                $city = $area['name'] ? $area['name'] : $area['fullname'];
            }
        }

        return $city;
    }

    //1级市
    public function one_city()
    {
    	return [
    		//重庆市
    		500000 => ['id' => 500100, 'name' => '重庆', 'pid' => 500000, 'first_letter' => 'C', 'pinyin' => 'Chong Qing'],
    		//上海市
    		310000 => ['id' => 310100, 'name' => '上海', 'pid' => 310000, 'first_letter' => 'S', 'pinyin' => 'Shang Hai'],
    		//天津市
    		120000 => ['id' => 120100, 'name' => '天津', 'pid' => 120000, 'first_letter' => 'T', 'pinyin' => 'Tian Jin'],
    		//北京市
    		110000 => ['id' => 110100, 'name' => '北京', 'pid' => 110000, 'first_letter' => 'B', 'pinyin' => 'Bei Jing'],
    	];
    }

    public function one_city_key()
    {
    	$result = [];
    	$one_city = $this->one_city();
    	foreach($one_city as $item){
    		$result[$item['id']] = $item['name'];
    	}

    	return $result;
    }
}
