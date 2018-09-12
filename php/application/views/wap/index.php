<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!doctype html>
<html lang="zh-cmn-Hans">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>首页</title>
<link rel="stylesheet" href="assets/<?php echo $tpl;?>/css/style.css" />
<script src="assets/<?php echo $tpl;?>/js/remsize.js"></script>
</head>

<body>
<!-- HEAD -->
<div class="Head">
	<a class="home1" href="">首页</a>
    <span class="logo"><img src="assets/<?php echo $tpl;?>/images/logo.png"></span>
    <!-- 菜单 -->
    <section class="nav">
		<a class="menu" href="JavaScript:void('0')">菜单</a>
        <span>
			<a href="新闻中心.html">新闻中心</a>
			<a class="active" href="关于我们.html">关于我们</a>
			<!-- <a href="申请入驻.html">申请入驻</a>
			<a href="加入我们.html">加入我们</a> -->
        	<i></i>
		</span>
	</section>
</div>

<div class="banner"><img src="assets/<?php echo $tpl;?>/images/banner.png"></div>
<div class="load_app">
	<h2>手机之家一款最懂手机的APP</h2>
    <p>
        <i>竞拍</i>
        <i>求购</i>
        <i>达人视频</i>
        <i>查询</i>
    </p>
</div>
<span class="load_button">
	<a class="a1" href="">iPhone版下载</a>
    <a class="a2" href="">Andrond版下载</a>
</span>

<!-- FOOTER -->
<section class="footer">
	<div class="footer_top">
        <span>客服热线：075-88888888</span>
        <p>公司名称: 深圳时创志信科技有限公司</p>
        <p>公司地址: 广东省深圳市罗湖区田贝四路85号广发大厦2层</p>
	</div>
    <div class="footer_bottom">
    	<p>深圳时创志信科技有限公司 © 版权所有</p>
    </div>
</section>

<script src="assets/<?php echo $tpl;?>/js/jquery-1.11.0.min.js"></script>
<script>
$('.nav a.menu').click(function() {
	if ($('.nav').hasClass('wax')) {
		$('.nav').removeClass('wax');
	} else {
		$('.nav').addClass('wax');
	}
});
$(document).ready(function(){
	var navHeight= $(".Head").offset().top;
	var navFix=$(".Head");
	$(window).scroll(function(){
		if($(this).scrollTop()>navHeight){
			navFix.addClass("navFix");
		}else{
			navFix.removeClass("navFix");
		}
	})
});
</script>
</body>
</html>
