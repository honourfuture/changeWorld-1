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

# mysql
CREATE TABLE `admin` (
  `id` mediumint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键自增ID',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除 1是 0否',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态 0初始化 其他',
  `enable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '启用 1是 0否',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
