import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message,Select,Modal,Row, Col} from 'antd';
import './GoodsManager.less';
import {remove} from 'lodash';

import {Test2} from '../../components/Test2';
const Option = Select.Option;

const EditableCell = ({ editable, value, onChange, type}) => (
	<div>
		{editable
			? <Input style={{ margin: '-5px 0' }} value={value} type={type} onChange={e => onChange(e.target.value)} />
			: value
		}
	</div>
);
export default class GoodsManager extends BaseComponent{
	store={
		list:[],
		user:{},
		goodsClass:[],
		visible:false,
		readId:"",
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'sort',
				dataIndex: 'sort',
				width: '10%',
				render: (text, record) => this.renderColumns(text, record, 'sort'),
			}, 
			{
				title: '发布时间',
				dataIndex: 'updated_at',
				width: '10%',
				render: (text, record) => this.renderText(text, record, 'updated_at'),
			},
			{
				title: '发布人',
				dataIndex: 'seller_uid',
				width: '10%',
				render: (text, record) => this.renderStoreInfo(text, record, 'seller_uid'),
			},
			{
				title: '商品图片',
				dataIndex: 'default_image',
				width: '10%',
				render: (text, record) => this.renderImg(text, record, 'default_image'),
			},
			{
				title: '商品名称',
				dataIndex: 'name',
				width: '10%',
				render: (text, record) => this.renderText(text, record, 'name'),
			},
			{
				title: '分类',
				dataIndex: 'shop_class_id',
				render: (text, record) => this.renderSelect(text, record, 'shop_class_id'),
			}, 
			{
				title: '库存',
				dataIndex: 'stock',
				render: (text, record) => this.renderText(text, record, 'stock'),
			}, 
			{
				title: '售价',
				dataIndex: 'sale_price',
				render: (text, record) => this.renderText(text, record, 'sale_price'),
			}, 
			{
				title: '上/下架',
				dataIndex: 'enable',
				width: '10%',
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
								<a onClick={() => this.onEditChange(id,true,'editable')}>编辑</a>&nbsp;&nbsp;
								<a onClick={() => this.onRead(id)}>查看</a>
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
	renderStoreInfo(text,record,column){
		console.log(text,"texttexttexttexttext")
		const {user} = this.store;
		return (
			<div>
				{user[text].nickname}
			</div>
		)
	}
	renderText(text, record, column) {
		return (
			<div>
				{record[column]}
			</div>
		);
	}
	renderImg(text, record, column) {
		const {default_image} = record;
		return (
			<img className='goodsImg' src={default_image} alt=''/>
		);
	}
	renderColumns(text, record, column) {
		return (
			<EditableCell
				editable={record.editable}
				value={text}
				type={column==='id'?'number':'text'}
				onChange={value => this.onEditChange(record.id, value, column)}
			/>
		);
	}
	renderSelect(text, record, column) {
		const {editable} = record;
		const {goodsClass} = this.store;
		const value = record[column];
		let curIndex = goodsClass.findIndex((item)=>item.id === value);
		curIndex = curIndex >= 0?curIndex:0;
		return <div>
				{editable?<Select defaultValue={value|| goodsClass[0].id} style={{ width: 120 }} onChange={(value)=>this.onEditChange(record.id,value,column)}>
					{
						goodsClass.map(({id,name})=><Option key={id} value={id}>{name}</Option>)
					}
				</Select>:goodsClass[curIndex].name}
			</div>
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
		itemData.editable = false;
		Base.POST({act:'goods',op:'save',...itemData},(res)=>{
			itemData.updated_at = Base.getTimeFormat(new Date().getTime()/1000,2);
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	//查看
	@action.bound
	onRead(id){
		this.store.readId = id;
		this.store.visible = true;
	}
	//是否启用
	@action.bound
	onSwitch(id,value,column){
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.onSave(id);
		// Base.POST({act:'goods',op:'save',...itemData},()=>this.store.list = list,this);
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
	//关闭窗口
	@action.bound
	onCloseWindow(){
		this.store.visible = false;
	}
	componentDidMount() {
		Base.GET({act:'goods',op:'index'},(res)=>{
			const {goods,user} = res.data;
			this.store.list = goods.list;
			this.store.user = user;
			this.cacheData = goods.list.map(item => ({ ...item }));
		},this);
		Base.GET({act:'shop_class',op:'index'},(res)=>{
			this.store.goodsClass = res.data;
		},this);
	}
	render(){
		let {list,readId,user,visible} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		});
		return (
			<div className='GoodsManager'>
				<Table className="mt16" bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={false} />
				{/*<GoodModal visible={visible} item={list} user={user} rId={readId} callBack={this.onCloseWindow}/>*/}
				<Test2 visible={visible} item={list} user={user} rId={readId} callBack={this.onCloseWindow} />
			</div>
		)
	}
};
