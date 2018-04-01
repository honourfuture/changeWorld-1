import React from 'react';
import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Flex, Button, NavBar, SearchBar, Tabs,Modal,Toast } from "antd-mobile";
import { icon, blankImg } from "../../images";
import {remove} from 'lodash';
import '../MyOrder/MyOrder.less';

import { OrderGoodsItem } from "../../components/OrderGoodsItem";
import { OrderBtn } from "../../components/OrderBtn";
import { NoData } from "../../components/NoData";

const prompt = Modal.prompt;
class OrderItem extends BaseComponent {
    @action.bound
    modifyPrice(id){
        const {changeList,changePrice} = this.props;
        prompt( '修改价格', 
                '', 
                [
                    {text: '取消'},
                    { text: '确认', onPress: value => new Promise((resolve,reject) => {
                            let yz = /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/;
                            if(yz.test(value)){
                                Toast.info(`改价成功！`, 1);
                                Base.POST({ act: "order_action", op: "seller",mod:'user',order_id:id,action:'change_price',real_total_amount:value}, res => {
                                    changePrice && changePrice(id,value);
                                });
                                resolve();
                            }else{
                                Toast.info('请输入正确的价格', 1);
                                reject();
                            }
                        })
                    }
                ], 'money', null);
        
    }
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
                case 0://待付款
                    btns = <OrderBtn 
                                btnTxt={["修改价格","联系顾客"]} 
                                oneCallBack={()=>this.modifyPrice(id)} 
                                twoCallBack={()=>console.log('联系顾客')}
                                isDouble={2} 
                            />
                break;
                case 2://代发货
                    btns = <OrderBtn 
                                btnTxt={["发货","联系顾客"]} 
                                oneCallBack={()=>Base.push('WriteExInfo',{id:id})} 
                                twoCallBack={()=>console.log('联系顾客')}
                                isDouble={2} 
                            />;
                break;
                case 3://待收货
                    btns = <OrderBtn 
                                btnTxt={["查看物流","联系顾客"]} 
                                oneCallBack={()=>console.log('查看物流')} 
                                isDouble={1} 
                            />;
                break;
                case 4://待评价
                    btns = <OrderBtn 
                                btnTxt={["联系顾客"]} 
                                oneCallBack={()=>console.log('评价订单')} 
                                isDouble={1} 
                            />;
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

export default class SellOrder extends BaseComponent{
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
    changePrice(id,price){
        const list = this.store.list.slice();
        const itemData = list.find(item=>id === item.id);
        itemData.real_total_amount = price;
        this.store.list = list;
    }
    @action.bound
    changeList(id){
        remove(this.store.list,item=>id === item.id);
    }
    @action.bound
    onChange(tab, index) {
        const orderStatus = [-1,0,2,3,4,5,-2];
        this.requestData(orderStatus[index]);
    }
    goShop(){
        Base.push('ShopIndex');
    }
	render(){
		const { list } = this.store;
        let tabNames = ["全部","待付款","待发货","待收货","待评价","已完成","退货/退款"];
        const tabs = tabNames.map(item=>{
            return {'title':item};
        });
        list.forEach(item=>{
            item.goods.forEach(items=>{
                items.sale_price = items.goods_price
            })
        });
        const showList = list.filter(item=>{
            return parseInt(item.deleted,10) === 0;
        });
        const item = showList.length === 0 ? <NoData img={blankImg.order} label={'暂无数据'} btnLabel={'去逛逛'} onClick={this.goShop} /> : <OrderItem changeList={this.changeList} changePrice={this.changePrice} data={showList} />;
        const pageNum = parseInt(Base.getPageParams('pageNum'));
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
                    <Tabs className="nav-tabs" tabs={tabs} onChange={this.onChange} initialPage={pageNum}>
                        {item}
                    </Tabs>
                </div>
			</div>
		)
	}
};
