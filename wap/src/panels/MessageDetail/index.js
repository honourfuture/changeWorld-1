import React from 'react';
import {BaseComponent,Base} from '../../common';
import {NavBar} from 'antd-mobile';
import './MessageDetail.less';
import {icon} from '../../images';

export default class MessageDetail extends BaseComponent{
	store={
		pageData:{}
	}
	componentDidMount(){
		const {id} =  Base.getPageParams(id);
		Base.GET({act:'mailbox',op:'view',id},(res)=>{
            this.store.pageData = res.data;
        });
	}
	render(){
		const {pageData}  = this.store;
		return (
			<div className='MessageDetail'>
				<NavBar
					className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >消息详情</NavBar>
                <div className="base-content">
                	<div className="msgBox">
                		<div className="msgTit">{pageData.title}</div>
                		<div className="msgCont" dangerouslySetInnerHTML={{__html:pageData.content}}></div>
                	</div>
                </div>
			</div>
		)
	}
};
