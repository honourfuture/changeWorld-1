import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,NetImg} from '../../common';
import {Flex,Button,NavBar,WhiteSpace} from 'antd-mobile';
import './MyProduct.less';
import {icon,test} from '../../images';

const goodsImgHeight = (document.body.offsetWidth-10)/2;
class Item extends BaseComponent {
	@action.bound
	onEditHandle(e){
		const {callBack,goodsId} = this.props;
		callBack && callBack(goodsId);
		e.stopPropagation();
	}
    render(){
        const {goodsImg,goodsTit,goodsPrice,goodsNum,goodsTypes} = this.props;
        const goodsType = goodsTypes === 1 ? <span className="productEdit" onClick={this.onEditHandle}>编辑</span> : <span className="productAbled">售卖中</span>;
        return (
            <div className="recommend-goodsItem" onClick={() => Base.push('GoodsDetail', {goodsNum})}>
                <div className="recommend-goodsItem-img">
                    <NetImg 
                    src={goodsImg}
                    height={goodsImgHeight}
                    />
                </div>
                <div className="recommend-goodsItem-body">
                    <div className="recommend-goodsItem-title ellipsis2">
                        {goodsTit}
                    </div>
                    <Flex justify="between" className="recommend-goodsItem-opera">
                        <span className="goodsPrice">￥ {goodsPrice}</span>
                        <Button type="warning" inline size="small">{goodsTypes === 1 ? "上架":"下架"}</Button>
                    </Flex>
                </div>
                {goodsType}
            </div>
        )
    }
}

export default class MyProduct extends BaseComponent{
	 store = {
        hotData:[{
            goodsImg:test.test4,
            goodsTit:"THE NORTH FACE 2017春夏新款北面男款…",
            goodsPrice:69,
            goodsNum: 69,
            goodsId: 69,
            goodsTypes: 1,
        },{
            goodsImg:test.test4,
            goodsTit:"RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶",
            goodsPrice:69,
            goodsNum: 69,
            goodsId: 619,
            goodsTypes: 2,
        },{
            goodsImg:test.test4,
            goodsTit:"Bioré 碧柔 水活防晒保湿凝露防晒霜 50克 2017…",
            goodsPrice:69,
            goodsNum: 69,
            goodsId: 639,
            goodsTypes: 2,
        },{
            goodsImg:test.test4,
            goodsTit:"MARTINELLI'S 无酒精香槟气泡苹果汁 750毫升…",
            goodsPrice:69,
            goodsNum: 69,
            goodsId: 629,
            goodsTypes: 1,
        }]
    }
    @action.bound
    onEditHandle(e){
    	console.log('edit',e);
    }
	render(){
		const {hotData} = this.store;
		const item = hotData.map((item,index)=>{
            return <Item key={index} {...item} callBack={this.onEditHandle} />
        });
		
		return (
			<div className='MyProduct'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >我的产品</NavBar>
                <div className="base-content">
                	<WhiteSpace size="md" />
                	<Flex wrap="wrap" className="recommend-goods GoodsList">
						{item}
			        </Flex>
                </div>
			</div>
		)
	}
};