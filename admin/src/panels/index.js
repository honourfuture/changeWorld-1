/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:40:02 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:40:43
 * 面板组件，脚本生成面板文件时，自动修改，无需手动维护
 */

import Analysis from './Analysis';
import Login from './Login';
import Exception403 from './Exception/403';
import Exception404 from './Exception/404';
import Exception500 from './Exception/500';
import ShopNavList from './ShopNavList';
import AdManager from './AdManager';
import AdPosition from './AdPosition';
import GoodsProperty from './GoodsProperty';
import MemberEncrypted from './MemberEncrypted';
import ArticleList from './ArticleList';
import ArticleCategory from './ArticleCategory';
export const panelsList =  [
    {
        path:'/article/ArticleCategory',
        component:ArticleCategory,
        title:'文章分类',
    },
    {
        path:'/article/ArticleList',
        component:ArticleList,
        title:'文章列表',
    },
    {
        path:'/member/MemberEncrypted',
        component:MemberEncrypted,
        title:'密保问题',
    },
    {
        path:'/shop/GoodsProperty',
        component:GoodsProperty,
        title:'商品属性',
    },
    {
        path:'/operation/AdPosition',
        component:AdPosition,
        title:'广告位管理',
    },
    {
        path:'/operation/AdManager',
        component:AdManager,
        title:'广告管理',
    },
    {
        path:'/shop/ShopNavList',
        component:ShopNavList,
        title:'导航',
    },
    {
        path:'/dashboard/analysis',
        component:Analysis,
        title:'分析',
    },
    {
        path:'/user/login',
        component:Login,
        title:'登录',
    },
    {
        path:'/exception/403',
        component:Exception403,
    },
    {
        path:'/exception/404',
        component:Exception404,
    },
    {
        path:'/exception/500',
        component:Exception500,
    }
]
export const getPanelName = (path)=>{
    const item = panelsList.find((item)=>item.path === path);
    const title = item?item.title:'';
    return title?`${title}-直播`:'直播';
}