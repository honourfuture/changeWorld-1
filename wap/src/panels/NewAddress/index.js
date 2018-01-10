import React from 'react';
import {BaseComponent} from '../../common';
import {Flex,Button,List,InputItem,Picker,Switch,WhiteSpace,WingBlank} from 'antd-mobile';
import './NewAddress.less';
import {icon} from '../../images';

import { district } from 'antd-mobile-demo-data';

const Item = List.Item;
export default class NewAddress extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <div className='NewAddress'>
                <List>
                    <InputItem
                        clear
                        placeholder="请输入收货人姓名"
                        moneyKeyboardAlign="left"
                    >收货人</InputItem>
                    <InputItem 
                        clear
                        type="money"
                        placeholder="请输入收货人的手机号码"
                        moneyKeyboardAlign="left"
                    >手机号码
                    </InputItem>
                    <div className="take_region">
                        <Picker extra="请选择(可选)"
                              data={district}
                              onOk={e => console.log('ok', e)}
                              onDismiss={e => console.log('dismiss', e)}
                            >
                            <Item arrow="horizontal">省市区</Item>
                        </Picker>
                    </div>
                    <InputItem 
                        clear
                        type="money"
                        placeholder="请输入收货人的详细地址"
                        moneyKeyboardAlign="left"
                    >详细地址
                    </InputItem>
                </List>
                <WhiteSpace />
                <List>
                    <Item
                      extra={<Switch checked={true} color="red" />}
                    >是否设为默认地址</Item>
                </List>
                <WhiteSpace size="xl" />
                <WingBlank>
                    <Button type="warning" className="save_address">保存并使用</Button>
                </WingBlank>
            </div>
        )
    }
}