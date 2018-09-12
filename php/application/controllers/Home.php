<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends Web_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->tpl = 'web';
    }

    public function index()
    {
        $data = [];

        $this->load->model('Website_goods_model');
        $order_by = [
            'sort' => 'desc',
            'id' => 'desc'
        ];
        $where = ['enable' => 1];
        $data['goods'] = $this->Website_goods_model->order_by($order_by)->limit(15)->get_many_by($where);

        $data['tpl'] = $this->tpl;
        $this->load->view($this->tpl.'/'.$this->router->method, $data);
    }
}
