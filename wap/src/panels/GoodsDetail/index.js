import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,NetImg} from '../../common';
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
    @action.bound
    onClick(){
        const {id} = this.props;
        Base.push('GoodsDetail', {id})
    }
    render(){
        const {default_image,name,sale_price} = this.props;
        return(
            <div className="goods-item" onClick={this.onClick}>
                <NetImg src={default_image}/>
                <div className="title">
                    {name}
                </div>
                <div className="price">￥{sale_price}</div>
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
        const {is_default,address,checked} = this.props;
        return (
            <Flex className='address-item' onClick={this.checkHandler}>
                <img src={icon.addressIcon} alt=""/>
                <Flex.Item className='ellipsis'>{`${is_default?'[默认]':''}${address}`}</Flex.Item>
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
        evaluate:{},
        goods:[],
        goods_attr:{},
        goods_info:{},
        seller:{},
        address:[]
    }
    componentDidMount(){
        const {id} = Base.getPageParams();
        Base.GET({act:'goods',op:'view',goods_id:id},(res)=>{
            const {evaluate,goods={},goods_attr,goods_info,seller} = res.data;
            this.store.evaluate = evaluate;
            this.store.goods = goods;
            this.store.goods_attr = goods_attr;
            this.store.goods_info = goods_info;
            this.store.seller = seller;
            Base.GET({act:'address',op:'index'},(res)=>{
                this.store.address = res.data.map((item,index)=>{
                    let {province,city,address,id,is_default,area} = item;
                    address = `${province} ${city} ${area} ${address}`;
                    let checked = false;
                    if(parseInt(item.is_default) === 1){
                        checked = true;
                        this.store.curAddressIndex = index;
                    }
                    return {id,address,is_default,checked:parseInt(item.is_default) === 1};
                });
            },null,true);
        });
    }
    @action.bound
    collectHandler(){
        const {id} = this.props;
        Base.POST({act:'collection',op:'save',mod:'user',topic:2,sub_topic:40,t_id:id},(res)=>{
            this.store.isCollect = !this.store.isCollect;
        })
    }
    @action.bound
    addressHandler(){
        const {address} = this.store;
        if(address.length > 0){
            this.store.isAddressModal = !this.store.isAddressModal;
        }else{
            Base.push('NewAddress');
        }
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
    render(){
        const {isCollect,isAddressModal,curAddressIndex,isBuyModal,selectSpecIndex,selectClassifyIndex,selectNum,evaluate,goods={},goods_attr,goods_info={},seller={},address=[]} = this.store;
        let {goods_image='',sale_price='',name='',freight_fee='',goods_ticket='',use_point_rate='',e_invoice='',goods_detail='',seller_uid=''} = goods_info;
        const {header='',nickname='',summary='',v=''} = seller;
        const {list=[],total=''} = goods;
        goods_image = goods_image?JSON.parse(goods_image):[];
        const goodsImgs = goods_image.map((val,index)=>{
            return <NetImg key={index} src={val} style={{ width: '100%', verticalAlign: 'top'}}/>;
        });
        freight_fee = parseFloat(freight_fee);
        goods_ticket = goods_ticket?JSON.parse(goods_ticket):[];
        const goodsTickets = goods_ticket.map((item,index)=>{
            const {full_amount='',free_amount=''} = item;
            return <div className="flex-item base-line" key={index}>
                    <Flex>
                        <div className="title">优惠券</div>
                        <div className="des">满<em>{full_amount}</em>减<em>{free_amount}</em></div>
                    </Flex>
                </div>;
        });
        goods_detail = goods_detail?JSON.parse(goods_detail):[];
        const goodsDetailImgs = goods_detail.map((item,index)=>{
            return <img src={item} key={index} alt=''/>;
        })
        const evaluateItems = testEvaluates.map((item,index)=>{
            return <EvaluateItem key={index} {...item}/>;
        });
        const goodsItems = list.map((item,index)=>{
            return <GoodsItem key={index} {...item}/>;
        });
        const addressItems = address.map((item,index)=>{
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
                        autoplay={true}
                        infinite
                        >
                        {goodsImgs}
                    </Carousel>
                    <div className="info-con">
                        <Flex>
                            <div className='price'>￥{Base.getNumFormat(sale_price)}</div>
                            {/* <div className='old-price'>原价<em>￥489</em></div> */}
                        </Flex>
                        <div className='title'>
                            {freight_fee===0?<Badge className='badge' text='包邮'/>:null}
                            {name}
                        </div>
                    </div>
                    <div className="discounts-con">
                        {goodsTickets}
                        {use_point_rate?<div className="flex-item">
                            <Flex>
                                <div className="title">积分</div>
                                <div className="des">该商品可使用<em>{use_point_rate}</em>积分抵扣</div>
                            </Flex>
                        </div>:null}
                    </div>
                    <div className="distribution-info-con">
                        <div className="flex-item base-line">
                            <Flex justify='between' onClick={this.addressHandler}>
                                <Flex>
                                    <div className="title">配送</div>
                                    {address.length>0
                                    ?<Flex.Item className="des ellipsis">至 {address[curAddressIndex].address}</Flex.Item>
                                    :<Flex.Item className="des ellipsis">新建配送地址</Flex.Item>}
                                </Flex>
                                <Icon type='right' color='#c9c9c9'/>
                            </Flex>
                        </div>
                        <div className="flex-item base-line">
                            <Flex>
                                <div className="title">运费</div>
                                <div className="des">{Base.getNumFormat(freight_fee)}</div>
                            </Flex>
                        </div>
                        <div className="flex-item">
                            <Flex>
                                <div className="title">发票</div>
                                <div className="des">{parseInt(e_invoice)?'':'不'}可开电子发票</div>
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
                                <div className="seller-header">
                                    <NetImg className='header' src={header}/>
                                    {parseInt(v)?<img className='vip' src={icon.vipIcon} alt=""/>:null}
                                </div>
                                <div>
                                    <div className="name">{nickname}</div>
                                    <div className="goods-num">
                                        在售商品：<em>{total}</em>个
                                    </div>
                                </div>
                            </Flex>
                            <Flex>
                                <div className="right-des">讲师店铺</div>
                                <Icon type='right' color='#c9c9c9'/>
                            </Flex>
                        </Flex>
                        {summary?<div className="store-des">
                            {summary}
                        </div>:null}
                        <Flex className='goods-con'>
                            {goodsItems}
                        </Flex>
                    </div>
                    {goodsDetailImgs.length>0?<div className="image-text-con">
                        <div className="title-con">
                            图文详情
                        </div>
                        {goodsDetailImgs}
                        <div className='bottom-tips'>别再拉了~=￣ω￣=~没有了</div>
                    </div>:null}
                </div>
                <Flex className="footer">
                    <Flex.Item>
                        <Flex>
                            <Flex.Item onClick={()=>Base.pushApp('userStore',{shopid:seller_uid})}>
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