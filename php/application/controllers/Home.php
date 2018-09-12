<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->tpl = 'web';
    }

    public function index()
    {
        $data = [];

        $data['tpl'] = $this->tpl;
        $this->load->view($this->tpl.'/'.$this->router->method, $data);
    }
}
