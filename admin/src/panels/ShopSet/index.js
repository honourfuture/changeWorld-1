import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Tabs} from 'antd';

import ShopSetItem from '../../components/ShopSetItem';
import SearchItem from '../../components/SearchItem';
import {HotWrod} from '../../components/HotWrod';

import './ShopSet.less';
const TabPane = Tabs.TabPane;

export default class ShopSet extends BaseComponent{
	store={
		list:[],
	}
	componentDidMount(){
		Base.GET({act:'config',op:'index',mod:'admin'},(res)=>{
			this.store.list = res.data; 
		},this);
	}
	render(){
		const {list} = this.store;
		const panes = [
	      	{ title: '商城设置', content: <ShopSetItem />, key: '1' },
	     	{ title: '默认搜索', content: <SearchItem item={list} />, key: '2' },
	     	{ title: '热门搜索', content: <HotWrod />, key: '3' },
	    ];
	    const tabPan = panes.map((item)=>{
			const {title,key,content} = item;
			return <TabPane key={key} tab={title}>{content}</TabPane>
		})
		return (
			<div className='ShopSet'>
				<Tabs>
					{tabPan}
				</Tabs>
			</div>
		)
	}
};
