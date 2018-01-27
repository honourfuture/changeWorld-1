import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Form,Input,Button,Row,Col,message} from 'antd';
import './ExpRuleSet.less';

const formItemLayout = {
  	labelCol: {
    	xs: { span: 24 },
    	sm: { span: 4 },
  	},
  	wrapperCol: {
    	xs: { span: 24 },
    	sm: { span: 16 },
  	},
};
const FormItem = Form.Item;
class ExpRuleSet extends BaseComponent{
	store={
		pageDate:{}
	}
	showProps=[
		{key:'grade_login',label:'会员登录'},
		{key:'grade_evaluate',label:'会员评论'},
		{key:'grade_pay',label:'消费'},
		{key:'grade_order',label:'订单上限'},
	]
	@action.bound
	onSaveBasic(value){
		this.props.form.validateFields((err, values) => {
			if(!err){
				Base.POST({act:'grade_rule',op:'save',mod:'admin',...values},(res)=>{
					message.success(res.message);
				},this);
			}
        });
	}
	componentDidMount(){
		Base.GET({act:'grade_rule',op:'index',mod:'admin'},(res)=>{
			console.log(res);
			this.store.pageDate = res.data; 
		},this);
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		const {showProps} = this;
		const {pageDate} = this.store;
		const items = showProps.map((item,index)=>{
			const {key,label} = item;
			return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
						{getFieldDecorator(key,{initialValue:pageDate[key]})(<Input placeholder={`请输入${label}`} />)}
					</FormItem>
		})
		return (
			<div className='ExpRuleSet'>
				{items}
				<Row>
					<Col span={4}></Col>
					<Col>
						<Button type='primary' onClick={()=>this.onSaveBasic()}>确认提交</Button>
					</Col>
				</Row>
			</div>
		)
	}
};
export default Form.create()(ExpRuleSet);