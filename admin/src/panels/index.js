/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:40:02 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:40:43
 * 面板组件，脚本生成面板文件时，自动修改，无需手动维护
 */

import Analysis from "./Analysis";
import Login from "./Login";
import Exception403 from "./Exception/403";
import Exception404 from "./Exception/404";
import Exception500 from "./Exception/500";
import ShopNavList from "./ShopNavList";
import AdManager from "./AdManager";
import AdPosition from "./AdPosition";
import GoodsProperty from "./GoodsProperty";
import MemberEncrypted from "./MemberEncrypted";
import GoodsManager from "./GoodsManager";
import ArticleList from "./ArticleList";
import ArticleCategory from "./ArticleCategory";
import ArticleSingleManager from "./ArticleSingleManager";
import CodeManager from "./CodeManager";
import SystemSet from "./SystemSet";
import AccessSet from "./AccessSet";
import ExpressSet from "./ExpressSet";
import ShopSet from "./ShopSet";
import SysMsg from "./SysMsg";
import MemberExpManager from "./MemberExpManager";
import MemberPointManager from "./MemberPointManager";
import AnchorType from "./AnchorType";
import ShopCheckList from "./ShopCheckList";
import LiveClass from "./LiveClass";
import LiveTag from "./LiveTag";
import SpecialTag from "./SpecialTag";
import SpecialClass from "./SpecialClass";
import GiftManager from "./GiftManager";
import FeedBack from "./FeedBack";
import RechargeManager from "./RechargeManager";
import BankManager from "./BankManager";
// import PartnerList from './PartnerList';
import PartnerAudit from "./PartnerAudit";
import SystemLog from "./SystemLog";
import WithdrawalMananger from "./WithdrawalMananger";
import LecturerNobleManager from "./LecturerNobleManager";
import Dashboard from "./Dashboard";
import AnchorList from "./AnchorList";
import MemberManager from "./MemberManager";
import OrderManager from "./OrderManager";
import RefundMananger from "./RefundMananger";
import EvaluateMananger from "./EvaluateMananger";
import AppVersion from "./AppVersion";
import AppGuideManager from "./AppGuideManager";
export const panelsList = [
    {
        path: "/mobile/AppGuideManager",
        component: AppGuideManager,
        title: "引导图"
    },
    {
        path: "/mobile/AppVersion",
        component: AppVersion,
        title: "APP版本"
    },
    {
        path: "/trade/EvaluateMananger",
        component: EvaluateMananger,
        title: "评价管理"
    },
    {
        path: "/trade/RefundMananger",
        component: RefundMananger,
        title: "退款/退货"
    },
    {
        path: "/trade/OrderManager",
        component: OrderManager,
        title: "订单管理"
    },
    {
        path: "/member/MemberManager",
        component: MemberManager,
        title: "会员管理"
    },
    {
        path: "/member/AnchorList",
        component: AnchorList,
        title: "主播管理"
    },
    {
        path: "/Dashboard",
        component: Dashboard,
        title: "仪表盘"
    },
    {
        path: "/member/LecturerNobleManager",
        component: LecturerNobleManager,
        title: "贵族管理"
    },
    {
        path: "/trade/WithdrawalMananger",
        component: WithdrawalMananger,
        title: "提现管理"
    },
    {
        path: "/system/SystemLog",
        component: SystemLog,
        title: "日志"
    },
    {
        path: "/partner/PartnerAudit",
        component: PartnerAudit,
        title: "审核"
    },
    // {
    //     path:'/partner/PartnerList',
    //     component:PartnerList,
    //     title:'分销列表',
    // },
    {
        path: "/operation/BankManager",
        component: BankManager,
        title: "银行管理"
    },
    {
        path: "/operation/RechargeManager",
        component: RechargeManager,
        title: "充值优惠"
    },
    {
        path: "/operation/FeedBack",
        component: FeedBack,
        title: "意见反馈"
    },
    {
        path: "/live/GiftManager",
        component: GiftManager,
        title: "礼物管理"
    },
    {
        path: "/live/SpecialClass",
        component: SpecialClass,
        title: "专辑类型"
    },
    {
        path: "/live/SpecialTag",
        component: SpecialTag,
        title: "专辑标签"
    },
    {
        path: "/Live/LiveTag",
        component: LiveTag,
        title: "直播标签"
    },
    {
        path: "/live/LiveClass",
        component: LiveClass,
        title: "直播类型"
    },
    {
        path: "/shop/ShopCheckList",
        component: ShopCheckList,
        title: "店铺管理"
    },
    {
        path: "/member/AnchorType",
        component: AnchorType,
        title: "主播类型"
    },
    {
        path: "/member/MemberPointManager",
        component: MemberPointManager,
        title: "积分管理"
    },
    {
        path: "/member/MemberExpManager",
        component: MemberExpManager,
        title: "等级管理"
    },
    {
        path: "/operation/SysMsg",
        component: SysMsg,
        title: "站内信"
    },
    {
        path: "/system/ShopSet",
        component: ShopSet,
        title: "商城设置"
    },
    {
        path: "/system/ExpressSet",
        component: ExpressSet,
        title: "快递设置"
    },
    {
        path: "/system/AccessSet",
        component: AccessSet,
        title: "权限设置"
    },
    {
        path: "/system/SystemSet",
        component: SystemSet,
        title: "基础设置"
    },
    {
        path: "/goods/CodeManager",
        component: CodeManager,
        title: "靓号管理"
    },
    {
        path: "/goods/GoodsManager",
        component: GoodsManager,
        title: "商品管理"
    },
    {
        path: "/article/ArticleSingleManager",
        component: ArticleSingleManager,
        title: "单页管理"
    },
    {
        path: "/article/ArticleCategory",
        component: ArticleCategory,
        title: "文章分类"
    },
    {
        path: "/article/ArticleList",
        component: ArticleList,
        title: "文章列表"
    },
    {
        path: "/member/MemberEncrypted",
        component: MemberEncrypted,
        title: "密保问题"
    },
    {
        path: "/goods/GoodsProperty",
        component: GoodsProperty,
        title: "商品属性"
    },
    {
        path: "/operation/AdPosition",
        component: AdPosition,
        title: "广告位管理"
    },
    {
        path: "/operation/AdManager",
        component: AdManager,
        title: "广告管理"
    },
    {
        path: "/goods/ShopNavList",
        component: ShopNavList,
        title: "导航"
    },
    {
        path: "/dashboard/analysis",
        component: Analysis,
        title: "分析"
    },
    {
        path: "/user/login",
        component: Login,
        title: "登录"
    },
    {
        path: "/exception/403",
        component: Exception403
    },
    {
        path: "/exception/404",
        component: Exception404
    },
    {
        path: "/exception/500",
        component: Exception500
    }
];
export const getPanelName = path => {
    const item = panelsList.find(item => item.path === path);
    const title = item ? item.title : "";
    return title ? `${title}` : "猪买单";
};
