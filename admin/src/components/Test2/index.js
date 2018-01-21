import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Modal,Form} from 'antd';
import './Test2.less';

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
export class Test2 extends BaseComponent{
	store={visible:false}
	showProps=[
		{key:'name',label:'商品名称'},
		{key:'default_image',label:'商品图片',render:(value)=>this.renderGoodsImg(value)},
		{key:'goods_attr',label:'商品属性',render:(value)=>this.renderAttr(value)},
		{key:'sale_price',label:'售价',render:(value)=>`${value} 元`},
		{key:'stock',label:'库存'},
		{key:'shop_class_id',label:'分类'},
		{key:'enable',label:'商品状态',render:(value)=>parseInt(value,10) === 1?'已启用':'未启用'},
		{key:'freight_fee',label:'邮费',render:(value)=>`${value} 元`},
		{key:'goods_ticket',label:'优惠券'},
		{key:'send_mode',label:'发货模式'},
		{key:'use_point_rate',label:'最大积分使用量'},
		{key:'e_invoice',label:'电子发票'},
		{key:'city_partner_rate',label:'城市合伙人分销比例',render:(value)=>`${value}%`},
		{key:'seller_uid',label:'发布人',render:(value)=>`${value}%`},
		{key:'updated_at',label:'发布时间'},
	]
	renderGoodsImg(value){
		return <div>
			{value}
			<div>2222</div>
		</div>
	}
	@action.bound
	renderAttr(value){
		if(!value){
			return '';
		}
		const valueObj = JSON.parse(value || '');
		const {goods_attr_category} = this;
		const list = [];
		for (const key in valueObj) {
			if (valueObj.hasOwnProperty(key)) {
				const attr = [];
				const attrValue = valueObj[key];
				const title = (goods_attr_category.find(item=>item.id === key) || {}).name;
				attr.push(
					<div key={key}>
						<div>{title}:</div>
						{
							attrValue.map((item,index)=>{
								return <span key={index} className='mr10'>{item}</span>
							})
						}
					</div>
				);
				list.push(attr);
			}
		}
		return list;
	}
	@action.bound
	show(id){
		this.id = id;
		//无分类数据，则请求
		if(!this.goods_attr_category){
			Base.GET({act:'goods_attr_category',op:'index'},(res)=>{
				this.goods_attr_category = res.data;
				this.store.visible = true;
			});
		}else{
			this.store.visible = true;
		}
	}
	@action.bound
	hideModal(){
		this.store.visible = false;
	}
    render(){
		const {visible} = this.store;
    	const {item,user,goodClass} = this.props;
		const readItem = item.find((item)=>this.id === item.id) || {};
		const items = this.showProps.map((item,index)=>{
			const {key,label,render} = item;
			let value = ''
			if(!render){
				value = readItem[key];
			}else{
				value = render(readItem[key]);
			}
			switch(key){
				default:
					return (
						<FormItem key={index} {...formItemLayout} label={label}>
							{value}
						</FormItem>
					)
				break;
			}
		})
        return (
            <Modal
            	className="GoodsItems"
	          	title="商品详情"
	          	visible={visible}
	          	onOk={this.hideModal}
          		onCancel={this.hideModal}
          		closable={false}
	          	okText="确认"
	          	cancelText="取消"
	        >
				<Form>
					{items}
				</Form>
	        </Modal>
        )
    }
}