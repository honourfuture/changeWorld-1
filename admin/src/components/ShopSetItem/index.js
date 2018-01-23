import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Form,Input,Button,Row,Col,message,Upload,Icon} from 'antd';
import './ShopSetItem.less';
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
class ShopSetItem extends BaseComponent{
	showProps=[
		{key:'logo_image',label:'网站Logo',render:(value)=>this.renderUpload(value)},
		{key:'buyer_image',label:'会员中心Logo',render:(value)=>this.renderUpload(value)},
		{key:'seller_image',label:'商家中心Logo',render:(value)=>this.renderUpload(value)},
		{key:'phone',label:'客服联系电话'},
		{key:'email',label:'电子邮件'},
	]
	renderUpload(value){
		return (
			<Upload
		        name={value}
		        listType="picture-card"
		        data={{value:value}}
		        showUploadList={false}
		        action={Global.UPLOAD_URL}
				onChange={(e)=>this.onUploadChange(e)}
		    >
		        {value?<img src={value} alt=''/>:<div>
					<Icon type='plus' />
					<div className="ant-upload-text">上传</div>
				</div>}
		    </Upload>
		)
	}
	//上传
	@action.bound
	onUploadChange(info){
		console.log(info)
		// const list = this.store.list.slice();
		// const itemData = list.find(item=>id === item.id);
		// if (info.file.status === 'uploading') {
		// 	itemData.loading = true;
		// 	return this.store.list = list;
		// }
		// if (info.file.status === 'done') {
		// 	itemData.loading = false;
		// 	itemData.image = info.file.response.data.file_url;
		// 	return this.store.list = list;
		// }
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
			<div className='ShopSetItem'>
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
export default Form.create()(ShopSetItem);