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
        const {item,callBack} = this.props;
        callBack && callBack(item.id);
    }
    @action.bound
    onDelete(){
        const {item,delCallBack} = this.props;
        delCallBack && delCallBack(item.id);
    }
    render(){
        const {item} = this.props;
        const {id,username,mobi,province,city,area,address,is_default} = item;
        const areaData = area ? `- ${area}` : ""; 
        const addRes = `${province} - ${city} ${areaData} - ${address}`;
        const isDefault = parseInt(is_default,10) === 1;
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
	                	<Flex.Item className="addrEdit"><span onClick={()=>Base.push('NewAddress',{...item})}>编辑</span><span className="spa">|</span><span onClick={this.onDelete}>删除</span></Flex.Item>
	                </Flex>
                </List>
                <WhiteSpace size="lg" />
            </div>
        )
    }
}

export default class AddressManage extends BaseComponent{
	store={
        addList:[],
    }
    componentDidMount(){
        Base.POST({act:'address',op:'index'},(res)=>{
            this.store.addList = res.data;
        });
    }
    @action.bound
    changeHandler(id){
        Base.POST({act:'address',op:'save',id,is_default:1},(res)=>{
            const {addList} = this.store;
            addList.forEach((item)=>{
                id === item.id ? item.is_default = 1 : item.is_default = 0;
            });
            Toast.success(res.message,2,null,false);
        });
    }
    @action.bound
    onDelete(id){
        Base.POST({act:'address',op:'save',id,deleted:1},(res)=>{
            const {addList} = this.store;
            const index = addList.findIndex((item)=>id === item.id);
            addList.splice(index,1);
            Toast.success(res.message,2,null,false);
        });
    }
	render(){
		const {addList} = this.store;
        const addrItem = addList.map((item,index)=>{
            return <AddrItem key={index} item={item} delCallBack={this.onDelete} callBack={this.changeHandler}/>;
        });
		return (
			<div className='AddressManage'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={<div onClick={()=>Base.push('NewAddress')} className='right-label'>添加新地址</div>}
                >地址管理</NavBar>
                <div className="base-content">
                    <div className="SelectAddress-box">
                        {addrItem}
                    </div>
                    
                </div>
                {/* <WingBlank>
                    <WhiteSpace />
                    <Button type="warning" className="save-address" onClick={()=>Base.push('NewAddress')}>+ 新增地址</Button>
                </WingBlank> */}
			</div>
		)
	}
};
