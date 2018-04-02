import React from "react";
import { action } from 'mobx';
import { BaseComponent, Base ,Global} from "../../common";
import { Flex, NavBar, SearchBar, Tabs ,ListView, PullToRefresh} from "antd-mobile";
import { icon, blankImg } from "../../images";
import {remove} from 'lodash';
import "./MyOrder.less";

import { OrderGoodsItem } from "../../components/OrderGoodsItem";
import { OrderBtn } from "../../components/OrderBtn";
import { NoData } from "../../components/NoData";

const height = document.body.offsetHeight - 89;

class OrderItem extends BaseComponent {
    @action.bound
    cancelOrder(id){
        const {changeList} = this.props;
        Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'cancel'}, res => {
            changeList && changeList(id);
        });
    }
    @action.bound
    delOrder(id){
        const {changeList} = this.props;
        Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'del'}, res => {
            changeList && changeList(id);
        });
    }
    @action.bound
    goods_confirm(id){
        const {changeList} = this.props;
        Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'goods_confirm'}, res => {
            changeList && changeList(id);
        });
    }
    render() {
        const item = this.props;
        const {order_sn,status,goods,real_total_amount,id,orderType} = this.props;
        let states = ["待付款","已取消","待发货","待收货","待评价","已完成","已结束"];
        let btns = null;
        switch(parseInt(status,10)){
            case 0://待付款
                btns = <OrderBtn 
                            btnTxt={["取消订单","付款","联系商家"]} 
                            oneCallBack={()=>this.cancelOrder(id)} 
                            twoCallBack={()=>console.log('付款')}
                            threeCallBack={()=>console.log('联系商家')}
                            isDouble={3} 
                        />
            break;
            case 1://已取消
                btns = <OrderBtn 
                            btnTxt={["删除订单"]} 
                            oneCallBack={()=>this.delOrder(id)}
                            isDouble={1} 
                        />
            break;
            case 2://代发货
                btns = <OrderBtn 
                            btnTxt={["申请退款","联系商家"]} 
                            oneCallBack={()=>console.log('申请退款')} 
                            twoCallBack={()=>console.log('联系商家')}
                            isDouble={2} 
                        />;
            break;
            case 3://待收货
                btns = <OrderBtn 
                            btnTxt={["查看物流","确认收货","退款/退货","联系商家"]} 
                            oneCallBack={()=>Base.push('ExLog',{id:id})}
                            twoCallBack={()=>this.goods_confirm(id)} 
                            threeCallBack={()=>Base.push('AfterMarket',{id:id})}
                            fourCallBack={()=>console.log('联系商家')}
                            isDouble={4} 
                        />;
            break;
            case 4://待评价
                btns = <OrderBtn 
                            btnTxt={["评价订单","退款/退货","联系商家"]} 
                            oneCallBack={()=>Base.push('EvaluateOrder',{id:id,item:JSON.stringify(item)})}
                            twoCallBack={()=>Base.push('AfterMarket',{id:id})}
                            threeCallBack={()=>console.log('联系商家')}
                            isDouble={3} 
                        />;
            break;
            case 5: //完成
                btns = <OrderBtn 
                        btnTxt={["申请发票","退款/退货"]} 
                        oneCallBack={()=>Base.push('ApplyInvoice',{id:id})} 
                        twoCallBack={()=>Base.push('AfterMarket',{id:id})}
                        isDouble={2} 
                    />;      
            break;
        }

        return (
            <div className="orderItem">
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


        // const renderOrderItem = data.map((item, key) => {
        //     const {
        //         order_sn,
        //         status,
        //         goods,
        //         real_total_amount,
        //         id,
        //         orderType
        //     } = item;
            
        //     let btns = null;

        //     switch(parseInt(status,10)){
        //         case 0://待付款
        //             btns = <OrderBtn 
        //                         btnTxt={["取消订单","付款","联系商家"]} 
        //                         oneCallBack={()=>this.cancelOrder(id)} 
        //                         twoCallBack={()=>console.log('付款')}
        //                         threeCallBack={()=>console.log('联系商家')}
        //                         isDouble={3} 
        //                     />
        //         break;
        //         case 1://已取消
        //             btns = <OrderBtn 
        //                         btnTxt={["删除订单"]} 
        //                         oneCallBack={()=>this.delOrder(id)}
        //                         isDouble={1} 
        //                     />
        //         break;
        //         case 2://代发货
        //             btns = <OrderBtn 
        //                         btnTxt={["申请退款","联系商家"]} 
        //                         oneCallBack={()=>console.log('申请退款')} 
        //                         twoCallBack={()=>console.log('联系商家')}
        //                         isDouble={2} 
        //                     />;
        //         break;
        //         case 3://待收货
        //             btns = <OrderBtn 
        //                         btnTxt={["查看物流","确认收货","退款/退货","联系商家"]} 
        //                         oneCallBack={()=>Base.push('ExLog',{id:id})}
        //                         twoCallBack={()=>this.goods_confirm(id)} 
        //                         threeCallBack={()=>Base.push('AfterMarket',{id:id})}
        //                         fourCallBack={()=>console.log('联系商家')}
        //                         isDouble={4} 
        //                     />;
        //         break;
        //         case 4://待评价
        //             btns = <OrderBtn 
        //                         btnTxt={["评价订单","退款/退货","联系商家"]} 
        //                         oneCallBack={()=>Base.push('EvaluateOrder',{id:id,item:JSON.stringify(item)})}
        //                         twoCallBack={()=>Base.push('AfterMarket',{id:id})}
        //                         threeCallBack={()=>console.log('联系商家')}
        //                         isDouble={3} 
        //                     />;
        //         break;
        //         case 5: //完成
        //             btns = <OrderBtn 
        //                     btnTxt={["申请发票","退款/退货"]} 
        //                     oneCallBack={()=>Base.push('ApplyInvoice',{id:id})} 
        //                     twoCallBack={()=>Base.push('AfterMarket',{id:id})}
        //                     isDouble={2} 
        //                 />;      
        //         break;
        //     }
        //     return (
        //         <div className="orderItem" key={key}>
        //             <Flex justify="between" className="orderItemTit base-line">
        //                 <span>订单编号：{order_sn}</span>
        //                 <span>{states[status]}</span>
        //             </Flex>
        //             {(goods || []).map((item, key) => {
        //                 return <OrderGoodsItem key={key} item={item} />;
        //             })}
        //             <div className="orderItemType">
        //                 <div className="totalItem">
        //                     共{goods.length}件 合计 
        //                     <span className="priceTotal">￥ {real_total_amount}</span>
        //                 </div>
        //                 {btns}
        //             </div>
        //         </div>
        //     );
        // });
        // return <div>{renderOrderItem}</div>;
    }
}

