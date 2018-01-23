import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table, Popconfirm,Spin,Modal,Button,message,Input } from 'antd';
import {remove} from 'lodash';
import './SysMsg.less';

class MsgModal extends BaseComponent{
	store={visible:false,detail:[]}
	@action.bound
	show(id,uName){
		this.id = id;
		Base.GET({act:'mailbox',op:'view',id},(res)=>{
			this.store.detail = res.data;
			this.store.visible = true;
		});
	}
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
	render(){
		const {visible,detail} = this.store;
		return (
			<Modal
            	className="MsgItems"
	          	title="信件详情"
	          	visible={visible}
          		closable={false}
	          	footer={[
		            <Button key="submit" type="primary" onClick={this.hideModal}>
		              确认
		            </Button>,
		        ]}
	        >
				<div className="msgTit">{detail.title}</div>
				<div className="msgTit">{detail.updated_at}</div>
				<div className="msgTit">{detail.content}</div>
	        </Modal>
		)
	}
}


export default class SysMsg extends BaseComponent{
	store={
		list:[],
		total:1,
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '标题',
				dataIndex: 'title',
				render: (text, record) => this.renderInput(text, record, 'title'),
			},
			{
				title: '内容',
				dataIndex: 'content',
				render: (text, record) => this.renderInput(text, record, 'content'),
			},
			{
				title: '时间',
				dataIndex: 'updated_at',
				width:'15%',
			},
			{
				title: '操作',
				dataIndex: 'operation',
				width:'15%',
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
								<a onClick={() => this.onReadChange(id)}>查看</a>
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
	//编辑
	@action.bound
	onEditChange(id,value,column) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//查看
	@action.bound
	onReadChange(id){
		this.refs.detail.show(id);
	}
	//取消
	@action.bound
	onCancel(id) {
		this.store.list = this.cacheData.map(item => ({ ...item }));
	}
	//删除
	@action.bound
	onDelete(id){
		Base.POST({act:'ad',op:'save',mod:'admin',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	//添加
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:0,title:'',content:'',editable:true,deleted:'0',sort:0});
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		Base.POST({act:'mailbox',op:'save',...itemData},(res)=>{
			itemData.editable = false;
			itemData.updated_at = Base.getTimeFormat(new Date().getTime()/1000,2);
			itemData.id === 0 && (itemData.id = res.data.id);
			this.store.list = list;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	@action.bound
	requestData(){
		Base.GET({act:'mailbox',op:'index'},(res)=>{
			console.log(res)
			const {list,count} = res.data;
			this.store.list = list;
			this.store.total = count;
			this.cacheData = list.map(item => ({ ...item }));
		},this);
	}
	componentDidMount() {
		this.requestData();
	}
	render(){
		let {list,total} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		})
		return (
			<div className='SysMsg'>
				<Button onClick={this.onAdd}>新增+</Button>
				<Table className='mt16'bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={false}/>
				<MsgModal ref='detail' />
			</div>
		)
	}
};
