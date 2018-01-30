/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:37:11 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 23:36:06
 * 基础工具类，组件基类
 */
import {action,observable,useStrict} from 'mobx';
import {observer} from 'mobx-react';
import {Component} from 'react';
// import {PubSub} from 'pubsub-js';
import Global from './global';
import { Toast } from 'antd-mobile';
import reqwest from "reqwest";
import './base.less';
useStrict(true);
window.HISTORY_LENGHT = 0;
export const Base = {
	DEBUG:process.env.NODE_ENV !== 'production',
	//打开页面
	push(path,params){
		if(!path){
            return;
		}
		window.APP_INDEX ++;
        let urlParam = "";
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                urlParam += (key+"="+escape(value)+"&");
            }
        }
        urlParam = urlParam.replace(/&$/,"");
		path = urlParam?(path+"?"+urlParam):path;
		if(/http(s?):\/\//.test(path)){
            return window.location.href = path;
		}
		if(window.Router.history.location.pathname === '/ShopIndex'){
			const url = window.location.href;
			const newUrl = url.replace('ShopIndex',path);
			//打开原生页面，传入url
			if(window.webkit && window.webkit.messageHandlers){
				window.webkit.messageHandlers.pushNewViewController.postMessage(newUrl);
			}else if(window.Native){
				window.Native.pushNewViewController(newUrl)
			}else{
				window.Router.history.push(path);
			}
		}else{
			window.Router.history.push(path);
		}
		window.HISTORY_LENGHT ++;
	},
	//返回上一页
	goBack(){
		if(window.HISTORY_LENGHT === 0){
			//关闭原生页面
			if(window.webkit && window.webkit.messageHandlers){
				window.webkit.messageHandlers.popViewController.postMessage(null);
			}else if(window.Native){
				window.Native.finish();
			}else{
				window.Router.history.goBack();
			}
		}else{
			window.Router.history.goBack();
		}
		if(window.HISTORY_LENGHT > 0){
			window.HISTORY_LENGHT --;
		}
	},
	//进入App页面
	pushApp(path,params){
		if(window.webkit && window.webkit.messageHandlers){
			window.webkit.messageHandlers.openModule.postMessage({
				"moduleName":path,
				"params":params || {}
			});
		}else{
			this.push(path,params);
		}
	},
	//获取页面传来的参数
	getPageParams(keyStr,url){
		url = url || window.document.location.href;
		const str = url.split("?")[1];
		if(typeof(str) === 'undefined'){
			return keyStr ? '' : {};
		}
		const result = {};
		str.split("&").forEach((item)=>{
			const arr = item.split("=");
			result[arr[0]] = unescape(arr[1]);
		})
		return keyStr?result[keyStr]:result;
	},
	//处理请求参数
	_request(o_param={},f_succBack=null,s_method='GET',f_failBack=null,b_noToast=false){
		if(!o_param['act'] || ! o_param['op']){
			return console.error("未传入act或op");
		}
		const mod = o_param['mod']?`${o_param['mod']}/`:'';
		let s_requestUrl = `${Global.API_URL}/${mod}${o_param['act']}/${o_param['op']}`;
		o_param.sign = '51409079b103509bed505b276f27717c';
		o_param.user_id = 1;
		delete o_param['act'];
		delete o_param['op'];
		if(o_param.mod){
			delete o_param['mod'];
		}
		let self = this;
		!b_noToast && Toast.loading('加载中',0);
		reqwest({
            withCredentials: true,
            crossOrigin: true,
            url: s_requestUrl,
            method: s_method,
            data: o_param,
            type: 'json',
            processData:!(o_param instanceof FormData),//传文件流
            timeout: 10000,
            success: (res)=>{
				self.DEBUG && console.log(res);
				!b_noToast && Toast.hide();
				switch(res.status){
					case 0:
						f_succBack && action(f_succBack)(res);
					break;
					case -1:
						self.push('userLogin');
					break;
					default:
						Toast.fail(res.message);
					break;
				}
            },
            error: (err)=>{
                self.DEBUG && console.log(err);
				Toast.offline('连接异常，请重新尝试');
            }
        });
    },
    GET(o_param,f_succBack=null,f_failBack=null,b_noToast=false){
        this._request(o_param,f_succBack,"GET",f_failBack,b_noToast);
    },
    POST(o_param,f_succBack=null,f_failBack=null,b_noToast=false){
        this._request(o_param,f_succBack,"POST",f_failBack,b_noToast);
    },
	//多个异步操作处理
    // promiseAll(f_succBack,...promiseParams){
	// 	let self = this;
	// 	Toast.loading('加载中',0);
	// 	let promiseList = promiseParams.map((item)=>{
	// 		let [o_param,s_method='GET'] = item;
	// 		const {s_requestUrl,o_fetchData} = self._handlerParams(o_param,s_method);
	// 		return fetch(s_requestUrl,o_fetchData);
	// 	});
	// 	const catchFuc = (error) => {
	// 		self.DEBUG && console.log(error);
	// 		Toast.offline('网络连接异常，请重新尝试');
    //   	};
	// 	Promise.all([...promiseList]).then((responses) => {
	// 		const responseList = responses.map((response)=>{
	// 			return response.json();
	// 		});
	// 		Promise.all(responseList).then((responseJsons)=>{
	// 			let b_needLogin = false;
	// 			let s_errorCode = '';
	// 			let dataList = [];
	// 			responseJsons.forEach((res)=>{
	// 				switch(res.status){
	// 					case 0:
	// 						dataList.push(res.data);
	// 					break;
	// 					case -1:
	// 						b_needLogin = true;
	// 						self.push('userLogin');
	// 					break;
	// 					default:
	// 						s_errorCode = res.message;
	// 					break;
	// 				}
	// 			});
	// 			Toast.hide();
	// 			if(b_needLogin){
	// 				self.openWin('userLogin');
	// 			}else if(s_errorCode){
	// 				Toast.fail(s_errorCode);
	// 			}else{
	// 				self.DEBUG && console.log(dataList);
	// 				f_succBack && action(f_succBack)(dataList);
	// 			}
	// 		}).catch(catchFuc);
    //   	}).catch(catchFuc);
	// },
	//格式化数字，比如：0->0.00
	getNumFormat(n_num,i_len=2){
		n_num = parseFloat(n_num) || 0;
		return n_num.toFixed(i_len);
	},
	getAnonymity(s_str){
		if(!s_str)return;
		return `${s_str[0] || ''}******${s_str[s_str.length - 1] || ''}`
	},
	getImgUrl(img){
		return `${Global.RES_URL}${img}`;
	}
	// //监听事件
	// addEvt(name,func){
	// 	PubSub.subscribe(name,func);
	// },
	// //移除事件
	// removeEvt(name){
	// 	PubSub.unsubscribe(name);
	// },
	// //发送事件
	// sendEvt(name,data){
	// 	PubSub.publish(name,data);
	// }
}
window.goBack = Base.goBack;
//基础组件，内置store
@observer
export class BaseComponent extends Component {
	set store(obj){
        if(!this._store){
            this._store = observable(obj);
        }
	}
	get store(){
		return this._store;
	}
}