import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Button,List,InputItem,Picker,Switch,WhiteSpace,WingBlank,NavBar,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import './NewAddress.less';

import {icon} from '../../images';
import { district } from '../../common/cityData';

const Item = List.Item;
// @createForm
class NewAddress extends BaseComponent{
    state={
        sValue: [],
        visible: false,
        checked: false,
    }
    componentDidMount(){
    }
    @action.bound
    onSave(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {sValue,checked} = this.state;
                const provinceData = district.find(item=>sValue[0] === item.value);
                const cityData = provinceData.children.find(item=>sValue[1] === item.value);
                const areaData = sValue.length === 3 ? cityData.children.find(item=>sValue[2] === item.value) : "";
                let isDefault = checked?1:0;
                Base.POST({act:'address',op:'save',mod:'',id:0,is_default:isDefault,username:values.userName,mobi:values.userPhone,province_id:provinceData.value,province:provinceData.label,city_id:cityData.value,city:cityData.label,area_id:areaData.value || 0,area:areaData.label || "",address:values.userAddress},(res)=>{
                    Toast.success(res.message, 1);
                });
            }
        });
    }
    // validatePhone(value){
    //     console.log(value);
    //         return true;
    // }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
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
                            error={!!getFieldError('userName')}
                            {...getFieldProps('userName', {
                                rules: [
                                  { required: true, message: '请输入收货人姓名' },
                                ],
                            })}
                        >收货人</InputItem>
                        <InputItem 
                            error={getFieldError('userPhone')}
                            {...getFieldProps('userPhone', {
                                rules: [
                                  { required: true, message: '请输入收货人的手机号码' },
                                  // { validator: this.validatePhone },
                                ],
                            })}
                            clear
                            type="phone"
                            placeholder="请输入收货人的手机号码"
                            moneyKeyboardAlign="left"
                        >手机号码
                        </InputItem>
                        <div className={takeRegion}>
                            <Picker extra="请选择"
                                data={district}
                                error={getFieldError('userArea')}
                                {...getFieldProps('userArea', {
                                    rules: [
                                      { required: true, message: '请选择区域' },
                                      // { validator: this.validateAccount },
                                    ],
                                })}
                                dismissText=" "
                                onOk={v =>this.setState({sValue:v,visible:true})}
                                value={sValue}
                                >
                                <Item arrow="horizontal">省市区</Item>
                            </Picker>
                        </div>
                        <InputItem 
                            clear
                            placeholder="请输入收货人的详细地址"
                            moneyKeyboardAlign="left"
                            error={getFieldError('userAddress')}
                            {...getFieldProps('userAddress', {
                                    rules: [
                                      { required: true, message: '请输入收货人的详细地址' },
                                    ],
                                })}
                        >详细地址
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <List>
                        <Item
                          extra={<Switch onClick={() => this.setState({checked:!checked})} checked={checked} color="red" />}
                        >是否设为默认地址</Item>
                    </List>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button type="warning" className="save-address" onClick={this.onSave}>保存并使用</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default createForm()(NewAddress);