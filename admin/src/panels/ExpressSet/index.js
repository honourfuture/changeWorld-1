import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table,Button, Input,Popconfirm,Switch,Spin,message} from 'antd';
import {remove} from 'lodash';
import './ExpressSet.less';

export default class ExpressSet extends BaseComponent{
	store={
		list:[{
			id:1,
			name:"顺丰",
			des:"SF",
			enable:1,
		},
		{
			id:2,
			name:"邮政",
			des:"EMS",
			enable:1,
		},
		{
			id:3,
			name:"德邦",
			des:"DB",
			enable:1,
		}],
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'ID',
				dataIndex: 'id',
			}, 
			{
				title: '快递公司',
				dataIndex: 'name',
				render: (text, record) => this.renderInput(text, record, 'name'),
			},
			{
				title: '描述',
				dataIndex: 'des',
				render: (text, record) => this.renderInput(text, record, 'des'),
			}, 
			{
				title: '状态',
				dataIndex: 'enable',
				render: (text, record) => this.renderSwitch(text, record, 'enable'),
			}, 
			{
				title: '操作',
				dataIndex: 'operation',
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
	//添加
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:'',name:'',des:'',editable:true,deleted:'0',enable:'1'});
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
		itemData.editable = false;
		Base.POST({act:'goods',op:'save',...itemData},(res)=>{
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
	//删除
	@action.bound
	onDelete(id){
		Base.POST({act:'goods',op:'save',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	render(){
		const {list} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		})
		return (
			<div className='ExpressSet'>
				<Button onClick={this.onAdd}>新增+</Button>
				<Table className="mt16" bordered  dataSource={list} rowKey='id' columns={this.columns} pagination={false} />
			</div>
		)
	}
};
