import React from 'react';
import {action} from 'mobx';
import {BaseComponent} from '../../common';
import {Button,List,Radio,WhiteSpace,WingBlank} from 'antd-mobile';
import './SelectAddress.less';

const Item = List.Item;
const Brief = Item.Brief;

class AddressItem extends BaseComponent {
    @action.bound
    changeHandler(){
        const {index,callBack} = this.props;
        callBack && callBack(index);
    }
    render(){
        const {name,tel,address,checked} = this.props;
        return(
            <div>
                <List className="addressItem">
                    <Item
                        thumb={
                            <Radio checked={checked} key={name} onChange={this.changeHandler}></Radio>
                        }
                        multipleLine
                    >
                        {name} <span>{tel}</span>
                        <Brief>{address}</Brief>
                    </Item>
                </List>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}

export default class SelectAddress extends BaseComponent{
    store={
        curIndex:0,
        addressDate:[{
            name:"李娟",
            tel:"182****3679",
            address:"浙江省-杭州市-西湖区 春申街西溪花园凌波苑春申街西溪花园凌波苑春申街西溪花园凌波苑"
        },{
            name:"Kaden McCullough",
            tel:"134****2587",
            address:"浙江省-杭州市-西湖区 春申街西溪花园凌波苑春申街西溪花园凌波苑春申街西溪花园凌波苑"
        },{
            name:"万莎莎",
            tel:"134****2587",
            address:"浙江省-杭州市-西湖区 春申街西溪花园凌波苑春申街西溪花园凌波苑春申街西溪花园凌波苑"
        }]
    }
    componentDidMount(){
    }
    @action.bound
    changeHandler(index){
        this.store.curIndex = index;
    }
    render(){
        const {curIndex,addressDate} = this.store;
       const addressItem = addressDate.map((item,index)=>{
            return <AddressItem key={index} checked={curIndex === index} index={index} {...item} callBack={this.changeHandler}/>;
        });
        return (
            <div className='SelectAddress'>
                <div className="SelectAddress-box">
                    {addressItem}
                </div>
                <WhiteSpace size="xl" />
                <WingBlank>
                    <Button type="warning" className="save-address">+ 新增地址</Button>
                </WingBlank>
            </div>
        )
    }
}