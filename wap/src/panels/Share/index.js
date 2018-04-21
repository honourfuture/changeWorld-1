import React from "react";
import { BaseComponent, Base } from "../../common";
import { NavBar, Button, Flex, Toast } from "antd-mobile";
import { icon, share } from "../../images";
import "./Share.less";
import { action } from "mobx";

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
        return (
            <div className="Share">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    手机客户端下载
                </NavBar>
                <div
                    className="base-content content"
                    style={{
                        backgroundImage: `url(${
                            share["share_bg_" + this.type]
                        })`
                    }}
                >
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
