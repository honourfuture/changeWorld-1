import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Button,List,InputItem,Picker,Switch,WhiteSpace,WingBlank,NavBar} from 'antd-mobile';
import './NewAddress.less';

import {icon} from '../../images';
import { district } from '../../common/cityData';

const Item = List.Item;
export default class NewAddress extends BaseComponent{
    state={
        sValue: [],
        visible: false,
        checked: false,
    }
    componentDidMount(){
    }
    render(){
        const {sValue,visible,checked} = this.state;
        let takeRegion = visible ? "take-region check-address" : "take-region";
        return (
            <div className='NewAddress'>
                <NavBar
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >新增地址</NavBar>
                <div className="base-content">
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
                        <div className={takeRegion}>
                            <Picker extra="请选择"
                                  data={district}
                                  dismissText=" "
                                  onOk={v => this.setState({sValue:v,visible:true})}
                                  value={sValue}
                                >
                                <Item arrow="horizontal">省市区</Item>
                            </Picker>
                        </div>
                        <InputItem 
                            clear
                            placeholder="请输入收货人的详细地址"
                            moneyKeyboardAlign="left"
                        >详细地址
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <List>
                        <Item
                          extra={<Switch  onClick={() => this.setState({checked:!checked})} checked={checked} color="red" />}
                        >是否设为默认地址</Item>
                    </List>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button type="warning" className="save-address">保存并使用</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}