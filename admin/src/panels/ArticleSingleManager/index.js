import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Popconfirm,Button,Spin,Menu,Row } from 'antd';
import {EditorModal} from '../../components/EditorModal';
import './ArticleSingleManager.less';

export default class ArticleSingleManager extends BaseComponent{
	store={
		list:[],
		curData:{}
	}
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
				dataIndex: 'name',
				width: '15%',
				render: (text, record) => this.renderInput(text, record, 'name'),
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
	componentDidMount() {
		Base.GET({act:'article',op:'page'},(res)=>{
			// const {single_page,default_page} = res.data;
			this.store.single_page = res.data;
			const {data} = res;
			const list = [];
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					list.push({key,title:data[key]})
				}
			}
			this.store.list = list;
			if(list.length > 0){
				this.requestData(list[0].key);
			}
		},this);
	}
	@action.bound
	requestData(alias){
		Base.GET({act:'article',op:'page_view',alias},(res)=>{
			const data = res.data || {};
			this.store.curData = data.id?res.data:this.getInitData(alias);
		})
	}
	//设置内容
	@action.bound
	onCompleteEdit(content,id){
		const curData = {...this.store.curData};
		curData.content = content;
		Base.POST({act:'article',op:'save',...curData},(res)=>{
			this.store.curData = {...curData,content,id:res.data.id};
		},this)
	}
	@action.bound
	onEdit(){
		const {curData} = this.store;
		this.refs.editor.show(curData.content,curData.alias)
	}
	@action.bound
	getInitData(key){
		const {list} = this.store;
		const pageData = list.find(item=>item.key===key) || {}
		return {id:0,title:pageData.title,content:'',alias:key};
	}
	@action.bound
	onChange({key}){
		const {list} = this.store;
		this.requestData(list[key].key);
	}
	render(){
		const {list,curData} = this.store;
		const menuItems = list.map((item,index)=>{
			return <Menu.Item key={index}>
				<span>{item.title}</span>
			</Menu.Item>
		})
		// const content = curData.content || '';
		let content = curData.content || "";
        try {
            content = decodeURIComponent(content);
        } catch (error) {}
		return (
			<Spin ref='spin' wrapperClassName='ArticleSingleManager' spinning={false}>
				<Row type='flex'>
					<Menu
						defaultSelectedKeys={['0']}
						className='menu-con'
						onClick={this.onChange}
						mode="inline"
					>
						{menuItems}
					</Menu>
					<div className='detail-con'>
						<div className='html-con' dangerouslySetInnerHTML={{__html:content}}/>
						<Button onClick={this.onEdit} className='edit-btn' type="primary" shape='circle' size='large' icon="edit" />
					</div>
				</Row>
				<EditorModal ref='editor' onComplete={this.onCompleteEdit}/>
			</Spin>
		)
	}
};
