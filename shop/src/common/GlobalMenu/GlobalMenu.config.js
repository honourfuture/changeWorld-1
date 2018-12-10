const menuData = [
    {
        name: "个人信息",
        icon: "user",
        path: "UserInfo"
    },
    {
        name: "专辑管理",
        icon: "book",
        path: "live/AlbumManager"
    },
    {
        name: "音频管理",
        icon: "play-circle-o",
        path: "live/AudioManager"
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
