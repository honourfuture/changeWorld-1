import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { message, Input, Button } from "antd";
import "./IMPanel.less";
const { TextArea } = Input;

export default class IMPanel extends BaseComponent {
    store = {
        content: "",
        list: [],
        isConnect: false,
        leftHeader: "",
        rightHeader: "",
        title: ""
    };
    @action.bound
    isMinStatus() {
        let isMin = false;
        //除了Internet Explorer浏览器，其他主流浏览器均支持Window outerHeight 和outerWidth 属性
        if (window.outerWidth != undefined && window.outerHeight != undefined) {
            isMin = window.outerWidth <= 160 && window.outerHeight <= 27;
        } else {
            isMin = window.outerWidth <= 160 && window.outerHeight <= 27;
        }
        //除了Internet Explorer浏览器，其他主流浏览器均支持Window screenY 和screenX 属性
        if (window.screenY != undefined && window.screenX != undefined) {
            isMin = window.screenY < -30000 && window.screenX < -30000; //FF Chrome
        } else {
            isMin = window.screenTop < -30000 && window.screenLeft < -30000; //IE
        }
        return isMin;
    }
    @action.bound
    flash_title() {
        //当窗口效果为最小化，或者没焦点状态下才闪动
        if (this.isMinStatus() || !window.isFocus) {
            console.log(2222);
            this.newMsgCount();
        } else {
            document.title = this.store.title; //窗口没有消息的时候默认的title内容
            window.clearInterval();
        }
    }
    flag = false;
    @action.bound
    newMsgCount() {
        console.log(111);
        if (this.flag) {
            this.flag = false;
            document.title = "【新消息】";
        } else {
            this.flag = true;
            document.title = "【　　　】";
        }
        window.setTimeout(this.flash_title, 380);
    }
    @action.bound
    onMsgChange(e) {
        this.store.content = e.target.value;
    }
    @action.bound
    onSend() {
        this.sendMsg(this.store.content);
        this.store.content = "";
    }
    sendMsg(content) {
        const { RongIMClient, RongIMLib } = window;
        // 定义消息类型,文字消息使用 RongIMLib.TextMessage
        let msg = new RongIMLib.TextMessage({
            content
            // extra: "附加信息"
        });
        //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
        //let msg = RongIMLib.TextMessage.obtain("hello");
        let conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
        let targetId = Base.getPageParams("targetId"); // 目标 Id
        let pushData = "pushData" + Date.now();
        let isMentioned = false;
        RongIMClient.getInstance().sendMessage(
            conversationtype,
            targetId,
            msg,
            {
                // 发送消息成功
                onSuccess: action(message => {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    console.log("Send successfully", message);
                    this.store.list.push(message);
                }),
                onError: function(errorCode, message) {
                    let info = "";
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = "超时";
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = "未知错误";
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = "在黑名单中，无法向对方发送消息";
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = "不在讨论组中";
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = "不在群组中";
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = "不在聊天室中";
                            break;
                        default:
                            info = "未知错误";
                            break;
                    }
                    console.log("发送失败:" + info);
                }
            },
            isMentioned,
            pushData
        );
    }
    componentDidMount() {
        window.onblur = function() {
            window.isFocus = false;
        };
        window.onfocus = function() {
            window.isFocus = true;
        };
        const { id, targetId } = Base.getPageParams();
        Base.GET({ act: "info", op: "bitch", mod: "user", s_uid: id }, res => {
            const { header, nickname } = res.data[0];
            console.log(nickname);
            document.title = nickname;
            this.store.title = nickname;
            this.store.rightHeader = Base.getImgUrl(header);
        });
        Base.GET(
            { act: "info", op: "bitch", mod: "user", s_uid: targetId },
            res => {
                const { header } = res.data[0];
                this.store.leftHeader = Base.getImgUrl(header);
            }
        );
        Base.GET(
            { act: "chat", op: "token", robot_id: Base.getPageParams("id") },
            res => {
                const self = this;
                const { app_key, token } = res.data;
                Base.loadJs(
                    "http://cdn.ronghub.com/RongIMLib-2.3.3.min.js",
                    () => {
                        const { RongIMClient, RongIMLib } = window;
                        // let conversationtype =
                        //     RongIMLib.ConversationType.PRIVATE; // 私聊
                        // let targetId = Base.getPageParams("targetId"); // 目标 Id
                        RongIMClient.init(app_key);
                        RongIMClient.connect(
                            token,
                            {
                                onSuccess: function(userId) {
                                    console.log("Login successfully." + userId);
                                    // RongIMClient.getInstance().getHistoryMessages(
                                    //     conversationtype,
                                    //     targetId,
                                    //     null,
                                    //     20,
                                    //     {
                                    //         onSuccess(list) {
                                    //             console.log(list);
                                    //         },
                                    //         onError(error) {
                                    //             console.log(error);
                                    //         }
                                    //     }
                                    // );
                                },
                                onTokenIncorrect: function() {
                                    console.log("token无效");
                                },
                                onError: function(errorCode) {
                                    console.log(errorCode);
                                    let info = "";
                                    switch (errorCode) {
                                        case RongIMLib.ErrorCode.TIMEOUT:
                                            info = "超时";
                                            break;
                                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                                            info = "未知错误";
                                            break;
                                        case RongIMLib.ErrorCode
                                            .UNACCEPTABLE_PaROTOCOL_VERSION:
                                            info = "不可接受的协议版本";
                                            break;
                                        case RongIMLib.ErrorCode
                                            .IDENTIFIER_REJECTED:
                                            info = "appkey不正确";
                                            break;
                                        case RongIMLib.ErrorCode
                                            .SERVER_UNAVAILABLE:
                                            info = "服务器不可用";
                                            break;
                                    }
                                    message.error(info);
                                }
                            }
                        );
                        // 设置连接监听状态 （ status 标识当前连接状态） // 连接状态监听器
                        RongIMClient.setConnectionStatusListener({
                            onChanged: function(status) {
                                action(() => {
                                    self.store.isConnect = false;
                                })();
                                switch (status) {
                                    case RongIMLib.ConnectionStatus.CONNECTED:
                                        console.log("链接成功");
                                        action(() => {
                                            self.store.isConnect = true;
                                        })();
                                        break;
                                    case RongIMLib.ConnectionStatus.CONNECTING:
                                        console.log("正在链接");
                                        break;
                                    case RongIMLib.ConnectionStatus
                                        .DISCONNECTED:
                                        console.log("断开连接");
                                        break;
                                    case RongIMLib.ConnectionStatus
                                        .KICKED_OFFLINE_BY_OTHER_CLIENT:
                                        console.log("其他设备登陆");
                                        break;
                                    case RongIMLib.ConnectionStatus
                                        .NETWORK_UNAVAILABLE:
                                        console.log("网络不可用");
                                        break;
                                }
                            }
                        });
                        RongIMClient.setOnReceiveMessageListener({
                            onReceived: function(message) {
                                const data = { ...message };
                                switch (data.messageType) {
                                    case RongIMClient.MessageType.TextMessage:
                                        self.flash_title();
                                        action(() => {
                                            self.store.list.push(data);
                                        })();
                                        break;
                                    case RongIMClient.MessageType.ImageMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .DiscussionNotificationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .LocationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .RichContentMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .DiscussionNotificationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .InformationNotificationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .ContactNotificationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .ProfileNotificationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .CommandNotificationMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .CommandMessage:
                                        break;
                                    case RongIMClient.MessageType
                                        .UnknownMessage:
                                        break;
                                    default:
                                }
                            }
                        });
                    }
                );
            }
        );
    }
    render() {
        const {
            content,
            list,
            isConnect,
            leftHeader,
            rightHeader
        } = this.store;
        const curUserId = Base.getPageParams("id");
        const items = list.map((item, index) => {
            const { content, senderUserId } = item;
            const key = curUserId === senderUserId ? "right" : "left";
            const header =
                curUserId === senderUserId ? rightHeader : leftHeader;
            return (
                <div className={`${key}d`} key={index}>
                    <img src={header} alt="" className="header" />
                    <div className={`speech ${key}`}> {content.content} </div>
                </div>
            );
        });
        return (
            <div className="IMPanel">
                <div className="chat-con">{items}</div>
                <div className="input-con">
                    <TextArea
                        className="textarea-con"
                        onChange={this.onMsgChange}
                        rows={4}
                        value={content}
                    />
                    <Button
                        disabled={!isConnect}
                        onClick={this.onSend}
                        type="primary"
                    >
                        发送
                    </Button>
                </div>
            </div>
        );
    }
}
