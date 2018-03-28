import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,NavBar,WhiteSpace,List,Badge} from 'antd-mobile';
import './UserCenter.less';
import {icon,userCenter} from '../../images';
const Item = List.Item;
export default class UserCenter extends BaseComponent{
	render(){
		return (
			<div className='UserCenter'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >我的商城</NavBar>
                <div className="base-content">
                	<Flex className="userInfo" align="start">
                		<img src={userCenter.uDefaultImg} className="uImg" alt=""/>
                		<div className="userInfoName">史珲林</div>
                	</Flex>
                	<div className="uOrderItem">
                		<List className="shopMenu">
                			<Item extra={'全部订单'} arrow="horizontal" onClick={()=>Base.push('MyOrder')}>我买到的</Item>
                			<Flex className="menuIco">
                				<Flex.Item className="Item" align="center">
            						<img src={userCenter.dfkIco} className="uIco" alt=""/>
            						<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待付款</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dfhIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待发货</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dshIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待收货</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dpjIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待评价</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.ywcIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">已完成</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.thIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">退货</div>
                				</Flex.Item>
                			</Flex>
                		</List>
                	</div>
                	<WhiteSpace size="lg" />
                	<div className="uOrderItem mt0">
                		<List className="shopMenu">
                			<Item extra={'全部订单'} arrow="horizontal" onClick={()=>Base.push('SellOrder')}>我卖出的</Item>
                			<Flex className="menuIco">
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dfkIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待付款</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dfhIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待发货</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dshIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">待收货</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.dpjIco} className="uIco" alt=""/>
                					<Badge text={0} overflowCount={99}><span /></Badge>
                					<div className="uTit">待评价</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.ywcIco} className="uIco" alt=""/>
                					<Badge text={1} overflowCount={99}><span /></Badge>
                					<div className="uTit">已完成</div>
                				</Flex.Item>
                				<Flex.Item className="Item" align="center">
                					<img src={userCenter.thIco} className="uIco" alt=""/>
                					<Badge text={0} overflowCount={99}><span /></Badge>
                					<div className="uTit">退货</div>
                				</Flex.Item>
                			</Flex>
                		</List>
                	</div>
                	<WhiteSpace size="lg" />
                	<List className="shopCart">
                		<Item arrow="horizontal" onClick={()=>Base.push('MyOrder')}>我的购物车</Item>
                	</List>
                	<WhiteSpace size="lg" />
                	<List className="baseItem">
                		<Item arrow="horizontal" onClick={()=>Base.push('MyOrder')}>申请开店</Item>
                		<Item extra={'Aditya Shanahan'} onClick={()=>Base.push('MyOrder')}>店铺名称</Item>
                		<Item arrow="horizontal" onClick={()=>Base.push('MyOrder')}>产品发布</Item>
                		<Item arrow="horizontal" onClick={()=>Base.push('MyOrder')}>我的产品</Item>
                	</List>
                	<WhiteSpace size="lg" />
                	<List className="baseItem">
                		<Item arrow="horizontal" onClick={()=>Base.push('MyOrder')}>数据统计</Item>
                	</List>
                </div>
			</div>
		)
	}
};
