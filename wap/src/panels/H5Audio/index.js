import React from "react";
import { Flex, Button, Toast } from "antd-mobile";
import { BaseComponent, Base, Global } from "../../common";
import "./H5Audio.less";
import { h5 } from "../../images";
import { action } from "mobx";
const wImg = document.body.offsetWidth;
export default class H5Audio extends BaseComponent {
    store = {
        info: {},
        play_id: -1,
        play_list: [],
        commentList: null,
        iosUrl: "",
        andoridUrl: ""
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
                        this.store.play_list = res.data.audio
                            .filter(item => item.id !== id)
                            .slice(0, 10);
                    }
                );
            });
        });
    }
    @action.bound
    onPlay(id) {
        const { play_id } = this.store;
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
    onMore() {
        Base.GET(
            {
                act: "user",
                op: "album_audio_comment",
                audio_id: this.store.info.audio.id
            },
            res => {
                this.store.commentList = res.data.list.slice(0, 10);
            }
        );
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
        const { play_id, info, play_list, commentList } = this.store;
        const { audio = {}, user = {}, album = {} } = info;
        const { cover_image, title, video_url } = audio;
        const { header = "" } = user;
        const items = play_list.map(item => {
            const { id } = item;
            return (
                <Flex key={id} className="item-con">
                    <audio ref={`audio_${id}`} src={item.video_url} />
                    <img
                        onClick={() => this.onPlay(id)}
                        src={
                            play_id === id
                                ? h5.audio_stop_gray
                                : h5.audio_play_gray
                        }
                        alt=""
                    />
                    <div className="ellipsis">{item.title}</div>
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
                            onClick={() => this.onPlay(0)}
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
                {!commentList ? (
                    <div className="more" onClick={this.onMore}>
                        点击查看更多
                    </div>
                ) : commentItems.length > 0 ? (
                    <div className="comment-con">
                        <div className="title">热门评论</div>
                        <div>{commentItems}</div>
                    </div>
                ) : (
                    <div className="nodata">暂无评论</div>
                )}
            </div>
        );
    }
}
