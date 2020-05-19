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
    Icon
} from "antd";
import { remove } from "lodash";
import "./BankManager.less";
const Search = Input.Search;

export default class BankManager extends BaseComponent {
    store = {
        list: [],
        searchStr: ""
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "排序",
                dataIndex: "sort",
                width: "10%",
                render: (text, record) => this.renderInput(text, record, "sort")
            },
            {
                title: "图标",
                dataIndex: "icon",
                width: "10%",
                render: (text, record) => this.renderImg(text, record, "icon")
            },
            {
                title: "标题",
                dataIndex: "name",
                width: "10%",
                render: (text, record) => this.renderInput(text, record, "name")
            },
            {
                title: "拼音",
                dataIndex: "pinyin",
                width: "10%",
                render: (text, record) =>
                    this.renderInput(text, record, "pinyin")
            },
            {
                title: "首字母",
                dataIndex: "first_letter",
                width: "8%",
                render: (text, record) =>
                    this.renderInput(text, record, "first_letter")
            },
            {
                title: "颜色",
                dataIndex: "color",
                width: "10%",
                render: (text, record) =>
                    this.renderInput(text, record, "color")
            },
            {
                title: "启用",
                dataIndex: "enable",
                width: "10%",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
            },
            {
                title: "热门",
                dataIndex: "is_hot",
                width: "10%",
                render: (text, record) =>
                    this.renderSwitch(text, record, "is_hot")
            },
            // {
            //     title: "更新时间",
            //     dataIndex: "updated_at",
            //     width: "20%",
            //     render: (text, record) =>
            //         this.renderText(text, record, "updated_at")
            // },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { editable, id } = record;
                    return (
                        <div className="editable-row-operations">
                            {editable ? (
                                <span>
                                    <a onClick={() => this.onSave(id)}>保存</a>
                                    <a
                                        className="ml10 gray"
                                        onClick={() => this.onCancel(id)}
                                    >
                                        取消
                                    </a>
                                </span>
                            ) : (
                                <span>
                                    <a
                                        onClick={() =>
                                            this.onEditChange(
                                                id,
                                                true,
                                                "editable"
                                            )
                                        }
                                    >
                                        编辑
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
                            )}
                        </div>
                    );
                }
            }
        ];
    }
    //上传
    @action.bound
    onUploadChange(info, id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        if (info.file.status === "uploading") {
            itemData.loading = true;
            return (this.store.list = list);
        }
        if (info.file.status === "done") {
            itemData.loading = false;
            itemData.icon = info.file.response.data.file_url;
            return (this.store.list = list);
        }
    }
    renderImg(text, record, column) {
        const { editable, icon, loading } = record;
        return (
            <div>
                {editable ? (
                    <Upload
                        withCredentials={true}
                        name="field"
                        data={{ field: "field" }}
                        listType="picture-card"
                        showUploadList={false}
                        action={Global.UPLOAD_URL}
                        onChange={e => this.onUploadChange(e, record.id)}
                    >
                        {icon ? (
                            <img
                                className="img-uploader"
                                src={Base.getImgUrl(icon)}
                                alt=""
                            />
                        ) : (
                            <div>
                                <Icon type={loading ? "loading" : "plus"} />
                                <div className="ant-upload-text">上传</div>
                            </div>
                        )}
                    </Upload>
                ) : (
                    <img
                        className="img-uploader"
                        src={Base.getImgUrl(icon)}
                        alt=""
                    />
                )}
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{record[column]}</div>;
    }
    renderInput(text, record, column) {
        const { editable } = record;
        return (
            <div>
                {editable ? (
                    <Input
                        style={{ margin: "-5px 0" }}
                        value={text}
                        type={column === "sort" ? "number" : "text"}
                        onChange={e =>
                            this.onEditChange(record.id, e.target.value, column)
                        }
                    />
                ) : (
                    text
                )}
            </div>
        );
    }
    renderSwitch(text, record, column) {
        return (
            <Switch
                checked={parseInt(record[column], 10) === 1}
                onChange={value =>
                    this.onSwitch(record.id, value ? 1 : 0, column)
                }
            />
        );
    }
    //编辑
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
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
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { act: "bank", op: "save", ...itemData },
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
    //取消
    @action.bound
    onCancel(id) {
        this.store.list = this.cacheData.map(item => ({ ...item }));
    }
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "bank", op: "save", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    //添加
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.list.unshift({
            id: 0,
            name: "",
            sort: 0,
            is_hot: false,
            pinyin: "",
            first_letter: "",
            color: "",
            icon: "",
            editable: true,
            deleted: "0",
            enable: "1"
        });
    }
    //搜索
    @action.bound
    onSearch(e) {
        this.store.searchStr = e.target.value;
    }
    componentDidMount() {
        Base.GET(
            { act: "bank", op: "index" },
            res => {
                this.store.list = res.data;
                this.cacheData = res.data.map(item => ({ ...item }));
            },
            this
        );
    }
    render() {
        let { list, searchStr } = this.store;
        const showList = list.filter(item => {
            return (
                parseInt(item.deleted, 10) === 0 &&
                (!searchStr || item.name.indexOf(searchStr) !== -1)
            );
        });
        return (
            <Spin ref="spin" wrapperClassName="BankManager" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Search
                        placeholder="搜索标题"
                        onChange={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                </div>
                <Table
                    className="mt16"
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={{ hideOnSinglePage: true }}
                />
            </Spin>
        );
    }
}
