/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:40:02 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-10 23:22:03
 * 面板组件，脚本生成面板文件时，自动修改，无需手动维护
 */

import ShopIndex from './ShopIndex';
import PayState from './PayState';
import Pay from './Pay';
import GoodDetail from './GoodDetail';
export const panelsList =  [
    {
        path:'/ShopIndex',
        component:ShopIndex,
        title:'商城',
    },
    {
        path:'/Pay',
        component:Pay,
        title:'支付',
    },
    {
        path:'/PayState',
        component:PayState,
        title:'支付结果',
    },
    {
        path:'/GoodDetail',
        component:GoodDetail,
        title:'商品详情',
    }
];
export const getPanelName = (path)=>{
    const item = panelsList.find((item)=>item.path === path);
    const title = item?item.title:'';
    return title;
}