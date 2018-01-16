import React from 'react';
import {BaseComponent} from '../../common';
import { Flex} from 'antd-mobile';
import './GoodsItem.less';

export class GoodsItem extends BaseComponent{
	render(){
		console.log(this.props.item,"111")
		const { title, img, spec, price, num } = this.props.item;
		return (
			<Flex align='start' className='GoodsItem goods-info base-line'>
				<img className='goods-img' src={img} alt="" />
				<Flex.Item>
					<Flex justify='between' align='start'>
						<div className="title ellipsis">{title}</div>
						<div className="price">￥ {price}</div>
					</Flex>
					<Flex justify='between' className='bottom-info'>
						<div className="spec">{spec}</div>
						<div className="spec">x{num}</div>
					</Flex>
				</Flex.Item>
			</Flex>
		)
	}
};
