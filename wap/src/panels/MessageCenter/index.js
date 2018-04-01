import React from "react";
import ReactDOM from "react-dom";
import { action } from "mobx";
import { BaseComponent, Base ,Global} from "../../common";
import { List, NavBar, Flex, ListView, PullToRefresh } from "antd-mobile";
import "./MessageCenter.less";
import { icon } from "../../images";

const Item = List.Item;

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
            height: 0,
            isLoading: false,
        };
    }
    @action.bound
    setListHeight() {
        this.store.height =
            document.documentElement.clientHeight -
            ReactDOM.findDOMNode(this.listView).offsetTop -
            88;
    }
    componentDidMount() {
        Base.GET(
            {
                act: "mailbox",
                op: "index",
                per_page: Global.PAGE_SIZE
            },
            res => {
                this.cur_page++;
                this.store.list = res.data.list;
                this.setListHeight();
            }
        );
    }
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "mailbox",
                op: "index",
                cur_page: this.cur_page || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list } = res.data;
                this.store.list = this.cur_page === 1 ? [].concat(list):this.store.list.concat(list);
                this.store.refreshing = false;
                this.store.isLoading = list.length > 0;
                if (list.length > 0) {
                    this.cur_page++;
                }
            },
            false,
            true
        );
    }
    @action.bound
    onRefresh() {
        console.log(1)
        this.store.refreshing = true;
        this.store.isLoading = false;
        this.cur_page = 1;
        this.requestData();
    }
    @action.bound
    onEndReached() {
        console.log(2)
        this.store.isLoading = true;
        this.store.refreshing = true;
        this.requestData();
    }
    @action.bound
    renderMsgItem(rowData, sectionID, rowID) {
        console.log(rowData);
        return <MessageItem {...rowData} />;
    }
    render() {
        const { list, isRead ,height,isLoading,refreshing} = this.store;
        console.log(isLoading,"isLoading")
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
                        ref={el => (this.listView = el)}
                        style={{ height }}
                        dataSource={dataSource}
                        renderRow={this.renderMsgItem}
                        renderFooter={() => (
                            <div style={{ padding: 15, textAlign: "center" }}>
                                {isLoading ? "加载中..." : "加载完成"}
                            </div>
                        )}
                        pullToRefresh={
                            <PullToRefresh
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        onEndReached={this.onEndReached}
                    />
                </div>
            </div>
        );
    }
}
