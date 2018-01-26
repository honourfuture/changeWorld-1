import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table,Button,message} from 'antd';
import './PointDetail.less';

export class PointDetail extends BaseComponent{
	store={
		list:[],
		total:1,
	}
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '会员ID',
				dataIndex: 'grade_demand',
				width: '10%',
			}, 
			{
				title: '会员名称',
				dataIndex: 'grade_logo',
				width: '10%',
			},
			{
				title: '积分',
				dataIndex: 'grade_logo',
				width: '10%',
			},
			{
				title: '操作时间',
				dataIndex: 'grade_logo',
				width: '10%',
			},
			{
				title: '操作描述',
				dataIndex: 'grade_logo',
				width: '10%',
			},
			{
				title: '操作人',
				dataIndex: 'grade_name',
				width: '10%',
			}, 
		];
	}
	@action.bound
	onTableHandler({current,pageSize}){
		this.current = current;
		this.requestData();
	}
	current = 1
	@action.bound
	requestData(){
		Base.GET({act:'users_points',op:'index'},(res)=>{
			console.log(res)
			const {points,user} = res.data;
			this.store.list = points.list;
			this.store.total = points.count;
			this.cacheData = points.list.map(item => ({ ...item }));
		},this);
	}
	componentDidMount() {
		this.requestData();
	}
	render(){
		let {list,total} = this.store;
		const showList = list.filter(item=>{
			return parseInt(item.deleted,10) === 0;
		});
		return (
			<div className='PointDetail'>
				<Table className="mt16" bordered onChange={this.onTableHandler} dataSource={showList} rowKey='id' columns={this.columns} pagination={{total,current:this.current,defaultPageSize:Global.PAGE_SIZE}} />
			</div>
		)
	}
};
