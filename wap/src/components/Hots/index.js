import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex, WhiteSpace, Button,Carousel} from 'antd-mobile';
import './Hots.less';

import {test} from '../../images';

const hotData = [{
    goodsImg:test.test4,
    goodsTit:"THE NORTH FACE 2017春夏新款北面男款…",
    goodsPrice:69,
},{
    goodsImg:test.test4,
    goodsTit:"RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶",
    goodsPrice:69,
},{
    goodsImg:test.test4,
    goodsTit:"Bioré 碧柔 水活防晒保湿凝露防晒霜 50克 2017…",
    goodsPrice:69,
},{
    goodsImg:test.test4,
    goodsTit:"MARTINELLI'S 无酒精香槟气泡苹果汁 750毫升…",
    goodsPrice:69,
}]


class HotsItem extends BaseComponent {
    render(){
        const {goodsImg,goodsTit,goodsPrice} = this.props;
        return (
            <div className="recommend-goodsItem">
                <div className="recommend-goodsItem-img">
                    <img src={goodsImg} alt=""/>
                </div>
                <div className="recommend-goodsItem-body">
                    <div className="recommend-goodsItem-title ellipsis">
                        {goodsTit}
                    </div>
                    <Flex justify="between" className="recommend-goodsItem-opera">
                        <span className="goodsPrice">￥ {goodsPrice}</span>
                        <Button type="warning" inline size="small">购买</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}


export class Hots extends BaseComponent{
    componentDidMount(){
    }
    render(){
        const hotsItem = hotData.map((item,index)=>{
            return <HotsItem key={index} {...item} />
        });
        return (
            <div className='Hots'>
                <Carousel
                    autoplay={false}
                    infinite
                    >
                    {[test.banner1].map(val => (
                        <img
                            key={val}
                            src={val}
                            style={{ width: '100%'}}
                        />
                    ))}
                </Carousel>
                <WhiteSpace size="md" />
                <div className="anchor-recommend"><span>主播推荐</span></div>
                <WhiteSpace size="md" />
                <Flex wrap="wrap" className="recommend-goods">
                    {hotsItem}
                </Flex>
            </div>
        )
    }
}