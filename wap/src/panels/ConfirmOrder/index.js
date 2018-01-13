import React from 'react';
import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Flex, Button, NavBar, WhiteSpace, Icon, Stepper, Radio, Checkbox, InputItem, TextareaItem} from 'antd-mobile';
import './ConfirmOrder.less';

import { test, icon } from '../../images';

class StoreItem extends BaseComponent{
	render(){
		const { title, img, spec, price, checked, num } = this.props.item;
		return (
			<Flex align='start' className='goods-info base-line'>
				<img className='goods-img' src={img} alt="" />
				<Flex.Item>
					<Flex justify='between' align='start'>
						<div className="title ellipsis">{title}</div>
						<div className="price">￥ {price}</div>
					</Flex>
					<Flex justify='between' className='bottom-info'>
						<div className="spec">{spec}</div>
						<div className="spec">x{num}</div>
					</Flex>
				</Flex.Item>
			</Flex>
		)
	}
}

export default class ConfirmOrder extends BaseComponent{
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
		isCoupon:false,
		isInt:false,
		isPerson:true,
		curIndex: 0,
	}
	@action.bound
	couponHandler(){
		this.store.isCoupon = !this.store.isCoupon;
	}
	@action.bound
	intHandler(){
		this.store.isInt = !this.store.isInt;
	}
	@action.bound
	invoiceHandler(e){
		this.store.isPerson = e === 0 ? true : false;
		this.store.curIndex = e;
	}
	render(){
		const { storeList, isCoupon, isInt, isPerson, curIndex} = this.store;
		const orderItem = storeList.map((item,index)=>{
			const {storeName,storeId,img,goods} = item;
			return <div className="order-detail" key={storeId}>
				<Flex className='store-info base-line' onClick={() => Base.push('AnchorStore')}>
					<img src={img} alt="" />
					<div className='store-name'>{storeName}</div>
					<Icon type='right' color='#c9c9c9' />
				</Flex>
				{
					goods.map((item)=> <StoreItem key={item.goodsId} item={item} />)
				}
				<Flex justify='between' align='center' className='buy-num'>
					<div>购买数量</div>
					<div>
						<Stepper showNumber className='stepper' min={1} max={99} value={1} />
					</div>
				</Flex>
			</div>
		})

		return (
			<div className='ConfirmOrder'>
				<NavBar
					className="base-line"
					mode="light"
					icon={<img src={icon.back} alt='' />}
					onLeftClick={Base.goBack}
				>确认订单</NavBar>
				<div className="base-content">
					<img src={icon.orderTopLine} className="img-line" alt=""/>
					{true?<Flex className="order-address" onClick={()=>Base.push('SelectAddress')}>
						<div className="addr-info">
							<div className="addr-user">*彤 185****8158</div>
							<div className="addr-ess">浙江省-杭州市-西湖区 春申街西溪花园凌波苑</div>
						</div>
					</Flex>:
					<Flex className="order-address" justify="center" align="center" onClick={()=>Base.push('NewAddress')}>
						<div className="add-addr">
							<div className="addr-img">
								<img src={icon.address} className="addIco-img" alt="" />
							</div>
							<div className="add-tips">还没收货地址，<em>去添加</em></div>
						</div>
					</Flex>}
					<WhiteSpace />
					{orderItem}
					{/* <div className="order-detail">
						<Flex className='store-info' onClick={()=>Base.push('AnchorStore')}>
							<img src={test.u1} alt="" />
							<div className='store-name'>文贝袄的店铺</div>
							<Icon type='right' color='#c9c9c9' />
						</Flex>
						<Flex align='start' className='goods-info'>
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
							</Flex.Item>
						</Flex>
						<Flex justify='between' align='center' className='buy-num'>
							<div>购买数量</div>
							<div>
								<Stepper showNumber className='stepper' min={1} max={99} value={1} />
							</div>
						</Flex>
					</div> */}
					<WhiteSpace />
					<div className="order-detail">
						<Flex justify="between" align="center" className="discount-item base-line">
							<Flex.Item>
								优惠券
							</Flex.Item>
							<Flex.Item align="center">
								<span className="payMoney">-￥{10}</span><Checkbox checked={isCoupon} onChange={this.couponHandler} />
							</Flex.Item>
						</Flex>
						<Flex justify="between" align="center" className="discount-item base-line">
							<Flex.Item>
								积分抵扣 <em>100积分=1元</em>
							</Flex.Item>
							<Flex.Item align="center">
								<span className="payMoney">-￥{10}</span><Checkbox checked={isInt} onChange={this.intHandler} />
							</Flex.Item>
						</Flex>
					</div>
					<div className="order-invoice">
						<Flex justify="between" align="center" className="discount-item base-line">
							<div>
								发票抬头
							</div>
							<Flex className="order-invoice-check">
								{
									["企业","个人"].map((item,key)=>{
										return <Flex key={key} onClick={() => this.invoiceHandler(key)}><span className="payMoney">{item}</span><Radio checked={curIndex === key}></Radio></Flex>	
									})
								}
							</Flex>
						</Flex>
						{
							isPerson ? <div>
								<Flex align="center" className="discount-item base-line">
									<InputItem placeholder="请输入抬头名称或开票六位代码">名称</InputItem>
								</Flex>
								<Flex align="center" className="discount-item base-line">
									<InputItem placeholder="请输入纳税人识别号或社会统一征信代码">税号</InputItem>
								</Flex>
							</div>:<Flex align="center" className="discount-item base-line">
									<InputItem placeholder="请输入抬头名称">名称</InputItem>
								</Flex>
						}
					</div>
					<div className="order-remark">
						<TextareaItem
							placeholder='备注留言'
							rows={5}
							// count={100}
						/>
					</div>
					<WhiteSpace />
				</div>
				<Flex className='footer' align="center" justify='between'>
					<div>
						<div className="goodsNum">共1件商品</div>
						<div className='total'>合计 <em>￥ 349.00</em></div>
					</div>
					<div>
						<Button onClick={()=>Base.push('Pay')} type='warning' inline className='pay-btn'>提交订单</Button>
					</div>
				</Flex>
			</div>
		)
	}
};
