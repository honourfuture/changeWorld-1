import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Modal,Form,Button} from 'antd';
import './ActivityDetail.less';
const formItemLayout = {
	labelCol: {
	  xs: { span: 24 },
	  sm: { span: 8 },
	},
	wrapperCol: {
	  xs: { span: 24 },
	  sm: { span: 16 },
	},
};
const FormItem = Form.Item;
export class ActivityDetail extends BaseComponent{
	store={visible:false}
	showProps=[
		{key:'title',label:'活动名称'},
		{key:'summary',label:'活动描述'},
		{key:'details',label:'活动详情'},
		{key:'activity_class_name',label:'活动分类'},
		{key:'prize',label:'奖品设置',render:(value)=>this.renderPrize(value)},
		{key:'time_start',label:'活动开始时间',render:(value)=>this.renderTime(value)},
		{key:'time_end',label:'活动结束时间',render:(value)=>this.renderTime(value)},
		{key:'is_recommend',label:'是否推荐',render:(value)=>parseInt(value,10) === 1?'是':'否'},
		{key:'is_ad',label:'是否加入广告',render:(value)=>parseInt(value,10) === 1?'是':'否'},
		{key:'ad_image',label:'广告图片',render:(value)=>this.renderGoodsImg(value)},
		{key:'photos',label:'商品图片',render:(value)=>this.renderGoodsImg(value)},
		{key:'user_name',label:'发布人',render:(value)=>this.user},
		{key:'created_at',label:'发布时间'},
	];
	renderPrize(value){
		if(!value){
			return '';
		}
		return value.map((item,key)=>{
			return <div key={key} style={{display:'inline-block',marginRight:10,textAlign:'center'}}>
						<img src={Base.getImgUrl(item.default_image)} style={{height:60}} alt=""/>
						<div className="prizeName">{item.goods_name}</div>
						<div className="names">{item.name}</div>
					</div>
		})
	}
	renderTime(value){
		if(!value){
			return '';
		}
		return Base.getTimeFormat(value);
	}
	renderGoodsImg(value){
		if(!value){
			return '';
		}
		const imgList = (typeof value === 'string') ? JSON.parse(value) : value;
		return <div>
			{
				imgList.map((item,index)=>{
					return <img className='mr10 mb10' key={index} src={Base.getImgUrl(item)} style={{height:60}} alt=""/>;
				})
			}
		</div>
	}
	@action.bound
	show(id,names){
		this.id = id;
		this.user = names;
		this.store.visible = true;
	}
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
	render(){
		const {visible} = this.store;
		const {item} = this.props;
		const readItem = item.find((item)=>this.id === item.id) || {};
		const items = this.showProps.map((item,index)=>{
			const {key,label,render} = item;
			const value = !render?readItem[key]:render(readItem[key]);
			return (
				<FormItem key={index} {...formItemLayout} label={label}>
					{value}
				</FormItem>
			)
		})
		return (
			<Modal
            	className="ActivityDetail"
	          	title="活动详情"
	          	visible={visible}
          		closable={false}
	          	footer={[
		            <Button key="submit" type="primary" onClick={this.hideModal}>
		              确认
		            </Button>,
		        ]}
	        >
				<Form>
					{items}
				</Form>
	        </Modal>
		)
	}
};
