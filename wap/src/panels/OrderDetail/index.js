import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Flex, Button, NavBar, WhiteSpace } from 'antd-mobile';
import './OrderDetail.less';
import { test, icon } from '../../images';

export default class OrderDetail extends BaseComponent{
	render(){
		return (
			<div className='OrderDetail'>
				<NavBar
					className="base-line"
					mode="light"
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
							<div className="labelItem orderCon">2017071219318772389472381</div>
						</Flex>
						<Flex className="flex-item orderCon">
							<div className="labelItem orderCon">下单时间：</div>
							<div className="labelItem orderCon">2017-07-12 19:31</div>
						</Flex>
					</div>
					<WhiteSpace size="lg" />
					<div className="order-item">
						<Flex className="order-address">
							<div className="addr-icon"><img src={icon.address} className="addrIco" alt=""/></div>
							<div className="addr-info">
								<div className="addr-user">收件人：*彤 185****8158</div>
								<div className="addr-ess">浙江省-杭州市-西湖区 春申街西溪花园凌波苑</div>
							</div>
						</Flex>
					</div>
					<WhiteSpace size="lg" />
					<div className="order-item">
						<Flex.Item>
							<Flex align='start' className='goods-info'>
								<img className='goods-img' src={test.test4} alt="" />
								<Flex.Item>
									<Flex justify='between' align='start'>
										<div className="title ellipsis2">RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶</div>
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
						</Flex.Item>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">商品总价</div>
							<div className="labelItem">￥ 369</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">邮费</div>
							<div className="labelItem">+￥ 0</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">实付款</div>
							<div className="labelItem orderPrice">￥ 369</div>
						</Flex>
					</div>
					<WhiteSpace size="lg" />
					<div className="order-item">
						<Flex className="flex-item" justify="between">
							<div className="labelItem">发票类型</div>
							<div className="labelItem">企业</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">名称</div>
							<div className="labelItem">深圳神针科技有限公司</div>
						</Flex>
						<Flex className="flex-item" justify="between">
							<div className="labelItem">税号</div>
							<div className="labelItem">123214234343434343123123</div>
						</Flex>
					</div>
				</div>
				<Flex className='footer' justify='end' align="center">
					<Button type="ghost" inline size="small" className="am-button-borderfix contact">联系客服</Button>
					<Button type="ghost" inline size="small" className="am-button-borderfix look-log">查看物流</Button>
					<Button type="ghost" inline size="small" className="am-button-borderfix eva-order">评价订单</Button>
				</Flex>
			</div>
		)
	}
};
