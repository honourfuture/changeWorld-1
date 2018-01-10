<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author sz.ljx
 * @author webljx@163.com
 * @link www.aicode.org.cn
 */
class Users extends WAP_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	// 列表
	public function index()
	{
		$this->load->model('Admin_model');
		$count = $this->Admin_model->count_by();
		$ret = $this->Admin_model->get_many_by();
		$this->ajaxReturn()
	}

	// 查看
	public function view()
	{

	}

	// 编辑 OR 新增
	public function save()
	{

	}
}
