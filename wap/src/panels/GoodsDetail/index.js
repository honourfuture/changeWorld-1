import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex, NavBar, Icon, Carousel, Badge, Checkbox,Stepper,Button} from 'antd-mobile';
import './GoodsDetail.less';
import {icon,test} from '../../images';

class EvaluateItem extends BaseComponent{
    render(){
        const {header,name,des} = this.props;
        return (
            <div className='evaluate-item base-line'>
                <img src={header} alt=''/>
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="des">{des}</div>
                </div>
            </div>
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

class AddressItem extends BaseComponent {
    @action.bound
    checkHandler(){
        const {onCheckHandler,index} = this.props;
        onCheckHandler(index);
    }
    render(){
        const {isDefault,address,checked} = this.props;
        return (
            <Flex className='address-item' onClick={this.checkHandler}>
                <img src={icon.addressIcon} alt=""/>
                <Flex.Item className='ellipsis'>{`${isDefault?'[默认]':''}${address}`}</Flex.Item>
                <Checkbox checked={checked}/>
            </Flex>
        )
    }
}

class SelectItem extends BaseComponent{
    @action.bound
    selectItemHandler(){
        const {selectItemHandler,index,disable} = this.props;
        !disable && selectItemHandler(index)
    }
    render(){
        const {name,disable,selected} = this.props;
        return (
            <Flex className="select-item-con" onClick={this.selectItemHandler}>
                <div className={`select-item ${disable?'disable':''} ${selected?'selected':''}`}>
                    {name}
                </div>
            </Flex>
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
];

const addressList = [
    {
        isDefault:true,
        address:'浙江省 杭州市 余杭区 荆长大道顺帆科技园A座',
    },
    {
        isDefault:false,
        address:'浙江省 杭州市 西湖区 西溪花园10幢308室',
    },
    {
        isDefault:false,
        address:'浙江省 杭州市 西湖区 华星时代广场A座801',
    },
    {
        isDefault:false,
        address:'辽宁省 大连市 普湾新区 铁西街道（国泰街）绿都花园3栋4单元401',
    },
    {
        isDefault:false,
        address:'辽宁省 大连市 普湾新区 铁西街道（国泰街）绿都花园1栋4单元405',
    },
];

const specList = [
    {
        name:'水晶防晒喷雾',
        disable:false,
    },
    {
        name:'雪花防晒喷雾',
        disable:false,
    },
    {
        name:'补水防晒喷雾',
        disable:true,
    },
];

const classifyList = [
    {
        name:'50ML',
        disable:false,
    },
    {
        name:'150ML',
        disable:true,
    },
    {
        name:'300Ml',
        disable:false,
    },
];
export default class GoodsDetail extends BaseComponent{
    store={
        isCollect:false,
        isAddressModal:false,
        curAddressIndex:0,
        isBuyModal:false,
        selectSpecIndex:-1,
        selectClassifyIndex:-1,
        selectNum:1,
        imgHeight:160
    }
    componentDidMount(){
    }
    @action.bound
    collectHandler(){
        this.store.isCollect = !this.store.isCollect;
    }
    @action.bound
    addressHandler(){
        this.store.isAddressModal = !this.store.isAddressModal;
    }
    @action.bound
    onCheckHandler(index){
        this.store.curAddressIndex = index;
        this.addressHandler()
    }
    @action.bound
    buyModalHandler(){
        this.store.isBuyModal = !this.store.isBuyModal;
    }
    @action.bound
    stepperHandler(value){
        this.store.selectNum  = value;
    }
    @action.bound
    specItemHandler(index){
        this.store.selectSpecIndex = index;
    }
    @action.bound
    classifyItemHandler(index){
        this.store.selectClassifyIndex = index;
    }
    @action.bound
    imgLoadHandler(){
        window.dispatchEvent(new Event('resize'));
        this.store.imgHeight = 'auto';
    }
    render(){
        const {isCollect,isAddressModal,curAddressIndex,isBuyModal,selectSpecIndex,selectClassifyIndex,selectNum,imgHeight} = this.store;
        const evaluateItems = testEvaluates.map((item,index)=>{
            return <EvaluateItem key={index} {...item}/>;
        });
        const goodsItems = testGoods.map((item,index)=>{
            return <GoodsItem key={index} {...item}/>;
        });
        const addressItems = addressList.map((item,index)=>{
            return <AddressItem key={index} {...item} index={index} checked={curAddressIndex === index} onCheckHandler={this.onCheckHandler}/>
        });
        const specItems = specList.map((item,index)=>{
            return <SelectItem key={index} index={index} selected={index===selectSpecIndex} {...item} selectItemHandler={this.specItemHandler}/>;
        });
        const classifyItems = classifyList.map((item,index)=>{
            return <SelectItem key={index} index={index} selected={index===selectClassifyIndex} {...item} selectItemHandler={this.classifyItemHandler}/>;
        })
        return (
            <div className='GoodsDetail'>
                <NavBar
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={[
                        <img onClick={()=>Base.push('ShopCart')} key='0' src={icon.cart} style={{ marginRight: '16px' }} alt=''/>,
                        <img key='1' src={icon.share} alt=''/>
                    ]}
                ></NavBar>
                <div className="base-content">
                    <Carousel
                        autoplay={false}
                        infinite
                        >
                        {[test.test4,test.test4,test.test4].map((val,index) => (
                            <img
                                key={index}
                                src={val}
                                style={{ width: '100%', verticalAlign: 'top',height:imgHeight}}
                                alt=''
                                onLoad={this.imgLoadHandler}
                            />
                        ))}
                    </Carousel>
                    <div className="info-con">
                        <Flex>
                            <div className='price'>￥369</div>
                            {/* <div className='old-price'>原价<em>￥489</em></div> */}
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
                            <Flex justify='between' onClick={this.addressHandler}>
                                <Flex>
                                    <div className="title">配送</div>
                                    <Flex.Item className="des ellipsis">至 {addressList[curAddressIndex].address}</Flex.Item>
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
                        <div className='bottom-tips'>别再拉了~=￣ω￣=~没有了</div>
                    </div>
                </div>
                <Flex className="footer">
                    <Flex.Item>
                        <Flex>
                            <Flex.Item onClick={()=>Base.push('AnchorStore')}>
                                <img src={icon.storeIcon} alt=""/>
                                <div className='label'>店铺</div>
                            </Flex.Item>
                            <Flex.Item>
                                <img src={icon.customerIcon} alt=""/>
                                <div className='label'>客服</div>
                            </Flex.Item>
                            <Flex.Item onClick={this.collectHandler}>
                                <img src={isCollect?icon.collectIcon1:icon.collectIcon0} alt=""/>
                                <div className='label'>收藏</div>
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item className='add-shop-cart' onClick={()=>Base.push('ShopCart')}>
                        加入购物车
                    </Flex.Item>
                    <Flex.Item className='buy-btn' onClick={this.buyModalHandler}>
                        立即购买
                    </Flex.Item>
                </Flex>
                {isAddressModal?<div className="modal-address">
                    <Flex className="title-con" justify='between'>
                        <div>配送至</div>
                        <img onClick={this.addressHandler} src={icon.closeIcon} alt=""/>
                    </Flex>
                    <div className="address-list">
                        {addressItems}
                    </div>
                </div>:null}
                {isBuyModal?<div className="modal-buy">
                    <Flex className="info-con" justify='between' align='start'>
                        <Flex align='start'>
                            <img className='goods-img' src={test.test4} alt=""/>
                            <div className='info'>
                                <div className="price">￥369</div>
                                <div className="tips">请选择型号</div>
                            </div>
                        </Flex>
                        <img className='close-img' onClick={this.buyModalHandler} src={icon.closeIcon} alt=""/>
                    </Flex>
                    <div className="select-con">
                        <div className="title">型号</div>
                        <Flex className='select-group base-line' wrap='wrap'>
                            {specItems}
                        </Flex>
                    </div>
                    <div className="select-con">
                        <div className="title">分类</div>
                        <Flex className='select-group base-line' wrap='wrap'>
                            {classifyItems}
                        </Flex>
                    </div>
                    <Flex className="buy-num-con" justify='between'>
                        <div className="buy-num-title">购买数量</div>
                        <Stepper onChange={this.stepperHandler} showNumber className='stepper' min={1} max={99} value={selectNum}/>
                    </Flex>
                    <Button className='buy-step-btn' onClick={()=>Base.push('ConfirmOrder')}>下一步</Button>
                </div>:null}
            </div>
        )
    }
}