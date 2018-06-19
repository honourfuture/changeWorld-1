import React from "react";
import ReactDOM from "react-dom";
import { action } from "mobx";
import { Base, BaseComponent, NetImg, Global } from "../../common";
import { WhiteSpace, Carousel, ListView, PullToRefresh } from "antd-mobile";
import "./Hots.less";

import { GoodsItem } from "../../components/GoodsList";
import Mescroll from "../Mescroll/mescroll.m";
import "../Mescroll/mescroll.min.css";
const height = document.body.offsetHeight - 88;
const width = document.body.offsetWidth;
const PAGE_SIZE = 20;
export class Hots extends BaseComponent {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.cur_page = 1;
        this.store = {
            goods: [],
            refreshing: false,
            height: 0,
            isLoading: false,
            ad: [],
            keyword: ""
        };
    }
    componentWillUnmount() {
        Base.removeEvt("com.shopindex.search");
    }
    componentDidMount() {
        Base.addEvt("com.shopindex.search", (evt, keyword) => {
            this.store.keyword = keyword;
            this.cur_page = 1;
            this.requestData();
        });
        this.mescroll = new Mescroll("mescroll", {
            down: {
                callback: this.onRefresh,
                auto: false
            },
            up: {
                callback: this.onEndReached,
                auto: false
            }
        });
        const { id, is_hot } = this.props;
        Base.GET(
            {
                act: "shop",
                op: "index",
                is_hot,
                goods_class_id: id,
                per_page: PAGE_SIZE
            },
            res => {
                this.cur_page++;
                this.store.ad = res.data.ad;
                this.store.goods = res.data.goods;
                this.store.anchor = res.data.anchor;
                // this.setListHeight();
                this.mescroll.endSuccess();
            }
        );
    }
    // @action.bound
    // setListHeight() {
    //     this.store.height =
    //         document.documentElement.clientHeight -
    //         ReactDOM.findDOMNode(this.listView).offsetTop -
    //         88;
    //     console.log(this.store.height);
    // }
    @action.bound
    renderGoodsItem(rowData, sectionID, rowID) {
        return <GoodsItem {...rowData} />;
    }
    @action.bound
    requestData() {
        const { id, is_hot } = this.props;
        Base.GET(
            {
                act: "shop",
                op: "goods",
                goods_class_id: id,
                is_hot,
                cur_page: this.cur_page || 1,
                per_page: PAGE_SIZE,
                keyword: this.store.keyword
            },
            res => {
                const { goods } = res.data;
                this.mescroll.endSuccess();
                this.mescroll.endSuccess(
                    goods.length,
                    goods.length >= PAGE_SIZE
                );
                this.store.goods =
                    this.cur_page === 1
                        ? [].concat(goods)
                        : this.store.goods.concat(goods);
                if (goods.length > 0) {
                    this.cur_page++;
                }
            }
            // false,
            // true
        );
    }
    @action.bound
    onRefresh() {
        this.cur_page = 1;
        this.requestData();
    }
    @action.bound
    onEndReached() {
        this.requestData();
    }
    render() {
        const { goods, refreshing, isLoading, ad } = this.store;
        // const dataSource = this.dataSource.cloneWithRows(goods.slice());
        const items = goods.map(item => {
            return <GoodsItem key={item.id} {...item} />;
        });
        return (
            <div className="Hots base-content">
                {/* {ad.length > 0 ? (
                    <Carousel autoplay={true} infinite>
                        {ad.map(({ image, link }, index) => (
                            <NetImg
                                key={index}
                                onClick={() => Base.push(link)}
                                src={Base.getImgUrl(image)}
                                style={{ width: "100%", height: "auto" }}
                                onLoaded={this.setListHeight}
                            />
                        ))}
                    </Carousel>
                ) : null} */}
                {/* <WhiteSpace size="md" />
                <div className="anchor-recommend">
                    <span>主播推荐</span>
                </div> */}
                {/* <WhiteSpace size="md" /> */}
                <div id="mescroll" className="mescroll">
                    <div className="scroll-con">
                        {ad.length > 0 ? (
                            <Carousel
                                style={{ marginBottom: 10 }}
                                autoplay={true}
                                infinite
                            >
                                {ad.map(({ image, link }, index) => (
                                    <NetImg
                                        key={index}
                                        onClick={() => Base.push(link)}
                                        src={Base.getImgUrl(image)}
                                        style={{
                                            width: "100%",
                                            height: "auto"
                                        }}
                                        onLoaded={this.setListHeight}
                                    />
                                ))}
                            </Carousel>
                        ) : null}
                        {items}
                    </div>
                </div>
                {/* <Scroll
                    style={{ height }}
                    f_pullUpScroll={this.onEndReached}
                    f_pullDownScroll={this.onRefresh}
                >
                    {items}
                </Scroll> */}
                {/* <ListView
                    ref={el => (this.listView = el)}
                    style={{ height }}
                    dataSource={dataSource}
                    renderHeader={() => (
                        <div style={{ width }}>
                            {ad.length > 0 ? (
                                <Carousel autoplay={true} infinite>
                                    {ad.map(({ image, link }, index) => (
                                        <NetImg
                                            key={index}
                                            onClick={() => Base.push(link)}
                                            src={Base.getImgUrl(image)}
                                            style={{
                                                width: "100%",
                                                height: "auto"
                                            }}
                                        />
                                    ))}
                                </Carousel>
                            ) : null}
                        </div>
                    )}
                    renderRow={this.renderGoodsItem}
                    renderFooter={() => (
                        <div style={{ padding: 15, textAlign: "center" }}>
                            {isLoading
                                ? "加载中..."
                                : goods.length >= PAGE_SIZE
                                    ? "加载完成"
                                    : ""}
                        </div>
                    )}
                    pullToRefresh={
                        <PullToRefresh
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    onEndReached={this.onEndReached}
                    initialListSize={8}
                    // pageSize={2}
                /> */}
            </div>
        );
    }
}
