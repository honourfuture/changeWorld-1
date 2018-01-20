import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message,Icon,Upload } from 'antd';
import {remove} from 'lodash';
import {EditorModal} from '../../components/EditorModal';
import './ArticleList.less';
const Search = Input.Search;

export default class ArticleList extends BaseComponent{
	store={
		list:[],
		searchStr:''
	}
	curData={}
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
					const { id, editable } = record;
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
									<a onClick={() => this.refs.editor.show(record.content,id)}>设置内容</a>
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
		Base.POST({act:'article',op:'save',...itemData},()=>this.store.list = list,this);
	}
	//内容编辑
	@action.bound
	onEditChange(id, value, column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//删除
	@action.bound
	onDelete(id){
		Base.POST({act:'article',op:'save',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:0,title:'',editable:true,deleted:'0',enable:'1',sort:0,content:'',image:'',article_class_id:0});
	}
	//搜索
	@action.bound
	onSearch(e){
		this.store.searchStr = e.target.value;
	}
	//设置内容
	@action.bound
	onCompleteEdit(content,id){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.content = content;
		this.onSave(id);
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.editable = false;
		Base.POST({act:'ad',op:'save',mod:'admin',...itemData},(res)=>{
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	componentDidMount() {
		Base.GET({act:'article',op:'index'},(res)=>{
			const {list} = res.data;
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	render(){
		let {list,searchStr} = this.store;
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
				<EditorModal ref='editor' onComplete={this.onCompleteEdit}/>
			</Spin>
		)
	}
};
