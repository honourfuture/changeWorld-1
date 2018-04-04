import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { ListView, PullToRefresh } from "antd-mobile";
import { SalesGoodsItem } from "../../components/GoodsList";
import "./Statistics.less";
const height = document.body.offsetHeight - 169;

export default class Statistics extends BaseComponent {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.cur_page = 1;
        this.store = {
            list: [],
            count: 0,
            isRead: "",
            refreshing: false,
            isLoading: false
        };
    }
    componentDidMount() {
        this.cur_page = 1;
        this.requestData(false);
    }
    @action.bound
    renderItem(rowData, sectionID, rowID) {
        return <SalesGoodsItem {...rowData} />;
    }
    @action.bound
    requestData(b_noToast = true) {
        Base.POST(
            {
                act: "shop",
                op: "static_goods",
                mod: "user",
                cur_page: this.cur_page || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { goods, count } = res.data;
                this.store.count = count;
                this.store.list =
                    this.cur_page === 1
                        ? [].concat(goods)
                        : this.store.list.concat(goods);
                this.store.refreshing = false;
                this.store.isLoading = false;
                if (goods.length > 0) {
                    this.cur_page++;
                }
            },
            null,
            b_noToast
        );
    }
    @action.bound
    onRefresh() {
        this.store.refreshing = true;
        this.store.isLoading = false;
        this.cur_page = 1;
        this.requestData();
    }
    @action.bound
    onEndReached() {
        this.store.isLoading = true;
        this.store.refreshing = true;
        this.requestData();
    }
    render() {
        const { list, isLoading, refreshing, count } = this.store;
        const dataSource = this.dataSource.cloneWithRows(list.slice());
        return (
            <div className="Statistics">
                <div className="intBox">
                    <div className="myInt">
                        <div className="round">{count}</div>
                        <div className="label">总销量</div>
                    </div>
                </div>
                <ListView
                    style={{ height }}
                    dataSource={dataSource}
                    renderRow={this.renderItem}
                    renderFooter={() => (
                        <div style={{ padding: 15, textAlign: "center" }}>
                            {isLoading
                                ? "加载中..."
                                : list.length >= Global.PAGE_SIZE
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
                    // pageSize={2}
                />
            </div>
        );
    }
}
