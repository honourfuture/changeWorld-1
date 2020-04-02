import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Modal,Form,Button} from 'antd';
import './UsersList.less';

const formItemLayout = {
  	labelCol: {
    	xs: { span: 24 },
    	sm: { span: 8 },
  	},
  	wrapperCol: {
    	xs: { span: 24 },
    	sm: { span: 16 },
  	},
};

const FormItem = Form.Item;
export class UsersList extends BaseComponent{
	store={visible:false}
	showProps=[
		{key:'id',label:'id'},
		{key:'nickname',label:'昵称'},
		{key:'mobi',label:'手机号'},
		{key:'point',label:'积分'},
		{key:'balance',label:'余额'},
		{key:'exp',label:'经验值'},
		{key:'gold',label:'金币'},
		{key:'created_at',label:'注册时间'},
	]
	@action.bound
	show(sons){
		this.store.users = sons;
		//无分类数据，则请求
		if(!sons.length){
			this.store.visible = false;
		}else{
			this.store.visible = true;
		}
	}
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
    render(){
		const {visible} = this.store.visible;
    	const {item} = this.props;
		const readItem = item.find((item)=>this.id === item.id) || {};
		const items = this.showProps.map((item,index)=>{
			const {key,label,render} = item;
			const value = !render?readItem[key]:render(readItem[key]);
			return (
				<FormItem key={index} {...formItemLayout} label={label}>
					{value}
				</FormItem>
			)
		})
        return (
            <Modal
            	className="GoodsItems"
	          	title="成员列表"
	          	visible={visible}
          		closable={false}
	          	footer={[
		            <Button key="submit" type="primary" onClick={this.hideModal}>
		              确认
		            </Button>,
		        ]}
	        >
				<Form>
					{items}
				</Form>
	        </Modal>
        )
    }
}