<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * @author ruilongd
 * @email ruilongd@126.com
 * @link www.aicode.org.cn
 */
class Platform extends API_Controller {

    public function __construct()
    {
        parent::__construct();

        // $this->check_operation();
        $this->load->model('Platform_income_model');
    }

    /**
     * 平台收入流水
     */
    public function income()
    {

    }

    /**
     * 平台流水导出
     */
    public function export()
    {

    }
}
