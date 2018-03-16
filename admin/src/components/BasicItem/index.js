import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Form,Input,Button,Row,Col,Switch,message} from 'antd';
import './BasicItem.less';

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
const { TextArea } = Input;
class BasicItem extends BaseComponent{
	showProps=[
		{key:'site_name',label:'站点名称'},
		{key:'icp_number',label:'ICP证书号'},
		{key:'statistics_code',label:'第三方流量统计代码',render:(value)=>this.renderTextArea(value)},
		{key:'copyright',label:'版权信息'},
		{key:'site_status',label:'站点状态',render:(value)=>this.renderSwitch(value)},
		{key:'closed_reason',label:'关闭原因'},
		{key:'phone',label:'客服联系电话'},
		{key:'email',label:'电子邮箱'},
	]
	renderTextArea(value){
		return (
			<TextArea autosize={{ minRows: 4 }} />
		)
	}
	renderSwitch(values){
		return (
			<Switch checked={parseInt(values,10) === 1} onChange={(value)=>this.onSwitch(value?1:0)} checkedChildren="开" unCheckedChildren="关" />
		)
	}
	//是否启用
	@action.bound
	onSwitch(value){
		const {callBack} = this.props;
		callBack && callBack(value);
	}
	@action.bound
	onSaveBasic(value){
		this.props.form.validateFields((err, values) => {
			if(!err){
				values.site_status = values.site_status ? 1:0;
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
			const {key,label,render} = item;
			if(!render){
				return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
							{getFieldDecorator(key,{initialValue:readItem[key]})(<Input placeholder={`请输入${label}`} />)}
						</FormItem>
			}else{
				return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
							{getFieldDecorator(key,{initialValue:readItem[key]})(render(readItem[key]))}
						</FormItem>
			}
		})
		return (
			<div className='BasicItem'>
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

export default Form.create()(BasicItem);