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
import "./OrderManager.less";
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

export default class OrderManager extends BaseComponent {
    store = {
        list: [],
        status: -1,
        curData: null
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "order_sn")
            },
            {
                title: "买家姓名",
                dataIndex: "buyer_uid",
                width: "10%",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.buyer_uid].nickname,
                        record,
                        "buyer_uid"
                    )
            },
            {
                title: "卖家姓名",
                dataIndex: "seller_uid",
                width: "10%",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.seller_uid].nickname,
                        record,
                        "seller_uid"
                    )
            },
            {
                title: "支付金额",
                dataIndex: "real_total_amount",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "real_total_amount")
            },
            {
                title: "总金额",
                dataIndex: "total_amount",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "total_amount")
            },
            {
                title: "订单状态",
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
                width: "10%",
                render: (text, record) => {
                    const { id, status } = record;
                    return (
                        <div className="editable-row-operations">
                            <a
                                style={{ marginLeft: 30 }}
                                onClick={() => this.onDetail(record.id)}
                            >
                                详情
                            </a>
                        </div>
                    );
                }
            }
        ];
        this.info = [
            {
                key: "nickname",
                label: "昵称"
            },
            {
                key: "realname",
                label: "真实姓名"
            },
            {
                key: "mobi",
                label: "手机号"
            },
            {
                key: "email",
                label: "电子邮箱"
            },
            {
                key: "anchor_photo",
                label: "主播照片",
                render: value => {
                    const list = JSON.parse(value);
                    console.log(list);
                    return list.map((item, index) => {
                        return (
                            <img
                                key={index}
                                src={Base.getImgUrl(item)}
                                className="photo"
                                alt=""
                            />
                        );
                    });
                }
            },
            {
                key: "certificate_no",
                label: "证件号码"
            },
            {
                key: "certificate_photo",
                label: "证件照片",
                render: value => {
                    return (
                        <img
                            className="photo"
                            src={Base.getImgUrl(value)}
                            alt=""
                        />
                    );
                }
            },
            {
                key: "summary",
                label: "简介"
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
    onCheck(id, status) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { act: "anchor", op: "save", mod: "admin", id, status },
            res => {
                itemData.status = status;
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
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
                act: "order",
                op: "index",
                mod: "admin",
                status: this.store.status,
                order_sn: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, status, user } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.status = status;
                this.user = user;
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
        let { list, total, curData } = this.store;
        const showList = list.slice();
        const { status = [] } = this;
        const statusCon = status.map((item, index) => {
            return (
                <Option value={index} key={index}>
                    {item}
                </Option>
            );
        });
        statusCon.unshift(
            <Option value={-1} key={-1}>
                全部
            </Option>
        );
        let infoItems = null;
        if (curData) {
            infoItems = this.info.map((item, index) => {
                const { key, label, render } = item;
                const value = !render ? curData[key] : render(curData[key]);
                return (
                    <FormItem key={index} {...formItemLayout} label={label}>
                        {value}
                    </FormItem>
                );
            });
        }
        return (
            <Spin ref="spin" wrapperClassName="OrderManager" spinning={false}>
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
