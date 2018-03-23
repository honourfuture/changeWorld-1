import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Spin } from "antd";
import "./SystemLog.less";

export default class SystemLog extends BaseComponent {
    store = {
        list: []
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "编号",
                dataIndex: "id",
                width: "10%",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "操作ip",
                dataIndex: "ip",
                width: "15%",
                render: (text, record) => this.renderText(text, record, "ip")
            },
            {
                title: "操作账号",
                dataIndex: "account",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "account")
            },
            {
                title: "操作描述",
                dataIndex: "remarks",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "remarks")
            },
            {
                title: "操作时间",
                dataIndex: "created_at",
                width: "20%",
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            }
        ];
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
                act: "action_log",
                op: "index",
                account: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count } = res.data;
                this.store.list = list;
                this.store.total = count;
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
            <Spin ref="spin" wrapperClassName="SystemLog" spinning={false}>
                {/* <div className="pb10">
                    <Button onClick={this.onToggleAddModal}>新增+</Button>
                    <Search
                        placeholder="搜索操作账号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 160, marginLeft: 10 }}
                    />
                </div> */}
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
