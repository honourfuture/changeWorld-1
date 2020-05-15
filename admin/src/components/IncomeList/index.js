import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Modal,Form,Button,Table} from 'antd';
import './IncomeList.less';

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
export class IncomeList extends BaseComponent{
	store={visible:false, dataSource:{}}
	title = '收益';
	columns=[
		{dataIndex:'id',title:'id'},
		{dataIndex:'amount',title:'收益'},
		{dataIndex:'updated_at',title:'时间'},
	]
	@action.bound
    requetData(id, topic) {
        Base.GET(
            { act: 'income', op: 'index', mod: 'admin', user_id:id, topic: topic },
            res => {
                this.store.dataSource = res.data.list;
                this.store.visible = true;
            },
            this
        );
    }
    @action.bound
    show(id, topic) {
		this.title = (topic == 2 ? '商品收益' : '知识收益')
    	this.requetData(id, topic);
    }
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
    render(){
		const title = this.title;
		const {visible, dataSource} = this.store;
        return (
            <Modal
            	width='1000px'
            	className="GoodsItems"
	          	title={title}
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