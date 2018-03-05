import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,Tabs,SearchBar,NavBar,Badge} from 'antd-mobile';
import './ShopIndex.less';

import {icon} from '../../images';
import {Hots} from '../../components/Hots';
import {Vanity} from '../../components/Vanity';

export default class ShopIndex extends BaseComponent{
    store={tabs:[]}
    componentDidMount(){
        Base.GET({act:'goods_class',op:'index'},(res)=>{
            const tabs = res.data.map((item)=>{
                const {id,name} = item;
                return {key:id,title:name,component:<Hots id={id}/>};
            });
            tabs.splice(1,0,{key:0,title:'靓号',component:<Vanity/>})
            this.store.tabs = tabs;
        })
    }
    renderContent = tab => tab.component;
    render(){
        const {tabs} = this.store;
        return (
            <div className='ShopIndex'>
                <NavBar
                    className="search-con"
                    mode="light"
                    icon={<img src={icon.email} alt="" />}
                    leftContent={<Badge dot>
                        <span />
                    </Badge>}
                    onLeftClick={() => Base.push('MessageCenter')}
                    rightContent={<Flex className="right-cont" onClick={()=>Base.push('ShopCart')}>
                        <img src={icon.indexCart} alt=""/>
                        <Badge text={1} overflowCount={99}><span /></Badge>
                    </Flex>}>
                    <SearchBar placeholder="请输入昵称或ID" />
                </NavBar>
                <div className="nav-tabs">
                    <Tabs className="nav-tabs" tabs={tabs} initialPage={0} swipeable={false} prerenderingSiblingsNumber={0}>
                        {this.renderContent}
                    </Tabs>
                </div>
            </div>
        )
    }
}