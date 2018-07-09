import React from "react";
import { NavBar } from "antd-mobile";
import { BaseComponent, Base } from "../../common";
import "./ArticleDetail.less";
import { icon } from "../../images";

const config = {
    about_us: "关于我们",
    join_us: "加入我们",
    contact_us: "联系我们",
    protocol: "用户协议",
    copyright: "版权申明",
    protocol_shop: "店铺协议",
    rule_shop: "平台规则"
};
export default class ArticleDetail extends BaseComponent {
    store = { data: {} };
    componentDidMount() {
        const { alias } = Base.getPageParams();
        Base.GET({ act: "article", op: "page_view", alias }, res => {
            this.store.data = res.data;
        });
    }
    render() {
        const { data } = this.store;
        const { alias } = Base.getPageParams();
        const title = config[alias];
        return (
            <div className="ArticleDetail">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    {title || "详情"}
                </NavBar>
                <div className="base-content">
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>
            </div>
        );
    }
}
