import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex, WhiteSpace, Button} from 'antd-mobile';
import './hots.less';

import {Carousel_Img} from '../../components/Carousel_Img';

export class Hots extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <div className='Hots'>
                <Carousel_Img />
                <WhiteSpace size="lg" />
                <div className="anchor_recommend"><span>主播推荐</span></div>
                <WhiteSpace size="lg" />

                <Flex wrap="wrap" className="recommend_goods">
                    <div className="recommend_goodsItem">
                        <div className="recommend_goodsItem_img">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="recommend_goodsItem_body">
                            <div className="recommend_goodsItem_title">
                                THE NORTH FACE 2017春夏新款北面男款…
                            </div>
                            <Flex justify="between" className="recommend_goodsItem_opera">
                                <span className="goodsPrice">￥ 69</span>
                                <Button type="warning" inline size="small">购买</Button>
                            </Flex>
                        </div>
                    </div>
                    <div className="recommend_goodsItem">
                        <div className="recommend_goodsItem_img">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="recommend_goodsItem_body">
                            <div className="recommend_goodsItem_title">
                                RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶
                            </div>
                            <Flex justify="between">
                                <span className="goodsPrice">￥ 69</span>
                                <Button type="warning" inline size="small">购买</Button>
                            </Flex>
                        </div>
                    </div>
                    <div className="recommend_goodsItem">
                        <div className="recommend_goodsItem_img">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="recommend_goodsItem_body">
                            <div className="recommend_goodsItem_title">
                                Bioré 碧柔 水活防晒保湿凝露防晒霜 50克 2017…
                            </div>
                            <Flex justify="between" className="recommend_goodsItem_opera">
                                <span className="goodsPrice">￥ 69</span>
                                <Button type="warning" inline size="small">购买</Button>
                            </Flex>
                        </div>
                    </div>
                    <div className="recommend_goodsItem">
                        <div className="recommend_goodsItem_img">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="recommend_goodsItem_body">
                            <div className="recommend_goodsItem_title">
                                MARTINELLI'S 无酒精香槟气泡苹果汁 750毫升…
                            </div>
                            <Flex justify="between">
                                <span className="goodsPrice">￥ 69</span>
                                <Button type="warning" inline size="small">购买</Button>
                            </Flex>
                        </div>
                    </div>
                </Flex>


                {/*<div className="recommend_goods">
                    <div className="recommend_goodsItem">
                        <div className="recommend_goodsItem_img">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="recommend_goodsItem_title">
                            不是所有的兼职汪都需要风吹日晒
                        </div>
                        <div className="recommend_goodsItem_opera">
                            <span className="goodsPrice"></span>
                            <Button type="warning" inline size="small">购买</Button>
                        </div>
                    </div>
                    <div className="recommend_goodsItem">
                        <div className="recommend_goodsItem_img">
                            <img src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" alt=""/>
                        </div>
                        <div className="recommend_goodsItem_title">
                            不是所有的兼职汪都需要风吹日晒
                        </div>
                        <div className="recommend_goodsItem_opera">
                            <span className="goodsPrice"></span>
                            <Button type="warning" inline size="small">购买</Button>
                        </div>
                    </div>
                </div>*/}
            </div>
        )
    }
}