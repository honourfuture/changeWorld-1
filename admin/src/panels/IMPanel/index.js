import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { message, Input, Button } from "antd";
import "./IMPanel.less";
const { TextArea } = Input;

export default class IMPanel extends BaseComponent {
    userList = [];
    handlerUserData(userData) {
        const { header, nickname, id } = userData;
        return {
            username: nickname,
            id: id, //好友ID
            avatar: header
                ? Base.getImgUrl(header)
                : require("../../images/user.png"), //好友头像
            sign: `ID:${id}`, //好友签名
            status: "online" //若值为offline代表离线，online或者不填为在线
        };
    }
    sendMsg(content, toid) {
        const { RongIMClient, RongIMLib } = window;
        // 定义消息类型,文字消息使用 RongIMLib.TextMessage
        let msg = new RongIMLib.TextMessage({
            content,
            extra: ""
        });
        //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
        //let msg = RongIMLib.TextMessage.obtain("hello");
        let conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
        let targetId = toid; // 目标 Id
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
    RongInit(app_key, token, succ, receive) {
        const self = this;
        const { RongIMClient, RongIMLib } = window;
        RongIMClient.init(app_key);
        RongIMClient.connect(
            token,
            {
                onSuccess: function(userId) {
                    console.log("Login successfully." + userId);
                    succ && succ();
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
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = "不可接受的协议版本";
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = "appkey不正确";
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = "服务器不可用";
                            break;
                    }
                    message.error(info);
                }
            }
        );
        RongIMClient.setConnectionStatusListener({
            onChanged: function(status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log("链接成功");
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log("正在链接");
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log("断开连接");
                        break;
                    case RongIMLib.ConnectionStatus
                        .KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log("其他设备登陆");
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log("网络不可用");
                        break;
                }
            }
        });
        RongIMClient.setOnReceiveMessageListener({
            onReceived: function(message) {
                const data = { ...message };
                if (data.messageType === RongIMClient.MessageType.TextMessage) {
                    receive && receive(data);
                }
                // switch (data.messageType) {
                //     case RongIMClient.MessageType.TextMessage:
                //         break;
                //     case RongIMClient.MessageType.ImageMessage:
                //         break;
                //     case RongIMClient.MessageType.DiscussionNotificationMessage:
                //         break;
                //     case RongIMClient.MessageType.LocationMessage:
                //         break;
                //     case RongIMClient.MessageType.RichContentMessage:
                //         break;
                //     case RongIMClient.MessageType.DiscussionNotificationMessage:
                //         break;
                //     case RongIMClient.MessageType
                //         .InformationNotificationMessage:
                //         break;
                //     case RongIMClient.MessageType.ContactNotificationMessage:
                //         break;
                //     case RongIMClient.MessageType.ProfileNotificationMessage:
                //         break;
                //     case RongIMClient.MessageType.CommandNotificationMessage:
                //         break;
                //     case RongIMClient.MessageType.CommandMessage:
                //         break;
                //     case RongIMClient.MessageType.UnknownMessage:
                //         break;
                //     default:
                // }
            }
        });
    }
    @action.bound
    setMessage(data) {
        console.log(data);
        if (this.layim) {
            const { nickname, id, header, content } = data;
            this.layim.getMessage({
                username: nickname, //消息来源用户名
                avatar: header
                    ? Base.getImgUrl(header)
                    : require("../../images/user.png"), //消息来源用户头像
                id, //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                type: "friend", //聊天窗口来源类型，从发送消息传递的to里面获取
                content, //消息内容
                mine: false, //是否我发送的消息，如果为true，则会显示在右方
                fromid: id, //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                timestamp: Date.now()
            });
        }
    }
    componentDidMount() {
        let targetId = Base.getPageParams("targetId");
        console.log(targetId);
        const id = Base.getPageParams("id");
        try {
            targetId = JSON.parse(targetId) || [];
            targetId = targetId.join(",");
        } catch (error) {}
        console.log(targetId);
        const { layui } = window;
        const self = this;
        Base.GET(
            { act: "chat", op: "token", robot_id: Base.getPageParams("id") },
            res => {
                const { app_key, token } = res.data;
                Base.loadJs(
                    "http://cdn.ronghub.com/RongIMLib-2.3.3.min.js",
                    () => {
                        self.RongInit(
                            app_key,
                            token,
                            () => {
                                Base.GET(
                                    {
                                        act: "info",
                                        op: "bitch",
                                        mod: "user",
                                        s_uid: targetId
                                    },
                                    targetRes => {
                                        self.userList = targetRes.data;
                                        const list = targetRes.data.map(item =>
                                            self.handlerUserData(item)
                                        );
                                        const friend = [
                                            {
                                                groupname: "主播",
                                                id: "1",
                                                list
                                            }
                                        ];
                                        Base.GET(
                                            {
                                                act: "info",
                                                op: "bitch",
                                                mod: "user",
                                                s_uid: id
                                            },
                                            res => {
                                                const mineData = res.data[0];
                                                document.title =
                                                    mineData.nickname;
                                                const mine = {
                                                    ...self.handlerUserData(
                                                        mineData
                                                    )
                                                };

                                                layui.use(["layim"], function(
                                                    layim
                                                ) {
                                                    self.layim = layim;
                                                    //基础配置
                                                    layim.config({
                                                        // right: `${window
                                                        //     .document.body
                                                        //     .offsetWidth -
                                                        //     200}px`,
                                                        title: "我的聊天",
                                                        isgroup: false,
                                                        init: {
                                                            mine,
                                                            friend
                                                        } //获取主面板列表信息，下文会做进一步介绍

                                                        //上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
                                                        // uploadImage: {
                                                        //     url: `${
                                                        //         Global.UPLOAD_URL
                                                        //     }`, //接口地址
                                                        //     type: "post", //默认post
                                                        //     data: {
                                                        //         field: "field"
                                                        //     }
                                                        // }

                                                        // msgbox:
                                                        //     layui.cache.dir +
                                                        //     "css/modules/layim/html/msgbox.html", //消息盒子页面地址，若不开启，剔除该项即可
                                                        // find:
                                                        //     layui.cache.dir +
                                                        //     "css/modules/layim/html/find.html", //发现页面地址，若不开启，剔除该项即可
                                                        // chatLog:
                                                        //     layui.cache.dir +
                                                        //     "css/modules/layim/html/chatlog.html" //聊天记录页面地址，若不开启，剔除该项即可
                                                    });
                                                    layim.on(
                                                        "sendMessage",
                                                        function(res) {
                                                            const {
                                                                mine,
                                                                to
                                                            } = res;
                                                            console.log(
                                                                mine,
                                                                to
                                                            );
                                                            self.sendMsg(
                                                                mine.content,
                                                                to.id
                                                            );
                                                        }
                                                    );
                                                });
                                            }
                                        );
                                    }
                                );
                            },
                            data => {
                                console.log(data);
                                const { user, content } = data.content;
                                const { id } = user;
                                if (self.layim) {
                                    const userData = self.userList.find(
                                        item => item.id == id
                                    );
                                    if (userData) {
                                        self.setMessage({
                                            ...userData,
                                            content
                                        });
                                    } else {
                                        Base.GET(
                                            {
                                                act: "info",
                                                op: "bitch",
                                                mod: "user",
                                                s_uid: id
                                            },
                                            res => {
                                                const newUerData = res.data[0];
                                                self.layim.addList({
                                                    ...self.handlerUserData(
                                                        newUerData
                                                    ),
                                                    groupid: 1,
                                                    type: "friend"
                                                });
                                                self.userList.push(newUerData);
                                                self.setMessage({
                                                    ...newUerData,
                                                    content
                                                });
                                            }
                                        );
                                    }
                                }
                            }
                        );
                    }
                );
            }
        );
    }

    render() {
        return <div className="IMPanel" />;
    }
}
