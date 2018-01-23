import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Tabs,message} from 'antd';import {remove} from 'lodash';
import './AccessSet.less';
import {UserAccessItem} from '../../components/UserAccessItem';

const TabPane = Tabs.TabPane;
export default class AccessSet extends BaseComponent{
	store={
		list:[{
			id:1,
			name:"顺丰",
			des:"SF",
			enable:1,
		},
		{
			id:2,
			name:"邮政",
			des:"EMS",
			enable:1,
		},
		{
			id:3,
			name:"德邦",
			des:"DB",
			enable:1,
		}],
	}
	render(){
		const {list} = this.store;
		const panes = [
	      	{ title: '管理员', content: <UserAccessItem item={list} />, key: '1' },
	     	{ title: '权限组', content: 2, key: '2' },
	    ];
	    const tabPan = panes.map((item)=>{
			const {title,key,content} = item;
			return <TabPane key={key} tab={title}>{content}</TabPane>
		});
		return (
			<div className='AccessSet'>
				<Tabs>
					{tabPan}
				</Tabs>
			</div>
		)
	}
};
