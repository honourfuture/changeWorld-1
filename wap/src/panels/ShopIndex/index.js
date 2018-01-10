import React from 'react';
import {BaseComponent} from '../../common';
import {Flex,Tabs,SearchBar,NavBar,Icon,Badge} from 'antd-mobile';
import './shopIndex.less';
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
          { title: '图书', component:<div>3</div> },
          { title: '知识', component:<div>2</div> },
          { title: '外卖', component:<div>2</div> },
          { title: '直播', component:<div>2</div> },
          { title: '家居', component:<div>2</div> },
          { title: '图片', component:<div>2</div> },
          { title: '段子', component:<div>2</div> },
        ];

        return (
            <div className='ShopIndex'>
                <NavBar
                    className="search_con"
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={<Badge dot>
                        <span style={{  display: 'inline-block' }} />
                    </Badge>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" />,
                        <Badge text={1} overflowCount={99}>
                            <span style={{  display: 'inline-block' }}  />
                        </Badge>
                    ]}>
                    <SearchBar
                        placeholder="请输入昵称或ID"
                    />
                </NavBar>
                <Tabs tabs={tabs} initialPage={0}>
                    {this.renderContent}
                </Tabs>
            </div>
        )
    }
}