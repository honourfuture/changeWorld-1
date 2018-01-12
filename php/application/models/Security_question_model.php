<?php
/*
 * 密保问题
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */

class Security_question_model extends MY_Model
{
    public $_table        = 'security_question';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $before_update = array('updated_at', 'updated_valid');
    public $protected_attributes = array('id');

    public function __construct()
    {
        parent::__construct();
    }
}
