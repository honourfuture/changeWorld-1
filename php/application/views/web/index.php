<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>罗马市场</title>
<style type="text/css">
	.join .main ul li{border: none !important;padding: 0px !important;margin-bottom: 37px !important;background: none !important;}
	.join .main ul li span{font-size: 24px;}
	.join .main ul li span font{color:red;}
	.join .main ul li p{line-height: 18px !important;height: 18px !important; padding-bottom: 5px !important;padding-left: 28px !important;}
	.service .main ul li{padding: 15px !important;}
	.service .main ul li span{line-height: 22px;height: 22px;font-size: 14px;margin: 5px;overflow: hidden;}
</style>
<link rel="stylesheet" href="assets/<?php echo $tpl;?>/css/style.css?v=201901" />
</head>

<body>
<!-- HEAD -->
<div class="Head">
	<div class="main">
    	<a class="logo" href=""></a>
        <span class="nav">
			<ul>
				<li><a class="active" href="#section1">首页</a></li>
				<li><a class="" href="#section2">企业文化</a></li>
				<li><a class="" href="#section3">最新动态</a></li>
                <li><a class="" href="/shop" target="_blank">主播登录</a></li>
			</ul>
		</span>
    </div>
</div>

<div class="banner" id="section1" style="background:url(assets/<?php echo $tpl;?>/images/banner.jpg) center no-repeat;">
	<span class="banner_text" style="background:url('');">
		<em style="position: absolute;top: 0px;left: 25%;font-size: 48px;color: #FFFF;">让世界免费</em>
		<em style="position: absolute;top: 64px;left: 22%;font-size: 34px;color: #FFFF;">Let the world free</em>
    	<a href="https://itunes.apple.com/cn/app/%E7%8C%AA%E4%B9%B0%E5%8D%95/id1365334362?mt=8" target="_blank">iPhone下载</a>
    	<a href="/uploads/2_1.0.1_20180905_legu_signed_zipalign.apk" target="_blank">Andrond下载</a>
    </span>
</div>

<div class="join" id="section2" style="background:url(assets/<?php echo $tpl;?>/images/Culture.png) center no-repeat;">
    <div class="main">
        <span class="title">企业文化<i></i><em>Culture Culture</em></span>
        <div style="width: 50%;float: left;padding-left: 10%;">
	        <ul>
	            <li>
	                <span>
	                    <font>★</font> <strong>终极愿景：</strong>成为对人类最有贡献的企业
	                </span>
	            </li>
	            <li>
	                <span>
	                    <font>★</font> <strong>终极使命：</strong>惠及全人类
	                </span>
	            </li>
	            <li>
	                <span>
	                    <font>★</font> <strong>管理理念：</strong>为更多人提供舞台
	                </span>
	            </li>
	        </ul>
        </div>
        <div style="width: 40%;float: left;">
	        <ul>
	            <li>
	                <span>
	                    <font>★</font> <strong>价 值 观：</strong>利他
	                </span>
		            <p>利用户,用户利益最大化！</p>
		            <p>利商家,商家利益最大化！</p>
		            <p>利员工,员工利益最大化！</p>
		            <p>利股东,股东利益最大化！</p>
		            <p>利民族,民族利益最大化！</p>
		            <p>利国家,国家利益最大化！</p>
	            </li>
	        </ul>
        </div>
    </div>
</div>

<div class="service" id="section3">
	<div class="main">
    	<span class="title">最新动态<i></i><em>Lastest News</em></span>
        <ul>
        	<?php if($goods){ ?>
        		<?php foreach ($goods as $key => $value) { ?>
        			<li>
        				<a href="<?php echo $value['link'];?>" target="_blank">
        					<img src="<?php echo $value['image'];?>">
        					<span><?php echo $value['title'];?></span>
	        			</a>
	        		</li>
        		<?php } ?>
        	<?php } ?>
        </ul>
    </div>
</div>

<!-- FOOTER -->
<div class="footer">
	<div class="main">
    	<span class="temt">
            <p>公司名称：深圳万可为科学有限公司</p>
            <p>公司地址：深圳市前海深港合作区前湾一路1号A栋201室</p>
        </span>
        <span class="hone">
        	<i>联系我们</i>
            <em>luomashichang@foxmail.com</em>
        </span>
        <span class="wmau">Copyright ©<?php echo date("Y");?> 深圳万可为科学有限公司 版权所有. All Rights reserved. 粤ICP备18098055号-1</span>
    </div>
</div>

<script src="assets/<?php echo $tpl;?>/js/jquery-1.11.0.min.js"></script>
<script src="assets/<?php echo $tpl;?>/js/jquery.navScroll.js"></script>
<script>
$(document).ready(function(){
    $('.nav').navScroll({
    	mobileDropdown: true,
        mobileBreakpoint: 0,
        scrollSpy: true
    });

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
