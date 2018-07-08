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
    Upload,
    Icon,
    Select,
    DatePicker
} from "antd";
import moment from "moment";
import "./ShopCheckList.less";
import { remove } from "lodash";
const { RangePicker } = DatePicker;
const Search = Input.Search;
const Option = Select.Option;

export default class ShopCheckList extends BaseComponent {
    store = {
        list: [],
        positionList: [],
        total: 1
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "编号",
                dataIndex: "id",
                width: "8%",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "店铺名称",
                dataIndex: "nickname",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "nickname")
            },
            {
                title: "头像",
                dataIndex: "header",
                width: "10%",
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                width: "12%",
                render: (text, record) => this.renderText(text, record, "mobi")
            },
            // {
            //     title: "V认证",
            //     dataIndex: "v",
            //     width: "8%",
            //     render: (text, record) =>
            //         this.renderText(
            //             parseInt(record.v) === 1 ? "已认证" : "未认证",
            //             record,
            //             "v"
            //         )
            // },
            {
                title: "经验值",
                dataIndex: "exp",
                width: "8%",
                render: (text, record) => this.renderText(text, record, "exp")
            },
            {
                title: "简介",
                dataIndex: "summary",
                width: "19%",
                render: (text, record) =>
                    this.renderText(text, record, "summary")
            },
            {
                title: "是否返积分",
                dataIndex: "reward_point",
                render: (text, record) =>
                    this.renderSwitch(text, record, "reward_point")
            },
            {
                title: "编辑时间",
                dataIndex: "updated_at",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            }
            // {
            //     title: "操作",
            //     dataIndex: "operation",
            //     render: (text, record) => {
            //         const { status, id } = record;
            //         return (
            //             <div className="editable-row-operations">
            //                 {parseInt(status) !== 1 ? (
            //                     <span>
            //                         {parseInt(status) === 2
            //                             ? "已通过"
            //                             : "已拒绝"}
            //                     </span>
            //                 ) : (
            //                     <span>
            //                         <Popconfirm
            //                             title="确认通过?"
            //                             okText="通过"
            //                             cancelText="拒绝"
            //                             onConfirm={() => this.onCheck(id, 2)}
            //                             onCancel={() => this.onCheck(id, 3)}
            //                         >
            //                             <a className="ml10">审核</a>
            //                         </Popconfirm>
            //                     </span>
            //                 )}
            //             </div>
            //         );
            //     }
            // }
        ];
    }
    renderImg(text, record, column) {
        return (
            <div>
                <img
                    className="img-header"
                    src={Base.getImgUrl(record[column])}
                    alt=""
                />
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderSwitch(text, record, column) {
        return (
            <Switch
                checked={parseInt(record.reward_point, 10) === 1}
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
        this.onSave(id);
    }
    //保存
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = this.store.list.find(item => id === item.id);
        Base.POST(
            { act: "shop", op: "reward_point", mod: "admin", ...itemData },
            res => {
                // itemData.editable = false;
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
    @action.bound
    onCheck(id, status) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { act: "shop", op: "check", mod: "admin", status, id },
            res => {
                itemData.status = status;
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
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
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "shop",
                op: "check_list",
                mod: "admin",
                status: -1,
                keyword: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, status, count } = res.data;
                console.log(list);
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
        let { list, total } = this.store;
        const showList = list.slice();
        return (
            <Spin ref="spin" wrapperClassName="ShopCheckList" spinning={false}>
                <div className="pb10">
                    {/* <Button onClick={this.onAdd}>新增+</Button> */}
                    <Search
                        placeholder="搜索店铺名称/手机号"
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
