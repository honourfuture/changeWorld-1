<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_out extends Admin_Controller {

	public function index()
	{
		$this->log($this->admin_id, $this->account, '退出');
		$this->ajaxReturn('');
	}
}
