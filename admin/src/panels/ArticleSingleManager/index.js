import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message,Menu,Row,Col } from 'antd';
import {remove} from 'lodash';
import {EditorModal} from '../../components/EditorModal';
import './ArticleSingleManager.less';
const SubMenu = Menu.SubMenu;

export default class ArticleSingleManager extends BaseComponent{
	store={
		single_page:{},
		default_page:{},
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
			const {single_page,default_page} = res.data;
			this.store.single_page = single_page;
			if(default_page.id){
				this.store.default_page = default_page;
			}else{
				// this.store.default_page = default_page;
			}
		},this);
	}
	//设置内容
	@action.bound
	onCompleteEdit(content,id){
		// console.log(content,id);
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
		const {single_page} = this.store;
		return {id:0,title:single_page[key],content:'',alias:key};
	}
	@action.bound
	onChange({key}){
		Base.GET({act:'article',op:'page_view',alias:key},(res)=>{
			const {data} = res;
			if(data.id){
				this.store.curData = res.data;
			}else{
				const {single_page} = this.store;
				this.store.curData = this.getInitData(key);
			}
		})
	}
	render(){
		const {single_page,curData} = this.store;
		const menuItems = [];
		for (const key in single_page) {
			if (single_page.hasOwnProperty(key)) {
				const element = single_page[key];
				menuItems.push(
					<Menu.Item key={key}>
						<span>{single_page[key]}</span>
					</Menu.Item>
				)
			}
		}
		const content = curData.content || '';
		return (
			<Spin ref='spin' wrapperClassName='ArticleSingleManager' spinning={false}>
				<Row type='flex'>
					<Menu
						defaultSelectedKeys={['about_us']}
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
