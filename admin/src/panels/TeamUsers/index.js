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
import { UsersList } from "../../components/UsersList";
import { IncomeList } from "../../components/IncomeList";
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
                title: "用户ID",
                dataIndex: "id",
                width: 120,
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "昵称",
                dataIndex: "nickname",
                width: 120,
                render: (text, record) => this.renderText(text, record, "nickname")
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                width: 100,
                render: (text, record) => this.renderText(text, record, "mobi")
            },
            {
                title: "积分",
                dataIndex: "point",
                width: 90,
                render: (text, record) => this.renderText(text, record, "point")
            },
            {
                title: "余额",
                dataIndex: "balance",
                width: 90,
                render: (text, record) => this.renderText(text, record, "balance")
            },
            {
                title: "经验值",
                dataIndex: "exp",
                width: 90,
                render: (text, record) => this.renderText(text, record, "exp")
            },
            {
                title: "金币",
                dataIndex: "gold",
                width: 90,
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
                title: "累计收益",
                dataIndex: "amount",
                width: 80,
                render: (text, record) => this.renderText(text, record, "amount")
            },
            {
                title: "注册时间",
                dataIndex: "created_at",
                width: 120,
                render: (text, record) => this.renderText(text, record, "created_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: 150,
                // fixed: "right",
                render: (text, record) => {
                    return (
                        <span>
                        <a onClick={() => this.onRead(record) }>查看成员</a>&nbsp;
                        <a onClick={() => this.onIncome(record, 2) }>商品收益</a>&nbsp;
                        <a onClick={() => this.onIncome(record, 0) }>知识收益</a>
                        </span>
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
    //明细
    @action.bound
    onIncome(record, topic){
        this.refs.incomeList.show(record.id, topic);
    }
    //查看
    @action.bound
    onRead(record) {
        this.refs.detail.show(record.id);
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    exportExcel(){
        let url = Global.API_URL;
        let Aparam = [];
        Aparam[0] = 'keyword=' + this.searchStr;
        Aparam[1] = 'export=1';
        Aparam[2] = 'type=1';
        window.open(url + "/admin/user/export?" + Aparam.join("&"));
    }
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
                const { list, incomes, count, anchor_status, seller_status } = res.data;
                this.store.list = list;
                this.store.total = parseInt(count);
                this.store.incomes = incomes;
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
                        placeholder="搜索用户ID/昵称/手机号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                    <Button type="primary" style={{ marginLeft:5 }} onClick={() =>
                        this.exportExcel()
                    }>导出</Button>
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
                <IncomeList
                ref="incomeList"
                item={list}
                destroyOnClose
                />
            </Spin>
        );
    }
}
