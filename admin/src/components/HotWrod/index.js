import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table,Button,Input,Popconfirm,Switch,Spin,Select,message} from 'antd';
import './HotWrod.less';
import {remove} from 'lodash';
export class HotWrod extends BaseComponent{
	store={
		list:[],
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'sort',
				dataIndex: 'sort',
				width: '10%',
				render: (text, record) => this.renderInput(text, record, 'sort'),
			},
			{
				title: '搜索词',
				dataIndex: 'keyword',
				width: '10%',
				render: (text, record) => this.renderInput(text, record, 'keyword'),
			},
			{
				title: '显示词',
				dataIndex: 'keyword_alias',
				width: '10%',
				render: (text, record) => this.renderInput(text, record, 'keyword_alias'),
			},
			{
				title: '启用',
				dataIndex: 'enable',
				width: '10%',
				render: (text, record) => this.renderSwitch(text, record, 'enable'),
			}, 
			// {
			// 	title: '搜索次数',
			// 	dataIndex: 'keyword_alias',
			// 	width: '10%',
			// }, 
			{
				title: '操作',
				dataIndex: 'operation',
				width: '15%',
				render: (text, record) => {
					const { editable,id,seller_uid} = record;
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
								<a onClick={() => this.onEditChange(id,true,'editable')}>编辑</a>&nbsp;&nbsp;
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
	@action.bound
	onEditChange(id, value, column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//是否启用
	@action.bound
	onSwitch(id,value,column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.onSave(id);
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		Base.POST({act:'search_words',op:'save',...itemData},(res)=>{
			itemData.editable = false;
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
		Base.POST({act:'search_words',op:'save',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	//添加
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:0,keyword:'',keyword_alias:'',editable:true,deleted:'0',enable:'1',sort:0});
	}
	componentDidMount(){
		Base.GET({act:'search_words',op:'index'},(res)=>{
			this.store.list = res.data; 
		},this);
	}
	render(){
		let {list} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		});
		return (
			<div className='HotWrod'>
				<Button onClick={this.onAdd}>新增+</Button>
				<Table className='mt16' bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={false}/>
			</div>
		)
	}
};
