import React from 'react';
import {action} from 'mobx';
import {BaseComponent} from '../../common';
import { Modal,Row, Col} from 'antd';
import './Test2.less';

export class Test2 extends BaseComponent{
	@action.bound
	hideModal(){
		const {callBack} = this.props;
		callBack && callBack();
	}
    render(){
    	const {item,visible,user,rId} = this.props;
		const readItem = item.find((item)=>rId === item.id) || {};
		const { name,default_image,sale_price,enable,seller_uid,updated_at,stock,send_mode,use_point_rate,e_invoice,city_partner_rate,goods_attr,goods_ticket,shop_class_id,freight_fee} = readItem;

		const testaa = goods_attr || [];
		console.log(goods_attr)

		var abc = testaa.map(item=>{
			console.log(item)
			return <span>item</span>
		})


        return (
            <Modal
	          	title="商品详情"
	          	visible={visible}
	          	onOk={this.hideModal}
          		onCancel={this.hideModal}
          		closable={false}
	          	okText="确认"
	          	cancelText="取消"
	        >
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">商品名称：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{name}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">商品图片：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box"><img src={default_image} style={{ height: 60 }} alt=""/></div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">商品属性：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{1}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">商品图片：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box"><img src={default_image} style={{ height: 60 }} alt=""/></div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">售价：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{sale_price}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">库存：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{stock}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">分类：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{shop_class_id}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">商品状态：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{enable} （1:已启用，0:未启用）</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">邮费：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{freight_fee}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">优惠券：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{goods_ticket}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">发货模式：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{send_mode}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">最大积分使用量：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{use_point_rate}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">电子发票：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{e_invoice}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">城市合伙人分销比例：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{city_partner_rate}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">发货人：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{seller_uid}</div>
				    </Col>
	          	</Row>
	          	<Row gutter={24}>
	          		<Col className="gutter-row" span={6}>
				        <div className="gutter-box">发布时间：</div>
				    </Col>
				    <Col className="gutter-row" span={18}>
				        <div className="gutter-box">{updated_at}</div>
				    </Col>
	          	</Row>
	        </Modal>
        )
    }
}