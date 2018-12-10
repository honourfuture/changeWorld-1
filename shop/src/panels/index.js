/*
 * @Author: daihanqiao@126.com
 * @Date: 2018-01-01 15:40:02
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:40:43
 * 面板组件，脚本生成面板文件时，自动修改，无需手动维护
 */

import Login from "./Login";
import Exception403 from "./Exception/403";
import Exception404 from "./Exception/404";
import Exception500 from "./Exception/500";
import AudioManager from "./AudioManager";
import AlbumManager from "./AlbumManager";
import UserAudio from "./UserAudio";
import BatchAudio from "./BatchAudio";
export const panelsList = [
    {
        path: "/live/BatchAudio",
        component: BatchAudio,
        title: "批量上传"
    },
    {
        path: "/live/UserAudio",
        component: UserAudio,
        title: "音频列表"
    },
    {
        path: "/live/AlbumManager",
        component: AlbumManager,
        title: "专辑管理"
    },
    {
        path: "/live/AudioManager",
        component: AudioManager,
        title: "音频管理"
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
