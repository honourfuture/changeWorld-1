import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message } from 'antd';
// import './AdPosition.less';
const Search = Input.Search;

const EditableCell = ({ editable, value, onChange, type}) => (
	<div>
		{editable
			? <Input style={{ margin: '-5px 0' }} value={value} type={type} onChange={e => onChange(e.target.value)} />
			: value
		}
	</div>
);

export default class AdPosition extends BaseComponent{
	store={
		list:[],
		searchStr:''
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'id',
				dataIndex: 'id',
				width: '10%',
				render: (text, record) => this.renderText(text, record, 'id'),
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
				render: (text, record) => this.renderColumns(text, record, 'name'),
			}, 
			{
				title: '宽高',
				dataIndex: 'size',
				width: '20%',
				render: (text, record) => this.renderColumns(text, record, 'size'),
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
								<a onClick={() => this.onEdit(id)}>编辑</a>
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
	renderColumns(text, record, column) {
		return (
			<EditableCell
				editable={record.editable}
				value={text}
				type={column==='sort'?'number':'text'}
				onChange={value => this.onInputChange(value, record.id, column)}
			/>
		);
	}
	renderSwitch(text,record,column){
		return (
			<Switch checked={parseInt(record.enable,10)===1} onChange={(value)=>this.onSwitch(record.id,value)} />
		)
	}
	//是否启用
	@action.bound
	onSwitch(id,value){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.enable = value?1:0;
		Base.POST({act:'ad_position',op:'save',mod:'admin',...itemData},()=>this.store.list = list,this);
	}
	//编辑文本更改
	@action.bound
	onInputChange(value, id, column) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//编辑
	@action.bound
	onEdit(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.editable = true;
		this.store.list = list;
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.editable = false;
		Base.POST({act:'ad_position',op:'save',mod:'admin',...itemData},(res)=>{
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
		const list = this.store.list.slice();
		const index = list.findIndex(item=>id === item.id);
		list.splice(index,1);
		this.store.list = list;
		Base.POST({act:'ad_position',op:'save',mod:'admin',id,deleted:"1"},null,this);
	}
	//添加
	@action.bound
	onAdd(){
		const list = this.store.list.slice();
		if(list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		list.unshift({id:0,name:'',editable:true,deleted:'0',enable:'1',size:''});
		this.store.list = list;
	}
	//搜索
	@action.bound
	onSearch(e){
		this.store.searchStr = e.target.value;
	}
	componentDidMount() {
		Base.GET({act:'ad_position',op:'index',mod:'admin'},(res)=>{
			this.store.list = res.data;
			this.cacheData = res.data.map(item => ({ ...item }));
		},this);
	}
	render(){
		let {list,searchStr} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0 && (!searchStr || item.name.indexOf(searchStr) !== -1);
		})
		return (
			<Spin ref='spin' wrapperClassName='AdPosition' spinning={false}>
				<div className='pb10'>
					<Button onClick={this.onAdd}>新增+</Button>
					<Search
						placeholder="搜索标题"
						onChange={this.onSearch}
						style={{ width: 130,marginLeft:10 }}
					/>
				</div>
				<Table bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={true}/>
			</Spin>
		)
	}
};
