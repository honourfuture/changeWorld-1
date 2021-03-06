import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Input, Spin, Select, Form, DatePicker, LocaleProvider, Button } from "antd";
import { OrderDetail } from "../../components/OrderDetail";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import "./Distribution.less";
const Search = Input.Search;
const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class Distribution extends BaseComponent {
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
                width: 210,
                render: (text, record) =>
                    this.renderText(text, record, "order_sn")
            },
            {
                title: "买家姓名",
                dataIndex: "buyer_uid",
                width: 160,
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
                width: 160,
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
                width: 100,
                render: (text, record) =>
                    this.renderText(text, record, "real_total_amount")
            },
            {
                title: "总金额",
                dataIndex: "total_amount",
                width: 100,
                render: (text, record) =>
                    this.renderText(text, record, "total_amount")
            },
            {
                title: "运费",
                dataIndex: "freight_fee",
                width: 100,
                render: (text, record) =>
                    this.renderText(text, record, "freight_fee")
            },
            {
                title: "商家收益",
                dataIndex: "seller_income",
                width: 110,
                render: (text, record) =>
                    this.renderText(text, record, "seller_income")
            },
            {
                title: "手续费",
                dataIndex: "commission",
                width: 100,
                render: (text, record) =>
                    this.renderText(text, record, "commission")
            },
            {
                title: "买家所得积分",
                dataIndex: "point",
                width: 110,
                render: (text, record) =>
                    this.renderText(text, record, "point")
            },
            {
                title: "买家所得经验",
                dataIndex: "exp",
                width: 110,
                render: (text, record) =>
                    this.renderText(text, record, "exp")
            },
            {
                title: "用户返佣合计",
                dataIndex: "commission_users",
                width: 100,
                render: (text, record) =>
                    this.renderText(text, record, "commission_users")
            },
            {
                title: "下单时间",
                dataIndex: "created_at",
                width: 200,
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            },
            {
                title: "完成时间",
                dataIndex: "updated_at",
                width: 200,
                render: (text, record) =>
                    record.status == 0 ? '' : this.renderText(text, record, "updated_at")
            },
            /**
            {
                title: "订单状态",
                dataIndex: "status",
                width: 100,
                render: (text, record) =>
                    this.renderText(
                        this.status[record.status],
                        record,
                        "status"
                    )
            },
             */
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { id, status } = record;
                    return (
                        <div className="editable-row-operations">
                            <a onClick={() => this.onDetail(record.id, 1)}>详情</a>
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
    searchStr = "";//搜索订单号
    searchUserName = "";//搜索用户名
    searchProductName = "";//搜索商品名
    dateZoom = "";//搜索时间段
    @action.bound
    handleKeyUp(key, event){
        let value = '';
        if(event && event.target && event.target.value){
            value = event.target.value;
        }
        switch(key){
            case 'order_sn':
                this.searchStr = value;
                break;
            case 'user_name':
                this.searchUserName = value;
                break;
            case 'product_name':
                this.searchProductName = value;
                break;
        }
    }
    @action.bound
    onOk(value) {
    	this.dateZoom = value;
	}
    @action.bound
    onChange(value, dateString) {
    	this.dateZoom = dateString.join('/');
	}
    @action.bound
    onDetail(id, details) {
        this.refs.orderDetail.show(id, details);
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
        Aparam[0] = 'status=' + this.store.status;
        Aparam[1] = 'order_sn=' + (this.searchStr || "");
        Aparam[2] = 'user_name=' + (this.searchUserName || "");
        Aparam[3] = 'product_name=' + (this.searchProductName || "");
        Aparam[4] = 'date_zoom=' + (this.dateZoom || "");
        Aparam[5] = 'type=2';
        window.open(url + "/admin/order/export?" + Aparam.join("&"));
    }
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "order",
                op: "index",
                mod: "admin",
                status: this.store.status,
                type: 2,
                order_sn: this.searchStr || "",
                user_name: this.searchUserName ||　"",
                product_name: this.searchProductName || "",
                date_zoom: this.dateZoom || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, status, user } = res.data;
                this.store.list = list;
                this.store.total = parseInt(count);
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
                全部状态
            </Option>
        );
        return (
            <Spin ref="spin" wrapperClassName="OrderManager" spinning={false}>
                <div className="pb10">
                	<LocaleProvider locale={zh_CN}><RangePicker onChange={this.onChange} onOk={this.onOk}/></LocaleProvider>
                    <Input type="text" placeholder="订单号" onChange ={event => this.handleKeyUp('order_sn', event)} style={{ width: 160, marginLeft:5 }}/>
                    <Input type="text" placeholder="用户名" onChange ={event => this.handleKeyUp('user_name', event)} style={{ width: 120, marginLeft:5 }}/>
                    <Input type="text" placeholder="商品名称" onChange ={event => this.handleKeyUp('product_name', event)} style={{ width: 160, marginLeft:5 }}/>
                    {statusCon.length > 0 ? (
                        <Select
                            style={{ width: 100, marginLeft:5 }}
                            onChange={this.onStatusSelect}
                            defaultValue={-1}
                        >
                            {statusCon}
                        </Select>
                    ) : null}
                    <Button type="primary" style={{ marginLeft:5 }} onClick={() =>
                        this.requestData()
                    }>查询</Button>
                    <Button type="primary" style={{ marginLeft:5 }} onClick={() =>
                        this.exportExcel()
                    }>导出</Button>
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
