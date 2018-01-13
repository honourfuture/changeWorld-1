import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,Tabs,SearchBar,NavBar,Badge} from 'antd-mobile';
import './ShopIndex.less';

import {icon} from '../../images';
import {Hots} from '../../components/Hots';
import {Vanity} from '../../components/Vanity';

export default class ShopIndex extends BaseComponent{
    componentDidMount(){
    }
    renderContent = tab => tab.component;
    render(){
        const tabs = [
          { title: '热门', component:<Hots /> },
          { title: '靓号', component:<Vanity /> },
          { title: '图书', component:<Hots/> },
          { title: '知识', component:<Hots /> },
          { title: '外卖', component:<Hots /> },
          { title: '直播', component:<Hots /> },
          { title: '家居', component:<Hots /> },
          { title: '图片', component:<Hots /> },
          { title: '段子', component:<Hots /> },
        ];

        return (
            <div className='ShopIndex'>
                <NavBar
                    className="search-con"
                    mode="light"
                    icon={<img src={icon.email} alt="" />}
                    leftContent={<Badge dot>
                        <span />
                    </Badge>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={<Flex className="right-cont" onClick={()=>Base.push('ShopCart')}>
                        <img src={icon.indexCart} alt=""/>
                        <Badge text={1} overflowCount={99}><span /></Badge>
                    </Flex>}>
                    <SearchBar placeholder="请输入昵称或ID" />
                </NavBar>
                <div className="base-content">
                    <div className="nav-tabs">
                        <Tabs className="nav-tabs" tabs={tabs} initialPage={0} swipeable={false}>
                            {this.renderContent}
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}