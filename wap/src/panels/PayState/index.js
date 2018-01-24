import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,NavBar} from 'antd-mobile';
import './PayState.less';
import {icon,pay} from '../../images';

export default class PayState extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <div className='PayState'>
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >支付结果</NavBar>
                <div className="base-content">
                    <div className="PayState-box">
                    	<img src={pay.paySuccess} alt=""/>
                    	<p className="PayState-box-tips">支付成功！</p>
                    </div>
                    <div className="PayState-order">
                    	<div className="orderItem">支付现金：<span>￥349.00</span></div>
                    	<div className="orderItem">订单编号：<span>2017072719315492902513994461</span></div>
                    	<div className="orderItem">支付方式：<span>微信支付</span></div>
                    </div>
                    <Flex align="center" justify="center" className="PayState-opear">
                    	<Button onClick={()=>Base.push('OrderDetail')} type="ghost" inline className="am-button-borderfix payBtn">订单详情</Button>
                    	<Button onClick={()=>Base.push('ShopIndex')} type="warning" inline>回到首页</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}