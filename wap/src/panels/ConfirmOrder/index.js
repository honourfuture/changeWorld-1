import React from "react";
import { action, computed } from "mobx";
import { BaseComponent, Base, NetImg, Global } from "../../common";
import {
    Flex,
    Button,
    NavBar,
    WhiteSpace,
    Icon,
    Stepper,
    Radio,
    Checkbox,
    InputItem,
    TextareaItem,
    Toast,
    Input
} from "antd-mobile";
import "./ConfirmOrder.less";

import { OrderGoodsItem } from "../../components/OrderGoodsItem";
import { test, addr, icon } from "../../images";

class StoreItem extends BaseComponent {
    @action.bound
    onChangeMsg(e) {
        this.props.item.message = e;
    }
    @action.bound
    onPointChange(e) {
        const { point } = this.props.item;
        if ((parseFloat(e) || 0) <= point) {
            this.props.item.inputPoint = e;
        }
    }
    render() {
        const {
            nickname,
            seller_uid,
            header,
            goods,
            rule,
            ticket,
            inputPoint,
            point
        } = this.props.item;
        return (
            <div className="order-detail">
                <Flex
                    className="store-info base-line"
                    onClick={() => Base.pushApp("openShopView", seller_uid)}
                >
                    <NetImg src={header} />
                    <div className="store-name">{nickname}</div>
                    <Icon type="right" color="#c9c9c9" />
                </Flex>
                {goods.map((item, index) => (
                    <OrderGoodsItem key={index} item={item} />
                ))}
                <div className="order-detail">
                    {parseFloat(ticket) > 0 ? (
                        <Flex
                            justify="between"
                            align="center"
                            className="discount-item base-line"
                        >
                            <Flex.Item>优惠券</Flex.Item>
                            <Flex.Item className="ticketTips">
                                <span className="payMoney">
                                    -￥{Base.getNumFormat(ticket)}
                                </span>
                            </Flex.Item>
                        </Flex>
                    ) : null}
                    {/* {parseFloat(rule) > 0 && parseFloat(point) > 0 ? (
                        <Flex
                            justify="between"
                            align="center"
                            className="discount-item base-line"
                        >
                            <Flex.Item>
                                积分抵扣 <em>{rule}积分=1元</em>
                            </Flex.Item>
                            <Flex.Item align="center">
                                <InputItem
                                    type="number"
                                    value={inputPoint}
                                    placeholder={`最高可用${point}分`}
                                    onChange={this.onPointChange}
                                />
                            </Flex.Item>
                        </Flex>
                    ) : null} */}
                </div>
                <div className="order-remark">
                    <TextareaItem
                        onChange={this.onChangeMsg}
                        placeholder="备注留言"
                        rows={5}
                        count={100}
                    />
                </div>
                <WhiteSpace />
            </div>
        );
    }
}

export default class ConfirmOrder extends BaseComponent {
    store = {
        storeList: [],
        addressInfo: {}
    };
    componentDidMount() {
        const {
            goods_id,
            goods_attr,
            num,
            cart_id = ""
        } = Base.getPageParams();
        const requestParam = cart_id
            ? { act: "cart", op: "order", cart_id }
            : { act: "cart", op: "buy", goods_id, goods_attr, num };
        Base.POST(
            {
                ...requestParam,
                mod: "user"
            },
            res => {
                const storeList = [];
                const data = res.data.goods;
                const { rule, user } = res.data.point;
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const item = data[key];
                        item.seller_uid = key;
                        item.rule = rule;
                        item.message = "";
                        // let use_point_rate = 0;
                        // item.goods.forEach(goodsItem => {
                        //     use_point_rate += parseFloat(
                        //         goodsItem.use_point_rate
                        //     );
                        // });
                        item.inputPoint = 0;
                        storeList.push(item);
                    }
                }
                this.store.storeList = storeList;
            }
        );
        Base.GET(
            { act: "address", op: "index" },
            res => {
                let curAddress = null;
                if (Global.curSelectAddressId) {
                    curAddress = res.data.find(
                        item => item.id === Global.curSelectAddressId
                    );
                }
                this.store.addressInfo =
                    curAddress && curAddress.id
                        ? curAddress
                        : res.data[0] || {};
            },
            null,
            true
        );
    }
    @computed
    get total() {
        let totalNum = 0;
        this.store.storeList.forEach(item => {
            const { goods, ticket, total } = item;
            totalNum += parseFloat(total) - (parseFloat(ticket) || 0);
        });
        return totalNum;
    }
    @action.bound
    onPay() {
        const { storeList, addressInfo } = this.store;
        if (!addressInfo.id) {
            return Toast.fail("请选择收货地址", 2, null, false);
        }
        const seller = {};
        const cartList = [];
        storeList.map(item => {
            const { seller_uid, message, inputPoint, goods } = item;
            goods.forEach(goodsItem => {
                cartList.push(goodsItem.cart_id);
            });
            seller[seller_uid] = {
                message,
                point: inputPoint
            };
        });
        const { mobi, username, province, city, area, address } = addressInfo;
        const requestParam = {
            addressInfo: JSON.stringify({
                username,
                mobi,
                address: `${province}-${city}-${area} ${address}`
            }),
            seller: JSON.stringify(seller),
            cart_id: cartList.join(",")
        };
        Base.POST(
            { act: "order", op: "add", mod: "user", ...requestParam },
            res => {
                Global.curSelectAddressId = "";
                const { pay_sn } = res.data;
                Base.push("Pay", { pay_sn });
            }
        );
    }
    render() {
        const { storeList, isPerson, curIndex, addressInfo } = this.store;
        const { username, mobi, province, city, area, address } = addressInfo;
        const storeItems = storeList.map((item, index) => {
            return <StoreItem key={index} item={item} />;
        });
        return (
            <div className="ConfirmOrder">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    确认订单
                </NavBar>
                <div className="base-content">
                    <img src={addr.orderTopLine} className="img-line" alt="" />
                    {addressInfo.id ? (
                        <Flex
                            className="order-address"
                            onClick={() => Base.push("SelectAddress")}
                        >
                            <div className="addr-info">
                                <div className="addr-user">
                                    {username}{" "}
                                    {mobi.replace(
                                        /^(\d{3})(\d{4})(\d{4})$/,
                                        "$1****$3"
                                    )}
                                </div>
                                <div className="addr-ess">
                                    {`${province}-${city}-${area} ${address}`}
                                </div>
                            </div>
                        </Flex>
                    ) : (
                        <Flex
                            className="order-address"
                            justify="center"
                            align="center"
                            onClick={() => Base.push("NewAddress")}
                        >
                            <div className="add-addr">
                                <div className="addr-img">
                                    <img
                                        src={addr.address}
                                        className="addIco-img"
                                        alt=""
                                    />
                                </div>
                                <div className="add-tips">
                                    还没收货地址，<em>去添加</em>
                                </div>
                            </div>
                        </Flex>
                    )}
                    <WhiteSpace />
                    {storeItems}
                </div>
                <Flex className="footer" align="center" justify="between">
                    <div>
                        <div className="goodsNum">共1件商品</div>
                        <div className="total">
                            合计 <em>￥ {Base.getNumFormat(this.total)}</em>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={this.onPay}
                            type="warning"
                            inline
                            className="pay-btn"
                        >
                            提交订单
                        </Button>
                    </div>
                </Flex>
            </div>
        );
    }
}
