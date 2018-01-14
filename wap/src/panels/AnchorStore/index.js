import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,NavBar,Tabs} from 'antd-mobile';
import './AnchorStore.less';

import {icon,test} from '../../images';

import { GoodsList } from "../../components/GoodsList";

import {Hots} from '../../components/Hots';
import {Vanity} from '../../components/Vanity';

export default class AnchorStore extends BaseComponent{
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
        }]
    }
	renderContent = tab => tab.component;
	render(){
        const { hotData } = this.store;
		const tabs = [
            { title: "直播", component: <Hots /> }, 
            { title: "专辑", component: <Vanity /> }, 
            { title: "简介", component: <Hots /> }, 
            { title: "商店", component: <div className="lecturer base-content"><GoodsList goodslist={hotData} /></div> }
        ];
       
		return (
			<div className='AnchorStore'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={
                        <img src={icon.share} alt=''/>
                    }
                >
                    <Flex><img src={test.u1} className="anchore-img" alt='' />汪朵朵</Flex>
                </NavBar>
                <div className="nav-tabs">
                    <Tabs className="nav-tabs" tabs={tabs} initialPage={3} swipeable={false}>
                        {this.renderContent}
                    </Tabs>
                </div>
			</div>
		)
	}
};