export default class MyOrder extends BaseComponent {
    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.cur_page = 1;
        this.store = {
            list: [],
            isRead: "",
            refreshing: false,
            isLoading: false,
            count:0,
            curPage:-1
        };
    }
    componentDidMount() {
        this.cur_page = 1;
        const index = parseInt(Base.getPageParams('index'));
        this.store.curPage = index;
        this.requestData(index);
        // this.requestData(false);
    }
    @action.bound
    renderItem(rowData, sectionID, rowID) {
        return <OrderItem changeList={this.changeList} {...rowData} />;
        // return rowData.length>0 ? <OrderItem changeList={this.changeList} {...rowData} /> :
        //                         <NoData img={blankImg.order} label={'暂无数据'} btnLabel={'去逛逛'} onClick={this.goShop} /> 

    }
    @action.bound
    changeList(id){
        remove(this.store.list,item=>id === item.id);
    }
    @action.bound
    requestData(index,b_noToast = true) {
        Base.GET({ 
            act: "user", 
            op:"order",
            status:index,
            cur_page: this.cur_page || 1,
            per_page: Global.PAGE_SIZE
        }, res => {
            const { count, list, status } = res.data;
            this.store.list =
                this.cur_page === 1
                    ? [].concat(list)
                    : this.store.list.concat(list);
            this.store.refreshing = false;
            this.store.isLoading = false;
            if (list.length > 0) {
                this.cur_page++;
            }
            this.store.count = count;
            this.store.status = status;
        },
        null,
        b_noToast
        );
    }
    //下拉
    @action.bound
    onRefresh() {
        this.store.refreshing = true;
        this.store.isLoading = false;
        this.cur_page = 1;
        this.requestData(this.store.curPage);
    }
    //上拉
    @action.bound
    onEndReached() {
        this.store.isLoading = true;
        this.store.refreshing = true;
        this.requestData(this.store.curPage);
    }
    //tab切换
    @action.bound
    onChange(tab, index) {
        const orderStatus = [-1,0,2,3,4,5,-2];
        this.cur_page = 1;
        this.store.curPage = orderStatus[index];
        this.requestData(orderStatus[index]);
    }
    goShop(){
        Base.push('ShopIndex');
    }
    render() {
        const { list,isLoading,refreshing } = this.store;
        list.forEach(item=>{
            item.goods.forEach(items=>{
                items.sale_price = items.goods_price
            })
        });
        const showList = list.filter(item=>{
            return parseInt(item.deleted,10) === 0;
        });
        const dataSource = this.dataSource.cloneWithRows(showList.slice());
        let tabNames = ["全部","待付款","待发货","待收货","待评价","已完成","退货/退款"];
        const tabs = tabNames.map(item=>{
            return {'title':item};
        });
        
        const pageNum = parseInt(Base.getPageParams('pageNum'));
        // const item = showList.length === 0 ? 
        //             <NoData img={blankImg.order} label={'暂无数据'} btnLabel={'去逛逛'} onClick={this.goShop} /> 
        //             : <OrderItem changeList={this.changeList} data={showList} />;

         // {item}
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
                       
                        <ListView
                            style={{ height }}
                            dataSource={dataSource}
                            renderRow={this.renderItem}
                            renderFooter={() => (
                                <div style={{ padding: 15, textAlign: "center" }}>
                                    {isLoading
                                        ? "加载中..."
                                        : showList.length >= Global.PAGE_SIZE
                                            ? "加载完成"
                                            : ""}
                                </div>
                            )}
                            pullToRefresh={
                                <PullToRefresh
                                    refreshing={refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            onEndReached={this.onEndReached}
                            // pageSize={2}
                        />


                    </Tabs>
                </div>
            </div>
        );
    }
}
