import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {Table, Input, Spin, Select, Form, LocaleProvider, Button, DatePicker} from "antd";
import { OrderDetail } from "../../components/OrderDetail";
import "./OrderManager.less";
import zh_CN from "antd/lib/locale-provider/zh_CN";
const Search = Input.Search;
const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class PlatformIncome extends BaseComponent {
    store = {
        list: [],
        status: -1,
        income_total: 0
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
                title: "平台收益",
                dataIndex: "amount",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "amount")
            },
            {
                title: "时间",
                dataIndex: "updated_at",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: "10%",
                render: (text, record) => {
                    const { order_id, status } = record;
                    return (
                        <div className="editable-row-operations">
                            <a onClick={() => this.onDetail(order_id)}>详情</a>
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
    exportExcel(){
        let url = Global.API_URL;
        let Aparam = [];
        Aparam[0] = 'status=' + this.store.status;
        Aparam[1] = 'date_zoom=' + (this.dateZoom || "");
        Aparam[2] = 'export=1';
        Aparam[3] = 'type=1';
        window.open(url + "/admin/platform/export?" + Aparam.join("&"));
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
                act: "platform",
                op: "income",
                mod: "admin",
                status: this.store.status,
                cur_page: this.current || 1,
                date_zoom: this.dateZoom || "",
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, total, status, user } = res.data;
                this.store.list = list;
                this.store.total = parseInt(count);
                this.store.income_total = total;
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
        return (
            <Spin ref="spin" wrapperClassName="OrderManager" spinning={false}>
                <div className="pb10">
                    <LocaleProvider locale={zh_CN}><RangePicker onChange={this.onChange} onOk={this.onOk}/></LocaleProvider>
                    <Button type="primary" style={{ marginLeft:5 }} onClick={() =>
                        this.requestData()
                    }>查询</Button>
                    <Button type="primary" style={{ marginLeft:5 }} onClick={() =>
                        this.exportExcel()
                    }>导出</Button>
                <span style={{ marginLeft:5 }}>平台总收益：￥{this.store.income_total}</span>
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
