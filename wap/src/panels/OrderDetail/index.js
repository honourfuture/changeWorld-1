import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Flex, Button, NavBar, WhiteSpace } from 'antd-mobile';
import './OrderDetail.less';
import { test, icon } from '../../images';

export default class OrderDetail extends BaseComponent{
	store = {
		storeList: [
			{
				storeName: '文贝袄的店铺',
				storeId: '1',
				img: test.u1,
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
			}
		],
		orderNum:"2017071219318772389472381",
		orderTime:"2017-07-12 19:31",
		signee:{
			name:"*彤",
			tel:"185****8158",
			address:"浙江省-杭州市-西湖区 春申街西溪花园凌波苑"
		},
		total:"369",
		postage:"0",
		payment:"369",
		invoice:"企业",
		companyName:"深圳神针科技有限公司",
		ein:"123214234343434343123123",
	}

	render(){
		const {orderNum,orderTime,signee,total,postage,payment,invoice,companyName,ein} = this.store;
		return (
			<div className='OrderDetail'>
				<NavBar
					mode="light"
					className="base-line"
					icon={<img src={icon.back} alt='' />}
					onLeftClick={Base.goBack}
				>订单详情</NavBar>
				<div className="base-content">
					<div className="order-item">
						<Flex className="flex-item orderTit">
							待评价
						</Flex>
						<Flex className="flex-item">
							<div className="labelItem orderCon">订单编号：</div>
							<div className="labelItem orderCon">{orderNum}</div>
						</Flex>
						<Flex className="flex-item orderCon">
							<div className="labelItem orderCon">下单时间：</div>
							<div className="labelItem orderCon">{orderTime}</div>
						</Flex>
					</div>
					<WhiteSpace size="lg" />
					<div className="order-item">
						<Flex className="order-address">
							<div className="addr-icon"><img src={icon.address} className="addrIco" alt=""/></div>
							<div className="addr-info">
								<div className="addr-user">收件人：{signee.name} {signee.tel}</div>
								<div className="addr-ess">{signee.address}</div>
							</div>
						</Flex>
					</div>
					<WhiteSpace size="lg" />
					<div className="order-item">
						<Flex align='start' className='goods-info base-line'>
							<img className='goods-img' src={test.test4} alt="" />
							<Flex.Item>
								<Flex justify='between' align='start'>
									<div className="title ellipsis">RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶</div>
									<div className="price">￥ 369</div>
								</Flex>
								<Flex justify='between' className='bottom-info'>
									<div className="spec">型号 150ml</div>
									<div className="spec">x1</div>
								</Flex>
								<Flex justify='end' className='goods-refurn'>
									<Button type="ghost" inline size="small" className="am-button-borderfix">申请退款</Button>
								</Flex>
							</Flex.Item>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">商品总价</div>
							<div className="labelItem">￥ {total}</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">邮费</div>
							<div className="labelItem">+￥ {postage}</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">实付款</div>
							<div className="labelItem orderPrice">￥ {payment}</div>
						</Flex>
					</div>
					<WhiteSpace size="lg" />
					<div className="order-item">
						<Flex className="flex-item" justify="between">
							<div className="labelItem">发票类型</div>
							<div className="labelItem">{invoice}</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">名称</div>
							<div className="labelItem">{companyName}</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">税号</div>
							<div className="labelItem">{ein}</div>
						</Flex>
					</div>
				</div>
				<Flex className='footer' justify='end' align="center">
					<Button type="ghost" inline size="small" className="am-button-borderfix contact">联系客服</Button>
					<Button type="ghost" inline size="small" className="am-button-borderfix look-log" onClick={()=>Base.push('ExLog')}>查看物流</Button>
					<Button type="ghost" inline size="small" className="am-button-borderfix eva-order">评价订单</Button>
				</Flex>
			</div>
		)
	}
};
