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
import "./AudioManager.less";
const Search = Input.Search;
const Option = Select.Option;

export default class AudioManager extends BaseComponent {
    store = {
        list: [],
        article_class: []
    };
    curData = {};
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "编号",
                dataIndex: "id",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "昵称",
                dataIndex: "nickname",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.anchor_uid].nickname,
                        record,
                        "nickname"
                    )
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.anchor_uid].mobi,
                        record,
                        "mobi"
                    )
            },
            {
                title: "标题",
                dataIndex: "title",
                width: 150,
                render: (text, record) => this.renderText(text, record, "title")
            },
            {
                title: "封面",
                dataIndex: "cover_image",
                render: (text, record) =>
                    this.renderImg(text, record, "cover_image")
            },
            {
                title: "价格",
                dataIndex: "price",
                render: (text, record) => this.renderText(text, record, "price")
            },
            {
                title: "音频地址",
                dataIndex: "video_url",
                width: 150,
                render: (text, record) =>
                    this.renderText(text, record, "video_url")
            },
            {
                title: "播放量",
                dataIndex: "play_times",
                render: (text, record) =>
                    this.renderText(text, record, "play_times")
            },
            {
                title: "创建时间",
                dataIndex: "created_at",
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                // width: 150,
                // fixed: "right",
                render: (text, record) => {
                    const { id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <a
                                    onClick={() =>
                                        Base.push("/robot/AudioComment", {
                                            id
                                        })
                                    }
                                >
                                    评论任务
                                </a>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onDelete(id)}
                                >
                                    <a className="ml10 gray">删除</a>
                                </Popconfirm>
                            </span>
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
    // //是否启用
    // @action.bound
    // onSwitch(id, value, column) {
    //     const list = this.store.list.slice();
    //     const itemData = list.find(item => id === item.id);
    //     itemData[column] = value;
    //     console.log(itemData, "itemData");
    //     this.onSave(id);
    // }
    // //保存
    // @action.bound
    // onSave(id) {
    //     const list = this.store.list.slice();
    //     const itemData = this.store.list.find(item => id === item.id);
    //     Base.POST(
    //         { act: "headhunter", op: "onoff", mod: "admin", ...itemData },
    //         res => {
    //             itemData.editable = false;
    //             itemData.updated_at = Base.getTimeFormat(
    //                 new Date().getTime() / 1000,
    //                 2
    //             );
    //             itemData.id === 0 && (itemData.id = res.data.id);
    //             this.store.list = list;
    //             this.cacheData = list.map(item => ({ ...item }));
    //         },
    //         this
    //     );
    // }
    //搜索
    searchType = ""; //搜索类型
    searchStr = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
        this.requestData();
    }
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "live_audio", op: "save", mod: "user", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
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
                act: "live_audio",
                op: "index",
                mod: "user",
                type: this.searchType || "uid",
                keyword: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, user } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
                this.user = user;
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
            <Spin ref="spin" wrapperClassName="AudioManager" spinning={false}>
                <div className="pb10">
                    <Select
                        defaultValue={"uid"}
                        onChange={value => (this.searchType = value)}
                    >
                        <Option value="uid">{"主播ID/靓号"}</Option>
                        <Option value="title">{"标题"}</Option>
                    </Select>
                    <Search
                        placeholder="搜索主播ID/靓号/标题"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                </div>
                <Table
                    size="small"
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
