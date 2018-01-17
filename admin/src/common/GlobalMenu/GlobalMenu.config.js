const menuData = [
    {
        name: '用户',
        icon: 'user',
        path: 'user',
        children: [
            {
                name: '讲师认证',
                path: 'UserLecturerCertification',
            },
            {
                name: 'V认证',
                path: 'UserVCertification',
            },
            {
                name: '普通用户',
                path: 'UserOrdinary',
            },
            {
                name: '讲师用户',
                path: 'UserLecturer',
            },
            {
                name: '等级管理',
                path: 'UserLvManager',
            },
            {
                name: '贵族管理',
                path: 'LecturerNobleManager',
            },
        ],
    }, 
    {
        name: '交易',
        icon: 'trademark',
        path: 'trade',
        children: [
            {
                name: '订单列表',
                path: 'OrderList',
            }
        ],
    }, 
    {
        name: '商城',
        icon: 'shop',
        path: 'shop',
        children: [
            {
                name: '商城导航',
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
        ],
    },
    {
        name: '运营',
        icon: 'picture',
        path: 'operation',
        children: [
            {
                name: '广告位管理',
                path: 'AdPosition',
            },
            {
                name: '广告管理',
                path: 'AdManager',
            }
        ],
    },
    {
        name: '文章',
        icon: 'book',
        path: 'article',
        children: [
            {
                name: '文章类',
                path: 'ArticleCategory',
            },
            {
                name: '文章列表',
                path: 'ArticleList',
            },
            {
                name: '单页管理',
                path: 'ArticleManager',
            },
            {
                name: '帮助中心',
                path: 'ArticleHelper',
            }
        ],
    },
    {
        name: '系统',
        icon: 'laptop',
        path: 'system',
        children: [
            {
                name: '设置',
                path: 'SystemSet',
            },
            {
                name: '账号',
                path: 'SystemAccount',
            },
            {
                name: '日志',
                path: 'SystemLog',
            },
            {
                name: 'APP版本',
                path: 'SystemAppVersion',
            },
            {
                name: '密保问题',
                path: 'SystemEncrypted',
            }
        ],
    },
    {
        name: '消息',
        icon: 'message',
        path: 'msg',
        children: [
            {
                name: '反馈建议',
                path: 'MsgFeedBack',
            },
            {
                name: '站内信',
                path: 'MsgInstation',
            },
            {
                name: '公共',
                path: 'MsgAnnouncement',
            }
        ],
    }
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
  