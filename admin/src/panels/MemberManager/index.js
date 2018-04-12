import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {
    Table,
    Input,
    Popconfirm,
    Switch,
    Button,
    Spin,
    message,
    Select
} from "antd";
import { remove } from "lodash";
import { EditorModal } from "../../components/EditorModal";
import "./MemberManager.less";
const Search = Input.Search;
const Option = Select.Option;

export default class MemberManager extends BaseComponent {
    store = {
        list: [],
        article_class: []
    };
    curData = {};
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "昵称",
                dataIndex: "nickname",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "nickname")
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                width: "10%",
                render: (text, record) => this.renderText(text, record, "mobi")
            },
            {
                title: "积分",
                dataIndex: "point",
                width: "8%",
                render: (text, record) => this.renderText(text, record, "point")
            },
            {
                title: "头像",
                dataIndex: "header",
                width: "10%",
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "余额",
                dataIndex: "balance",
                width: "8%",
                render: (text, record) =>
                    this.renderText(text, record, "balance")
            },
            {
                title: "经验值",
                dataIndex: "exp",
                width: "8%",
                render: (text, record) => this.renderText(text, record, "exp")
            },
            {
                title: "金币",
                dataIndex: "gold",
                width: "8%",
                render: (text, record) => this.renderText(text, record, "gold")
            },
            {
                title: "主播",
                dataIndex: "anchor",
                width: "10%",
                render: (text, record) =>
                    this.renderText(
                        this.anchor_status[record.anchor],
                        record,
                        "v"
                    )
            },
            {
                title: "店铺",
                dataIndex: "seller",
                width: "10%",
                render: (text, record) =>
                    this.renderText(
                        this.seller_status[record.seller],
                        record,
                        "v"
                    )
            },
            {
                title: "注册时间",
                dataIndex: "created_at",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            }
        ];
    }
    renderImg(text, record, column) {
        return <img className="header" src={record[column]} alt="" />;
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    //搜索
    searchStr = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
        this.requestData();
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "user",
                op: "index",
                mod: "admin",
                nickname: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, anchor_status, seller_status } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
                this.anchor_status = anchor_status;
                this.seller_status = seller_status;
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total } = this.store;
        const showList = list.slice();
        return (
            <Spin ref="spin" wrapperClassName="MemberManager" spinning={false}>
                <div className="pb10">
                    <Search
                        placeholder="搜索昵称"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 130, marginLeft: 10 }}
                    />
                </div>
                <Table
                    className="mt16"
                    onChange={this.onTableHandler}
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={{
                        total,
                        current: this.current,
                        defaultPageSize: Global.PAGE_SIZE
                    }}
                />
            </Spin>
        );
    }
}
