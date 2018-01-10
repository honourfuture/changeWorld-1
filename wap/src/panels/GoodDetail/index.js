import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex, NavBar, Icon, Carousel, Badge} from 'antd-mobile';
import './GoodDetail.less';
import {icon} from '../../images';

export default class GoodDetail extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <div className='GoodDetail'>
               <NavBar
                    mode="light"
                    icon={<img src={icon.back}/>}
                    onLeftClick={Base.goBack}
                    rightContent={[
                        <img src={icon.cart} style={{ marginRight: '16px' }}/>,
                        <img src={icon.share}/>
                    ]}
                ></NavBar>
                <Carousel
                    autoplay={false}
                    infinite
                    >
                    {['AiyWuByWklrrUDlFignR','TekJlZRVCjLFexlOCuWn','IJOtIlfsYdTyaDTRVrLI'].map(val => (
                        <img
                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                    ))}
                </Carousel>
                <div className="infoCon">
                    <Flex>
                        <div className='price'>￥369</div>
                        <div className='oldPrice'>原价<em>￥489</em></div>
                    </Flex>
                    <div className='title'>
                        <Badge className='badge' text="包邮"/>
                        【新客专享】RE:CIPE 水晶防晒喷雾 150毫升防晒喷雾 SPF50+
                    </div>
                </div>
                <div className="discountsCon">
                    <Flex>
                        <div className="title">优惠券</div>
                        <div className="des">满<em>300</em>减<em>10</em></div>
                    </Flex>
                    <Flex>
                        <div className="title">积分</div>
                        <div className="des">该商品可使用<em>100</em>积分抵扣</div>
                    </Flex>
                </div>
            </div>
        )
    }
}