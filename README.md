|-根目录
  admin-AntDesign后台开发目录
    打包输出到php/admin
  app-移动APP(Android+IOS)开发目录
    打包输出到docs/APP
  docs-项目文档
    APP：移动APP安装包输出目录
    BUG：问题反馈存档目录
    Demand：需求存档目录
    SQL：数据库备份存档目录
    UI：原型UI存档目录
  php-php开发目录
    admin：项目后台输出目录
    assets：资源目录
    captcha：验证码输出目录
    html：PC网站前端静态页面
    uploads：项目上传资源存档目录
    wap：移动浏览器打包输出目录
  wap-移动浏览器(微信、H5)开发目录

# 订单状态、操作权限
买家
  全部
    各状态合集
  待付款
    取消、付款、联系商家
  待发货
    提醒发货、退款/退货、联系商家
  待收货
    退款/退货、查看物流、确认收货、联系商家
  待评价
    退款/退货、评价、联系商家
  已完成（已完成》已结束-过售后期）
    已完成：申请发票、退款/退货，已结束：无操作
  退款/退货
    无操作


卖家
  全部
    各状态合集
  待付款
    修改价格、联系顾客
  待发货
    发货、联系顾客
  待收货
    查看物流、联系顾客
  待评价
    联系顾客
  已完成（已完成》已结束-过售后期）
    无操作
  退款/退货
    已完成（线下处理）

# mysql
CREATE TABLE `live_gift` (
  `id` mediumint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增ID',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除 1是 0否',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态 0初始化 其他',
  `enable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用 1是 0否',
  `sort` mediumint(5) unsigned NOT NULL DEFAULT '0' COMMENT '排序 降序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4


# 文件名规范
Live_我的直播
Partner_分销设置
Shop_我的商城
Wallet_我的钱包

# 开发者
[-] 微信  账号 zhumaidan@qq.com  密码 yangguang521
商户号：操作密码：FS4lEnzJ5Xzi@
支付宝  账号 zhumaidan@qq.com  密码 Yangguang521..  支付密码：yangguang521
# QQ（密码不正确）     账号：zhumaidan@qq.com  密码  yangguang521
腾讯云  zhumaidan@qq.com  yangguang521..
融云 85280592@qq.com yangguang521
微博账号： 13826515015，yangguang521
QQ开发者平台：2898264786 ，Yangguang521
快递接口 （快递100）
  平台账号：13923771616  密码：Yangguang521
  系统账号：zmd13923771616 密码：Yangguang521
极光推送   zhumaidanAPP   Yangguang521

# 开放平台应用申请资料
名称：猪买单
简介：猪买单，一个做购物推广的音频直播平台

# 应用平台
> ios
> Bundle ID：com.yipingaudio.audioLive
> 测试版本Bundle ID：com.yipingaudio.audioLive

> Android
>  签名：1f7cc7ff235c9bfe363e1ab9497f3fa9
>  包名：trilateral.com.mowtogether