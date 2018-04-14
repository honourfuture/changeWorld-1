<?php
defined('BASEPATH') or exit('No direct script access allowed');

$config['unLogin'] = [//控制器=>方法
	'login' => ['*'],
	'common' => ['*'],
	'register' => ['*'],
	'forget' => ['*'],
	'normal' => ['*'],
	'notify' => ['*'],
	'knowledge' => ['live', 'album'],
	'api/shop' => ['*'],
	'goods_class' => ['index'],
	'cart' => ['count'],
	'mailbox' => ['reddot']
];