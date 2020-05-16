const menuData = [
    {
        name: "会员",
        icon: "user",
        path: "member",
        children: [
            {
                name: "会员管理",
                path: "MemberManager"
            },
            // {
            //     name: "V认证",
            //     path: "MemberVCertification"
            // },
            // {
            //     name: "主播类型",
            //     path: "AnchorType"
            // },
            {
                name: "主播管理",
                path: "AnchorList"
            },
            {
                name: "升级审核",
                path: "Verify"
            },
            // {
            //     name: "店铺管理",
            //     path: "ShopCheckList"
            // },
            // {
            //     name: "等级管理",
            //     path: "MemberLvManager"
            // },
            {
                name: "贵族管理",
                path: "LecturerNobleManager"
            },
            {
                name: "经验值管理",
                path: "MemberExpManager"
            },
            {
                name: "积分管理",
                path: "MemberPointManager"
            },
            {
                name: "密保问题",
                path: "MemberEncrypted"
            }
        ]
    },
    {
        name: "商品",
        icon: "gift",
        path: "goods",
        children: [
            {
                name: "商品分类",
                path: "ShopNavList"
            },
            {
                name: "商品属性",
                path: "GoodsProperty"
            },
            {
                name: "商品管理",
                path: "GoodsManager"
            },
            {
                name: "靓号管理",
                path: "CodeManager"
            }
            // {
            //     name: "品牌管理",
            //     path: "BrandManager"
            // }
        ]
    },
    {
        name: "直播",
        icon: "play-circle-o",
        path: "live",
        children: [
            // {
            //     name: "直播类型",
            //     path: "LiveClass"
            // },
            // {
            //     name: "直播标签",
            //     path: "LiveTag"
            // },
            {
                name: "专辑类型",
                path: "SpecialClass"
            },
            // {
            //     name: "专辑标签",
            //     path: "SpecialTag"
            // },
            {
                name: "礼物管理",
                path: "GiftManager"
            },
            {
                name: "直播间管理",
                path: "DirectManager"
            },
            {
                name: "专辑管理",
                path: "AlbumManager"
            },
            {
                name: "音频管理",
                path: "AudioManager"
            },
            {
                name: "专辑评价",
                path: "LiveEvaluateManager"
            }
        ]
    },
    // {
    //     name: "店铺",
    //     icon: "shop",
    //     path: "shop",
    //     children: [
    //         {
    //             name: "店铺管理",
    //             path: "ShopCheckList"
    //         }
    //         // {
    //         //     name: '店铺等级',
    //         //     path: 'ShopLv',
    //         // },
    //         // {
    //         //     name: '店铺分类',
    //         //     path: 'ShopClassify',
    //         // },
    //     ]
    // },
    {
        name: "交易",
        icon: "pay-circle-o",
        path: "trade",
        children: [
            {
                name: "订单管理",
                path: "OrderManager"
            },
            {
                name: "退款/退货",
                path: "RefundMananger"
            },
            {
                name: "评价管理",
                path: "EvaluateMananger"
            },
            {
                name: "提现管理",
                path: "WithdrawalMananger"
            }
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
        ]
    },
    // {
    //     name: "分销",
    //     icon: "team",
    //     path: "partner",
    //     children: [
    //         {
    //             name: "审核",
    //             path: "PartnerAudit"
    //         }
    //         // {
    //         //     name: "列表",
    //         //     path: "PartnerList"
    //         // }
    //     ]
    // },
    {
        name: "活动管理",
        icon: "team",
        path: "activity",
        children: [
            {
                name: "活动列表",
                path: "ActivityList"
            },
            {
                name: "活动分类管理",
                path: "ActivityClassManage"
            }
        ]
    },
    {
        name: "运营",
        icon: "pie-chart",
        path: "operation",
        children: [
            // {
            //     name: "充值优惠",
            //     path: "RechargeManager"
            // },
            {
                name: "银行管理",
                path: "BankManager"
            },
            {
                name: "广告位管理",
                path: "AdPosition"
            },
            {
                name: "广告管理",
                path: "AdManager"
            },
            {
                name: "意见反馈",
                path: "FeedBack"
            },
            {
                name: "站内信",
                path: "SysMsg"
            }
        ]
    },

    {
        name: "数据统计",
        icon: "line-chart",
        path: "analysis",
        children: [
            // {
            //     name: "充值优惠",
            //     path: "RechargeManager"
            // },
            {
                name: "分销数据统计",
                path: "Distribution"
            },
            {
                name: "团队数据统计",
                path: "TeamUsers"
            },
            {
                name: "平台交易流水",
                path: "PlatformTrade"
            },            
            {
                name: "平台收益统计",
                path: "PlatformIncome"
            }
        ]
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
    // {
    //     name: "通讯",
    //     icon: "global",
    //     path: "net",
    //     children: [
    //         {
    //             name: "短信",
    //             path: "NetSms"
    //         },
    //         {
    //             name: "邮箱",
    //             path: "NetEmail"
    //         },
    //         {
    //             name: "apns",
    //             path: "NetApns"
    //         },
    //         {
    //             name: "会员消息",
    //             path: "MemberMsgList"
    //         }
    //     ]
    // },
    {
        name: "手机端",
        icon: "mobile",
        path: "mobile",
        children: [
            {
                name: "APP版本",
                path: "AppVersion"
            }
            // {
            //     name: "启动图",
            //     path: "AppStartManager"
            // },
            // {
            //     name: "引导图",
            //     path: "AppGuideManager"
            // }
        ]
    },
    {
        name: "文章",
        icon: "book",
        path: "article",
        children: [
            // {
            //     name: "文章分类",
            //     path: "ArticleCategory"
            // },
            // {
            //     name: "文章列表",
            //     path: "ArticleList"
            // },
            {
                name: "单页管理",
                path: "ArticleSingleManager"
            }
        ]
    },
    {
        name: "系统",
        icon: "laptop",
        path: "system",
        children: [
            {
                name: "基础设置",
                path: "SystemSet"
            },
            {
                name: "推送",
                path: "PushMsg"
            },
            {
                name: "官网产品",
                path: "WebsiteGoods"
            },
            // {
            //     name: "商城设置",
            //     path: "ShopSet"
            // },
            {
                name: "管理员列表",
                path: "AdminManage"
            },
            {
                name: "管理员角色列表",
                path: "AdminRoleList"
            },
            {
                name: "快递公司",
                path: "ExpressSet"
            },
            // {
            //     name: "权限设置",
            //     path: "AccessSet"
            // },
            {
                name: "日志",
                path: "SystemLog"
            }
        ]
    },
    {
        name: "机器人",
        icon: "team",
        path: "robot",
        children: [
            { name: "机器人管理", path: "RobotManager" },
            { name: "头像管理", path: "RobotHeaderManager" },
            { name: "昵称管理", path: "RobotNickNameManager" },
            { name: "音频评论库", path: "RobotCommentManager" },
            { name: "直播评论库", path: "RobotLiveCommentManager" },
            { name: "主播粉丝", path: "FansTask" },
            // { name: "主播粉丝模板", path: "FansTemplate" },
            { name: "播放量任务", path: "PlayTask" },
            // { name: "播放量任务模板", path: "PlayTemplate" },
            { name: "收藏任务", path: "CollectTask" },
            // { name: "收藏任务模板", path: "CollectTemplate" },
            { name: "直播任务", path: "LiveStart" },
            // { name: "直播任务模板", path: "LiveTemplate" },
            { name: "活动浏览量任务", path: "ActivityTask" },
            { name: "活动点赞任务", path: "ActivityLike" },
            { name: "音频评论任务", path: "AudioComment" }
        ]
    }
];

function formatter(data, parentPath = "", pathList) {
    let list = [];
    data.forEach(item => {
        if (item.children) {
            let children = item.children;
            if (pathList) {
                children = item.children.filter(
                    item => pathList.indexOf(item.path) !== -1
                );
            }
            list.push({
                ...item,
                path: `${parentPath}${item.path}`,
                children: formatter(children, `${parentPath}${item.path}/`)
            });
        } else {
            list.push({
                ...item,
                path: `${parentPath}${item.path}`
            });
        }
    });
    return list;
}

export const getMenuData = pathList => formatter(menuData, "", pathList);
