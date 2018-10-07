/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:37:11 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 23:36:06
 * 基础工具类，组件基类
 */
import { action, observable, useStrict } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";
import { PubSub } from "pubsub-js";
import Global from "./global";
import { message } from "antd";
import Cookies from "js-cookie";
import "whatwg-fetch";
import "./base.less";
useStrict(true);

export const Base = {
    DEBUG: process.env.NODE_ENV !== "production",
    //打开页面
    push(path, params) {
        if (!path) {
            return;
        }
        let urlParam = "";
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                urlParam += key + "=" + escape(value) + "&";
            }
        }
        urlParam = urlParam.replace(/&$/, "");
        path = urlParam ? path + "?" + urlParam : path;
        if (/http(s?):\/\//.test(path)) {
            return (window.location.href = path);
        }
        window.Router.history.push(path);
    },
    //返回上一页
    goBack() {
        window.Router.history.goBack();
    },
    //获取页面传来的参数
    getPageParams(keyStr, url) {
        url = url || window.document.location.href;
        const str = url.split("?")[1];
        if (typeof str === "undefined") {
            return keyStr ? "" : {};
        }
        const result = {};
        str.split("&").forEach(item => {
            const arr = item.split("=");
            result[arr[0]] = unescape(arr[1]);
        });
        return keyStr ? result[keyStr] : result;
    },
    //处理请求参数
    _request(params = {}, callBack, failBack, method = "GET", target) {
        if (!params["act"] || !params["op"]) {
            return console.error("未传入act或op");
        }
        const mod = params["mod"] ? `${params["mod"]}/` : "";
        let requestUrl = `${Global.API_URL}/${mod}${params["act"]}/${
            params["op"]
        }`;
        delete params["act"];
        delete params["op"];
        if (params.mod) {
            delete params["mod"];
        }
        let body = null;
        let url = "";
        const verifyData = this.getLocalData("verifyData") || {};
        Object.assign(params, verifyData);
        for (let [key, value] of Object.entries(params)) {
            url += key + "=" + value + "&";
        }
        url = url.replace(/&$/, "");
        const get = method.toLocaleLowerCase() === "get";
        if (get) {
            url && (requestUrl += "?" + url);
        } else {
            body = url;
        }
        const fetchData = {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": get
                    ? "application/json"
                    : "application/x-www-form-urlencoded"
            },
            timeout: 10000,
            body: body
        };
        const Spin = target && target.refs.spin && target.refs.spin;
        Spin && Spin.setState({ spinning: true });
        const self = this;
        fetch(requestUrl, fetchData)
            .then(response => response.json())
            .then(res => {
                self.DEBUG && console.log(res);
                switch (res.status) {
                    case 0:
                        callBack && action(callBack)(res);
                        break;
                    case -1:
                        self.push("/user/login");
                        break;
                    default:
                        if (failBack) {
                            failBack(res);
                        } else {
                            message.error(res.message);
                        }
                        break;
                }
                Spin && Spin.setState({ spinning: false });
            })
            .catch(ex => Base.push("/Exception/500"));
    },
    GET(params, callBack, target, failBack) {
        this._request(params, callBack, failBack, "GET", target);
    },
    POST(params, callBack, target, failBack) {
        this._request(params, callBack, failBack, "POST", target);
    },
    setLocalData(key, value, expires = 7) {
        if (value) {
            Cookies.set(key, value, { expires });
        } else {
            Cookies.remove(key);
        }
    },
    getLocalData(key) {
        return Cookies.getJSON(key);
    },
    //格式化数字，比如：0->0.00
    getNumFormat(n_num, i_len = 2) {
        n_num = parseFloat(n_num) || 0;
        return n_num.toFixed(i_len);
    },
    //格式化时间日期,time:秒数,type:0,输出年月日,1.输出时分秒,2.全部输出
    getTimeFormat(s_time, i_type = 0) {
        s_time = s_time ? new Date(parseInt(s_time, 10) * 1000) : new Date();
        let a_YMDList = [
            s_time.getFullYear(),
            s_time.getMonth() + 1,
            s_time.getDate()
        ];
        let a_HMSList = [
            s_time.getHours(),
            s_time.getMinutes(),
            s_time.getSeconds()
        ];
        a_YMDList.forEach(function(value, index) {
            a_YMDList[index] = value.toString().replace(/(^\d{1}$)/, `0$1`);
        });
        a_HMSList.forEach(function(value, index) {
            a_HMSList[index] = value.toString().replace(/(^\d{1}$)/, `0$1`);
        });
        if (i_type === 0) {
            return a_YMDList.join("-");
        } else if (i_type === 1) {
            return a_HMSList.join(":");
        }
        return `${a_YMDList.join("-")} ${a_HMSList.join(":")}`;
    },
    getImgUrl(img) {
        return /http|data:/.test(img)
            ? img
            : img
                ? `${Global.RES_URL}${img}`
                : "";
    },
    // //监听事件
    addEvt(name, func) {
        PubSub.subscribe(name, func);
    },
    // //移除事件
    removeEvt(name) {
        PubSub.unsubscribe(name);
    },
    // //发送事件
    sendEvt(name, data) {
        PubSub.publish(name, data);
    },
    //加载js
    loadJs(s_url, f_callback) {
        let dom = document.createElement("script");
        dom.type = "text/javascript";
        dom.src = s_url;
        if (document.documentMode == 10 || document.documentMode == 9) {
            dom.onerror = dom.onload = loaded;
        } else {
            dom.onreadystatechange = ready;
            dom.onerror = dom.onload = loaded;
        }
        document.getElementsByTagName("head")[0].appendChild(dom);
        function ready(s) {
            if (s.readyState == "loaded" || s.readyState == "complete") {
                f_callback();
            }
        }
        function loaded() {
            f_callback();
        }
    }
};

//基础组件，内置store
@observer
export class BaseComponent extends Component {
    set store(obj) {
        if (!this._store) {
            this._store = observable(obj);
        }
    }
    get store() {
        return this._store;
    }
}
