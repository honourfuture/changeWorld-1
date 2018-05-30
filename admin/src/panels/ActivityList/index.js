import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base,Global} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message ,Upload,Icon,Modal,Form} from 'antd';
import { remove } from "lodash";
import './ActivityList.less';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

export default class ActivityList extends BaseComponent{
	store = {
		list: [],
		acImg:false,
		acDetail:false,
		loading:'',
	};
	// showProps=[
	// 	{key:'is_ad',label:'加入广告图',render:(value)=>this.renderImgSwitch(value)},
	// 	{key:'ad_image',label:'图片地址',render:(value,key,label)=>this.renderUpload(value,key,label)},
	// ]
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '活动分类',
				dataIndex: 'activity_class_name',
				width: '10%',
			}, 
			{
				title: '活动名称',
				dataIndex: 'title',
			},
			{
				title: '活动详情',
				dataIndex: 'details',
				width: '15%',
			}, 
			{
				title: '活动描述',
				dataIndex: 'summary',
				width: '15%',
			}, 
			{
				title: '开始时间',
				dataIndex: 'time_start',
				render: (text, record) => this.renderTime(text, record, 'time_start'),
			}, 
			{
				title: '结束时间',
				dataIndex: 'time_end',
				render: (text, record) => this.renderTime(text, record, 'time_end'),
			},
			{
				title: '推荐设置',
				dataIndex: 'is_recommend',
				width: '10%',
				render: (text, record) => this.renderSwitch(text, record, 'is_recommend'),
			}, 
			{
				title: '操作',
				dataIndex: 'operation',
				width: '10%',
				render: (text, record) => {
					const { id } = record;
					return (
					<div className="editable-row-operations">
						<span>
							<a onClick={() => alert(id)}>详情</a>&nbsp;&nbsp;
							<a onClick={() => this.onAddImg(id)}>广告位</a>
						</span>
					</div>
					);
				},
			}
		];
	}
	renderTime(text,record,column){
		const {time_end,time_start} = record;
		return Base.getTimeFormat(column === 'time_start' ? time_start : time_end);
	}
	renderImg(text,record,column){
		const {editable,icon,loading} = record;
		return <div>
			{editable?<Upload
				name="field"
				data={{'field':'field'}}
				listType="picture-card"
				showUploadList={false}
				action={Global.UPLOAD_URL}
				onChange={(e)=>this.onUploadChange(e,record.id)}
			>
				{icon?<img className='img-uploader' style={{width:'120px'}} src={icon} alt=''/>:<div>
					<Icon type={loading ? 'loading' : 'plus'} />
					<div className="ant-upload-text">上传</div>
				</div>}
			</Upload>:<img className='img-uploader'  style={{width:'120px'}} src={Base.getImgUrl(icon)} alt=''/>}
		</div>
	}
	renderSwitch(text,record,column){
		return (
			<Switch checked={parseInt(record.is_recommend,10)===1} onChange={(value)=>this.onSwitch(record.id,value?1:0,column)} />
		)
	}
	@action.bound
	onAddImg(){
		this.store.acImg = !this.store.acImg;
	}
	//保存
	@action.bound
	onSave(id,value) {
		console.log(id,value)
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		Base.POST({act:'activity',op:'recommend',mod:'admin',id:id,is_recommend:value},(res)=>{
			itemData.updated_at = Base.getTimeFormat(new Date().getTime()/1000,2);
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	//是否启用
	@action.bound
	onSwitch(id,value,column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.onSave(id,value);
	}
	//上传
	@action.bound
	onUploadChange(info,id){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		if (info.file.status === 'uploading') {
			itemData.loading = true;
			return this.store.list = list;
		}
		if (info.file.status === 'done') {
			itemData.loading = false;
			itemData.icon = info.file.response.data.file_url;
			return this.store.list = list;
		}
	}
	componentDidMount() {
		Base.GET({act:'activity',op:'index',mod:'admin'},(res)=>{
			console.log(res.data.list);
			const {list} = res.data;
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	// renderImgSwitch(values){
	// 	return (
	// 		<Switch checked={parseInt(values,10) === 1} onChange={(value)=>this.onSwitch(value?1:0)} />
	// 	)
	// }
	// renderUpload(value,key,label){
	// 	const {loading} = this.store;
	// 	return (
	// 		<Upload
	// 			name="field"
	// 			data={{'field':'field'}}
	// 	        listType="picture-card"
	// 	        showUploadList={false}
	// 	        action={Global.UPLOAD_URL}
	// 			onChange={(e)=>this.onUploadChange(e,key)}
	// 	    >
	// 	        {value?<img src={Base.getImgUrl(value)} alt=''/>:<div>
	// 				<Icon type={ loading===key ? 'loading':'plus'} />
	// 				<div className="ant-upload-text">上传</div>
	// 			</div>}
	// 	    </Upload>
	// 	)
	// }
	render(){
		let {list,acImg,acDetail} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		});
		// const items = this.showProps.map((item,index)=>{
		// 	const {key,label,render} = item;
		// 	return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
		// 				{render(key,label)}
		// 			</FormItem>
		// })
		return (
			<Spin ref='spin' spinning={false} className='ActivityList'>
				<Table className="mt16" bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={false} />
				{/* <Modal
                    className="activityImg-modal"
                    title="广告位"
                    visible={acImg}
                    closable={false}
                    onCancel={() => this.onAddImg()}
                    footer={[
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => alert(1)}
                        >
                            确认
                        </Button>
                    ]}
                >
                    <Form>{items}</Form>
                </Modal> */}
			</Spin>
		)
	}
};
