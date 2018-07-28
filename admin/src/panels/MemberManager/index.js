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
import "./MemberManager.less";
const Search = Input.Search;
const Option = Select.Option;

export default class MemberManager extends BaseComponent {
    store = {
        list: [],
        article_class: []
    };
    curData = {};
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "昵称",
                dataIndex: "nickname",
                width: 150,
                fixed: "left",
                render: (text, record) =>
                    this.renderText(text, record, "nickname")
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
                width: 150,
                render: (text, record) => this.renderText(text, record, "point")
            },
            {
                title: "头像",
                dataIndex: "header",
                width: 150,
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "余额",
                dataIndex: "balance",
                width: 150,
                render: (text, record) =>
                    this.renderText(text, record, "balance")
            },
            {
                title: "经验值",
                dataIndex: "exp",
                width: 150,
                render: (text, record) => this.renderText(text, record, "exp")
            },
            {
                title: "金币",
                dataIndex: "gold",
                width: 150,
                render: (text, record) => this.renderText(text, record, "gold")
            },
            {
                title: "主播",
                dataIndex: "anchor",
                width: 150,
                render: (text, record) =>
                    this.renderText(
                        this.anchor_status[record.anchor],
                        record,
                        "v"
                    )
            },
            // {
            //     title: "店铺",
            //     dataIndex: "seller",
            //     width: 150,
            //     render: (text, record) =>
            //         this.renderText(
            //             this.seller_status[record.seller],
            //             record,
            //             "v"
            //         )
            // },
            {
                title: "注册时间",
                dataIndex: "created_at",
                width: 180,
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            },
            {
                title: "是否猎头",
                dataIndex: "headhunter",
                width: 120,
                fixed: "right",
                render: (text, record) =>
                    this.renderSwitch(text, record, "headhunter")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: 150,
                fixed: "right",
                render: (text, record) => {
                    const { headhunter, id } = record;
                    return (
                        <div className="editable-row-operations">
                            {parseInt(headhunter) ? (
                                <span>
                                    <a
                                        onClick={() =>
                                            Base.push("HeadHuntingList", {
                                                id: id
                                            })
                                        }
                                    >
                                        猎头用户
                                    </a>
                                </span>
                            ) : null}
                        </div>
                    );
                }
            }
        ];
    }
    renderImg(text, record, column) {
        return (
            <div className="header-con">
                <img className="header" src={Base.getImgUrl(text)} alt="" />
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderSwitch(text, record, column) {
        return (
            <Switch
                checked={parseInt(record.headhunter, 10) === 1}
                onChange={value =>
                    this.onSwitch(record.id, value ? 1 : 0, column)
                }
            />
        );
    }
    //是否启用
    @action.bound
    onSwitch(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        console.log(itemData, "itemData");
        this.onSave(id);
    }
    //保存
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = this.store.list.find(item => id === item.id);
        Base.POST(
            { act: "headhunter", op: "onoff", mod: "admin", ...itemData },
            res => {
                itemData.editable = false;
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                itemData.id === 0 && (itemData.id = res.data.id);
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
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
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "user",
                op: "index",
                mod: "admin",
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
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total } = this.store;
        const showList = list.slice();
        let tableWidth = this.columns.length * 150;
        return (
            <Spin ref="spin" wrapperClassName="MemberManager" spinning={false}>
                <div className="pb10">
                    <Search
                        placeholder="搜索昵称/手机号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                </div>
                <Table
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
            </Spin>
        );
    }
}
