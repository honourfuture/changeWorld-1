import React from "react";
import { Flex, Button, Toast, Modal } from "antd-mobile";
import { BaseComponent, Base, Global } from "../../common";
import "./H5Audio.less";
import { h5 } from "../../images";
import { action } from "mobx";
import AudioPlayer from "react-h5-audio-player";
const wImg = document.body.offsetWidth;
export default class H5Audio extends BaseComponent {
    store = {
        info: {},
        play_id: -1,
        play_list: [],
        commentList: null,
        iosUrl: "",
        andoridUrl: "",
        pageIndex: 10,
        modal_name: ""
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
            Base.GET({ act: "audio", op: "play", id }, res => {
                this.store.info = res.data;
                Base.GET(
                    { act: "album", op: "view", id: res.data.audio.album_id },
                    res => {
                        this.store.play_list = res.data.audio.filter(
                            item => item.id !== id
                        );
                        if (res.data.audio.length <= 11) {
                            this.store.pageIndex = null;
                        }
                        Base.GET(
                            {
                                act: "user",
                                op: "album_audio_comment",
                                audio_id: id
                            },
                            res => {
                                this.store.commentList = res.data.list.slice(
                                    0,
                                    15
                                );
                            }
                        );
                    }
                );
            });
        });
    }
    @action.bound
    onPlay(id, price, title) {
        const { play_id } = this.store;
        if (parseFloat(price) > 0) {
            return (this.store.modal_name = title);
        }
        const preAudio = this.refs[`audio_${play_id}`];
        if (preAudio) {
            preAudio.audio.pause();
        }
        if (id === play_id) {
            this.store.play_id = -1;
        } else {
            this.store.play_id = id;
            const curAudio = this.refs[`audio_${id}`];
            if (curAudio) {
                curAudio.audio.play();
            }
        }
    }
    @action.bound
    onMore() {
        this.store.pageIndex = null;
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
    render() {
        const {
            play_id,
            info,
            play_list,
            pageIndex,
            commentList,
            modal_name
        } = this.store;
        const { audio = {}, user = {}, album = {} } = info;
        const { cover_image, title, video_url } = audio;
        const { header = "" } = user;
        const list = pageIndex
            ? play_list.slice(0, pageIndex)
            : play_list.slice();
        const invite_uid = Base.getPageParams("invite_uid");
        const items = list.map(item => {
            const { id, price, title } = item;
            return (
                <Flex
                    key={id}
                    className="item-con"
                    onClick={() => {
                        Base.push("H5Audio", { id, invite_uid });
                        window.location.reload();
                    }}
                >
                    <img
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
        const commentItems = (commentList || []).map(item => {
            return (
                <Flex key={item.id} className="comment-item">
                    <img src={Base.getImgUrl(item.header)} alt="" />
                    <div className="comment-info">
                        <div className="name">{item.nickname}</div>
                        <div className="content">{item.comment}</div>
                    </div>
                </Flex>
            );
        });
        return (
            <div className="H5Audio">
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
                                    parseInt(audio.play_times) / 10000,
                                    2
                                )}
                                万
                            </div>
                        </Flex>
                    </Flex>
                    <div className="title">{title}</div>
                    <div className="audio-player-con">
                        <AudioPlayer
                            autoPlay
                            className="audio-player"
                            ref={`audio_${0}`}
                            src={video_url}
                            onPlay={action(() => (this.store.play_id = 0))}
                        />
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
                        下载APP，完整收听
                    </Button>
                </Flex>
                <Flex className="user-info">
                    <img
                        className="header"
                        src={Base.getImgUrl(header)}
                        alt=""
                    />
                    <div>
                        <div className="title">{album.title}</div>
                        <Flex className="num-con">
                            <div>
                                {Base.getNumFormat(album.favorite / 10000, 2)}
                                万收藏
                            </div>
                            <div className="num">{album.audio_num}集</div>
                        </Flex>
                    </div>
                </Flex>
                <div className="audio-list-con">{items}</div>
                {pageIndex ? (
                    <div className="more" onClick={this.onMore}>
                        点击查看更多
                    </div>
                ) : null}
                <div className="comment-con">
                    <div className="title">热门评论</div>
                    <div>
                        {commentItems.length > 0 ? (
                            commentItems
                        ) : (
                            <div className="nodata">暂无评论</div>
                        )}
                    </div>
                </div>
                <div className="more" onClick={this.onDown}>
                    点击查看更多
                </div>
                <Modal
                    visible={!!modal_name}
                    transparent={true}
                    closable={true}
                    onClose={action(() => (this.store.modal_name = ""))}
                >
                    <div className="modal-title">
                        该音频为付费音频，请先购买音频哦！
                    </div>
                    <div className="modal-label">
                        音频名称：<span>{modal_name}</span>
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
