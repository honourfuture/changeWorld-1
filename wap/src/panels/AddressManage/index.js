import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,List,Radio,WhiteSpace,WingBlank,NavBar,Toast} from 'antd-mobile';

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
    @action.bound
    onDelete(){
        const {index,delCallBack} = this.props;
        delCallBack && delCallBack(index);
    }
    render(){
        const {id,username,mobi,province,city,area,address,is_default,province_id,city_id,area_id} = this.props;
        const areaData = area ? ("-"+area) : ""; 
        const addRes = province+"-"+city+areaData+"-"+address;
        const isDefault = is_default == 1 ? true : false;
        return(
            <div>
                <List className="addrItem">
                    <Item
                        multipleLine
                    >
                        {username} <span>{mobi}</span>
                        <Brief>{addRes}</Brief>
                    </Item>
                    <Flex className="addrOpera" justify="between">
	                	<Flex.Item className="defaultAddr" onClick={this.changeHandler} ><Radio checked={isDefault} key={id}></Radio>默认地址</Flex.Item>
	                	<Flex.Item className="addrEdit"><span onClick={()=>Base.push('NewAddress',{id,username,mobi,address,province_id,city_id,area_id})}>编辑</span><span className="spa">|</span><span onClick={this.onDelete}>删除</span></Flex.Item>
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
        addList:[],
    }
    componentDidMount(){
        Base.POST({act:'address',op:'index'},(res)=>{
            this.store.addList = res.data;
        });
    }
    @action.bound
    changeHandler(index){
        Base.POST({act:'address',op:'save',id:index,is_default:1},(res)=>{
            const {addList} = this.store;
            const itemData = addList.slice();
            itemData.forEach((value,index)=>{
                value.is_default = 0;
            });
            const defaultItem = itemData.find(item=>index === item.id);
            defaultItem.is_default = 1;
            Toast.success(res.message);
        });
    }
    @action.bound
    onDelete(id){
        console.log(id);
    }
	render(){
		const {curIndex,addList} = this.store;
        console.log(addList,"111")
        const addrItem = addList.map((item,index)=>{
            return <AddrItem key={index} checked={curIndex === index} index={item.id} {...item} delCallBack={this.onDelete} callBack={this.changeHandler}/>;
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
                    
                </div>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="warning" className="save-address" onClick={()=>Base.push('NewAddress')}>+ 新增地址</Button>
                </WingBlank>
			</div>
		)
	}
};
