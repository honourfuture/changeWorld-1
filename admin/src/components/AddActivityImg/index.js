import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Modal,Form,Button,Upload,Switch,Icon,message} from 'antd';
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
		loading:false,
		adImg:[],
		uploadDis:true
	}
	showProps=[
		{key:'is_ad',label:'是否加入广告图',render:(value)=>this.renderSwitch(value)},
		{key:'ad_image',label:'广告图片',render:(value)=>this.renderImg(value)},
	];
	renderSwitch(values){
		return (
			<Switch defaultChecked={parseInt(values,10) === 1} onChange={this.onSwitch} />
		)
	}
	@action.bound
	onSwitch(value){
		// console.log(value)
		// value ? this.store.uploadDis = false : this.store.uploadDis = true;
	}
	@action.bound
	renderImg(value){
		const {loading,uploadDis} = this.store;
		return (
			<Upload
				name="field"
				data={{ field: "field" }}
				listType="picture-card"
				showUploadList={false}
				action={Global.UPLOAD_URL}
				onChange={e => this.onUploadChange(e,this.id)}
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
    onUploadChange(info,id) {
		const list = this.props.item.slice();
		const itemData = list.find(item => id === item.id);
        if (info.file.status === "uploading") {
			itemData.loading = true;
        }
        if (info.file.status === "done") {
			itemData.loading = false;
			itemData.ad_image = info.file.response.data.file_url;
			this.store.adImg.push(info.file.response.data.file_url);
        }
	}
	@action.bound
	show(data){
		this.id = data.id;
		this.store.visible = true;
		// if(parseInt(data.is_ad) === 1){
		// 	this.store.uploadDis = true;
		// }else{
		// 	this.store.uploadDis = false;
		// }
	}
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
	@action.bound
	componentDidMount(){
		Base.addEvt('com.show.adimg',(res,data)=>{
			console.log(data)
			this.show(data);
			
		});
	}
	@action.bound
	componentWillUnmount(){
		Base.removeEvt('com.show.adimg');
	}
	@action.bound
	onSave(value){
		this.props.form.validateFields((err, values) => {
			if(!err){
				values.ad_image = this.store.adImg.map(item=>item);
				values.id = this.id;
				values.is_ad = values.is_ad === true ? 1 : 0;
				// console.log(values)
				Base.POST({act:'activity',op:'img',mod:'admin',...values},(res)=>{
					message.success(res.message);
				},this);
				this.hideModal();
			}
        });
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
				footer={[
					<Button key="back" onClick={this.hideModal}>
		              取消
		            </Button>,
		            <Button key="submit" type="primary" onClick={this.onSave}>
		              确认提交
		            </Button>
		        ]}
			>
				{items}
				<FormItem className="baseForm" {...formItemLayout} label={<span style={{color:'#848484',fontSize:12}}>注</span>}>
					<span style={{color:'#848484',fontSize:12}}>推荐尺寸为750 X 350的图片，显示效果最佳。</span>
				</FormItem>
			</Modal>
		)
	}
};
export default Form.create()(AddActivityImg);
// export default AddActivityImg;
