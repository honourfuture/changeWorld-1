const menuData = [
    {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: '分析页',
                path: 'analysis',
            }, 
            {
                name: '监控页',
                path: 'monitor',
            }, 
            {
                name: '工作台',
                path: 'workplace',
                // hideInMenu: true,
            }
        ],
    }, 
    {
        name: '表单页',
        icon: 'form',
        path: 'form',
        children: [
            {
                name: '基础表单',
                path: 'basic-form',
            }, 
            {
                name: '分步表单',
                path: 'step-form',
            }, 
            {
                name: '高级表单',
                path: 'advanced-form',
            }
        ],
    }, 
    {
        name: '账户',
        icon: 'user',
        path: 'user',
        children: [
            {
                name: '登录',
                path: 'login',
            }, 
            {
                name: '注册',
                path: 'register',
            }, 
            {
                name: '注册结果',
                path: 'register-result',
            }
        ],
    },
    {
        name: '异常页',
        icon: 'warning',
        path: 'exception',
        children: [
            {
                name: '403',
                path: '403',
            }, {
                name: '404',
                path: '404',
            }, {
                name: '500',
                path: '500',
            }
        ],
    },
    {
        name: '使用文档',
        icon: 'book',
        path: 'http://pro.ant.design/docs/getting-started',
        target: '_blank',
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
  