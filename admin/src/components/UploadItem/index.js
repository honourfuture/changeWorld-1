import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Form,Input,Button,Row,Col,message} from 'antd';
import './UploadItem.less';
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
class UploadItem extends BaseComponent{
	showProps=[
		{key:'image_max_filesize',label:'图片文件大小',render:(value)=>this.renderImgSize(value)},
		{key:'image_allow_ext',label:'文件扩展名'},
	]
	renderImgSize(value){
		return (
			<div>大小 <Input defaultValue={value} style={{width:100}} /> KB（1024 KB = 1 MB）</div>
		)
	}
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
			<div className='UploadItem'>
				{items}
				<Row>
					<Col span={8}></Col>
					<Col>
						<Button type='primary' onClick={()=>this.onSaveBasic()}>确认提交</Button>
					</Col>
				</Row>
			</div>
		)
	}
};
export default Form.create()(UploadItem);