import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Form,Input,Button,Row,Col,message,Upload,Icon} from 'antd';
import './ShopSetItem.less';
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
class ShopSetItem extends BaseComponent{
	store={
		loading:'',
	}
	showProps=[
		{key:'logo_image',label:'网站Logo',render:(value,key,label)=>this.renderUpload(value,key,label)},
		{key:'buyer_image',label:'会员中心Logo',render:(value,key,label)=>this.renderUpload(value,key,label)},
		{key:'seller_image',label:'商家中心Logo',render:(value,key,label)=>this.renderUpload(value,key,label)},
		{key:'phone',label:'客服联系电话',render:(value,key,label)=><Input placeholder={`请输入${label}`} />},
		{key:'email',label:'电子邮件',render:(value,key,label)=><Input placeholder={`请输入${label}`} />},
	]
	renderUpload(value,key,label){
		const {loading} = this.store;
		return (
			<Upload
				withCredentials={true}
				name="field"
				data={{'field':'field'}}
		        listType="picture-card"
		        showUploadList={false}
		        action={Global.UPLOAD_URL}
				onChange={(e)=>this.onUploadChange(e,key)}
		    >
		        {value?<img src={Base.getImgUrl(value)} alt=''/>:<div>
					<Icon type={ loading===key ? 'loading':'plus'} />
					<div className="ant-upload-text">上传</div>
				</div>}
		    </Upload>
		)
	}
	//上传
	@action.bound
	onUploadChange(info,key){
		if (info.file.status === 'uploading') {
			this.store.loading = key;
		}
		if (info.file.status === 'done') {
			this.store.loading = '';
		}
	}
	@action.bound
	onSaveBasic(value){
		this.props.form.validateFields((err, values) => {
			console.log(values);
			if(!err){
				const setImgUrl = (key)=>{
					if(values[key] && values[key].file && values[key].file.response){
						values[key] = values[key].file.response.data.file_url;
					}
				}
				setImgUrl('logo_image');
				setImgUrl('buyer_image');
				setImgUrl('seller_image');
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
			return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
						{getFieldDecorator(key,{initialValue:readItem[key]})(render(readItem[key],key,label))}
					</FormItem>
		})
		return (
			<div className='ShopSetItem'>
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
export default Form.create()(ShopSetItem);