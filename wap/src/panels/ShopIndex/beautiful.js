import React from "react";
import { BaseComponent, Base } from "../../common";
import { Flex, Tabs, SearchBar, NavBar, Badge } from "antd-mobile";
import "./ShopIndex.less";

import { icon } from "../../images";
import { Hots } from "../../components/Hots";
import { Vanity } from "../../components/Vanity";

export default class ShopIndex extends BaseComponent {
    store = { tabs: [], cartCount: 0, reddot: 0, keyword: "", cardTotal: 0 };
    onSearch(e) {
        Base.sendEvt("com.shopindex.search", e);
    }
    componentDidMount() {
        Base.GET({ act: "goods_class", op: "index" }, res => {
            // const list = res.data.filter(item => parseInt(item.enable));
            const tabs = res.data.map(item => {
                const { id, name } = item;
                return { key: id, title: name, component: <Hots id={id} /> };
            });
            tabs.unshift({
                key: -1,
                title: "热门",
                component: <Hots is_hot={1} id={0} />
            });
            tabs.splice(1, 0, { key: 0, title: "靓号", component: <Vanity /> });
            this.store.tabs = tabs;
        });
        // Base.GET(
        //     { act: "cart", op: "count", mod: "user" },
        //     res => {
        //         this.store.cartCount = res.data.count;
        //     },
        //     null,
        //     true
        // );
        Base.GET({ act: "cart", op: "count", mod: "user" }, res => {
            const data = res.data;
            this.store.cardTotal = data.count;
        },
        null,
        true);
        Base.GET(
            { act: "mailbox", op: "reddot" },
            res => {
                this.store.reddot = parseInt(res.data.reddot) > 0;
            },
            null,
            true
        );
    }
    renderContent = tab => tab.component;
    render() {
        const { tabs, cartCount, reddot, cardTotal } = this.store;
        console.log('1', this.props.id)
        return (
            <div className="ShopIndex">
                <NavBar
                    className="search-con"
                    mode="light"
                    icon={<img src={icon.email} alt="" />}
                    leftContent={
                        reddot ? (
                            <Badge dot>
                                <span />
                            </Badge>
                        ) : null
                    }
                    onLeftClick={() => Base.push("MessageCenter")}
                    rightContent={
                        <Flex
                            className="right-cont"
                            onClick={() => Base.push("ShopCart")}
                        >
                            <img src={icon.indexCart} alt="" />
                            <span>{cardTotal}</span>
                            {parseInt(cartCount) > 0 ? (
                                <Badge text={cartCount} overflowCount={99}>
                                    <span />
                                </Badge>
                            ) : null}
                        </Flex>
                    }
                >
                    <SearchBar
                        placeholder="商品或产品名称"
                        onSubmit={this.onSearch}
                    />
                </NavBar>
                <div className="nav-tabs">
                    <Tabs
                        className="nav-tabs"
                        tabs={tabs}
                        initialPage={1}
                        swipeable={false}
                        prerenderingSiblingsNumber={0}
                    >
                        {this.renderContent}
                    </Tabs>
                </div>
            </div>
        );
    }
}
