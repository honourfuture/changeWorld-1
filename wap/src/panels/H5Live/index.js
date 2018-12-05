import React from "react";
import { BaseComponent, Base } from "../../common";
import { Flex } from "antd-mobile";
import "./H5Live.less";
import { action } from "mobx";
import { icon } from "../../images";

export default class H5Live extends BaseComponent {
    store = { info: {} };
    componentDidMount() {
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
                            coverpic: {
                                style: "cover",
                                src: Base.getImgUrl(res.data.cover_image)
                            },
                            autoplay: true,
                            live: true,
                            width: document.body.offsetWidth,
                            height: document.body.offsetHeight,
                            x5_type: "h5",
                            live: true,
                            wording: {
                                1: "该直播已停止直播，下载app和她私聊吧",
                                2: "该直播已停止直播，下载app和她私聊吧",
                                3: "该直播已停止直播，下载app和她私聊吧"
                                // 2048: "请求m3u8文件失败，可能是网络错误或者跨域问题"
                            },
                            controls: "none"
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
        const { views, nickname, chat_room_id, header } = this.store.info;
        return (
            <div className="H5Live">
                <div id="video-container" />
                <div className="top-con">
                    <Flex justify="between">
                        <Flex className="left-con">
                            <img
                                className="header"
                                src={header || icon.logo}
                                alt=""
                            />
                            <div className="name-con">
                                <div className="name">{nickname}</div>
                                <div className="view">{views}人</div>
                            </div>
                        </Flex>
                        <div onClick={this.onDown} className="down-con">
                            打开猪买单 关注主播
                        </div>
                    </Flex>
                    <span className="room-id-con">
                        房间号：
                        {chat_room_id}
                    </span>
                </div>
                <div className="bottom-con">
                    <div className="tips">
                        欢迎来到【猪买单平台】，请遵守国家相关法律，祝您愉快
                    </div>
                    <Flex onClick={this.onDown} justify="between">
                        <Flex className="left-con">
                            <img src={icon.logo} alt="" />
                            <img src={icon.logo} alt="" />
                        </Flex>
                        <Flex className="right-con">
                            <img src={icon.logo} alt="" />
                            <img src={icon.logo} alt="" />
                            <img src={icon.logo} alt="" />
                        </Flex>
                    </Flex>
                </div>
            </div>
        );
    }
}
