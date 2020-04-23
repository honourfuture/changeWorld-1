import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Flex, Button, NavBar, WhiteSpace, Toast } from "antd-mobile";
import "./OrderDetail.less";
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
    @action.bound
    cancelOrder(id) {
        const { callBack } = this.props;
        Base.POST(
            {
                act: "order_action",
                op: "buyer",
                mod: "user",
                order_id: id,
                action: "cancel"
            },
            res => {
                callBack && callBack(id);
            }
        );
    }
    @action.bound
    delOrder(id) {
        const { callBack } = this.props;
        Base.POST(
            {
                act: "order_action",
                op: "buyer",
                mod: "user",
                order_id: id,
                action: "del"
            },
            res => {
                callBack && callBack(id);
            }
        );
    }
    @action.bound
    goods_confirm(id) {
        const { callBack } = this.props;
        Base.POST(
            {
                act: "order_action",
                op: "buyer",
                mod: "user",
                order_id: id,
                action: "goods_confirm"
            },
            res => {
            	Toast.success('确认收货成功', 1);
                callBack && callBack(id);
            }
        );
    }
    render() {
        const { status, refund_status, id, order_sn, seller_uid } =
            this.props.data || {};
        const item = this.props.goods;
        const user = this.props.user;
        let btns = null;

        switch (parseInt(status, 10)) {
            case 0: //待付款
                btns = (
                    <OrderBtn
                        btns={[
                            {
                                label:'取消订单',
                                onPress:() => {this.cancelOrder(id)}
                            },
                            {
                                label:'付款',
                                onPress:() => {Base.push("pay", { order_sn })}
                            },
                            {
                                label:'联系商家',
                                // onPress:() => {Base.pushApp("openChatView", seller_uid)}
                                onPress:() => {Base.pushApp("openChatView", JSON.stringify(user))}
                            }
                        ]}
                    />
                );
                break;
            case 1: //已取消
                btns = (
                    <OrderBtn
                        btns={[
                            {
                                label:'删除订单',
                                onPress:() => {this.delOrder(id)}
                            }
                        ]}
                    />
                );
                break;
            case 2: //代发货
            	/**
                {
                    label:'退款/退货',
                    onPress:() => {Base.push("AfterMarket", { id: id })}
                },
            	 */
                btns = (
                    <OrderBtn
                        btns={[
                            {
                                label:'联系商家',
                                // onPress:() => {Base.pushApp("openChatView", seller_uid)}
                                onPress:() => {Base.pushApp("openChatView", JSON.stringify(user))}
                            }
                        ]}
                    />
                );
                break;
            case 3: //待收货
            	/**
	            {
	                label:'退款/退货',
	                onPress:() => {Base.push("AfterMarket", { id: id })}
	            },
	            */
                btns = (
                    <OrderBtn
                        btns={[
                            {
                                label:'查看物流',
                                onPress:() => {Base.push("ExLog", { id: id /*,op: "buyer" */})}
                            },
                            {
                                label:'确认收货',
                                onPress:() => {this.goods_confirm(id)}
                            },
                            {
                                label:'联系商家',
                                onPress:() => {Base.pushApp("openChatView", JSON.stringify(user))}
                            }
                        ]}
                    />
                );
                break;
            case 4: //待评价
            	/**
	            {
	                label:'退款/退货',
	                onPress:() => {Base.push("AfterMarket", { id: id })}
	            },
	            */
                btns = (
                    <OrderBtn
                        btns={[
                            {
                                label:'评价订单',
                                onPress:() => {Base.push("EvaluateOrder", { id: id })}
                            },
                            {
                                label:'联系商家',
                                onPress:() => {Base.pushApp("openChatView", JSON.stringify(user))}
                            }
                        ]}
                    />
                );
                break;
            case 5: //完成
            	/**
            	 ,{
                    label:'退款/退货',
                    onPress:() => {Base.push("AfterMarket", { id: id })}
                }
            	 */
                btns = (
                    <OrderBtn
                        btns={[
                            {
                                label:'申请发票',
                                onPress:() => {Base.push("ApplyInvoice", { id: id })}
                            }
                        ]}
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

export default class OrderDetail extends BaseComponent {
    store = {
        detail: {},
        curPage: 0
    };
    @action.bound
    componentDidMount() {
        this.onRequest();
    }
    @action.bound
    onRequest() {
        const order_id = parseInt(Base.getPageParams("order_id"));
        const nowCur = parseInt(Base.getPageParams("nowCur"));
        this.store.curPage = nowCur;
        Base.GET(
            {
                act: "order",
                op: "view",
                mod: "user",
                order_id: order_id,
                status: -1
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
                {parseInt(order.refund_status) === 1 ? null : (
                    <Flex className="footer" justify="end" align="center">
                        <OrderBtnItem 
                            data={order} 
                            good={goods} 
                            user={user} 
                            callBack={this.onRequest}
                        />
                    </Flex>
                )}
            </div>
        );
    }
}
