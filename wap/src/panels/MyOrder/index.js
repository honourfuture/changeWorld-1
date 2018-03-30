import React from "react";
import { action } from 'mobx';
import { BaseComponent, Base } from "../../common";
import { Flex, Button, NavBar, SearchBar, Tabs } from "antd-mobile";
import { icon, blankImg } from "../../images";

import "./MyOrder.less";

import { OrderGoodsItem } from "../../components/OrderGoodsItem";
import { NoData } from "../../components/NoData";

class Btns extends BaseComponent {
    render(){
        const { btnTxt, callBack, callBackOperator, isDouble } = this.props;
        let btns = null;
        if(!isDouble){
            btns =  <div>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                callBack && callBack()
                            }
                        >
                            {btnTxt[0]}
                        </Button>
                    </div>
        }else{
            btns = <div>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                callBack && callBack()
                            }
                        >
                            {btnTxt[0]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix eva-order"
                            onClick={() =>
                                callBackOperator && callBackOperator()
                            }
                        >
                            {btnTxt[1]}
                        </Button>
                    </div>
        }
        return (
            <Flex
                className="typeBtn"
                justify="end"
                align="center"
            >
                {btns}
            </Flex>
        )
    }
}

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

            let btns = null;
            switch(parseInt(status,10)){
                case 0:
                    btns = <Btns btnTxt={["取消订单"]} callBack={()=>console.log('取消')} isDouble={false} />
                break;
                case 1,5,6:
                    btns = <Btns btnTxt={["删除订单"]} callBack={()=>console.log('取消')} isDouble={false} />;      
                break;
                case 2:
                    btns = btns = <Btns btnTxt={["申请退款","提醒发货"]} callBack={()=>console.log('申请退款')} callBackOperator={()=>console.log('提醒发货')} isDouble={true} />;
                break;
                case 3:
                    btns = <Btns btnTxt={["查看物流","确认收货"]} callBack={()=>console.log('查看物流')} callBackOperator={()=>console.log('确认收货')} isDouble={true} />;
                break;
                case 4:
                    btns = <Btns btnTxt={["评价订单"]} callBack={()=>console.log('评价订单')} isDouble={false} />;
                break;
            }
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
                        {btns}
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
        const index = parseInt(Base.getPageParams('index'));
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
        const orderStatus = [-1,0,2,3,4,5,-2];
        this.requestData(orderStatus[index]);
    }
    goShop(){
        Base.push('ShopIndex');
    }
    render() {
        const { list } = this.store;
        let tabNames = ["全部","待付款","待发货","待收货","待评价","已完成","退货/售后"];
        const tabs = tabNames.map(item=>{
            return {'title':item};
        });
        list.forEach(item=>{
            item.goods.forEach(items=>{
                items.sale_price = items.goods_price
            })
        });
        const item = list.length === 0 ? <NoData img={blankImg.order} label={'暂无数据'} btnLabel={'去逛逛'} onClick={this.goShop} /> : <OrderItem data={list} />;
        const pageNum = parseInt(Base.getPageParams('pageNum'));
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
                    <Tabs className="nav-tabs" tabs={tabs} onChange={this.onChange} initialPage={pageNum}>
                        {item}
                    </Tabs>
                </div>
            </div>
        );
    }
}
