<?php
defined('BASEPATH') or exit('No direct script access allowed');

$config['unLogin'] = [//控制器=>方法
	// 'api/admin/login_out' => ['*'],
	'api/admin/login' => ['*'],

	'api/user/login' => ['*'],
	'api/user/register' => ['*'],
	'api/user/cart' => ['count'],
	'api/user/info' => ['onoff'],

	'api/share' => ['*'],
	'api/common' => ['*'],
	'api/forget' => ['*'],
	'api/normal' => ['*'],
	'api/notify' => ['*'],
	'api/knowledge' => ['live', 'album', 'collection'],
	'api/shop' => ['*'],
	'api/goods_class' => ['index'],
	'api/mailbox' => ['reddot'],
	'api/album_class' => ['index'],
	'api/search' => ['*'],
	'api/activity' => ['*'],
	'api/activity_class' => ['index'],
	'api/activity_enter' => ['details'],
	'api/goods' => ['index', 'view', 'evaluate'],
	'api/address' => ['index'],
	'api/article' => ['page_view'],
	// h5分享
	'api/audio' => ['play'],
	'api/album' => ['view'],
];