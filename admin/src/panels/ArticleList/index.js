import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message,Select } from 'antd';
import {remove} from 'lodash';
import {EditorModal} from '../../components/EditorModal';
import './ArticleList.less';
const Search = Input.Search;
const Option = Select.Option;

export default class ArticleList extends BaseComponent{
	store={
		list:[],
		article_class:[]
	}
	curData={}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '排序',
				dataIndex: 'sort',
				width: '10%',
				render: (text, record) => this.renderInput(text, record, 'sort'),
			},
			{
				title: '更新时间',
				dataIndex: 'updated_at',
				width: '20%',
				render: (text, record) => this.renderText(text, record, 'updated_at'),
			}, 
			{
				title: '标题',
				dataIndex: 'title',
				width: '15%',
				render: (text, record) => this.renderInput(text, record, 'title'),
			}, 
			{
				title: '分类',
				dataIndex: 'article_class_id',
				width: '15%',
				render: (text, record) => this.renderSelect(text, record, 'article_class_id'),
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
									<a className='ml10' onClick={() => this.refs.editor.show(record.content,id)}>设置内容</a>
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
	renderInput(text, record, column){
		const {editable} = record;
		return (
			<div>
				{editable
					? <Input style={{ margin: '-5px 0' }} value={text} type={column==='sort'?'number':'text'} onChange={e => this.onEditChange(record.id, e.target.value, column)} />
					: text
				}
			</div>
		)
	}
	renderSwitch(text,record,column){
		return (
			<Switch checked={parseInt(record.enable,10)===1} onChange={(value)=>this.onSwitch(record.id,value?1:0,column)} />
		)
	}
	renderSelect(text,record,column){
		const value = record[column];
		const {article_class} = this.store;
		let curIndex = article_class.findIndex((item)=>item.id === value);
		curIndex = curIndex >= 0?curIndex:0;
		return <div>
				{record.editable?<Select defaultValue={value|| article_class[0].id} style={{ width: 120 }} onChange={(value)=>this.onEditChange(record.id,value,column)}>
					{
						article_class.map(({id,name})=><Option key={id} value={id}>{name}</Option>)
					}
				</Select>:article_class[curIndex].name}
			</div>
	}
	//是否启用
	@action.bound
	onSwitch(id,value,column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.onSave(id);
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
	//取消
	@action.bound
	onCancel(id) {
		this.store.list = this.cacheData.map(item => ({ ...item }));
	}
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		const {article_class} = this.store;
		const article_class_id =  article_class.length > 0 ? article_class[0].id:''
		this.store.list.unshift({id:0,title:'',editable:true,deleted:'0',enable:'1',sort:0,content:'',image:'',article_class_id});
	}
	//搜索
	searchStr = ''
	@action.bound
	onSearch(value){
		this.current = 1;
		this.searchStr = value;
		this.requestData();
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
		Base.POST({act:'article',op:'save',...itemData},(res)=>{
			itemData.editable = false;
			itemData.updated_at = Base.getTimeFormat(new Date().getTime()/1000,2);
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	@action.bound
	onTableHandler({current,pageSize}){
		this.current = current;
		this.requestData();
	}
	current = 1
	@action.bound
	requestData(){
		Base.GET({act:'article',op:'index',title:this.searchStr || '',cur_page:this.current || 1,per_page:Global.PAGE_SIZE},(res)=>{
			const {list,count} = res.data;
			this.store.list = list;
			this.store.total = count;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	componentDidMount() {
		Base.GET({act:'article_class',op:'index'},(res)=>{
			this.store.article_class = res.data;
			this.requestData();
		})
	}
	render(){
		let {list,total} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		})
		return (
			<Spin ref='spin' wrapperClassName='ArticleList' spinning={false}>
				<div className='pb10'>
					<Button onClick={this.onAdd}>新增+</Button>
					<Search
						placeholder="搜索标题"
						enterButton
						onSearch={this.onSearch}
						style={{ width: 130,marginLeft:10 }}
					/>
				</div>
				<Table className="mt16" onChange={this.onTableHandler} bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={{total,current:this.current,defaultPageSize:Global.PAGE_SIZE}}/>
				<EditorModal ref='editor' onComplete={this.onCompleteEdit}/>
			</Spin>
		)
	}
};
