import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Table, Popconfirm, Spin } from "antd";
import { remove } from "lodash";
import "./PartnerAudit.less";
export default class PartnerAudit extends BaseComponent {
    store = {
        list: []
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "ID",
                dataIndex: "id"
            },
            {
                title: "主播",
                dataIndex: "anchor"
            },
            {
                title: "头像",
                dataIndex: "header",
                width: "12%",
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "昵称",
                dataIndex: "nickname"
            },
            {
                title: "余额",
                dataIndex: "balance"
            },
            {
                title: "积分",
                dataIndex: "point"
            },
            {
                title: "申请时间",
                dataIndex: "updated_at"
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { editable, id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <a onClick={() => this.onSave(id, 2)}>通过</a>
                                <Popconfirm
                                    title="确认审核不通过?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onSave(id, 0)}
                                >
                                    <a className="ml10 gray">不通过</a>
                                </Popconfirm>
                            </span>
                        </div>
                    );
                }
            }
        ];
    }
    renderImg(text, record, column) {
        const { image } = record;
        return (
            <div>
                <img
                    className="img-uploader"
                    src={Base.getImgUrl(image)}
                    alt=""
                />
            </div>
        );
    }
    //删除
    @action.bound
    onSave(id, status) {
        Base.POST(
            {
                act: "partner_city",
                op: "save",
                mod: "admin",
                id,
                check_status: status
            },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    componentDidMount() {
        Base.GET(
            { act: "partner_city", op: "index", mod: "admin" },
            res => {
                const { list } = res.data;
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    render() {
        let { list } = this.store;
        const showList = list.filter(item => item);
        return (
            <div className="PartnerAudit">
                <Table
                    className="mt16"
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={false}
                />
            </div>
        );
    }
}
