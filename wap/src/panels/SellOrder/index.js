import React from 'react';
import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Flex, Button, NavBar, SearchBar, Tabs } from "antd-mobile";
import { icon, blankImg } from "../../images";
import './SellOrder.less';
import '../MyOrder/MyOrder.less';

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
            let states = ["待付款","待发货","待收货","已完成","退货/售后"];
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
                                    onClick={() =>console.log('修改价格')
                                    }
                                >
                                    修改价格
                                </Button>
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
                                    className="am-button-borderfix eva-order"
                                    onClick={() =>
                                        console.log('发货')
                                    }
                                >
                                    发货
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

export default class SellOrder extends BaseComponent{
	store = {
        curIndex: 0,
        count:0,
        list: []
    };
    componentDidMount() {
        Base.GET({ act: "user", op: "order" }, res => {
            const { count, list, status } = res.data;
            this.store.count = count;
            this.store.list = list;
            this.store.status = status;
        });
    }
    @action.bound
    onChange(tab, index) {
        Base.GET({ act: "user", op: "order", status:index }, res => {
            const { count, list, status } = res.data;
            this.store.count = count;
            this.store.list = list;
            this.store.status = status;
        });
    }
    goShop(){
        Base.push('ShopIndex');
    }
	render(){
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
			<div className='SellOrder MyOrder'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    卖出的订单
                </NavBar>
                <div className="base-content">
                    <SearchBar placeholder="搜索历史订单" maxLength={8} />
                    <Tabs className="nav-tabs" tabs={tabs} onChange={this.onChange} initialPage={0}>
                        {item}
                    </Tabs>
                </div>
			</div>
		)
	}
};
