import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Flex,Button,InputItem,Carousel,WhiteSpace,List } from "antd-mobile";
import './Activify_share.less';
import {icon} from '../../images';

const Item = List.Item;
export default class Activify_share extends BaseComponent{
	store={
		data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
	}
	render(){
		const {data} = this.store;
		return (
			<div className='Activify_share'>
				<div className="share_box">
					<div className="share_box_brank">猪买单</div>
					<div className="share_box_user">
						<Flex className="user_box">
							<img src={icon.logo} className="user_img" alt=""/>
							<div>
								<Flex className="user_box_info">
									贺辉
									<img src={icon.vipIcon} alt=""/><span>14</span>
								</Flex>
								<div className="user_box_info number">7653号</div>
							</div>
						</Flex>
						<Flex align="center" justify="center" className="u_big_img">
							<img src={icon.logo} className="u_img" alt=""/>
						</Flex>
					</div>
				</div>
				<div className="title_type one"></div>
				<div className="vote_box">
					<Flex align="center" justify="center" className="voteBox_number">
						1065票
					</Flex>
					<div className="voteBox">
						<InputItem
							className="voteInput"
							size="small"
							clear
							placeholder="请输入手机号"
                        />
						<Button size="small" inline className="voteBtn" type="ghost">投票</Button>
					</div>
				</div>
				<div className="title_type two"></div>
				<div className="vote_box intro">
					<div className="voteBox">
						<Flex align="center" justify="center" className="activify_detail">
							距结束仅剩：<span className="countDown">13</span>:<span className="countDown">05</span>:<span className="countDown">21</span>
						</Flex>
					</div>
					<div className="story_box">
						<div className="story_tit">征集最浪漫爱情故事...</div>
						<div className="story_box_sile">
							<Carousel
								autoplay={false}
								infinite
							>
								{data.map(val => (
									<a
									key={val}
									href="http://www.alipay.com"
									style={{ display: 'inline-block', width: '100%', height: 176 }}
									>
									<img
										src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
										alt=""
										style={{ width: '100%', verticalAlign: 'top' }}
									/>
									</a>
								))}
							</Carousel>
						</div>
						<div className="story_box_des">
							征集最浪漫爱情故事
							<p>春天一到，小伙伴们这衣服就一件一件的往下...</p>
							<div className="more">查看更多</div>
						</div>
						<div className="totalNumber">
							<Flex className="total_box">
								<Flex.Item>
									<p className="title">参与选手</p>
									<div className="number">4012</div>
								</Flex.Item>
								<Flex.Item>
									<p className="title">累计投票</p>
									<div className="number">4012</div>
								</Flex.Item>
								<Flex.Item>
									<p className="title">访问次数</p>
									<div className="number">4012</div>
								</Flex.Item>
							</Flex>
						</div>
					</div>
				</div>
				<div className="vote_box goods">
					<div className="goods_box">
						<div className="vote_prize">奖项总价值：19888元</div>
						<Flex className="goods_box_item">
							<Flex.Item>
								<div>
									<img src={icon.logo} className="prizeImg" alt=""/>
								</div>
								<div className="goodsTit ellipsis2">这是标题这是标题这是标题这是标题</div>
								<div className="goodsPrice">价值：9988元</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<img src={icon.logo} className="prizeImg" alt=""/>
								</div>
								<div className="goodsTit ellipsis2">这是标题这是标题这是标题这是标题</div>
								<div className="goodsPrice">价值：9988元</div>
							</Flex.Item>
							<Flex.Item>
								<div>
									<img src={icon.logo} className="prizeImg" alt=""/>
								</div>
								<div className="goodsTit ellipsis2">这是标题这是标题这是标题这是标题</div>
								<div className="goodsPrice">价值：9988元</div>
							</Flex.Item>
						</Flex>
						<WhiteSpace size="lg" style={{background:'#F6F6F6'}} />
						<List className="my-list">
							<Item extra="某某某国际旅行社" arrow="horizontal" onClick={() => {}}>活动发起人</Item>
						</List>
						<List className="my-list">
							<Item extra="某某某国际旅行社">截止日期</Item>
						</List>
						<List className="my-list">
							<Item extra="某某某国际旅行社某某某国际旅行社某某某国际旅行社某某某国际旅行社">投票规则</Item>
						</List>
					</div>	
				</div>
				<Flex className="footer">
					<Flex.Item className="footerItem issueBtn">
						发布活动
					</Flex.Item>
					<Flex.Item className="footerItem">
						参加活动
					</Flex.Item>
				</Flex>
			</div>
		)
	}
};
