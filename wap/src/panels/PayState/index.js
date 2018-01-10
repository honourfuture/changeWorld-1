import React from 'react';
import {BaseComponent} from '../../common';
import {Flex,Button} from 'antd-mobile';
import './PayState.less';
import {icon} from '../../images';

export default class PayState extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <div className='PayState'>
                <div className="PayState_box">
                	<img src={icon.paySuccess} alt=""/>
                	<p className="PayState_box_tips">支付成功！</p>
                </div>
                <div className="PayState_order">
                	<div className="orderItem">支付现金：<span>￥349.00</span></div>
                	<div className="orderItem">订单编号：<span>2017072719315492902513994461</span></div>
                	<div className="orderItem">支付方式：<span>微信支付</span></div>
                </div>
                <Flex align="center" justify="center" className="PayState_opear">
                	<Button type="ghost" inline className="am-button-borderfix payBtn">订单详情</Button>
                	<Button type="warning" inline >回到首页</Button>
                </Flex>
            </div>
        )
    }
}