<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>首页</title>
<style type="text/css">
	.join .main ul li{border: none !important;padding: 0px !important;}
	.join .main ul li span{font-size: 24px;}
	.join .main ul li span font{color:red;}
	.join .main ul li p{line-height: 18px !important;height: 18px !important; padding-bottom: 5px !important;padding-left: 28px !important;}
</style>
<link rel="stylesheet" href="assets/<?php echo $tpl;?>/css/style.css" />
</head>

<body>
<!-- HEAD -->
<div class="Head">
	<div class="main">
    	<a class="logo" href=""></a>
        <span class="nav">
			<ul>
				<li><a class="active" href="#section1">首页</a></li>
				<!-- <li><a class="" href="#section2">下载APP</a></li> -->
				<li><a class="" href="#section3">产品展示</a></li>
				<li><a class="" href="#section4">关于我们</a></li>
				<!-- <li><a class="" href="#section5">申请入驻</a></li>
                <li><a class="" href="#section6">加入我们</a></li> -->
			</ul>
		</span>
    </div>
</div>

<div class="banner" id="section1" style="background:url(assets/<?php echo $tpl;?>/images/banner.jpg) center no-repeat;">
	<span class="banner_text" style="background:url('');">
		<em style="position: absolute;top: 0px;font-size: 48px;color: #FFFF;">猪买单&middot;让世界免费！</em>
		<em style="position: absolute;top: 0px;font-size: 32px;top: 64px;color: #FFFF;">Let the world free &middot; pig pay</em>
    	<a href="">iPhone下载</a>
    	<a href="">Andrond下载</a>
    </span>
</div>

<div class="join" id="section">
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
<!-- <div class="load_app" id="section2">
	<div class="main">
    	<span class="app_title">
        	<em>手机之家一款最懂手机的APP</em>
        	<i>竞拍</i>
        	<i>求购</i>
        	<i>达人视频</i>
        	<i>查询</i>
        </span>
        <span class="erm">
        	<img src="assets/<?php echo $tpl;?>/images/wmm.jpg"/>
        	<em>iPhone下载</em>
        </span>
        <span class="erm">
        	<img src="assets/<?php echo $tpl;?>/images/wmm.jpg"/>
        	<em>Andrond下载</em>
        </span>
    </div>
</div> -->

<div class="service" id="section3">
	<div class="main">
    	<span class="title">名人推荐<i></i><em>Product Display</em></span>
        <ul>
        	<?php if($goods){ ?>
        		<?php foreach ($goods as $key => $value) { ?>
        			<li><a href="<?php echo $value['link'];?>" target="_blank">
        				<img src="<?php echo $value['image'];?>">
        			</a></li>
        		<?php } ?>
        	<?php } ?>
        </ul>
    </div>
</div>

<div class="about" id="section4">
	<div class="main">
    	<span class="title">关于我们<i></i><em>About Us</em></span>
        <span><img src="assets/<?php echo $tpl;?>/images/gy@img.png"></span>
        <div class="text">
        	<h2>【产品简介】</h2>
            <p>手机之家是一款完整的手机生态APP，基于垂直电商的概念平台内所有的消息及内容全部围绕手机展开，在这里你可以找到你最想要的手机类产品。平台通过与全国实体店合作能够完美的融合线上和线下的优势，更有批发和零售的结合能让用户体验到更实惠价格和购买体验。</p>
            <h2>【产品功能】</h2>

            <p><b>达人视频：</b>在这里你可以找到丰富的维修视频教学，手机的各种疑难杂症都可以在这里找到相应的处方和解答。</p>
            <p><b>需求厅：</b>如果当下你急缺一些手机或者手机配件在这里你能找到最优势的货源和最合理的报价，同时还能享受平台担保交易。</p>
            <p><b>附近买卖：</b>平台里面只要你打开附近就能搜索到周边的店铺，查看店铺的商品。如果你担心直接交易店家不给你保修，走平台将是你最好的打算。</p>
            <p><b>周边服务：</b>如果手机坏了怎么办？找不到合适的维修商家怎么办？找不到合理价格怎么办？现在有了手机之家，在周边服务里能找到周边最牛的师傅和最合理的价格，再也不用一家一家的去问了。</p>
            <p><b>免费开店：</b>每一位平台用户都能免费开店，自由交易。</p>
            <p>“手机之家”遵循家的理念，我们会不断开发和研究新的运营模式服务更多的客户，能让客户有更好的体验，在这里你能够找到满意的产品以及平台贴心的服务。</p>

            <h2>【友情提醒】</h2>
            <p>举例：邀请分享平台成功注册可以赠送积分参与抽奖有机会可得iphoneX等奖品 ！</p>

            <h2>【联系我们】</h2>
            <p>官方网站：http://www.sizjshop.com</p>
            <p>官方微博：手机之家shop</p>
            <p>投诉建议：17603026456@163.com</p>
        </div>
   	</div>
