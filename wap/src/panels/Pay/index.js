import React from 'react';
import {BaseComponent} from '../../common';
import {Flex,Button,List,Radio} from 'antd-mobile';
import './Pay.less';
import {icon} from '../../images';

const Item = List.Item;
const RadioItem = Radio.RadioItem;
export default class Pay extends BaseComponent{
    componentDidMount(){
    }
    render(){

        return (
            <div className='Pay'>
                <div className="Pay_box">
                    <Flex justify="between" className="Pay_box_goods">
                        <div className="goodsImg">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="goodsInfo">
                            <div className="goodsInfo_tit">RE:CIPE 水晶防晒喷雾 150毫升防晒喷雾 SPF50+</div>
                            <Flex justify="between" className="goodsInfo_num">
                                <span>￥369</span>
                                <span>x1</span>
                            </Flex>
                        </div>
                    </Flex>
                    <div className="Pay_box_mode">
                        <h4 className="pay_h4">支付方式</h4>
                        <div className="pay_check">
                            <Flex justify="between">
                                <Flex.Item>
                                    <img src={icon.payZfb} alt=""/>
                                </Flex.Item>
                                <Flex.Item>
                                  <Radio className="my-radio" name="PayName"></Radio>
                                </Flex.Item>
                            </Flex>
                            <Flex justify="between">
                                <Flex.Item>
                                    <img src={icon.payWx} alt=""/>
                                </Flex.Item>
                                <Flex.Item>
                                  <Radio className="my-radio" name="PayName"></Radio>
                                </Flex.Item>
                            </Flex>
                            <Flex justify="between">
                                <Flex.Item>
                                    <span className="pay_gold">金币支付</span><span className="account_money">账户余额：20000金币</span>
                                </Flex.Item>
                                <Flex.Item>
                                  <span className="payMoney">-￥200</span><Radio name="PayName"></Radio>
                                </Flex.Item>
                            </Flex>
                        </div>
                    </div>
                    <Flex justify="center" align="center" className="Pay_box_opear">
                        <Button type="warning">下一步</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}