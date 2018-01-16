import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,List,Radio,WhiteSpace,WingBlank,NavBar} from 'antd-mobile';

import './AddressManage.less';
import {icon} from '../../images';

const Item = List.Item;
const Brief = Item.Brief;

class AddrItem extends BaseComponent {
    @action.bound
    changeHandler(){
        const {index,callBack} = this.props;
        callBack && callBack(index);
    }
    render(){
        const {name,tel,address,checked} = this.props;
        return(
            <div>
                <List className="addrItem" onClick={this.changeHandler}>
                    <Item
                        multipleLine
                    >
                        {name} <span>{tel}</span>
                        <Brief>{address}</Brief>
                    </Item>
                    <Flex className="addrOpera" justify="between">
	                	<Flex.Item className="defaultAddr"><Radio checked={checked} key={name}></Radio>默认地址</Flex.Item>
	                	<Flex.Item className="addrEdit"><span>编辑</span><span className="spa">|</span><span>删除</span></Flex.Item>
	                </Flex>
                </List>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}

export default class AddressManage extends BaseComponent{
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
    @action.bound
    changeHandler(index){
        this.store.curIndex = index;
    }
	render(){
		const {curIndex,addressDate} = this.store;
        const addrItem = addressDate.map((item,index)=>{
            return <AddrItem key={index} checked={curIndex === index} index={index} {...item} callBack={this.changeHandler}/>;
        });
		return (
			<div className='AddressManage'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={<div onClick={()=>Base.push('NewAddress')} className='right-label'>添加</div>}
                >支付</NavBar>
                <div className="base-content">
                    <div className="SelectAddress-box">
                        {addrItem}
                    </div>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button type="warning" className="save-address" onClick={()=>Base.push('NewAddress')}>+ 新增地址</Button>
                    </WingBlank>
                </div>
			</div>
		)
	}
};
