import React from "react";
import { BaseComponent, Base } from "../../common";
import { Flex, Carousel, Modal, Button, Toast, Input } from "antd-mobile";
import "./H5Live.less";
import { action } from "mobx";
import { icon, h5 } from "../../images";
const width = document.body.offsetWidth;
const height = document.body.offsetHeight;
export default class H5Live extends BaseComponent {
    store = {
        info: {},
        imgHeight: (width * 500) / 700,
        list: [],
        carouselList: [],
        rebagData: {},
        isShowDown: false,
        errorMsg: "",
        showPlay: Base.isWechat
    };
    RongInit(app_key, token, succ, receive) {
        const { RongIMClient, RongIMLib } = window;
        RongIMClient.init(app_key);
        RongIMClient.connect(
            token,
            {
                onSuccess: function(userId) {
                    console.log("Login successfully." + userId);
                    succ && succ();
                    let chatRoomId = Base.getPageParams("room_id"); // 聊天室 Id。
                    let count = 10; // 拉取最近聊天最多 50 条。
                    RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
                        onSuccess: function() {
                            // 加入聊天室成功。
                        },
                        onError: function(error) {
                            // 加入聊天室失败
                        }
                    });
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
                    Base.token(info);
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
                // console.log(data);
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
    componentDidUpdate() {
        this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight;
    }
    componentDidMount() {
        const self = this;
        document.body.addEventListener(
            "touchstart",
            action(() => {
                this.store.showPlay = false;
            }),
            false
        );
        Base.loadJs(
            "//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer-2.2.2.js",
            () => {
                Base.GET(
                    {
                        act: "room",
                        op: "in",
                        isNotNeedAuth: true,
                        room_id: Base.getPageParams("room_id")
                    },
                    res => {
                        this.store.info = res.data;
                        var options = {
                            m3u8: res.data.play_url.m3u8,
                            // coverpic: {
                            //     style: "cover",
                            //     src:
                            //         // Base.getImgUrl(res.data.cover_image) ||
                            //         h5.live_bg
                            // },
                            autoplay: true,
                            live: true,
                            width,
                            height,
                            x5_type: "h5",
                            wording: {
                                1: "该直播已停止直播，下载app和她私聊吧",
                                2: "该直播已停止直播，下载app和她私聊吧",
                                3: "该直播已停止直播，下载app和她私聊吧"
                                // 2048: "请求m3u8文件失败，可能是网络错误或者跨域问题"
                            },
                            controls: "none",
                            listener(msg) {
                                // console.log(msg);
                                if (msg.type == "error") {
                                    action(
                                        () =>
                                            (self.store.errorMsg =
                                                "该直播已停止直播，下载app和她私聊吧")
                                    )();
                                    // } else if (msg.type == "load") {
                                    //     // if (window.qcplayer) {
                                    //         // window.qcplayer.play();
                                    //     }
                                }
                            }
                        };

                        var player = new window.TcPlayer(
                            "video-container",
                            options
                        );
                        window.qcplayer = player;
                    }
                );
            }
        );
        Base.GET({ act: "chat", op: "token" }, res => {
            const { app_key, token } = res.data;
            const self = this;
            Base.loadJs("http://cdn.ronghub.com/RongIMLib-2.3.3.min.js", () => {
                self.RongInit(
                    app_key,
                    token,
                    () => {},
                    action(data => {
                        let { content } = data.content;
                        try {
                            content = JSON.parse(content);
                        } catch (error) {
                            content = {};
                        }
                        const { cmd } = content;
                        const list = this.store.list.slice();
                        switch (cmd) {
                            case "enter_batch":
                                {
                                    const user = content.user || [];
                                    const items = user.map(item => {
                                        const { lv, name, userId } = item;
                                        return {
                                            cmd,
                                            lv,
                                            name,
                                            text: `${name}进入直播间`,
                                            userId
                                        };
                                    });
                                    this.store.list = list.concat(items);
                                }
                                break;
                            case "user":
                            case "system":
                                {
                                    const { lv, name, text, userId } = content;
                                    list.push({
                                        cmd,
                                        lv,
                                        name,
                                        text,
                                        userId
                                    });
                                    this.store.list = list;
                                }
                                break;
                            case "say_batch":
                                {
                                    const user = content.user || [];
                                    const items = user.map(item => {
                                        const { lv, name, userId, text } = item;
                                        return {
                                            cmd,
                                            lv,
                                            name,
                                            text,
                                            userId
                                        };
                                    });
                                    this.store.list = list.concat(items);
                                }
                                break;
                            case "PPT":
                                {
                                    const { images = [] } = content;
                                    this.store.carouselList = images;
                                }
                                break;
                            case "redPacket":
                                {
                                    const {
                                        lv,
                                        name,
                                        redPacketId,
                                        userId
                                    } = content;
                                    this.store.rebagData = {
                                        lv,
                                        name,
                                        userId,
                                        redPacketId
                                    };
                                }
                                break;
                            default:
                                break;
                        }
                    })
                );
            });
        });
    }
    @action.bound
    onReceive() {
        const { mobi } = this;
        if (!Base.checkMobile(mobi)) {
            return Toast.fail("请输入正确的手机号");
        }
        const { invite_uid } = Base.getPageParams();
        Base.POST(
            { act: "share", op: "register", mobi, invite_uid },
            res => {
                this.onDown();
            },
            err => {
                this.onDown();
            }
        );
    }
    @action.bound
    onDown() {
        Base.GET({ act: "share", op: "index", isNotNeedAuth: true }, res => {
            const { app } = res.data;
            const iosUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 0) ||
                {}
            ).url;
            const andoridUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 1) ||
                {}
            ).url;
            if (Base.isIos) {
                window.location.href = iosUrl || "";
            } else {
                window.location.href = andoridUrl || "";
            }
        });
    }
    render() {
        const {
            list,
            carouselList,
            rebagData,
            errorMsg,
            showPlay
        } = this.store;
        const {
            views,
            nickname,
            chat_room_id,
            header,
            price
        } = this.store.info;
        let isShowPrice = parseFloat(price) > 0;
        return (
            <div
                className="H5Live"
                style={{ backgroundImage: "url(" + h5.live_bg + ")" }}
            >
                {errorMsg ? (
                    <div className="errorMsg-con">{errorMsg}</div>
                ) : null}
                {showPlay ? (
                    <img className="play-icon" src={h5.audio_play} alt="" />
                ) : null}
                <div id="video-container" style={{ opacity: 0 }} />
                <div className="top-con">
                    <Flex justify="between">
                        <Flex className="left-con">
                            <img
                                className="header"
                                src={
                                    header ? Base.getImgUrl(header) : icon.logo
                                }
                                alt=""
                            />
                            <div className="name-con">
                                <div className="name">{nickname}</div>
                                <div className="view">{views}人</div>
                            </div>
                        </Flex>
                        <div
                            onClick={action(
                                () => (this.store.isShowDown = true)
                            )}
                            className="down-con"
                        >
                            打开 关注主播
                        </div>
                    </Flex>
                    <span className="room-id-con">
                        房间号：
                        {chat_room_id}
                    </span>
                </div>
                {carouselList.length > 0 ? (
                    <div className="carousel-con">
                        <Carousel autoplay={false} infinite>
                            {carouselList.map(val => (
                                <a
                                    key={Math.random()}
                                    style={{
                                        display: "inline-block",
                                        width: "100%",
                                        height: this.store.imgHeight
                                    }}
                                >
                                    <img
                                        src={val}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            verticalAlign: "top",
                                            height: this.store.imgHeight
                                        }}
                                        // onLoad={action(() => {
                                        // fire window resize event to change height
                                        // window.dispatchEvent(
                                        //     new Event("resize")
                                        // );
                                        // this.store.imgHeight = "auto";
                                        // })}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </div>
                ) : null}
                {rebagData.redPacketId ? (
                    <Flex
                        onClick={action(() => (this.store.isShowDown = true))}
                        direction="column"
                        justify="end"
                        className="bag-con"
                        style={{ backgroundImage: "url(" + h5.live_bag + ")" }}
                    >
                        <div>{rebagData.name}</div>
                        <div className="bottom-bag">的红包</div>
                    </Flex>
                ) : null}
                <div className="bottom-con">
                    <div className="scroll-con" ref="scroll">
                        <div className="tips">
                            欢迎来到【平台】，请遵守国家相关法律，祝您愉快
                        </div>
                        {list.map((item, index) => {
                            return (
                                <div
                                    key={`${item.userId}_${index}`}
                                    className="tips"
                                >
                                    <div className="vip-con">
                                        <img
                                            className="vip"
                                            src={h5.live_vip}
                                            alt=""
                                        />
                                        {item.lv}
                                    </div>
                                    <span>
                                        {[
                                            "user",
                                            "say_batch",
                                            "system"
                                        ].indexOf(item.cmd) >= 0 ? (
                                            <span>
                                                {`${item.name}:`}
                                                <span style={{ color: "#fff" }}>
                                                    {item.text}
                                                </span>
                                            </span>
                                        ) : (
                                            <span>{item.text}</span>
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <Flex
                        onClick={action(() => (this.store.isShowDown = true))}
                        justify="between"
                    >
                        <Flex className="left-con">
                            <img src={h5.live_0} alt="" />
                            <img src={h5.live_1} alt="" />
                        </Flex>
                        <Flex className="right-con">
                            <img src={h5.live_2} alt="" />
                            <img src={h5.live_3} alt="" />
                            <img src={h5.live_4} alt="" />
                        </Flex>
                    </Flex>
                </div>
                <Modal
                    visible={this.store.isShowDown || isShowPrice}
                    transparent={true}
                    closable={!isShowPrice}
                    onClose={action(() => (this.store.isShowDown = false))}
                >
                    <div
                        style={{ textAlign: "center", marginBottom: 20 }}
                        className="modal-title"
                    >
                        {isShowPrice
                            ? "该直播为付费直播，请到app进行收听"
                            : "下载APP，体验更多精彩内容哦"}
                    </div>
                    <input
                        className="mobi-input"
                        type="number"
                        placeholder="请输入手机号"
                        onChange={e => (this.mobi = e.target.value)}
                    />
                    <Button
                        onClick={this.onReceive}
                        className="open-btn"
                        type="warning"
                    >
                        下载APP
                    </Button>
                </Modal>
            </div>
        );
    }
}
