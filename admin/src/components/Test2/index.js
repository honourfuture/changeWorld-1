import React from 'react';
import {action} from 'mobx';
import {BaseComponent} from '../../common';
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
	@action.bound
	hideModal(){
		const {callBack} = this.props;
		callBack && callBack();
	}
    render(){
    	const {item,visible,user,rId,goodClass} = this.props;
		const readItem = item.find((item)=>rId === item.id) || {};
		const { name,default_image,sale_price,enable,updated_at,stock,send_mode,use_point_rate,e_invoice,city_partner_rate,goods_attr,goods_ticket,shop_class_id,freight_fee} = readItem;

		const curIndex = goodClass.find((item)=>item.id === shop_class_id);
		const cName = curIndex && curIndex.name;
		const uName = user && user;
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
			        <FormItem
			        	{...formItemLayout}
			          label="商品名称"
			        >
			            {name}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="商品图片"
			        >
			            <img src={default_image} style={{ height: 60 }} alt=""/>
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="商品属性"
			        >
			            {goods_attr}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="售价"
			        >
			           {sale_price} 元
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="库存"
			        >
			            {stock}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="分类"
			        >
			            {cName}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="商品状态"
			        >
			            {parseInt(enable) === 1 ? "已启用":"未启用"}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="邮费"
			        >
			            {freight_fee} 元
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="优惠券"
			        >
			            {goods_ticket}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="发货模式"
			        >
			            {parseInt(send_mode) === 1 ? "商家发货":"上门自提"}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="最大积分使用量"
			        >
			            {use_point_rate}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="电子发票"
			        >
			            {parseInt(e_invoice) === 1 ? "支持":"不支持"}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="城市合伙人分销比例"
			        >
			            {city_partner_rate}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="发布人"
			        >
			            {uName}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          label="发布时间"
			        >
			            {updated_at}
			        </FormItem>
			    </Form>
	        </Modal>
        )
    }
}