import React from 'react';
import {action} from 'mobx';
import {BaseComponent} from '../../common';
import {Flex,Button,List,Radio} from 'antd-mobile';
import './Pay.less';
import {icon,test} from '../../images';

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const payIconDic = {
    'alipay':icon.payZfb,
    'wechat':icon.payWx,
}
export default class Pay extends BaseComponent{
    store={
        payTypeList:[
            {
                type:'alipay',
            },
            {
                type:'wechat',
            },
            {
                type:'money',
                total:'20000',
                price:'200',
            },
        ],
        curIndex:0,
        goodsInfo:{
            "goodsImg":test.test4,
            "goodsTitle":"RE:CIPE 水晶防晒喷雾 150毫升防晒喷雾 SPF50+",
            "price":"369",
            "num":1,
        },
        total:'',
        price:'',
    }
    @action.bound
    changeHandler(index){
        this.store.curIndex = index;
    }
    @action.bound
    payHandler(){
        const {curIndex,payTypeList} = this.store;
        console.log(payTypeList[curIndex].type);
    }
    componentDidMount(){
        //请求到数据
        // total
        // list = [{
        //         type:'alipay',
        //     },
        //     {
        //         type:'wechat',
        //     },]
        //构造我们要的数据格式
        // this.store.payTypeList = list.concat().push({{
        //         type:'money',
        //         total,
        //         price:'200',
        //     },})

    }
    render(){
        const {payTypeList,curIndex,goodsInfo} = this.store;
        const payTypes = payTypeList.map((item,index)=>{
            const {type,total,price} = item;
            if(type === 'money'){
                return (
                    <Flex justify="between" key={type}>
                        <Flex.Item>
                            <span className="pay-gold">金币支付</span><span className="account-money">账户余额：{total}金币</span>
                        </Flex.Item>
                        <Flex.Item>
                            <span className="payMoney">-￥{price}</span><Radio checked={curIndex === index} onChange={()=>this.changeHandler(index)} name={type}></Radio>
                        </Flex.Item>
                    </Flex>
                )
            }else{
                return (
                    <Flex justify="between" key={type}>
                        <Flex.Item>
                            <img src={payIconDic[type]}/>
                        </Flex.Item>
                        <Flex.Item>
                            <Radio checked={curIndex === index} name={type} onChange={()=>this.changeHandler(index)}></Radio>
                        </Flex.Item>
                    </Flex>
                )
            }
        })
        return (
            <div className='Pay'>
                <div className="Pay-box">
                    <Flex justify="between" className="Pay-box-goods">
                        <div className="goodsImg">
                            <img src={goodsInfo.goodsImg} alt=""/>
                        </div>
                        <div className="goodsInfo">
                            <div className="goodsInfo-tit">{goodsInfo.goodsTitle}</div>
                            <Flex justify="between" className="goodsInfo-num">
                                <span>￥{goodsInfo.price}</span>
                                <span>x {goodsInfo.num}</span>
                            </Flex>
                        </div>
                    </Flex>
                    <div className="Pay-box-mode">
                        <h4 className="pay-h4">支付方式</h4>
                        <div className="pay-check">
                            {payTypes}
                        </div>
                    </div>
                    <Flex justify="center" align="center" className="Pay-box-opear">
                        <Button onClick={this.payHandler} type="warning">下一步</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}