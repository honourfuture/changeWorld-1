import React from "react";
import { BaseComponent, Base, NetImg } from "../../common";
import { Flex, NavBar, WhiteSpace, List, Badge } from "antd-mobile";
import "./UserCenter.less";
import { icon, userCenter } from "../../images";
const Item = List.Item;
const orderSatus = [
    { title: "待付款", key: 0, img: userCenter.dfkIco },
    { title: "待发货", key: 2, img: userCenter.dfhIco },
    { title: "待收货", key: 3, img: userCenter.dshIco },
    { title: "待评价", key: 4, img: userCenter.dpjIco },
    { title: "已完成", key: 5, img: userCenter.ywcIco },
    { title: "退货", key: -2, img: userCenter.thIco }
];
export default class UserCenter extends BaseComponent {
    store = { data: {} };
    componentDidMount() {
        Base.POST({ act: "shop", op: "index", mod: "user" }, res => {
            console.log(res);
            this.store.data = res.data;
        });
    }
    render() {
        const {
            header,
            nickname,
            buyer = {},
            seller = {},
            is_seller,
            anchor
        } = this.store.data;
        const buyerItems = [];
        const sellerItems = [];
        orderSatus.forEach((item, index) => {
            const { title, key, pageNum, img } = item;
            buyerItems.push(
                <Flex.Item
                    key={index}
                    onClick={() =>
                        Base.push("MyOrder", { index: key, pageNum: index + 1 })
                    }
                    className="Item"
                    align="center"
                >
                    <img src={img} className="uIco" alt="" />
                    {buyer[key] > 0 && index !== 5 ? (
                        <Badge text={buyer[key]} overflowCount={99}>
                            <span />
                        </Badge>
                    ) : null}
                    <div className="uTit">{title}</div>
                </Flex.Item>
            );
            sellerItems.push(
                <Flex.Item
                    key={index}
                    onClick={() =>
                        Base.push("SellOrder", {
                            index: key,
                            pageNum: index + 1
                        })
                    }
                    className="Item"
                    align="center"
                >
                    <img src={img} className="uIco" alt="" />
                    {seller[key] > 0 && index !== 5 ? (
                        <Badge text={seller[key]} overflowCount={99}>
                            <span />
                        </Badge>
                    ) : null}
                    <div className="uTit">{title}</div>
                </Flex.Item>
            );
        });
        return (
            <div className="UserCenter">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    我的商城
                </NavBar>
                <div className="base-content">
                    <Flex className="userInfo" align="start">
                        <NetImg src={Base.getImgUrl(header)} className="uImg" />
                        <div className="userInfoName">{nickname}</div>
                    </Flex>
                    <div className="uOrderItem">
                        <List className="shopMenu">
                            <Item
                                extra={"全部订单"}
                                arrow="horizontal"
                                onClick={() =>
                                    Base.push("MyOrder", { index: -1 })
                                }
                            >
                                我买到的
                            </Item>
                            <Flex className="menuIco">{buyerItems}</Flex>
                        </List>
                    </div>
                    <WhiteSpace size="lg" />
                    {parseInt(is_seller) === 1 ? (
                        <div>
                            <div className="uOrderItem mt0">
                                <List className="shopMenu">
                                    <Item
                                        extra={"全部订单"}
                                        arrow="horizontal"
                                        onClick={() =>
                                            Base.push("SellOrder", {
                                                index: -1
                                            })
                                        }
                                    >
                                        我卖出的
                                    </Item>
                                    <Flex className="menuIco">
                                        {sellerItems}
                                    </Flex>
                                </List>
                            </div>
                            <WhiteSpace size="lg" />
                        </div>
                    ) : null}
                    <List className="shopCart">
                        <Item
                            arrow="horizontal"
                            onClick={() => Base.push("ShopCart")}
                        >
                            我的购物车
                        </Item>
                    </List>
                    <WhiteSpace size="lg" />
                    <List className="baseItem">
                        {parseInt(anchor) === 1 && parseInt(is_seller) !== 1 ? (
                            <Item
                                arrow="horizontal"
                                onClick={() => Base.push("MyOrder")}
                            >
                                申请开店
                            </Item>
                        ) : null}
                        {/* <Item
                            extra={"Aditya Shanahan"}
                            onClick={() => Base.push("MyOrder")}
                        >
                            店铺名称
                        </Item> */}
                        {parseInt(is_seller) === 1 ? (
                            <div>
                                <Item
                                    arrow="horizontal"
                                    onClick={() =>
                                        Base.pushApp("openShopAuthView")
                                    }
                                >
                                    产品发布
                                </Item>
                                <Item
                                    arrow="horizontal"
                                    onClick={() => Base.push("MyOrder")}
                                >
                                    我的产品
                                </Item>
                            </div>
                        ) : null}
                    </List>
                    <WhiteSpace size="lg" />
                    <List className="baseItem">
                        <Item
                            arrow="horizontal"
                            onClick={() => Base.push("Statistics")}
                        >
                            数据统计
                        </Item>
                    </List>
                </div>
            </div>
        );
    }
}
