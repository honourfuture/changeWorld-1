import React from 'react';
import {BaseComponent,NetImg} from '../../common';
import {Flex,Tabs,Carousel} from 'antd-mobile';
import './Vanity.less';
import {test} from '../../images';

const testNum = [{
    num:118823,
    price:100
},{
    num:525223,
    price:100
},{
    num:166623,
    price:100
},{
    num:668823,
    price:200
},{
    num:122223,
    price:200
},{
    num:778823,
    price:200
}];

class VanityItem extends BaseComponent {
    render(){
        const {num,price} = this.props;
        const numRed = num.toString().slice(0,4);
        const numLast = num.toString().slice(4,num.toString().length);
        return(
            <div className="listItem">
                <div className="listItem-num"><em>{numRed}</em>{numLast}</div>
                <div className="listItem-price">一口价：<em>￥{price}</em></div>
            </div>
        )
    }
}

export class Vanity extends BaseComponent{
    render(){
    	const tabs = [
            { title: '靓号'},
            { title: '六位号'},
            { title: '七位号'},
            { title: '八位号'}
        ];
        var vanifyNum =testNum.map((item,index)=>{
            return <VanityItem key={index} {...item} />;
        });
        return (
            <div className='Vanity base-content'>
                <Carousel
                    autoplay={false}
                    infinite
                    dots={false}
                    >
                    {[test.banner2].map(val => (
                        <NetImg
                            key={val}
                            src={val}
                            style={{ width: '100%'}}
                        />
                    ))}
                </Carousel>
                <div className="vanity-num">
                	<Tabs tabs={tabs} initialPage={1}>
                		<Flex wrap="wrap" className="vanity-num-list">
                			{vanifyNum}
                		</Flex>
                	</Tabs>
                </div>
            </div>
        )
    }
}