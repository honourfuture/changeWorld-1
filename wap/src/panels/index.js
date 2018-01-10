/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:40:02 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:40:43
 * 面板组件，脚本生成面板文件时，自动修改，无需手动维护
 */

import ShopIndex from './ShopIndex';
import Panel2 from './Panel2';

export const panelsList =  [
    {
        path:'/shopIndex',
        component:ShopIndex,
        title:'商城',
    },
    {
        path:'/panel2',
        component:Panel2,
        title:'面板2',
    }
]

export const getPanelName = (path)=>{
    const item = panelsList.find((item)=>item.path === path);
    const title = item?item.title:'';
    return title
}