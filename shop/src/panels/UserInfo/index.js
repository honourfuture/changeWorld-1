import React from "react";
import { BaseComponent, Base } from "../../common";
import "./UserInfo.less";

export default class UserInfo extends BaseComponent {
    store = { data: {} };
    componentDidMount() {
        Base.GET({ act: "user", op: "info" }, res => {
            this.store.data = res.data;
        });
    }

    render() {
        const { user = {}, collection, fans, follow, lv } = this.store.data;
        const { nickname, header, mobi, exp } = user;
        return (
            <div className="UserInfo">
                <img className="header" src={Base.getImgUrl(header)} alt="" />
                <div className="item-con">
                    <span>昵称：</span>
                    <span>{nickname}</span>
                </div>
                <div className="item-con">
                    <span>手机号：</span>
                    <span>{mobi}</span>
                </div>
                <div className="item-con">
                    <span>关注量：</span>
                    <span>{follow}</span>
                </div>
                <div className="item-con">
                    <span>收藏量：</span>
                    <span>{collection}</span>
                </div>
                <div className="item-con">
                    <span>粉丝：</span>
                    <span>{fans}</span>
                </div>
                <div className="item-con">
                    <span>等级：</span>
                    <span>{lv}</span>
                </div>
                <div className="item-con">
                    <span>经验值：</span>
                    <span>{exp}</span>
                </div>
            </div>
        );
    }
}
