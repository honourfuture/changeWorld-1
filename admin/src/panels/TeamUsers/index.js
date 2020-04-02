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
    Select,
    Upload,
    Modal,
    Form,
    Icon
} from "antd";
import { remove } from "lodash";
import { UsersList } from "../../components/UsersList";
import { EditorModal } from "../../components/EditorModal";
import "./TeamUsers.less";
const Search = Input.Search;
const Option = Select.Option;

export default class TeamUsers extends BaseComponent {
    store = {
        list: [],
        total: 0,
    	users: null
    };
    curData = {};
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "id",
                dataIndex: "id",
                width: 150,
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "昵称",
                dataIndex: "nickname",
                width: 150,
                render: (text, record) => this.renderText(text, record, "nickname")
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                width: 150,
                render: (text, record) => this.renderText(text, record, "mobi")
            },
            {
                title: "积分",
                dataIndex: "point",
                width: 100,
                render: (text, record) => this.renderText(text, record, "point")
            },
            {
                title: "余额",
                dataIndex: "balance",
                width: 100,
                render: (text, record) => this.renderText(text, record, "balance")
            },
            {
                title: "经验值",
                dataIndex: "exp",
                width: 100,
                render: (text, record) => this.renderText(text, record, "exp")
            },
            {
                title: "金币",
                dataIndex: "gold",
                width: 100,
                render: (text, record) => this.renderText(text, record, "gold")
            },
            {
                title: "直属上级",
                dataIndex: "parent",
                width: 120,
                render: (text, record) => this.renderText(text, record, "parent")
            },
            {
                title: "直属下级",
                dataIndex: "son",
                width: 120,
                render: (text, record) => this.renderText(text, record, "son")
            },
            {
                title: "团队成员",
                dataIndex: "sons_count",
                width: 100,
                render: (text, record) => this.renderText(text, record, "sons_count")
            },
            {
                title: "注册时间",
                dataIndex: "created_at",
                width: 180,
                render: (text, record) => this.renderText(text, record, "created_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: 150,
                // fixed: "right",
                render: (text, record) => {
                    return (
                        <a
                            onClick={() =>
                                this.onRead(text, record)
                            }
                        >
                            查看成员
                        </a>
                    );
                }
            }
        ];
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeys = selectedRowKeys;
            },
            getCheckboxProps: record => ({
                name: record.name
            })
        };
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
    //查看
    @action.bound
    onRead(text, record) {
        this.refs.detail.show(record.sons);
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        this.selectedRowKeys = [];
        Base.GET(
            {
                mod: "admin",
                act: "user",
                op: "team",
                keyword: this.searchStr || "",
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
    ids = [];
    componentDidMount() {
        const ids = Base.getPageParams("ids");
        if (ids) {
            try {
                this.ids = JSON.parse(ids) || [];
            } catch (error) {}
        }
        this.requestData();
    }
    render() {
        const { ids = [] } = this;
        let { list, total, users } = this.store;
        const showList = list.slice();
        let tableWidth = this.columns.length * 150;
        return (
            <Spin ref="spin" wrapperClassName="TeamUsers" spinning={false}>
                <div className="pb10">
                    <Search
                        placeholder="搜索昵称/手机号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                    <span style={{ marginLeft: 20 }}>
                        总数：
                        {total}
                    </span>
                </div>
                <Table
                    rowSelection={ids.length > 0 ? this.rowSelection : null}
                    className="mt16"
                    onChange={this.onTableHandler}
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    scroll={{ x: tableWidth }}
                    pagination={{
                        total,
                        current: this.current,
                        defaultPageSize: Global.PAGE_SIZE
                    }}
                />
                <UsersList
                    ref="detail"
                    item={list}
                    destroyOnClose
                />
            </Spin>
        );
    }
}
