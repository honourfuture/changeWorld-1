import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table, Input,Popconfirm,Switch,Button,Spin,message } from 'antd';
import {remove} from 'lodash';
import './HeadHuntingList.less';

export default class HeadHuntingList extends BaseComponent{
	store={
		list:[],
		total: 1,
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: 'ID',
				dataIndex: 'id',
			},
			{
				title: '关联手机号',
				dataIndex: 'mobi',
				render: (text, record) => this.renderInput(text, record, 'mobi'),
			},  
			{
				title: '更新时间',
				dataIndex: 'updated_at',
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
								{/* <a onClick={() => this.onEditChange(id,true,'editable')}>编辑</a> */}
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
	//内容编辑
	@action.bound
	onEditChange(id, value, column) {
		const list = this.store.list.slice();
		const itemData = list.find(item=>id === item.id);
		itemData[column] = value;
		this.store.list = list;
	}
	//保存
	@action.bound
	onSave(id) {
		const list = this.store.list.slice();
		const itemData = this.store.list.find(item=>id === item.id);
		itemData.user_id = Base.getPageParams('id');
		Base.POST({act:'headhunter',op:'add',mod:'admin',...itemData,sort:parseInt(itemData.sort,10)},(res)=>{
			itemData.editable = false;
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
		Base.POST({act:'headhunter',op:'del',mod:'admin',id},()=>remove(this.store.list,item=>id === item.id),this);
	}
	//添加
	@action.bound
	onAdd(){
		if(this.store.list.find(item=>item.id === 0)){
			return message.info('请保存后再新建');
		}
		this.store.list.unshift({id:0,mobi:'',editable:true,sort:0});
	}
	current = 1;
    @action.bound
    requestData() {
        const user_id = Base.getPageParams('id');
		Base.GET({
			act:'headhunter',
			op:'index',
			mod:'admin',
			user_id:user_id,
			cur_page: this.current || 1,
            per_page: Global.PAGE_SIZE
		},(res)=>{
			console.log(res,"headhunter")
			this.store.list = res.data.list;
			this.store.total = res.data.count;
			this.cacheData = res.data.list.map(item => ({ ...item }));
		},this);
    }
	componentDidMount() {
		this.requestData();
	}
	render(){
		let {list,total} = this.store;
		const showList = list.filter(item => item);
		return (
			<div className='HeadHuntingList'>
				<div className='pb10'>
					<Button onClick={this.onAdd}>新增+</Button>
				</div>
				<Table 
					className="mt16" 
					bordered 
					dataSource={showList} 
					rowKey='id' 
					columns={this.columns}
					pagination={{
                        total,
                        current: this.current,
                        defaultPageSize: Global.PAGE_SIZE
                    }}
					/>
			</div>
		)
	}
};
