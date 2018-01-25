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
import AddressManage from './AddressManage';
import WriteExInfo from './WriteExInfo';
import MyOrder from './MyOrder';
import EvaluateOrder from './EvaluateOrder';
import UserCenter from './UserCenter';
import MyProduct from './MyProduct';
import SalesLog from './SalesLog';
import ProductIssue from './ProductIssue';
import MessAgeCenter from './MessAgeCenter';
import MessageDetail from './MessageDetail';
import EvaluateList from './EvaluateList';
export const panelsList =  [
    {
        path:'/EvaluateList',
        component:EvaluateList,
        title:'评论列表',
    },
    {
        path:'/MessageDetail',
        component:MessageDetail,
        title:'消息详情',
    },
    {
        path:'/MessAgeCenter',
        component:MessAgeCenter,
        title:'消息中心',
    },
    {
        path:'/ProductIssue',
        component:ProductIssue,
        title:'产品发布',
    },
    {
        path:'/SalesLog',
        component:SalesLog,
        title:'销售统计',
    },
    {
        path:'/MyProduct',
        component:MyProduct,
        title:'我的产品',
    },
    {
        path:'/UserCenter',
        component:UserCenter,
        title:'我的商城',
    },
    {
        path:'/EvaluateOrder',
        component:EvaluateOrder,
        title:'评价订单',
    },
    {
        path:'/MyOrder',
        component:MyOrder,
        title:'我的订单',
    },
    {
        path:'/WriteExInfo',
        component:WriteExInfo,
        title:'快递信息',
    },
    {
        path:'/AddressManage',
        component:AddressManage,
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