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
import NewAddress from './NewAddress';
import GoodsDetail from './GoodsDetail';
import SelectAddress from './SelectAddress';
import ShopCart from './ShopCart';
import AnchorStore from './AnchorStore';
import OrderDetail from './OrderDetail';
import ConfirmOrder from './ConfirmOrder';
import ExLog from './ExLog';
import addressManage from './addressManage';
export const panelsList =  [
    {
        path:'/addressManage',
        component:addressManage,
        title:'地址管理',
    },
    {
        path:'/ExLog',
        component:ExLog,
        title:'查看物流',
    },
    {
        path:'/ConfirmOrder',
        component:ConfirmOrder,
        title:'确认订单',
    },
    {
        path:'/OrderDetail',
        component:OrderDetail,
        title:'订单详情',
    },
    {
        path:'/AnchorStore',
        component:AnchorStore,
        title:'商城',
    },
    {
        path:'/ShopCart',
        component:ShopCart,
        title:'购物车',
    },
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
        path:'/NewAddress',
        component:NewAddress,
        title:'新增地址',
    },
    {
        path:'/SelectAddress',
        component:SelectAddress,
        title:'选择地址',
    },
    {
        path:'/GoodsDetail',
        component:GoodsDetail,
        title:'商品详情',
    }
];
export const getPanelName = (path)=>{
    const item = panelsList.find((item)=>item.path === path);
    const title = item?item.title:'';
    return title;
}