/*
 * @Author: daihanqiao@126.com
 * @Date: 2017-12-31 13:18:13
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 22:55:36
 * 全局数据
 */
import { Base } from "./base";
import { observable, action } from "mobx";
export default {
    API_URL: "http://www.zhumaidan.com/api",
    RES_URL: "http://www.zhumaidan.com",
    get UPLOAD_URL() {
        return `${this.API_URL}/common/fileUpload`;
    },
    PAGE_SIZE: 10, //默认pagesize
    store: observable({
        isCollapsed: false // menu是否收起
    }),
    _userInfo: observable.map({
        "global.userInfo": { account: "", header: "" }
    }),
    observeUserInfo(callBack) {
        this._userInfo.observe(callBack);
    },
    set userInfo(data) {
        Base.setLocalData("shop.user.data", data);
        action(() => {
            this._userInfo.set("global.userInfo", data || {});
        })();
    },
    get userInfo() {
        const data = this._userInfo.get("global.userInfo");
        if (!data || !data.account) {
            const localData = Base.getLocalData("shop.user.data");
            if (localData) {
                this.userInfo = localData;
            }
            return localData || {};
        }
        return data;
    }
};