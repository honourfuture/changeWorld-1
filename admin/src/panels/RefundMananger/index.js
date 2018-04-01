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
    Form
} from "antd";
import { remove } from "lodash";
import { OrderDetail } from "../../components/OrderDetail";
import "./RefundMananger.less";
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

export default class RefundMananger extends BaseComponent {
    store = {
        list: [],
        status: -1
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn",
                width: "16%",
                render: (text, record) =>
                    this.renderText(text, record, "order_sn")
            },
            {
                title: "买家姓名",
                dataIndex: "user_id",
                width: "10%",
                render: (text, record) =>
                    this.renderText(this.user[text].nickname, record, "user_id")
            },
            {
                title: "卖家姓名",
                dataIndex: "seller_uid",
                width: "10%",
                render: (text, record) =>
                    this.renderText(
                        this.user[text].nickname,
                        record,
                        "seller_uid"
                    )
            },
            {
                title: "支付金额/总金额",
                dataIndex: "real_total_amount",
                width: "13%",
                render: (text, record) =>
                    this.renderText(
                        `${this.order[record.order_id].real_total_amount} / ${
                            this.order[record.order_id].total_amount
                        }`,
                        record,
                        "real_total_amount"
                    )
            },
            {
                title: "退款留言",
                dataIndex: "remark",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "remark")
            },
            {
                title: "退款状态",
                dataIndex: "status",
                width: "10%",
                render: (text, record) =>
                    this.renderText(
                        this.status[record.status],
                        record,
                        "status"
                    )
            },
            {
                title: "下单时间",
                dataIndex: "created_at",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: "8%",
                render: (text, record) => {
                    const { id, status } = record;
                    return (
                        <div className="editable-row-operations">
                            <a onClick={() => this.onDetail(record.id)}>详情</a>
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
    @action.bound
    onDetail(id) {
        this.refs.orderDetail.show(id);
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
                act: "order_refund",
                op: "index",
                mod: "admin",
                status: this.store.status,
                order_sn: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, status, user, order } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.status = status;
                this.user = user;
                this.order = order;
                this.cacheData = list.map(item => ({ ...item }));
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
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total } = this.store;
        const showList = list.slice();
        const { status = [] } = this;
        const statusCon = [];
        for (const key in status) {
            if (status.hasOwnProperty(key)) {
                statusCon.push(
                    <Option value={key} key={key}>
                        {status[key]}
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
            <Spin ref="spin" wrapperClassName="RefundMananger" spinning={false}>
                <div className="pb10">
                    <Search
                        placeholder="搜索订单号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 160, marginRight: 10 }}
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
                <OrderDetail ref="orderDetail" />
            </Spin>
        );
    }
}
