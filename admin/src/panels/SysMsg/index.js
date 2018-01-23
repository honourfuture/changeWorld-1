import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table, Popconfirm,Spin,Modal,Button } from 'antd';
import {remove} from 'lodash';
import './SysMsg.less';

import {EditorMsg} from '../../components/EditorMsg'

class MsgModal extends BaseComponent{
	store={visible:false,detail:[],total:1}
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
				<div className="msgTime">{detail.updated_at}</div>
				<div className="msgCont" dangerouslySetInnerHTML={{__html:detail.content}}></div>
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
				// render: (text, record) => this.renderInput(text, record, 'title'),
			},
			// {
			// 	title: '内容',
			// 	dataIndex: 'content',
			// 	render: (text, record) => this.renderInput(text, record, 'content'),
			// },
			{
				title: '时间',
				dataIndex: 'updated_at',
				width:'20%',
			},
			{
				title: '操作',
				dataIndex: 'operation',
				width:'15%',
				render: (text, record) => {
					const {id } = record;
					return (
					<div className="editable-row-operations">
							<span>
								<a onClick={() => this.onReadChange(id)}>查看</a>
								<Popconfirm title="确认删除?" okText='确定' cancelText='取消' onConfirm={() => this.onDelete(id)}>
									<a className='ml10 gray'>删除</a>
								</Popconfirm>
							</span>
					</div>
					);
				},
			}
		];
	}
	//查看
	@action.bound
	onReadChange(id){
		this.refs.detail.show(id);
	}
	//删除
	@action.bound
	onDelete(id){
		Base.POST({act:'mailbox',op:'save',id,deleted:"1"},()=>remove(this.store.list,item=>id === item.id),this);
	}
	//添加
	@action.bound
	onOpen(){
		this.refs.addMsg.show();
	}
	//保存
	@action.bound
	onSave(content,title,id) {
		Base.POST({act:'mailbox',op:'save',id,content,title},(res)=>{
			this.requestData();
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
		Base.GET({act:'mailbox',op:'index',cur_page:this.current || 1,per_page:Global.PAGE_SIZE},(res)=>{
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
			<Spin ref='spin' wrapperClassName='SysMsg' spinning={false}>
				<Button onClick={this.onOpen}>新增+</Button>
				<Table className='mt16'  onChange={this.onTableHandler} bordered dataSource={showList} rowKey='id' columns={this.columns} pagination={{total,current:this.current,defaultPageSize:Global.PAGE_SIZE}}/>
				<MsgModal ref='detail' />
				<EditorMsg ref='addMsg' onComplete={this.onSave} />
			</Spin>
		)
	}
};
