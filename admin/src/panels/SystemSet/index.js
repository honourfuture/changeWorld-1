import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Tabs} from 'antd';
import './SystemSet.less';

import BasicItem from '../../components/BasicItem';
import EmailItem from '../../components/EmailItem';
import UploadItem from '../../components/UploadItem';

const TabPane = Tabs.TabPane;

export default class SystemSet extends BaseComponent{
	store={
		baseInfo:{}
	}
	@action.bound
	componentDidMount(){
		Base.GET({act:'config',op:'index',mod:'admin'},(res)=>{
			console.log(res)
			this.store.baseInfo = res.data; 
		},this);
	}
	@action.bound
	onSiteChange(value){
		this.store.baseInfo.site_status = value;
	}
	render(){
		const {baseInfo} = this.store;
		const panes = [
	      	{ title: '基本设置', content: <BasicItem item={baseInfo} callBack={this.onSiteChange}/>, key: '1' },
	     	{ title: '邮件设置', content: <EmailItem item={baseInfo} />, key: '2' },
	     	{ title: '上传设置', content: <UploadItem item={baseInfo} />, key: '3' },
	    ];
		const tabPan = panes.map((item)=>{
			const {title,key,content} = item;
			return <TabPane key={key} tab={title}>{content}</TabPane>
		})

		return (
			<div className='SystemSet'>
				<Tabs>
					{tabPan}
				</Tabs>
			</div>
		)
	}
};

