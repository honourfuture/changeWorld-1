import React from "react";
import { BaseComponent, Base } from "../../common";
import { NavBar, Button, Flex, Toast } from "antd-mobile";
import { icon, share } from "../../images";
import "./Share.less";
import { action } from "mobx";
const { offsetWidth, offsetHeight } = document.body;
const middleW = (offsetWidth * 625) / 1125;
const middleH = (offsetHeight * 1150) / 1860;
const middleL = (offsetWidth * 250) / 1125;
const middleT = (offsetHeight * 250) / 1860;
const paddingL = (offsetWidth * 34) / 1125;
const paddingT = (offsetHeight * 144) / 1860;

export default class Share extends BaseComponent {
    store = { point: 0, iosUrl: "", andoridUrl: "" };
    type = Base.getPageParams("type") || 0;
    @action.bound
    onReceive() {
        const { mobi } = this;
        if (!Base.checkMobile(mobi)) {
            return Toast.fail("请输入正确的手机号");
        }
        const { invite_uid } = Base.getPageParams();
        Base.POST({ act: "share", op: "register", mobi, invite_uid }, res => {
            Toast.fail("恭喜您，领取成功，下载APP立刻体验吧！");
        });
    }
    @action.bound
    onDown() {
        // if (Base.isWechat) {
        //     window.location.href = "下载地址";
        // } else {
        if (Base.isIos) {
            window.location.href = this.store.iosUrl || "";
        } else {
            window.location.href = this.store.andoridUrl || "";
        }
        // }
    }
    componentDidMount() {
        Base.GET({ act: "share", op: "index" }, res => {
            const { point, app } = res.data;
            this.store.point = point;
            this.store.iosUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 0) ||
                {}
            ).url;
            this.store.andoridUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 1) ||
                {}
            ).url;
        });
    }
    render() {
        const { point } = this.store;
        let { type = 0, bg = "" } = Base.getPageParams();
        bg = unescape(bg);
        let middleCon = null;
        if (bg) {
            middleCon = (
                <div
                    className="middle-con"
                    style={{
                        backgroundImage: `url(${Base.getImgUrl(bg)})`,
                        width: middleW,
                        height: middleH,
                        left: middleL,
                        top: middleT
                    }}
                >
                    <img
                        src={share.mobile_bg}
                        style={{
                            width: middleW + 2 * paddingL,
                            height: middleH + 2 * paddingT,
                            marginLeft: -paddingL,
                            marginTop: -paddingT
                        }}
                        alt=""
                    />
                </div>
            );
        }
        return (
            <div className="Share">
                <div
                    className="content"
                    style={{
                        backgroundImage: `url(${
                            share["share_bg_" + this.type]
                        })`
                    }}
                >
                    {middleCon}
                    <div className="operation-con">
                        <div className="integral-con">
                            <Flex className="icon-con">
                                <img src={icon.logo} alt="" />
                                <div className="tips-con">
                                    <div className="title">猪买单</div>
                                    <div className="tips">
                                        下载APP 立送{point}积分
                                    </div>
                                </div>
                            </Flex>
                            <Flex className="receive-con" justify="between">
                                <input
                                    onChange={e => (this.mobi = e.target.value)}
                                    placeholder="填写手机号"
                                    type="number"
                                />
                                <div
                                    className="receive"
                                    onClick={this.onReceive}
                                >
                                    领取
                                </div>
                            </Flex>
                        </div>
                        {Base.isIos ? (
                            <Button onClick={this.onDown} className="ios">
                                <img src={icon.ios} alt="" />
                                iPhone版下载
                            </Button>
                        ) : (
                            <Button onClick={this.onDown} className="android">
                                <img src={icon.android} alt="" />
                                Android版下载
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