</div>

<!-- <div class="seller" id="section5">
    <div class="main">
        <span class="title">立即申请商家入驻</span>
        <dl>
            <dd>
                <em>您的真实姓名：</em>
                <input type="text">
            </dd>
            <dd>
                <em>您的电子邮件：</em>
                <input type="text">
            </dd>
            <dd>
                <em>您的手机号码：</em>
                <input type="text">
            </dd>
            <dd>
                <em>您的所在地址：</em>
                <input type="text">
            </dd>
            <dt>
                <em>其他需要告诉我们的事项：</em>
                <textarea></textarea>
            </dt>
        </dl>
        <a class="submit" href="">提交</a>
    </div>
</div> -->

<!-- <div class="join" id="section6">
    <div class="main">
        <span class="title">加入我们<i></i><em>Join Us</em></span>
        <ul>
            <li>
                <span class="time">
                    <i>市场运营经理（1-2名）</i>
                    <u>5K-15K</u>
                </span>
                <p>岗位职责：1.规划和落实线上线下营销推广活动，建立和提升平台品牌...</p>
                <a href="">查看职位详情</a>
            </li>
            <li>
                <span class="time">
                    <i>市场运营经理（1-2名）</i>
                    <u>5K-15K</u>
                </span>
                <p>岗位职责：1.规划和落实线上线下营销推广活动，建立和提升平台品牌...</p>
                <a href="">查看职位详情</a>
            </li>
            <li>
                <span class="time">
                    <i>市场运营经理（1-2名）</i>
                    <u>5K-15K</u>
                </span>
                <p>岗位职责：1.规划和落实线上线下营销推广活动，建立和提升平台品牌...</p>
                <a href="">查看职位详情</a>
            </li>
            <li>
                <span class="time">
                    <i>市场运营经理（1-2名）</i>
                    <u>5K-15K</u>
                </span>
                <p>岗位职责：1.规划和落实线上线下营销推广活动，建立和提升平台品牌...</p>
                <a href="">查看职位详情</a>
            </li>
            <li>
                <span class="time">
                    <i>市场运营经理（1-2名）</i>
                    <u>5K-15K</u>
                </span>
                <p>岗位职责：1.规划和落实线上线下营销推广活动，建立和提升平台品牌...</p>
                <a href="">查看职位详情</a>
            </li>
            <li>
                <span class="time">
                    <i>市场运营经理（1-2名）</i>
                    <u>5K-15K</u>
                </span>
                <p>岗位职责：1.规划和落实线上线下营销推广活动，建立和提升平台品牌...</p>
                <a href="">查看职位详情</a>
            </li>
        </ul>
    </div>
</div> -->

<!-- FOOTER -->
<div class="footer">
	<div class="main">
    	<span class="temt">
            <p>公司名称：深圳时创志信科技有限公司</p>
            <p>公司地址：深圳市深圳市深圳市深圳市深圳市深圳市深圳市</p>
        </span>
        <span class="hone">
        	<i>客服热线</i>
            <em>075-8888888</em>
        </span>
        <span class="wmau">Copyright ©2017 深圳时创志信科技有限公司 版权所有. All Rights reserved. 粤ICP备17001659号-1</span>
    </div>
</div>

<script src="assets/<?php echo $tpl;?>/js/jquery-1.11.0.min.js"></script>
<script src="assets/<?php echo $tpl;?>/js/jquery.navScroll.js"></script>
<script>
$('.nav').navScroll({
	mobileDropdown: true,
    mobileBreakpoint: 0,
    scrollSpy: true
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
