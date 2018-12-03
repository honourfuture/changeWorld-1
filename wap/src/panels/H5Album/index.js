import React from "react";
import { Flex, Button, Toast, Modal } from "antd-mobile";
import { BaseComponent, Base, Global } from "../../common";
import "./H5Album.less";
import { h5 } from "../../images";
import { action } from "mobx";
const wImg = document.body.offsetWidth;
export default class H5Album extends BaseComponent {
    store = {
        info: {},
        play_id: -1,
        play_list: [],
        iosUrl: "",
        andoridUrl: "",
        audio: {},
        pageIndex: 10,
        modal_name: "",
        modal_type: "音频"
    };
    componentDidMount() {
        const id = Base.getPageParams("id");
        Base.GET({ act: "share", op: "index" }, res => {
            const { app } = res.data;
            this.store.iosUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 0) ||
                {}
            ).url;
            this.store.andoridUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 1) ||
                {}
            ).url;
            Base.GET({ act: "album", op: "view", id }, res => {
                this.store.info = res.data;
                if (parseFloat(res.data.price) > 0) {
                    this.store.modal_name = res.data.title;
                    this.store.modal_type = "专辑";
                }
                const { audio } = res.data;
                this.store.audio = res.data.audio[audio.length - 1] || {};
                this.store.play_list = res.data.audio.slice(0, -1);
                if (res.data.audio.length <= 11) {
                    this.store.pageIndex = null;
                }
            });
        });
    }
    @action.bound
    onPlay(id, price, title) {
        const { play_id } = this.store;
        if (parseFloat(price) > 0) {
            this.store.modal_type = "音频";
            return (this.store.modal_name = title);
        }
        const preAudio = this.refs[`audio_${play_id}`];
        if (preAudio) {
            preAudio.pause();
        }
        if (id === play_id) {
            this.store.play_id = -1;
        } else {
            this.store.play_id = id;
            const curAudio = this.refs[`audio_${id}`];
            if (curAudio) {
                curAudio.play();
            }
        }
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
        if (Base.isIos) {
            window.location.href = this.store.iosUrl || "";
        } else {
            window.location.href = this.store.andoridUrl || "";
        }
    }
    @action.bound
    onMore() {
        this.store.pageIndex = null;
    }
    render() {
        const {
            play_id,
            info,
            play_list,
            pageIndex,
            audio,
            modal_name,
            modal_type
        } = this.store;
        const { cover_image, title } = info;
        const { video_url } = audio;
        const list = pageIndex
            ? play_list.slice(0, pageIndex)
            : play_list.slice();
        const items = list.map(item => {
            const { id, price, title } = item;
            return (
                <Flex key={id} className="item-con">
                    <audio ref={`audio_${id}`} src={item.video_url} />
                    <img
                        onClick={() => this.onPlay(id, price, title)}
                        src={
                            play_id === id
                                ? h5.audio_stop_gray
                                : h5.audio_play_gray
                        }
                        alt=""
                    />
                    <div className="ellipsis2">{item.title}</div>
                </Flex>
            );
        });
        return (
            <div className="H5Album">
                <audio ref={`audio_${0}`} src={video_url} />
                <Flex
                    justify="center"
                    direction="column"
                    style={{
                        width: wImg,
                        height: wImg,
                        backgroundImage: `url(${h5.audio_bg})`
                    }}
                    className="bg-con"
                >
                    <Flex
                        justify="center"
                        className="cover-image"
                        style={{
                            backgroundImage: `url(${Base.getImgUrl(
                                cover_image
                            )})`
                        }}
                    >
                        <img
                            onClick={() =>
                                this.onPlay(0, audio.price, audio.title)
                            }
                            src={play_id === 0 ? h5.audio_stop : h5.audio_play}
                            alt=""
                        />
                        <Flex className="play-num-con">
                            <img src={h5.audio_play_num} alt="" />
                            <div>
                                {Base.getNumFormat(
                                    parseInt(info.play_times) / 10000,
                                    2
                                )}
                                万
                            </div>
                        </Flex>
                    </Flex>
                    <div className="title">{title}</div>
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
                        下载APP，完整收听
                    </Button>
                </Flex>
                <Flex className="user-info">音频({info.audio_num})</Flex>
                <div className="audio-list-con">{items}</div>
                {pageIndex ? (
                    <div className="more" onClick={this.onMore}>
                        点击查看更多
                    </div>
                ) : null}
                <Modal
                    visible={!!modal_name}
                    transparent={true}
                    closable={true}
                    onClose={action(() => (this.store.modal_name = ""))}
                >
                    <div className="modal-title">
                        该{modal_type}为付费{modal_type}，请先购买{modal_type}
                        哦！
                    </div>
                    <div className="modal-label">
                        {modal_type}名称：<span>{modal_name}</span>
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
