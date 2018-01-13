import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Flex, Button, NavBar, WhiteSpace, Icon, Stepper, Radio, InputItem, TextareaItem} from 'antd-mobile';
import './ConfirmOrder.less';

import { test, icon } from '../../images';

export default class ConfirmOrder extends BaseComponent{
	render(){
		return (
			<div className='ConfirmOrder'>
				<NavBar
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
					<div className="order-detail">
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
					</div>
					<WhiteSpace />
					<div className="order-detail">
						<Flex justify="between" align="center" className="discount-item">
							<Flex.Item>
								优惠券
							</Flex.Item>
							<Flex.Item align="center">
								<span className="payMoney">-￥{10}</span><Radio></Radio>
							</Flex.Item>
						</Flex>
						<Flex justify="between" align="center" className="discount-item">
							<Flex.Item>
								积分抵扣 <em>100积分=1元</em>
							</Flex.Item>
							<Flex.Item align="center">
								<span className="payMoney">-￥{10}</span><Radio></Radio>
							</Flex.Item>
						</Flex>
					</div>
					<div className="order-invoice">
						<Flex justify="between" align="center" className="discount-item">
							<div>
								发票抬头
							</div>
							<div className="order-invoice-check">
								<span className="payMoney">企业</span><Radio defaultChecked={true}></Radio>
								<span className="payMoney">个人</span><Radio></Radio>
							</div>
						</Flex>
						<Flex align="center" className="discount-item">
							<InputItem placeholder="请输入抬头名称或开票六位代码">名称</InputItem>
						</Flex>
						<Flex align="center" className="discount-item">
							<InputItem placeholder="请输入纳税人识别号或社会统一征信代码">税号</InputItem>
						</Flex>
						<Flex align="center" className="discount-item">
							<InputItem placeholder="请输入抬头名称">名称</InputItem>
						</Flex>
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
