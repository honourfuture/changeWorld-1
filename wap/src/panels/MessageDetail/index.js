import React from 'react';
import {BaseComponent,Base} from '../../common';
import {NavBar,Flex} from 'antd-mobile';
import './MessageDetail.less';
import {icon} from '../../images';

export default class MessageDetail extends BaseComponent{
	pageData={}
	render(){
		this.pageData= Base.getPageParams();
		const {title,content}  = this.pageData;
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
                		<div className="msgTit">{title}</div>
                		<div className="msgCont">{content}</div>
                	</div>
                </div>
			</div>
		)
	}
};
