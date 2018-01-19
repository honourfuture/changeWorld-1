import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {List,NavBar,Flex} from 'antd-mobile';
import './MessAgeCenter.less';
import {icon} from '../../images';

const Item = List.Item;
const Brief = Item.Brief;
export default class MessAgeCenter extends BaseComponent{
	store={
		msglist:[{
			id:1,
			title:"活动精选",
			content:"召唤好友一起来砍价，砍一刀就省钱，多看多优惠",
			time:"昨天",
			isRead:0,
		},{
			id:2,
			title:"主播正在直播！",
			content:"邀请好友一起来成为会员，一次购买终身赠送，好友越多赚得越多",
			time:"2018-01-19",
			isRead:0,
		},{
			id:3,
			title:"你的好友邀请了你",
			content:"召唤好友一起来砍价，砍一刀就省钱，多看多优惠",
			time:"2018-01-18",
			isRead:1,
		},{
			id:4,
			title:"活动通知",
			content:"邀请好友一起来成为会员，一次购买终身赠送，好友越多赚得越多",
			time:"2018-01-17",
			isRead:1,
		}]
	}
	@action.bound
	onRead(id){
		const {msglist} = this.store;
		msglist.forEach((item)=>{
			id === item.id && (item.isRead = 1);
		});
		const item = msglist.find((item)=>id === item.id);
		Base.push("MessageDetail",{...item});
	}
	render(){
		const {msglist} = this.store;
		const msgItem = (msglist || {}).map((item,key)=>{
			const {id,title,content,time,isRead} = item;
			const read = isRead ? "title read":"title";
			return <Item multipleLine key={id} onClick={()=>this.onRead(id)}>
				          	<Flex justify="between" align="center">
				          		<span className={read}>{title}</span>
				          		<span className="time">{time}</span>
				          	</Flex>
				          	<Brief className="content">{content}</Brief>
				        </Item>
		});
		return (
			<div className='MessAgeCenter'>
				<NavBar
					className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >消息中心</NavBar>
                <div className="base-content">
                	<List className="msgList">
				        {msgItem}
				      </List>
                </div>
			</div>
		)
	}
};
