import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Flex, Button, NavBar, WhiteSpace } from "antd-mobile";
import "../OrderDetail/OrderDetail.less";
import { test, icon, addr } from "../../images";

import { OrderBtn } from "../../components/OrderBtn";
class Invoice extends BaseComponent {
    render() {
        const {
            invoice_type,
            id,
            invoice_number,
            invoice_title
        } = this.props.data;
        const invoicType = parseInt(invoice_type) === 0 ? "企业" : "个人";
        return (
            <div className="order-item">
                <Flex className="flex-item" justify="between">
                    <div className="labelItem">发票类型</div>
                    <div className="labelItem">{invoicType}</div>
                </Flex>
                <Flex className="flex-item" justify="between">
                    <div className="labelItem">名称</div>
                    <div className="labelItem">{invoice_title}</div>
                </Flex>
                {parseInt(invoice_type) === 0 ? (
                    <Flex className="flex-item" justify="between">
                        <div className="labelItem">税号</div>
                        <div className="labelItem">{invoice_number}</div>
                    </Flex>
                ) : null}
            </div>
        );
    }
}

class OrderGoodsItem extends BaseComponent {
    render() {
        const { data } = this.props || [];
        let goodsItem = data.map((item, key) => {
            const { default_image, name, goods_price, num, goods_attr } = item;
            let goodsAttr = JSON.parse(goods_attr || "{}");
            let specItem = [];
            for (let i in goodsAttr) {
                specItem.push([i, goodsAttr[i]]);
            }
            return (
                <Flex align="start" key={key} className="goods-info base-line">
                    <img
                        className="goods-img"
                        src={Base.getImgUrl(default_image)}
                        alt=""
                    />
                    <Flex.Item>
                        <Flex justify="between" align="start">
                            <div className="title ellipsis">{name}</div>
                            <div className="price">￥ {item.goods_price}</div>
                        </Flex>
                        <Flex justify="between" className="bottom-info">
                            <div className="spec">
                                {specItem.map((item, key) => {
                                    return <span key={key}>{item}</span>;
                                })}
                            </div>
                            <div className="spec">x{num}</div>
                        </Flex>
                    </Flex.Item>
                </Flex>
            );
        });
        return <div>{goodsItem}</div>;
    }
}

class OrderBtnItem extends BaseComponent {
    render() {
        const { status, refund_status, id, order_sn, buyer_uid } =
            this.props.data || {};
        const item = this.props.goods;
        const user = this.props.user;
        let btns = null;
        switch (parseInt(status, 10)) {
            case 0: //待付款
                btns = (
                    <OrderBtn
                        btnTxt={["修改价格", "联系顾客"]}
                        oneCallBack={() => this.modifyPrice(id)}
                        twoCallBack={() =>
                            Base.pushApp("openChatView", JSON.stringify(user))
                        }
                        isDouble={2}
                    />
                );
                break;
            case 2: //代发货
                btns = (
                    <OrderBtn
                        btnTxt={["发货", "联系顾客"]}
                        oneCallBack={() => Base.push("WriteExInfo", { id: id })}
                        twoCallBack={() =>
                            Base.pushApp("openChatView", JSON.stringify(user))
                        }
                        isDouble={2}
                    />
                );
                break;
            case 3: //待收货
                btns = (
                    <OrderBtn
                        btnTxt={["查看物流", "联系顾客"]}
                        oneCallBack={() => Base.push("ExLog", { id: id })}
                        twoCallBack={() =>
                            Base.pushApp("openChatView", JSON.stringify(user))
                        }
                        isDouble={2}
                    />
                );
                break;
            case 4: //待评价
                btns = (
                    <OrderBtn
                        btnTxt={["联系顾客"]}
                        oneCallBack={() =>
                            Base.pushApp("openChatView", JSON.stringify(user))
                        }
                        isDouble={1}
                    />
                );
                break;
        }
        if (parseInt(refund_status) === 1) {
            btns = null;
        }
        return <div>{btns}</div>;
    }
}

export default class SellerOrderDetail extends BaseComponent {
    store = {
        detail: {},
        curPage: 0
    };
    @action.bound
    componentDidMount() {
        const order_id = parseInt(Base.getPageParams("order_id"));
        const nowCur = parseInt(Base.getPageParams("nowCur"));
        this.store.curPage = nowCur;
        Base.GET(
            {
                act: "order",
                op: "view",
                mod: "user",
                order_id: order_id,
                status: nowCur
            },
            res => {
                this.store.detail = res.data;
            }
        );
    }
    render() {
        const {
            goods = [],
            invoice = {},
            order = {},
            user = {}
        } = this.store.detail;
        let address_info = JSON.parse(order.address_info || "{}");
        let states = [
            "待付款",
            "已取消",
            "待发货",
            "待收货",
            "待评价",
            "已完成",
            "已结束"
        ];
        const invoiceItem = invoice.hasOwnProperty("id") ? (
            <Invoice data={invoice} />
        ) : null;
        let freight_fee = null;
        goods.map(item => {
            freight_fee += parseFloat(item.freight_fee);
        });
        return (
            <div className="OrderDetail">
                <NavBar
                    mode="light"
                    className="base-line"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    订单详情
                </NavBar>
                <div className="base-content">
                    <div className="order-item">
                        <Flex className="flex-item orderTit">
                            {parseInt(order.refund_status) === 1
                                ? "退款退货"
                                : states[order.status]}
                        </Flex>
                        <Flex className="flex-item">
                            <div className="labelItem orderCon">订单编号：</div>
                            <div className="labelItem orderCon">
                                {order.order_sn}
                            </div>
                        </Flex>
                        <Flex className="flex-item orderCon">
                            <div className="labelItem orderCon">下单时间：</div>
                            <div className="labelItem orderCon">
                                {order.updated_at}
                            </div>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg" />

                    <div className="order-item">
                        <Flex className="order-address">
                            <div className="addr-icon">
                                <img
                                    src={addr.address}
                                    className="addrIco"
                                    alt=""
                                />
                            </div>
                            <div className="addr-info">
                                <div className="addr-user">
                                    收件人：{address_info.username}{" "}
                                    {address_info.mobi}
                                </div>
                                <div className="addr-ess">
                                    {address_info.address}
                                </div>
                            </div>
                        </Flex>
                    </div>

                    <WhiteSpace size="lg" />
                    <div className="order-item">
                        <OrderGoodsItem data={goods} />
                        <Flex className="flex-item" justify="between">
                            <div className="labelItem">商品总价</div>
                            <div className="labelItem">
                                ￥ {order.total_amount}
                            </div>
                        </Flex>
                        <Flex className="flex-item" justify="between">
                            <div className="labelItem">邮费</div>
                            <div className="labelItem">
                                +￥ {Base.getNumFormat(freight_fee)}
                            </div>
                        </Flex>
                        <Flex className="flex-item" justify="between">
                            <div className="labelItem">实付款</div>
                            <div className="labelItem orderPrice">
                                ￥ {order.real_total_amount}
                            </div>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg" />
                    {invoiceItem}
                </div>
                {parseInt(order.refund_status) === 1 ||
                parseInt(this.store.curPage) === -2 ? null : (
                    <Flex className="footer" justify="end" align="center">
                        <OrderBtnItem data={order} good={goods} user={user} />
                    </Flex>
                )}
            </div>
        );
    }
}
