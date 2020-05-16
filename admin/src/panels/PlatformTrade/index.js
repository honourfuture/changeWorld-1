import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Input, Spin, Select, DatePicker, LocaleProvider, Button } from "antd";
import { OrderDetail } from "../../components/OrderDetail";
import "./OrderManager.less";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
const Search = Input.Search;
const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class PlatformTrade extends BaseComponent {
    store = {
        list: [],
        status: -1,
        trade_total: 0
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
    dateZoom = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
    }
    @action.bound
    onChange(value, dateString) {
    	this.dateZoom = dateString.join('/');
	}
    @action.bound
    onDetail(id) {
        this.refs.orderDetail.show(id, 1);
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
                type: 3,
                status: this.store.status,
                order_sn: this.searchStr || "",
                date_zoom: this.dateZoom || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, total, status, user } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.store.trade_total = total;
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
        let { list, total } = this.store;
        const showList = list.slice();
        const { status = [] } = this;
        return (
            <Spin ref="spin" wrapperClassName="OrderManager" spinning={false}>                
                <div className="pb10">
                    <LocaleProvider locale={zh_CN}><RangePicker onChange={this.onChange} onOk={this.onOk}/></LocaleProvider>
                    <Input type="text" placeholder="订单号" onChange ={event => this.onSearch()} style={{ width: 160, marginLeft:5 }}/>
                    <Button type="primary" style={{ marginLeft:5 }} onClick={() =>
                        this.requestData()
                    }>查询</Button>
                    <span style={{ marginLeft:5 }}>平台总交易额：￥{this.store.trade_total}</span>
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
