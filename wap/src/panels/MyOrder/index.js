import React from 'react';
// import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,NavBar,SearchBar,Tabs} from 'antd-mobile';
import './MyOrder.less';
import {icon,test} from '../../images';

import {GoodsItem} from '../../components/GoodsItem';
class OrderItem extends BaseComponent{
	render(){
		console.log(this.props.data)
		const renderOrderItem = (this.props.data || []).map((item,key)=>{
			const {orderNum,evaluate,goods,total,storeId,orderType} = item;
			return 	<div className="orderItem" key={key}>
						<Flex justify="between" className="orderItemTit base-line">
							<span>订单编号：{orderNum}</span>
							<span>{evaluate}</span>
						</Flex>
						<GoodsItem item={goods} />
						<div className="orderItemType">
							<div className="totalItem">共1件 合计 <span className="priceTotal">￥ {total}</span></div>
							{
								parseInt(orderType,10) === 1 ? <Flex className='typeBtn' justify='end' align="center">
									<Button type="ghost" inline size="small" className="am-button-borderfix contact">删除订单</Button>
									<Button type="ghost" inline size="small" className="am-button-borderfix look-log" onClick={()=>Base.push('ExLog',{storeId})}>查看物流</Button>
									<Button type="ghost" inline size="small" className="am-button-borderfix eva-order" onClick={()=>Base.push('EvaluateOrder',{storeId})}>评价订单</Button>
								</Flex> : null
							}
							{
								parseInt(orderType,10) === 2 ? <Flex className='typeBtn' justify='end' align="center">
									<Button type="ghost" inline size="small" className="am-button-borderfix contact">删除订单</Button>
								</Flex> : null
							}

						</div>
					</div>
		});
		return (
			<div>
				{renderOrderItem}
			</div>
		)
	}
}


export default class MyOrder extends BaseComponent{
	store={
		curIndex:0,
        storeList:[{
            orderNum: '2017072719315492902513994461',
				storeId: '1',
				evaluate:"待评价",
				total:"369",
				orderType:"1",
				goods: [
					{
						img: test.test4,
						title: 'RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶',
						spec: '型号 150ml',
						price: '369',
						goodsId: '1',
						num: 1,
					}
				]
        },{
            orderNum: '2017072719315492902513994461',
			storeId: '2',
			evaluate:"无效单",
			total:"369",
			orderType:"2",
			goods: [
				{
					img: test.test4,
					title: 'RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶',
					spec: '型号 150ml',
					price: '369',
					goodsId: '1',
					num: 1,
				}
			]
        }]
    }
	
	renderContent = tab => tab.component;
	render(){
		const {storeList} = this.store;
		console.log(storeList,"!11")
		const tabs = [
            { title: '全部', component:<OrderItem data={storeList} /> },
            { title: '待付款', component:<OrderItem data={storeList} />},
            { title: '待发货', component:<OrderItem data={storeList} />},
            { title: '待收货', component:<OrderItem data={storeList} />},
            { title: '待评价', component:<OrderItem data={storeList} />},
            { title: '退货', component:<OrderItem data={storeList} />},
            { title: '已完成', component:<OrderItem  data={storeList}/>}
        ];
		return (
			<div className='MyOrder'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >我的订单</NavBar>
                <div className="base-content">
                	<SearchBar placeholder="搜索历史订单" maxLength={8} />
                	<Tabs className="nav-tabs" tabs={tabs} initialPage={0}>
                		{this.renderContent}
                    </Tabs>
                </div>
			</div>
		)
	}
};
