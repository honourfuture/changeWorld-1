import React from 'react';
// import {action} from 'mobx';
import {BaseComponent,Base,NetImg} from '../../common';
import {Flex,Button} from 'antd-mobile';
import './GoodsList.less';
const goodsImgHeight = (document.body.offsetWidth-10)/2;
class Item extends BaseComponent {
    render(){
        const {default_image,name,sale_price,id} = this.props;
        return (
            <div className="recommend-goodsItem" onClick={() => Base.push('GoodsDetail', {id})}>
                <div className="recommend-goodsItem-img">
                    <NetImg 
                    src={default_image}
                    height={goodsImgHeight}
                    />
                </div>
                <div className="recommend-goodsItem-body">
                    <div className="recommend-goodsItem-title ellipsis2">
                        {name}
                    </div>
                    <Flex justify="between" className="recommend-goodsItem-opera">
                        <span className="goodsPrice">￥ {sale_price}</span>
                        <Button type="warning" inline size="small">购买</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}

export class GoodsList extends BaseComponent{
	render(){
        const {goodsList} = this.props;
		const item = goodsList.map((item,index)=>{
            return <Item key={index} {...item} />
        });
		return (
			<Flex wrap="wrap" className="recommend-goods GoodsList">
				{item}
	        </Flex>
		)
	}
};
