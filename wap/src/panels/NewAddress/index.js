import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Button,List,InputItem,Picker,Switch,WhiteSpace,WingBlank,NavBar,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import './NewAddress.less';

import {icon} from '../../images';
import { district } from '../../common/cityData';

const Item = List.Item;
class NewAddress extends BaseComponent{
    store={sValue:[],visible:false,checked:false}
    @action.bound
    onSave(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {mobi} = values;
                mobi = mobi.replace(/ /g,'');
                const {sValue,checked} = this.store;
                if( sValue.length === 0 ){
                    return Toast.fail('请选择区域');
                }
                const [province_id,city_id,area_id] = sValue;
                const provinceData = district.find(item=>province_id === item.value);
                const cityData = provinceData.children.find(item=>city_id === item.value);
                const areaData = area_id ? cityData.children.find(item=>area_id === item.value) : "";
                let is_default = checked?1:0;
                Base.POST({act:'address',op:'save',...values,mobi,id:0,is_default,province_id,province:provinceData.label,city_id,city:cityData.label,area_id:area_id || 0,area:areaData.label || ""},(res)=>{
                    Toast.success(res.message);
                });
            }
        });
    }
    @action.bound
    onSelect(v){
        this.store.sValue = v;
        this.store.visible = true;
    }
    @action.bound
    onChange(){
        this.store.checked=!this.store.checked;
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        const {sValue,visible,checked} = this.store;
        const takeRegion = visible ? "take-region check-address" : "take-region";
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
                            error={!!getFieldError('username')}
                            {...getFieldProps('username', {
                                rules: [
                                  { required: true, message: '请输入收货人姓名' },
                                ],
                            })}
                        >收货人</InputItem>
                        <InputItem 
                            error={getFieldError('mobi')}
                            {...getFieldProps('mobi', {
                                rules: [
                                  { required: true, message: '请输入收货人的手机号码',pattern:/^1(3|4|5|7|8)\d( )?\d{4}( )?\d{4}$/ },
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
                                dismissText=" "
                                onOk={this.onSelect}
                                value={sValue.slice()}
                                >
                                <Item arrow="horizontal">省市区</Item>
                            </Picker>
                        </div>
                        <InputItem 
                            clear
                            placeholder="请输入收货人的详细地址"
                            moneyKeyboardAlign="left"
                            error={getFieldError('address')}
                            {...getFieldProps('address', {
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
                          extra={<Switch onClick={this.onChange} checked={checked} color="red" />}
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