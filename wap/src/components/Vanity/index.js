import React from 'react';
import {BaseComponent} from '../../common';
import {Flex, WhiteSpace, Button,Tabs} from 'antd-mobile';
import './vanity.less';

import {Carousel_Img} from '../../components/Carousel_Img';

export class Vanity extends BaseComponent{
    render(){
    	const tabs = [
          { title: '靓号'},
          { title: '六位号'},
          { title: '七位号'},
          { title: '八位号'}
        ];
        return (
            <div className='Vanity'>
                <Carousel_Img />
                <div className="vanity_num">
                	<Tabs tabs={tabs} initialPage={1}>
                		<Flex wrap="wrap" className="vanity_num_list">
                			<div className="listItem">
                				<div className="listItem_num"><em>1188</em>23</div>
                				<div className="listItem_price">一口价：<em>￥100</em></div>
                			</div>
                			<div className="listItem">
                				<div className="listItem_num"><em>1188</em>23</div>
                				<div className="listItem_price">一口价：<em>￥100</em></div>
                			</div>
                			<div className="listItem">
                				<div className="listItem_num"><em>1188</em>23</div>
                				<div className="listItem_price">一口价：<em>￥100</em></div>
                			</div>
                			<div className="listItem">
                				<div className="listItem_num"><em>1188</em>23</div>
                				<div className="listItem_price">一口价：<em>￥100</em></div>
                			</div>
                			<div className="listItem">
                				<div className="listItem_num"><em>1188</em>23</div>
                				<div className="listItem_price">一口价：<em>￥100</em></div>
                			</div>
                			<div className="listItem">
                				<div className="listItem_num"><em>1188</em>23</div>
                				<div className="listItem_price">一口价：<em>￥100</em></div>
                			</div>
                		</Flex>
                	</Tabs>
                </div>
            </div>
        )
    }
}