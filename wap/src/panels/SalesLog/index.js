import React from 'react';
import {BaseComponent,Base,NetImg} from '../../common';
import {Flex,NavBar,WhiteSpace,List} from 'antd-mobile';
import './SalesLog.less';
import {icon,test} from '../../images';

const Item = List.Item;
const goodsImgHeight = (document.body.offsetWidth-10)/2;
class GoodItem extends BaseComponent {
    render(){
        const {goodsImg,goodsTit,goodsPrice,goodsNum} = this.props;
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
                        <span className="goodsPrice">销量：{goodsPrice}</span>
                    </Flex>
                </div>
            </div>
        )
    }
}

export default class SalesLog extends BaseComponent{
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
	render(){
		const {hotData} = this.store;
		const item = hotData.map((item,index)=>{
            return <GoodItem key={index} {...item} callBack={this.onEditHandle} />
        });
		return (
			<div className='SalesLog'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >销售统计</NavBar>
                <div className="base-content">
                	<div className="salesBox">
                		<div className="salesBoxItem">
                			<List className="salesTime">
                				<Item arrow="horizontal">
							        <select defaultValue="1">
							            <option value="1">近一个月</option>
							            <option value="3">近三个月</option>
							            <option value="6">近半年</option>
							        </select>
						        </Item>
                			</List>
                			
                			<Flex align="center" justify="center">
	                			<div className="salesTotal">1262</div>
	                		</Flex>
	                		<Flex align="center" justify="center">
	                			<div className="salesTit">总销量</div>	
	                		</Flex>
                		</div>
                	</div>
                	<WhiteSpace size="md" />
                	<Flex wrap="wrap" className="recommend-goods GoodsList">
						{item}
			        </Flex>
                </div>
			</div>
		)
	}
};
