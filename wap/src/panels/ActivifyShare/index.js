import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import {
    Flex,
    Button,
    InputItem,
    Carousel,
    WhiteSpace,
    List,
    NavBar,
    Toast
} from "antd-mobile";
import "./ActivifyShare.less";
import { icon } from "../../images";
import { Timing } from "../../common/Timing";

const Item = List.Item;
export default class ActivifyShare extends BaseComponent {
    _timing = new Timing();
    store = {
        data: [
            "AiyWuByWklrrUDlFignR",
            "TekJlZRVCjLFexlOCuWn",
            "IJOtIlfsYdTyaDTRVrLI"
        ],
        user: {},
        info: {},
        time: {},
        enter: {},
        enter_count: 0,
        vote_count: 0,
        isVote: 0,
        iosUrl: "", 
        andoridUrl: ""
    };
    @action.bound
    setTime(value) {
        // const h = parseInt(value / 3600);
        // const m = parseInt((value % 3600) / 60);
        // const s = parseInt(value % 60);
        // this.store.time = { h, m, s };
        const h = parseInt(value / 3600 / 24); //天
        const m = parseInt((value % (3600 * 24)) / 3600); //小时
        const s = parseInt((value % 3600) / 60); //分
        this.store.time = { h, m, s };
    }
    onDown() {
        Base.GET({ act: "share", op: "index" }, res => {
            const { app } = res.data;
            const iosUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 0) ||
                {}
            ).url;
            const andoridUrl = (
                (app || []).find(item => parseInt(item.platform, 10) === 1) ||
                {}
            ).url;
            if (Base.isIos) {
                window.location.href = iosUrl || "";
            } else {
                window.location.href = andoridUrl || "";
            }
        });
    }
    @action.bound
    onVote() {
        const { mobi } = this;
        if (!Base.checkMobile(mobi)) {
            return Toast.fail("请输入正确的投票手机号");
        }
        const { activity_id, vote_user_id } = Base.getPageParams();
        Base.POST(
            {
                act: "vote",
                op: "index",
                mod: "activity",
                activity_id,
                vote_user_id,
                mobi
            },
            res => {
                // Toast.success("恭喜您，投票成功！",2);
                // this.store.isVote = true;
                // this.requestData();
                // setTimeout(()=>this.onDown(),2000);
                this.onDown();
            }
        );
    }
    componentDidMount() {
        this.requestData();
    }
    @action.bound
    requestData() {
        const { activity_id, vote_user_id } = Base.getPageParams();
        Base.GET(
            {
                act: "details",
                op: "index",
                mod: "activity",
                id: activity_id,
                vote_user_id
            },
            res => {
                const { user, info, enter, enter_count, vote_count } = res.data;
                this.store.user = user;
                this.store.info = info;
                this.store.enter = enter;
                this.store.enter_count = enter_count;
                this.store.vote_count = vote_count;
                const { time_end } = info;
                const total = time_end - parseInt(new Date().getTime() / 1000);
                if (total > 0) {
                    this._timing.stop();
                    this._timing.start(
                        total,
                        value => {
                            if (value <= 0) {
                                this._timing.stop();
                                this.store.time = {};
                            } else {
                                this.setTime(value);
                            }
                        },
                        1
                    );
                }
            }
        );
    }
    componentWillUnmount() {
        this._timing.stop();
    }
    render() {
        const {
            data,
            user,
            info,
            time,
            enter,
            enter_count,
            vote_count,
            isVote
        } = this.store;
        const { nickname, header } = user;
        const {
            title,
            photos = [],
            prize = [],
            views,
            details,
            total,
            time_end,
            user_name,
            rule
        } = info;
        const { h = 0, m = 0, s = 0 } = time;
        const { id, vote } = enter;
        return (
            <div className="ActivifyShare">
                {/* <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    活动分享
                </NavBar> */}
                <div className="base-content">
                    <div className="share_box">
                        <div className="share_box_brank">猪买单</div>
                        <div className="share_box_user">
                            <Flex className="user_box">
                                <img
                                    src={Base.getImgUrl(header)}
                                    className="user_img"
                                    alt=""
                                />
                                <div>
                                    <Flex className="user_box_info">
                                        {nickname}
                                        {/* <img src={icon.vipIcon} alt="" />
                                        <span>14</span> */}
                                    </Flex>
                                    <div className="user_box_info number">
                                        我是{id}号，请投我一票
                                    </div>
                                </div>
                            </Flex>
                            <Flex
                                align="center"
                                justify="center"
                                className="u_big_img"
                            >
                                <img
                                    src={Base.getImgUrl(header)}
                                    className="u_img"
                                    alt=""
                                />
                            </Flex>
                        </div>
                    </div>
                    <div className="title_type one" />
                    <div className="vote_box">
                        <Flex
                            align="center"
                            justify="center"
                            className="voteBox_number"
                        >
                            {vote}票
                        </Flex>
                        <div className="voteBox">
                            <InputItem
                                className="voteInput"
                                size="small"
                                clear
                                onChange={e => (this.mobi = e)}
                                placeholder="请输入手机号"
                            />
                            <Button
                                size="small"
                                inline
                                className={`voteBtn ${
                                    isVote ? "disabled" : ""
                                }`}
                                type="ghost"
                                onClick={this.onVote}
                                disabled={isVote}
                            >
                                投票
                            </Button>
                        </div>
                    </div>
                    <div className="title_type two" />
                    <div className="vote_box intro">
                        <div className="voteBox">
                            <Flex
                                align="center"
                                justify="center"
                                className="activify_detail"
                            >
                                距结束仅剩：<span className="countDown">
                                    {h}
                                </span>天<span className="countDown">{m}</span>小时<span className="countDown">
                                    {s}
                                </span>
                                <span>分</span>
                            </Flex>
                        </div>
                        <div className="story_box">
                            <div className="story_tit">{title}</div>
                            <div className="story_box_sile">
                                <Carousel autoplay={false} infinite>
                                    {photos.map(val => (
                                        <a
                                            key={val}
                                            style={{
                                                display: "inline-block",
                                                width: "100%",
                                                height: 176
                                            }}
                                        >
                                            <img
                                                src={Base.getImgUrl(val)}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    verticalAlign: "top"
                                                }}
                                            />
                                        </a>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="story_box_des">
                                <p>{details}</p>
                                {/* <div className="more">查看更多</div> */}
                            </div>
                            <div className="totalNumber">
                                <Flex className="total_box">
                                    <Flex.Item>
                                        <p className="title">参与选手</p>
                                        <div className="number">
                                            {enter_count}
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <p className="title">累计投票</p>
                                        <div className="number">
                                            {vote_count}
                                        </div>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <p className="title">访问次数</p>
                                        <div className="number">{views}</div>
                                    </Flex.Item>
                                </Flex>
                            </div>
                        </div>
                    </div>
                    <div className="vote_box goods">
                        <div className="goods_box">
                            <div className="vote_prize">
                                奖项总价值：{total}元
                            </div>
                            <Flex className="goods_box_item">
                                {prize.map((item, index) => {
                                    const {
                                        default_image,
                                        goods_name,
                                        sale_price
                                    } = item;
                                    return (
                                        <div className="goods-item" key={index}>
                                            <div>
                                                <img
                                                    src={Base.getImgUrl(
                                                        default_image
                                                    )}
                                                    className="prizeImg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="goodsTit ellipsis2">
                                                {goods_name}
                                            </div>
                                            <div className="goodsPrice">
                                                价值：{sale_price}元
                                            </div>
                                        </div>
                                    );
                                })}
                            </Flex>
                            <WhiteSpace
                                size="lg"
                                style={{ background: "#F6F6F6" }}
                            />
                            <List className="my-list">
                                <Item
                                    // extra={user_name}
                                    // arrow="horizontal"
                                    onClick={() => {}}
                                >
                                    活动发起：
                                    <span style={{ color: "#333" }}>
                                        {user_name}
                                    </span>
                                </Item>
                            </List>
                            <List className="my-list">
                                <Item>
                                    截止日期：
                                    <span style={{ color: "#333" }}>
                                        还剩<span className="countDown nobg">
                                            {h}
                                        </span>天<span className="countDown nobg">
                                            {m}
                                        </span>小时<span className="countDown nobg">
                                            {s}
                                        </span>
                                        <span>分</span>
                                    </span>
                                </Item>
                            </List>
                            <List className="my-list">
                                <Item>
                                    投票规则：<span style={{ color: "#333" }}>
                                        {rule}
                                    </span>
                                </Item>
                            </List>
                        </div>
                    </div>
                    <Flex className="footer" onClick={()=>this.onDown()}>
                        <Flex.Item className="footerItem issueBtn">
                            发布活动
                        </Flex.Item>
                        <Flex.Item className="footerItem">参加活动</Flex.Item>
                    </Flex>
                </div>
            </div>
        );
    }
}
