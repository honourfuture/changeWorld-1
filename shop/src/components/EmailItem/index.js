import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Form,Input,Button,Row,Col,message} from 'antd';
import './EmailItem.less';

const formItemLayout = {
  	labelCol: {
    	xs: { span: 24 },
    	sm: { span: 6 },
  	},
  	wrapperCol: {
    	xs: { span: 24 },
    	sm: { span: 16 },
  	},
};
const FormItem = Form.Item;
class EmailItem extends BaseComponent{
	showProps=[
		{key:'email_host',label:'SMTP 服务器'},
		{key:'email_port',label:'SMTP 端口'},
		{key:'email_addr',label:'发信人邮件地址'},
		{key:'email_id',label:'SMTP 身份验证用户名'},
		{key:'email_pass',label:'SMTP 身份验证密码'},
		// {key:'email_test',label:'测试接收的邮件地址',render:()=>this.renderTest()},
	]
	// renderTest(){
	// 	return (
	// 		<Row gutter={8}>
	// 			<Col span={20}><Input /></Col>
	// 			<Col span={4}><Button>测试</Button></Col>
	// 		</Row>
	// 	)
	// }
	@action.bound
	onSaveBasic(value){
		this.props.form.validateFields((err, values) => {
			if(!err){
				Base.POST({act:'config',op:'save',mod:'admin',...values},(res)=>{
					message.success(res.message);
				},this);
			}
        });
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		const {showProps} = this;
		const readItem = this.props.item || {};
		const items = showProps.map((item,index)=>{
			const {key,label} = item;

			return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
						{getFieldDecorator(key,{initialValue:readItem[key]})(<Input placeholder={`请输入${label}`} />)}
					</FormItem>
		})
		return (
			<div className='EmailItem'>
				{items}
				<Row>
					<Col span={6}></Col>
					<Col>
						<Button type='primary' onClick={()=>this.onSaveBasic()}>确认提交</Button>
					</Col>
				</Row>
			</div>
		)
	}
};
export default Form.create()(EmailItem);