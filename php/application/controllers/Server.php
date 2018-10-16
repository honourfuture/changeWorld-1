<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Server extends Web_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->load->model('Article_model');
    }

	public function privacy()
	{
		$data = [];

		$alias = 'privacy_policy';
		$this->db->select('id,updated_at,title,content');
		$data['article'] = $this->Article_model->get_by('alias', $alias);

		$this->load->view($this->tpl(), $data);
	}
}
