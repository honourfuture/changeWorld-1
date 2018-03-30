import React from "react";
import { action } from 'mobx';
import { BaseComponent, Base } from "../../common";
import { Flex, Button, NavBar, SearchBar, Tabs } from "antd-mobile";
import { icon, blankImg } from "../../images";

import "./MyOrder.less";

import { OrderGoodsItem } from "../../components/OrderGoodsItem";
import { NoData } from "../../components/NoData";
class OrderItem extends BaseComponent {
    render() {
        const renderOrderItem = (this.props.data || []).map((item, key) => {
            const {
                order_sn,
                status,
                goods,
                real_total_amount,
                id,
                orderType
            } = item;
            let states = ["待付款","已取消","待发货","待收货","待评价","已完成","已结束"];
            return (
                <div className="orderItem" key={key}>
                    <Flex justify="between" className="orderItemTit base-line">
                        <span>订单编号：{order_sn}</span>
                        <span>{states[status]}</span>
                    </Flex>
                    {(goods || []).map((item, key) => {
                        return <OrderGoodsItem key={key} item={item} />;
                    })}
                    <div className="orderItemType">
                        <div className="totalItem">
                            共{goods.length}件 合计 
                            <span className="priceTotal">￥ {real_total_amount}</span>
                        </div>
                        {/*待评价*/}
                        {parseInt(status, 10) === 4 ? (
                            <Flex
                                className="typeBtn"
                                justify="end"
                                align="center"
                            >
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix eva-order"
                                    onClick={() =>
                                        Base.push("EvaluateOrder", { id })
                                    }
                                >
                                    评价订单
                                </Button>
                            </Flex>
                        ) : null}
                        {/*已完成和已结束、已取消*/}
                        {parseInt(status, 10) === 5 || parseInt(status, 10) === 6 || parseInt(status, 10) === 1  ? (
                            <Flex
                                className="typeBtn"
                                justify="end"
                                align="center"
                            >
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix contact"
                                >
                                    删除订单
                                </Button>
                            </Flex>
                        ) : null}
                        {/*待付款*/}
                        {parseInt(status, 10) === 0 ? (
                            <Flex
                                className="typeBtn"
                                justify="end"
                                align="center"
                            >
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix look-log"
                                    onClick={() =>
                                        Base.push("ExLog", { id })
                                    }
                                >
                                    取消订单
                                </Button>
                                {/*<Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix eva-order"
                                    onClick={() =>
                                        Base.push("EvaluateOrder", { id })
                                    }
                                >
                                    去付款
                                </Button>
                                */}
                            </Flex>
                        ) : null}
                        {/*待发货*/}
                        {parseInt(status, 10) === 2 ? (
                            <Flex
                                className="typeBtn"
                                justify="end"
                                align="center"
                            >
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix look-log"
                                    onClick={() =>
                                        Base.push("ExLog", { id })
                                    }
                                >
                                    申请退款
                                </Button>
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix eva-order"
                                    onClick={() =>
                                        Base.push("EvaluateOrder", { id })
                                    }
                                >
                                    提醒发货
                                </Button>
                            </Flex>
                        ) : null}
                        {/*待收货*/}
                        {parseInt(status, 10) === 3 ? (
                            <Flex
                                className="typeBtn"
                                justify="end"
                                align="center"
                            >
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix look-log"
                                    onClick={() =>
                                        Base.push("ExLog", { id })
                                    }
                                >
                                    查看物流
                                </Button>
                                <Button
                                    type="ghost"
                                    inline
                                    size="small"
                                    className="am-button-borderfix eva-order"
                                    onClick={() =>
                                        Base.push("EvaluateOrder", { id })
                                    }
                                >
                                    确认收货
                                </Button>
                            </Flex>
                        ) : null}
                    </div>
                </div>
            );
        });
        return <div>{renderOrderItem}</div>;
    }
}

export default class MyOrder extends BaseComponent {
    store = {
        curIndex: 0,
        count:0,
        list: []
    };
    componentDidMount() {
        const {index} = this.props;
        this.requestData(index);
    }
    @action.bound
    requestData(index){
        Base.GET({ act: "user", op: "order",status:index}, res => {
            const { count, list, status } = res.data;
            this.store.count = count;
            this.store.list = list;
            this.store.status = status;
        });
    }
    @action.bound
    onChange(tab, index) {
        this.requestData(index);
    }
    goShop(){
        Base.push('ShopIndex');
    }
    render() {
        const { list } = this.store;
        let tabNames = ["全部","待付款","待发货","待收货","待评价","已取消","已完成"];
        const tabs = tabNames.map(item=>{
            return {'title':item};
        });
        list.forEach(item=>{
            item.goods.forEach(items=>{
                items.sale_price = items.goods_price
            })
        })
        const item = list.length === 0 ? <NoData img={blankImg.order} label={'暂无数据'} btnLabel={'去逛逛'} onClick={this.goShop} /> : <OrderItem data={list} />;

        return (
            <div className="MyOrder">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    我的订单
                </NavBar>
                <div className="base-content">
                    <SearchBar placeholder="搜索历史订单" maxLength={8} />
                    <Tabs className="nav-tabs" tabs={tabs} onChange={this.onChange} initialPage={0}>
                        {item}
                    </Tabs>
                </div>
            </div>
        );
    }
}
