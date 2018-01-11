import React from 'react';
import {BaseComponent} from '../../common';
import {Button,List,InputItem,Picker,Switch,WhiteSpace,WingBlank} from 'antd-mobile';
import './SelectAddress.less';


export default class SelectAddress extends BaseComponent{
    
    componentDidMount(){
    }
    render(){
        return (
            <div className='SelectAddress'>
                123
                <WhiteSpace size="xl" />
                <WingBlank>
                    <Button type="warning" className="save-address">保存并使用</Button>
                </WingBlank>
            </div>
        )
    }
}