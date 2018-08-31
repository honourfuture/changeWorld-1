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
    Form,
    Modal,
    Carousel
} from "antd";
import { remove } from "lodash";
import { OrderDetail } from "../../components/OrderDetail";
import "./EvaluateMananger.less";
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

export default class EvaluateMananger extends BaseComponent {
    store = {
        list: [],
        imgList: []
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn",
                render: (text, record) =>
                    this.renderText(text, record, "order_sn")
            },
            {
                title: "买家姓名",
                dataIndex: "user_id",
                render: (text, record) =>
                    this.renderText(this.user[text].nickname, record, "user_id")
            },
            {
                title: "卖家姓名",
                dataIndex: "seller_uid",
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
                title: "评价时间",
                dataIndex: "created_at",
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            },
            {
                title: "评价内容",
                dataIndex: "remark",
                width: 300,
                render: (text, record) =>
                    this.renderText(text, record, "remark")
            },
            {
                title: "评价图片",
                dataIndex: "photos",
                render: (text, record) =>
                    this.renderPhotos(text, record, "photos")
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { editable, id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onDelete(id)}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        </div>
                    );
                }
            }
        ];
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderPhotos(text, record, column) {
        const photos = text ? JSON.parse(text) : [];
        if (photos.length > 0) {
            return (
                <div
                    onClick={() => this.onToggleModal(record.id)}
                    style={{ textAlign: "center" }}
                >
                    <img
                        className="thumbnail"
                        src={Base.getImgUrl(photos[0])}
                        alt=""
                    />
                    <div className="thumbnail-label">点击查看大图</div>
                </div>
            );
        }
        return <div>无评价图片</div>;
    }
    onDelete(id) {
        Base.POST(
            { act: "order_evaluate", op: "del", mod: "admin", id },
            res => {
                remove(this.store.list, item => id === item.id);
            }
        );
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
    onToggleModal(id) {
        if (id) {
            const itemData = this.store.list.find(item => item.id === id);
            this.store.imgList = JSON.parse(itemData.photos);
        } else {
            this.store.imgList = [];
        }
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
                act: "order_evaluate",
                op: "index",
                mod: "admin",
                order_sn: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, user, order } = res.data;
                this.user = user;
                this.order = order;
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total, imgList } = this.store;
        const showList = list.slice();
        return (
            <Spin
                ref="spin"
                wrapperClassName="EvaluateMananger"
                spinning={false}
            >
                {/* <div className="pb10">
                    <Search
                        placeholder="搜索订单号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 160, marginRight: 10 }}
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
                {imgList.length > 0 ? (
                    <Modal
                        className="EvaluateManangerModal"
                        title="评价图片"
                        visible={!!imgList.length}
                        closable={false}
                        onCancel={() => this.onToggleModal()}
                        footer={[
                            <Button
                                key="submit"
                                type="primary"
                                onClick={() => this.onToggleModal()}
                            >
                                确认
                            </Button>
                        ]}
                    >
                        <Carousel autoplay={false}>
                            {imgList.map((item, index) => {
                                return (
                                    <img
                                        key={index}
                                        src={Base.getImgUrl(item)}
                                        alt=""
                                    />
                                );
                            })}
                        </Carousel>
                    </Modal>
                ) : null}
            </Spin>
        );
    }
}
