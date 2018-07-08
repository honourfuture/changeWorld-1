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
import "./WithdrawalMananger.less";
const Search = Input.Search;
const Option = Select.Option;

export default class WithdrawalMananger extends BaseComponent {
    store = {
        list: [],
        status: -1
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "提现人",
                dataIndex: "user_name",
                // width: "12%",
                render: (text, record) =>
                    this.renderText(text, record, "user_name")
            },
            {
                title: "昵称",
                dataIndex: "nickname",
                // width: "12%",
                render: (text, record) => {
                    const user_id = record.user_id;
                    const user = this.user || {};
                    const nickname = (user[user_id] || {}).nickname;
                    return this.renderText(nickname, record, "nickname");
                }
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                // width: "15%",
                render: (text, record) => this.renderText(text, record, "mobi")
            },
            {
                title: "卡号",
                dataIndex: "user_card",
                // width: "20%",
                render: (text, record) =>
                    this.renderText(text, record, "user_card")
            },
            {
                title: "提现银行",
                dataIndex: "bank_name",
                // width: "13%",
                render: (text, record) =>
                    this.renderText(text, record, "bank_name")
            },
            {
                title: "提现金额",
                dataIndex: "amount",
                // width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "amount")
            },
            {
                title: "手续费",
                dataIndex: "withdraw_system",
                render: (text, record) =>
                    this.renderText(text, record, "withdraw_system")
            },
            {
                title: "猎头返利",
                dataIndex: "withdraw_headhunter",
                render: (text, record) =>
                    this.renderText(text, record, "withdraw_headhunter")
            },
            {
                title: "转账金额",
                render: (text, record) =>
                    parseInt(record.amount) - parseInt(record.withdraw_system)
            },
            {
                title: "更新时间",
                dataIndex: "updated_at",
                // width: "20%",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
            {
                title: "状态",
                dataIndex: "operation",
                render: (text, record) => {
                    let { id, status } = record;
                    status = parseInt(status, 10);
                    return (
                        <div className="editable-row-operations">
                            {status === 0 ? (
                                <Popconfirm
                                    title="处理提现"
                                    okText="已汇款"
                                    cancelText="异常"
                                    onConfirm={() => this.onHandler("1", id)}
                                    onCancel={() => this.onHandler("2", id)}
                                >
                                    <a className="ml10">审核</a>
                                </Popconfirm>
                            ) : (
                                <div>{status === 1 ? "已汇款" : "异常"}</div>
                            )}
                        </div>
                    );
                }
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
    //设置内容
    @action.bound
    onHandler(value, id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData.status = value;
        Base.POST(
            {
                act: "withdraw",
                op: "save",
                mod: "admin",
                s_id: id,
                status: value
            },
            res => {
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                this.store.list = list;
            },
            this
        );
    }
    @action.bound
    onStatusSelect(e) {
        this.current = 1;
        this.store.status = e;
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
                act: "withdraw",
                op: "record",
                mod: "admin",
                keyword: this.searchStr || "",
                status: this.store.status,
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, user, status } = res.data;
                this.status = status;
                this.user = user;
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
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        const { status = {} } = this;
        const statusCon = [];
        for (const key in status) {
            if (status.hasOwnProperty(key)) {
                const item = status[key];
                statusCon.push(
                    <Option value={key} key={key}>
                        {item}
                    </Option>
                );
            }
        }
        statusCon.unshift(
            <Option value={-1} key={-1}>
                全部
            </Option>
        );
        return (
            <Spin
                ref="spin"
                wrapperClassName="WithdrawalMananger"
                spinning={false}
            >
                <div className="pb10">
                    <Search
                        placeholder="搜索提现人/手机号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginRight: 10 }}
                    />
                    {statusCon.length > 0 ? (
                        <Select
                            onChange={this.onStatusSelect}
                            defaultValue={-1}
                        >
                            {statusCon}
                        </Select>
                    ) : null}
                </div>
                <Table
                    size="small"
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
                <EditorModal ref="editor" onComplete={this.onCompleteEdit} />
            </Spin>
        );
    }
}
