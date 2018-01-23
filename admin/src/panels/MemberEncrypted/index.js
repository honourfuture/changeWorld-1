import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message } from 'antd';
import './MemberEncrypted.less';
import {remove} from 'lodash';

export default class MemberEncrypted extends BaseComponent{
	store={
		list:[],
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'id',
				dataIndex: 'id',
				width: '10%',
			}, 
			{
				title: '题目',
				dataIndex: 'title',
				render: (text, record) => this.renderInput(text, record, 'title'),
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
				width: '15%',
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
	//编辑
	@action.bound
	onEditChange(id,value,column) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		Base.POST({act:'security_question',op:'save',...itemData},(res)=>{
			itemData.editable = false;
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
		this.onSave(id);
	}
	//取消
	@action.bound
	onCancel(id) {
		this.store.list = this.cacheData.map(item => ({ ...item }));
	}
	//添加
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:'',title:'',editable:true,deleted:'0',enable:'1'});
	}
	//删除
	@action.bound
	onDelete(id){
		Base.POST({act:'security_question',op:'save',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	componentDidMount() {
		Base.GET({act:'security_question',op:'index'},(res)=>{
			const {question} = res.data;
			this.store.list = question;
			this.cacheData = question.map(item => ({ ...item }));
		},this);
	}
	render(){
		let {list} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		})
		return (
			<Spin ref='spin' wrapperClassName='MemberEncrypted' spinning={false}>
				<Button onClick={this.onAdd}>新增+</Button>
				<Table className="mt16" bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={false} />
			</Spin>
		)
	}
};
