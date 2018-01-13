import React from 'react';
import {action} from 'mobx';
import {BaseComponent} from '../../common';
import { WhiteSpace,Carousel} from 'antd-mobile';
import './Hots.less';

import {GoodsList} from '../../components/GoodsList';
import {test} from '../../images';

export class Hots extends BaseComponent{
    store = {
        hotData:[{
            goodsImg:test.test4,
            goodsTit:"THE NORTH FACE 2017春夏新款北面男款…",
            goodsPrice:69,
            goodsNum: 69,
        },{
            goodsImg:test.test4,
            goodsTit:"RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶",
            goodsPrice:69,
            goodsNum: 69,
        },{
            goodsImg:test.test4,
            goodsTit:"Bioré 碧柔 水活防晒保湿凝露防晒霜 50克 2017…",
            goodsPrice:69,
            goodsNum: 69,
        },{
            goodsImg:test.test4,
            goodsTit:"MARTINELLI'S 无酒精香槟气泡苹果汁 750毫升…",
            goodsPrice:69,
            goodsNum: 69,
        }],
        imgHeight:160,
    }
    componentDidMount(){
    }
    @action.bound
    imgLoadHandler(){
        window.dispatchEvent(new Event('resize'));
        this.store.imgHeight = 'auto';
    }
    render(){
        const {hotData,imgHeight} = this.store;
        return (
            <div className='Hots'>
                <Carousel
                    autoplay={false}
                    infinite
                    >
                    {[test.banner1,test.banner1].map(val => (
                        <img
                            key={val}
                            src={val}
                            style={{ width: '100%',height:imgHeight}}
                            alt=""
                            onLoad={this.imgLoadHandler}
                        />
                    ))}
                </Carousel>
                <WhiteSpace size="md" />
                <div className="anchor-recommend"><span>主播推荐</span></div>
                <WhiteSpace size="md" />
                <GoodsList  goodslist={hotData} />
            </div>
        )
    }
}