import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin } from 'antd';
import './ShopNavList.less';
const Search = Input.Search;

const EditableCell = ({ editable, value, onChange }) => (
	<div>
		{editable
			? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
			: value
		}
	</div>
);

export default class ShopNavList extends BaseComponent{
	store={
		list:[],
		searchStr:''
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '排序',
				dataIndex: 'sort',
				width: '20%',
				render: (text, record) => this.renderColumns(text, record, 'sort'),
			}, 
			{
				title: '标题',
				dataIndex: 'name',
				width: '20%',
				render: (text, record) => this.renderColumns(text, record, 'name'),
			}, 
			{
				title: '链接',
				dataIndex: 'link',
				width: '25%',
				render: (text, record) => this.renderColumns(text, record, 'link'),
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
								<a onClick={() => this.save(id)}>保存</a>
								<a className='right-btn' onClick={() => this.cancel(id)}>取消</a>
							</span>
							:
							<span>
								<a onClick={() => this.edit(id)}>编辑</a>
								<Popconfirm title="确认删除?" okText='确定' cancelText='取消' onConfirm={() => this.onDelete(id)}>
									<a className='right-btn'>删除</a>
								</Popconfirm>
							</span>
						}
					</div>
					);
				},
			}
		];
	}
	renderColumns(text, record, column) {
		return (
			<EditableCell
				editable={record.editable}
				value={text}
				onChange={value => this.handleChange(value, record.id, column)}
			/>
		);
	}
	renderSwitch(text,record,column){
		return (
			<Switch checked={parseInt(record.enable,10)===1} onChange={(value)=>this.enableHandler(record.id,value)} />
		)
	}
	//是否启用
	@action.bound
	enableHandler(id,value){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.enable = value?1:0;
		Base.POST({act:'shop_class',op:'save',...itemData},()=>this.store.list = list,this);
	}
	//编辑文本更改
	@action.bound
	handleChange(value, id, column) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//编辑
	@action.bound
	edit(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.editable = true;
		this.store.list = list;
	}
	//保存
	@action.bound
	save(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData.editable = false;
		Base.POST({act:'shop_class',op:'save',...itemData},(res)=>{
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	//取消
	@action.bound
	cancel(id) {
		this.store.list = this.cacheData.map(item => ({ ...item }));
	}
	//删除
	@action.bound
	onDelete(id){
		const list = this.store.list.slice();
		const index = list.findIndex(item=>id === item.id);
		list.splice(index,1);
		this.store.list = list;
		Base.POST({act:'shop_class',op:'save',id,deleted:"1"},null,this);
	}
	//添加
	@action.bound
	addHandler(){
		const list = this.store.list.slice();
		list.unshift({id:0,name:'',editable:true,deleted:'0',enable:'1'});
		this.store.list = list;
	}
	//搜索
	@action.bound
	searchChangeHandler(e){
		this.store.searchStr = e.target.value;
	}
	componentDidMount() {
		Base.GET({act:'shop_class',op:'index'},(res)=>{
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
			<Spin ref='spin' wrapperClassName='ShopNavList' spinning={false}>
				<div className='bt10'>
					<Button onClick={this.addHandler}>新增+</Button>
					<Search
						placeholder="快速搜索"
						onChange={this.searchChangeHandler}
						style={{ width: 130,marginLeft:10 }}
					/>
				</div>
				<Table bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={false}/>
			</Spin>
		)
	}
};
