<?php
/*
 * 会员用户
 * @author sz.ljx
 * @link www.aicode.org.cn
 */

class Users_model extends MY_Model
{
    public $_table        = 'users';
    public $primary_key   = 'id';
    public $before_create = array('created_at', 'updated_at');
    public $protected_attributes = array('id');

    public $validate = array(
        array('field' => 'email',
            'label'       => 'email',
            'rules'       => 'required|valid_email|is_unique[users.email]'),
        array('field' => 'password',
            'label'       => 'password',
            'rules'       => 'required'),
        array('field' => 'password_confirmation',
            'label'       => 'confirm password',
            'rules'       => 'required|matches[password]'),
    );

    public function __construct()
    {
        parent::__construct();
    }
}
