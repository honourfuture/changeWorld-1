/*
 * @Author: daihanqiao@126.com 
 * @Date: 2017-12-31 13:18:13 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 22:55:36
 * 全局数据
 */
import { observable } from "mobx";
export default {
    /**
    //Test
    API_URL: "http://lvdeshui.xttejzc.cn/api",
    RES_URL: "http://lvdeshui.xttejzc.cn/",
     */
    //Prod
    API_URL: "https://www.luomashichang.cn/api",
    RES_URL: "https://www.luomashichang.cn/",
    get UPLOAD_URL() {
        return `${this.API_URL}/common/fileUpload`;
    },
    store: observable({
        isCollapsed: false // menu是否收起
    }),
    userInfo: {
        name: "代汉桥",
        avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
    },
    PAGE_SIZE: 20
};