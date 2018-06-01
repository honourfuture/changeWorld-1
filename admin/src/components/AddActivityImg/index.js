import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Modal,Form,Button,Upload,Switch,Icon} from 'antd';
import './AddActivityImg.less';
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
class AddActivityImg extends BaseComponent{
	store={
		visible:false,
		loading:false
	}
	showProps=[
		{key:'is_ad',label:'是否加入广告图',render:(value)=>this.renderSwitch(value)},
		{key:'ad_image',label:'活动开始时间',render:(value)=>this.renderImg(value)},
	];
	renderSwitch(values){
		return (
			<Switch checked={parseInt(values,10) === 1} onChange={(value)=>this.onSwitch(value?1:0)} checkedChildren="开" unCheckedChildren="关" />
		)
	}
	renderImg(value){
		const {loading} = this.store;
		return (
			<Upload
				name="field"
				data={{ field: "field" }}
				listType="picture-card"
				showUploadList={false}
				action={Global.UPLOAD_URL}
				onChange={e => this.onUploadChange(e)}
			>
				{value ? (
					<img
						className="img-uploader"
						src={Base.getImgUrl(value)}
						alt=""
					/>
				) : (
					<div>
						<Icon type={loading ? "loading" : "plus"} />
						<div className="ant-upload-text">上传</div>
					</div>
				)}
			</Upload>
		)		
	}
	//上传
    @action.bound
    onUploadChange(info) {
        if (info.file.status === "uploading") {
            this.store.loading = true;
        }
        if (info.file.status === "done") {
            this.store.loading = false;
        }
	}
	@action.bound
	show(id){
		this.id = id;
		this.store.visible = true;
	}
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		const {visible} = this.store;
		const {item} = this.props;
		const readItem = item.find((item)=>this.id === item.id) || {};
		const items = this.showProps.map((item,index)=>{
			const {key,label,render} = item;
			return (
				<FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
					{getFieldDecorator(key,{initialValue:readItem[key]})(render(readItem[key]))}
				</FormItem>
			)
		})
		return (
			<Modal
				className="AddActivityImg"
				title="增加广告"
				visible={visible}
				closable={false}
			>
				<Form>
					{items}
				</Form>
			</Modal>
		)
	}
};
export default Form.create()(AddActivityImg);
// export default AddActivityImg;
