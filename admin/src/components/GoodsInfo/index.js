import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Modal,Form,Button} from 'antd';
import './GoodsInfo.less';

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
export class GoodsInfo extends BaseComponent{
	store={visible:false}
	showProps=[
		{key:'name',label:'商品名称'},
		{key:'goods_image',label:'商品图片',render:(value)=>this.renderGoodsImg(value)},
		{key:'goods_attr',label:'商品属性',render:(value)=>this.renderAttr(value)},
		{key:'sale_price',label:'售价',render:(value)=>`${value} 元`},
		{key:'stock',label:'库存'},
		{key:'shop_class_id',label:'分类',render:(value)=>this.renderClass(value)},
		{key:'enable',label:'商品状态',render:(value)=>parseInt(value,10) === 1?'已启用':'未启用'},
		{key:'freight_fee',label:'邮费',render:(value)=>`${value} 元`},
		{key:'goods_ticket',label:'优惠券',render:(value)=>this.renderTicket(value)},
		{key:'send_mode',label:'发货模式',render:(value)=>this.renderMod(value)},
		{key:'use_point_rate',label:'最大积分使用量'},
		{key:'e_invoice',label:'电子发票',render:(value)=>parseInt(value,10) === 1?'支持':'不支持'},
		{key:'city_partner_rate',label:'城市合伙人分销比例',render:(value)=>`${value}%`},
		{key:'seller_uid',label:'发布人',render:(value)=>this.user},
		{key:'updated_at',label:'发布时间'},
	]
	renderGoodsImg(value){
		if(!value){
			return '';
		}
		const imgList = JSON.parse(value);
		return <div>
			{
				imgList.map((item,index)=>{
					return <img className='mr10 mb10' key={index} src={item} style={{height:60}} alt=""/>;
				})
			}
		</div>
	}
	renderMod(value){
		if(!value){
			return '';
		}
		value = parseInt(value) || 0;
		return <div>{['','卖家发货','上门自提','不用发货'][value]}</div>
	}
	renderClass(value){
		const {goodClass} = this.props;
		const cName = (goodClass.find(item=>item.id === value) || {}).name;
		return <div>{cName}</div>
	}
	renderTicket(value){
		if(!value){
			return '';
		}
		const tickets = JSON.parse(value || '');
		const ticket = `满 ${tickets[0].full_amount} 减 ${tickets[0].free_amount} `;
		return (
			<div>{ticket}</div>
		)
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
						<span className='mr10'>{title}:</span>
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
	show(id,uName){
		this.id = id;
		this.user = uName;
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
            	className="GoodsItems"
	          	title="商品详情"
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
}