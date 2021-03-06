import React from 'react';
import { action } from 'mobx';
import { BaseComponent, Base, NetImg, Global } from '../../common';
import { Flex, PullToRefresh, NavBar } from 'antd-mobile';
import './EvaluateList.less';
import { icon } from '../../images';

const hScroll = document.body.offsetHeight - 45;

class Item extends BaseComponent {
	render() {
		const { header, nickname, remark, photos } = this.props;
		const photo = JSON.parse(JSON.parse(photos));
		let photosItem = (photo || []).map((item,key)=>{
			return <NetImg className="desImg" src={Base.getImgUrl(item)} key={key}/>
		});
		return <Flex className="item" align='start'>
			<NetImg className="userImg" src={Base.getImgUrl(header)} />
			<div>
				<div className="name">
					{Base.getAnonymity(nickname)}
				</div>
				<div className="des">
					{remark}
				</div>
				{
					photo.length > 0 ? (<div className="photos">
											{photosItem}
										</div>) : null
				}
				
			</div>
		</Flex>
	}
}

export default class EvaluateList extends BaseComponent {
	store = { list: [], user: {}, refreshing: false }
	cur_page = 1
	componentDidMount() {
		this.requestData();
	}
	@action.bound
	requestData() {
		this.store.refreshing = true;
		const { id } = Base.getPageParams();
		Base.GET({ act: 'goods', op: 'evaluate', goods_id: id, per_page: Global.PAGE_SIZE, cur_page: this.cur_page || 1 }, (res) => {

			const { list, user } = res.data;
			this.store.list = this.cur_page === 1 ? [].concat(list) : this.store.list.concat(list);
			this.store.user = { ...user, ...this.store.user };
			this.store.refreshing = false;
			this.cur_page++;
		});
	}
	render() {
		const { refreshing, list, user } = this.store;
		const evaluateItems = list.map((item, index) => {
			const data = { ...item, ...user[item.user_id] }
			return <Item {...data} key={index} />;
		})
		return (
			<div className='EvaluateList'>
				<NavBar
					className="base-line"
					mode="light"
					icon={<img src={icon.back} alt='' />}
					onLeftClick={Base.goBack}
				>评论列表</NavBar>
				<PullToRefresh
					style={{ height: hScroll, overflow: 'auto', }}
					indicator={{ deactivate: '上拉可以刷新' }}
					direction='up'
					refreshing={refreshing}
					onRefresh={this.requestData}
				>
					{evaluateItems}
				</PullToRefresh>
			</div>
		)
	}
};
