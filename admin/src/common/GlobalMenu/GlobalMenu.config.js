const menuData = [
    {
        name: '会员',
        icon: 'user',
        path: 'member',
        children: [
            {
                name: '讲师认证',
                path: 'MemberLecturerCertification',
            },
            {
                name: 'V认证',
                path: 'MemberVCertification',
            },
            {
                name: '主播类型',
                path: 'AnchorType',
            },
            {
                name: '会员管理',
                path: 'MemberManager',
            },
            {
                name: '等级管理',
                path: 'MemberLvManager',
            },
            {
                name: '贵族管理',
                path: 'LecturerNobleManager',
            },
            {
                name: '经验值管理',
                path: 'MemberExpManager',
            },
            {
                name: '积分管理',
                path: 'MemberPointManager',
            },
            {
                name: '密保问题',
                path: 'MemberEncrypted',
            }
        ],
    },
    {
        name: '商品',
        icon: 'gift',
        path: 'goods',
        children: [
            {
                name: '商品分类',
                path: 'ShopNavList',
            },
            {
                name: '商品属性',
                path: 'GoodsProperty',
            },
            {
                name: '商品管理',
                path: 'GoodsManager',
            }, 
            {
                name: '靓号管理',
                path: 'CodeManager',
            }, 
            {
                name: '品牌管理',
                path: 'BrandManager',
            },
        ],
    },
    {
        name: '店铺',
        icon: 'shop',
        path: 'shop',
        children: [
            {
                name: '店铺管理',
                path: 'ShopManager',
            },
            // {
            //     name: '店铺等级',
            //     path: 'ShopLv',
            // },
            // {
            //     name: '店铺分类',
            //     path: 'ShopClassify',
            // },
        ],
    },
    {
        name: '交易',
        icon: 'pay-circle-o',
        path: 'trade',
        children: [
            {
                name: '商品订单',
                path: 'GoodsOrderList',
            },
            {
                name: '退款管理',
                path: 'refundMananger',
            },
            {
                name: '退货管理',
                path: 'refundGoodsMananger',
            },
            {
                name: '评价管理',
                path: 'EvaluateMananger',
            },
            // {
            //     name: '咨询管理',
            //     path: 'ConsultMananger',
            // },
            // {
            //     name: '举报管理',
            //     path: 'ReportMananger',
            // },
            // {
            //     name: '投诉管理',
            //     path: 'ComplaintMananger',
            // },
        ],
    },
    {
        name: '运营',
        icon: 'pie-chart',
        path: 'operation',
        children: [
            {
                name: '广告位管理',
                path: 'AdPosition',
            },
            {
                name: '广告管理',
                path: 'AdManager',
            },
            {
                name: '意见反馈',
                path: 'FeedBack',
            },
            {
                name: '站内信',
                path: 'SysMsg',
            }
        ],
    },
    // {
    //     name: '促销',
    //     icon: 'tag-o',
    //     path: 'promotion',
    //     children: [
    //         {
    //             name: '促销设定',
    //             path: 'PromotionSet',
    //         },
    //         {
    //             name: '团购管理',
    //             path: 'PromotionGroup',
    //         },
    //         {
    //             name: '限时折扣',
    //             path: 'PromotionDiscount',
    //         },
    //         {
    //             name: '满即送',
    //             path: 'PromotionFullSend',
    //         },
    //         {
    //             name: '积分兑换',
    //             path: 'PointExchange',
    //         },
    //         {
    //             name: '代金券',
    //             path: 'PromotionVoucher',
    //         },
    //         {
    //             name: '红包',
    //             path: 'PromotionRedBag',
    //         },
    //         {
    //             name: '拼团管理',
    //             path: 'GroupBooking',
    //         },

    //     ],
    // },
    {
        name: '通讯',
        icon: 'global',
        path: 'net',
        children: [
            {
                name: '短信',
                path: 'NetSms',
            },
            {
                name: '邮箱',
                path: 'NetEmail',
            },
            {
                name: 'apns',
                path: 'NetApns',
            },
            {
                name: '会员消息',
                path: 'MemberMsgList',
            },
        ],
    },
    {
        name: '手机端',
        icon: 'mobile',
        path: 'mobile',
        children: [
            {
                name: 'APP版本',
                path: 'AppVersion',
            },
            {
                name: '启动图',
                path: 'AppStartManager',
            },
            {
                name: '引导图',
                path: 'AppGuideManager',
            }
        ],
    },
    {
        name: '文章',
        icon: 'book',
        path: 'article',
        children: [
            {
                name: '文章分类',
                path: 'ArticleCategory',
            },
            {
                name: '文章列表',
                path: 'ArticleList',
            },
            {
                name: '单页管理',
                path: 'ArticleSingleManager',
            }
        ],
    },
    {
        name: '系统',
        icon: 'laptop',
        path: 'system',
        children: [
            {
                name: '基础设置',
                path: 'SystemSet',
            },
            {
                name: '商城设置',
                path: 'ShopSet',
            },
            {
                name: '快递公司',
                path: 'ExpressSet',
            },
            {
                name: '权限设置',
                path: 'AccessSet',
            },
            {
                name: '日志',
                path: 'SystemLog',
            }
        ],
    },
];
  
function formatter(data, parentPath = '') {
    const list = [];
    data.forEach((item) => {
        if (item.children) {
            list.push({
                ...item,
                path: `${parentPath}${item.path}`,
                children: formatter(item.children, `${parentPath}${item.path}/`),
            });
        } else {
            list.push({
                ...item,
                path: `${parentPath}${item.path}`,
            });
        }
    });
    return list;
}
  
export const getMenuData = () => formatter(menuData);
  