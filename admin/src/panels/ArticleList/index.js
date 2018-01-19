import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message,Modal,Icon,Upload } from 'antd';
import {remove} from 'lodash';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ArticleList.less';
const Search = Input.Search;
console.log(EditorState);

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

export default class ArticleList extends BaseComponent{
	store={
		list:[],
		searchStr:'',
		isEdit:true
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '排序',
				dataIndex: 'sort',
				width: '10%',
				render: (text, record) => this.renderText(text, record, 'sort'),
			},
			{
				title: '更新时间',
				dataIndex: 'updated_at',
				width: '20%',
				render: (text, record) => this.renderText(text, record, 'updated_at'),
			}, 
			{
				title: '标题',
				dataIndex: 'name',
				width: '15%',
				render: (text, record) => this.renderText(text, record, 'name'),
			}, 
			{
				title: '启用',
				dataIndex: 'enable',
				width: '15%',
				render: (text, record) => this.renderSwitch(text, record, 'enable'),
			}, 
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) => {
					const { editable,id } = record;
					return (
					<div className="editable-row-operations">
						{
						editable ?
							<span>
								<a onClick={() => this.onSave(id)}>保存</a>
								<a className='ml10 gray' onClick={() => this.onCancel(id)}>取消</a>
							</span>
							:
							<span>
								<a onClick={() => this.onEditChange(id,true,'editable')}>编辑</a>
								<Popconfirm title="确认删除?" okText='确定' cancelText='取消' onConfirm={() => this.onDelete(id)}>
									<a className='ml10 gray'>删除</a>
								</Popconfirm>
							</span>
						}
					</div>
					);
				},
			}
		];
	}
	renderText(text, record, column) {
		return (
			<div>
				{record[column]}
			</div>
		);
	}
	renderSwitch(text,record,column){
		return (
			<Switch checked={parseInt(record.enable,10)===1} onChange={(value)=>this.onSwitch(record.id,value?1:0,column)} />
		)
	}
	//是否启用
	@action.bound
	onSwitch(id,value,column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		Base.POST({act:'shop_class',op:'save',...itemData},()=>this.store.list = list,this);
	}
	//内容编辑
	@action.bound
	onEditChange(id, value, column) {
		this.store.isEdit = true;
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = this.store.list.find(item=>id === item.id);
		itemData.editable = false;
		Base.POST({act:'shop_class',op:'save',...itemData,sort:parseInt(itemData.sort,10)},(res)=>{
			itemData.updated_at = Base.getTimeFormat(new Date().getTime()/1000,2);
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	//取消
	@action.bound
	onCancel(id) {
		this.store.list = this.cacheData.map(item => ({ ...item }));
	}
	//删除
	@action.bound
	onDelete(id){
		Base.POST({act:'shop_class',op:'save',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	//添加
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:0,name:'',editable:true,deleted:'0',enable:'1',sort:0});
	}
	//搜索
	@action.bound
	onSearch(e){
		this.store.searchStr = e.target.value;
	}
	@action.bound
	onModalCancel(){
		this.store.isEdit = false;
	}
	@action.bound
	onModalOk(){
		const content = draftToHtml(convertToRaw(this.refs.editor.state.editorState.getCurrentContent()));
		console.log(content);
	}
	onUploadCallback(file){
		return new Promise(
			(resolve, reject) => {
				getBase64(file,(info)=>{
					Base.POST({act:'common',op:"base64FileUpload",'base64_image_content':info},(res)=>{
						resolve({data:{link:res.data.file_url}});
					},null,(res)=>{
						message.error(res.message);
						reject();
					});
				})
			}
		);
	}
	componentDidMount() {
		Base.GET({act:'shop_class',op:'index'},(res)=>{
			this.store.list = res.data;
			this.cacheData = res.data.map(item => ({ ...item }));
		},this);
	}
	render(){
		let {list,searchStr,isEdit} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0 && (!searchStr || item.name.indexOf(searchStr) !== -1);
		})
		return (
			<Spin ref='spin' wrapperClassName='ArticleList' spinning={false}>
				<div className='pb10'>
					<Button onClick={this.onAdd}>新增+</Button>
					<Search
						placeholder="搜索标题"
						onChange={this.onSearch}
						style={{ width: 130,marginLeft:10 }}
					/>
				</div>
				<Table className="mt16" bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={{hideOnSinglePage:true}}/>
				<Modal 
					className='articleList-modal' 
					title="" 
					visible={isEdit}
					onOk={this.onModalOk} 
					onCancel={this.onModalCancel}
					okText='保存'
					cancelText='取消'
					maskClosable={false}
					width='60%'
					>
					<Input className='edit-title' placeholder='请输入文章标题'/>
					<Editor ref='editor'
						toolbar={{
							'image':{
								uploadCallback:this.onUploadCallback,
								previewImage:true,
							}
						}}
						localization={{
							locale: 'zh',
						}}
					/>
				</Modal>
			</Spin>
		)
	}
};
