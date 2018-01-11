import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex, NavBar, Icon, Carousel, Badge} from 'antd-mobile';
import './GoodsDetail.less';
import {icon,test} from '../../images';

class EvaluateItem extends BaseComponent{
    render(){
        const {header,name,des} = this.props;
        return (
            <Flex className='evaluate-item base-line'>
                <img src={header} alt=''/>
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="des">{des}</div>
                </div>
            </Flex>
        )
    }
}

class GoodsItem extends BaseComponent {
    render(){
        const {img,title,price} = this.props;
        return(
            <div className="goods-item">
                <img src={img} alt=''/>
                <div className="title">
                    {title}
                </div>
                <div className="price">￥{price}</div>
            </div>
        )
    }
}

const testEvaluates = [
    {
        header:test.test1,
        name:'S****n',
        des:'很有趣，侧开口不解开的时候是另一种感觉'
    },
    {
        header:test.test2,
        name:'沈****星',
        des:'做工精致，面料舒服，建材有度，有设计感。心水。。。',
    },
];
const testGoods = [
    {
        img:test.test4,
        title:'RE:CIPE 水晶防晒瓶喷雾 3瓶',
        price:'155'
    },
    {
        img:test.test4,
        title:'RE:CIPE 水晶防晒瓶喷雾 5瓶',
        price:'229'
    },
    {
        img:test.test4,
        title:'RE:CIPE 雪花防晒瓶喷雾 1瓶',
        price:'55'
    },
    {
        img:test.test4,
        title:'RE:CIPE 雪花防晒瓶喷雾 3瓶',
        price:'155'
    },
    {
        img:test.test4,
        title:'RE:CIPE 水晶防晒瓶喷雾 3瓶',
        price:'155'
    },
    {
        img:test.test4,
        title:'RE:CIPE 水晶防晒瓶喷雾 5瓶',
        price:'229'
    },
    {
        img:test.test4,
        title:'RE:CIPE 雪花防晒瓶喷雾 1瓶',
        price:'55'
    },
    {
        img:test.test4,
        title:'RE:CIPE 雪花防晒瓶喷雾 3瓶',
        price:'155'
    },
]
export default class GoodDetail extends BaseComponent{
    componentDidMount(){
    }
    render(){
        const evaluateItems = testEvaluates.map((item,index)=>{
            return <EvaluateItem key={index} {...item}/>;
        });
        const goodsItems = testGoods.map((item,index)=>{
            return <GoodsItem key={index} {...item}/>;
        })
        return (
            <div className='GoodsDetail'>
                <NavBar
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={[
                        <img src={icon.cart} style={{ marginRight: '16px' }} alt=''/>,
                        <img src={icon.share} alt=''/>
                    ]}
                ></NavBar>
                <div className="base-content">
                    <Carousel
                        autoplay={false}
                        infinite
                        >
                        {[test.test4,test.test4,test.test4].map(val => (
                            <img
                                src={val}
                                style={{ width: '100%', verticalAlign: 'top' }}
                                alt=''
                            />
                        ))}
                    </Carousel>
                    <div className="info-con">
                        <Flex>
                            <div className='price'>￥369</div>
                            <div className='old-price'>原价<em>￥489</em></div>
                        </Flex>
                        <div className='title'>
                            <Badge className='badge' text="包邮"/>
                            【新客专享】RE:CIPE 水晶防晒喷雾 150毫升防晒喷雾 SPF50+
                        </div>
                    </div>
                    <div className="discounts-con">
                        <div className="flex-item base-line">
                            <Flex>
                                <div className="title">优惠券</div>
                                <div className="des">满<em>300</em>减<em>10</em></div>
                            </Flex>
                        </div>
                        <div className="flex-item">
                            <Flex>
                                <div className="title">积分</div>
                                <div className="des">该商品可使用<em>100</em>积分抵扣</div>
                            </Flex>
                        </div>
                    </div>
                    <div className="distribution-info-con">
                        <div className="flex-item base-line">
                            <Flex justify='between'>
                                <Flex>
                                    <div className="title">配送</div>
                                    <div className="des">至 杭州西湖五常大道翡翠城梧桐郡公寓</div>
                                </Flex>
                                <Icon type='right' color='#c9c9c9'/>
                            </Flex>
                        </div>
                        <div className="flex-item base-line">
                            <Flex>
                                <div className="title">运费</div>
                                <div className="des">包邮</div>
                            </Flex>
                        </div>
                        <div className="flex-item">
                            <Flex>
                                <div className="title">发票</div>
                                <div className="des">可开电子发票</div>
                            </Flex>
                        </div>
                    </div>
                    {evaluateItems.length>0?<div className="evaluate-con">
                        <Flex justify='between' className="title-con">
                            <div className="title">
                                商品评价(2663)
                            </div>
                            <Icon type='right' color='#c9c9c9'/>
                        </Flex>
                        {evaluateItems}
                    </div>:null}
                    <div className="lecturer-store-con">
                        <Flex justify='between' className='lecturer-info'>
                            <Flex>
                                <img src={test.test3} alt=''/>
                                <div>
                                    <div className="name">文贝袄</div>
                                    <div className="goods-num">
                                        在售商品：<em>9</em>个
                                    </div>
                                </div>
                            </Flex>
                            <Flex>
                                <div className="right-des">讲师店铺</div>
                                <Icon type='right' color='#c9c9c9'/>
                            </Flex>
                        </Flex>
                        <div className="store-des">
                            推崇自然，主要是用自然材质制造亲肤护肤品。这款高人气喷雾是14年推出的新品。一经推出，迅速火爆，成为韩国14年防晒单品销售冠军。
                        </div>
                        <Flex className='goods-con'>
                            {goodsItems}
                        </Flex>
                    </div>
                    <div className="image-text-con">
                        <div className="title-con">
                            图文详情
                        </div>
                        <img src={test.test5} alt=''/>
                        <img src={test.test6} alt=''/>
                        <img src={test.test7} alt=''/>
                    </div>
                </div>
            </div>
        )
    }
}