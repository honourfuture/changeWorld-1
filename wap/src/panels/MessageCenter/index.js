import React from "react";
import ReactDOM from "react-dom";
import { action } from "mobx";
import { BaseComponent, Base ,Global} from "../../common";
import { List, NavBar, Flex, ListView, PullToRefresh } from "antd-mobile";
import "./MessageCenter.less";
import { icon } from "../../images";

const Item = List.Item;
const height = document.body.offsetHeight - 45;

class MessageItem extends BaseComponent {
    @action.bound
    onRead(id) {
        Base.push("MessageDetail", { id });
    }
    render(){
        const {id,title,summary,updated_at} = this.props;
        return (
            <Item
                className="base-line msgList"
                multipleLine
                onClick={() => this.onRead(id)}
            >
                <Flex justify="between" align="center">
                    <span className='title'>{title}</span>
                    <span className="time">{updated_at}</span>
                </Flex>
                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: summary }}
                />
            </Item>
        )
    }
}

export default class MessageCenter extends BaseComponent {
    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.cur_page = 1;
        this.store = {
            list: [],
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
        return <MessageItem {...rowData} />;
    }
    @action.bound
    requestData(b_noToast = true) {
        Base.POST(
            {
                act: "mailbox",
                op: "index",
                cur_page: this.cur_page || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list } = res.data;
                this.store.list =
                    this.cur_page === 1
                        ? [].concat(list)
                        : this.store.list.concat(list);
                this.store.refreshing = false;
                this.store.isLoading = false;
                if (list.length > 0) {
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
        const { list,isLoading,refreshing} = this.store;
        const dataSource = this.dataSource.cloneWithRows(list.slice());
        return (
            <div className="MessageCenter">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    消息中心
                </NavBar>
                <div className="base-content">
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
            </div>
        );
    }
}
