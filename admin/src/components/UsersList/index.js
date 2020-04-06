import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Modal,Form,Button,Table} from 'antd';
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
	store={visible:false, dataSource:{}}
	columns=[
		{dataIndex:'id',title:'id'},
		{dataIndex:'nickname',title:'昵称'},
		{dataIndex:'mobi',title:'手机号'},
		{dataIndex:'point',title:'积分'},
		{dataIndex:'balance',title:'余额'},
		{dataIndex:'exp',title:'经验值'},
		{dataIndex:'gold',title:'金币'},
		{dataIndex:'created_at',title:'注册时间'},
	]
	@action.bound
    requetData(id) {
        Base.GET(
            { act: 'user', op: 'getSons', mod: 'admin', user_id:id },
            res => {
                this.store.dataSource = res.data;
                this.store.visible = true;
            },
            this
        );
    }
    @action.bound
    show(id) {
    	this.requetData(id);
    	console.log(this.store.visible);
    }
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
    render(){
		const {visible, dataSource} = this.store;
        return (
            <Modal
            	width='1000px'
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
					<Table dataSource={dataSource} columns={this.columns} />;
				</Form>
	        </Modal>
        )
    }
}