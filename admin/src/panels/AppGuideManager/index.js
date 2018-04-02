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
import "./AppGuideManager.less";

export default class AppGuideManager extends BaseComponent {
    store = {
        list: []
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
                title: "图片",
                dataIndex: "url",
                width: "40%",
                render: (text, record) => this.renderImg(text, record, "url")
            },
            {
                title: "更新时间",
                dataIndex: "updated_at",
                width: "16%",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { id, editable } = record;
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
    renderImg(text, record, column) {
        const { url, loading, editable } = record;
        return (
            <div>
                {editable ? (
                    <Upload
                        name="field"
                        data={{ field: "field" }}
                        listType="picture-card"
                        showUploadList={false}
                        action={Global.UPLOAD_URL}
                        onChange={e => this.onUploadChange(e, record.id)}
                    >
                        {url ? (
                            loading ? (
                                <Icon type="loading" />
                            ) : (
                                <img
                                    className="guide-img"
                                    src={Base.getImgUrl(url)}
                                    alt=""
                                />
                            )
                        ) : (
                            <div>
                                <Icon type={loading ? "loading" : "plus"} />
                                <div className="ant-upload-text">上传</div>
                            </div>
                        )}
                    </Upload>
                ) : (
                    <img
                        className="guide-img"
                        src={Base.getImgUrl(url)}
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
                checked={parseInt(record.enable, 10) === 1}
                onChange={value =>
                    this.onSwitch(record.id, value ? 1 : 0, column)
                }
            />
        );
    }
    @action.bound
    onUploadChange(info, id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        if (info.file.status === "uploading") {
            itemData.loading = true;
            return (this.store.list = list);
        } else if (info.file.status === "done") {
            itemData.loading = false;
            itemData.url = info.file.response.data.file_url;
            return (this.store.list = list);
        }
    }
    //内容编辑
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
    }
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "app_map", op: "save", mod: "admin", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    //取消
    @action.bound
    onCancel(id) {
        this.store.list = this.cacheData.map(item => ({ ...item }));
    }
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.list.unshift({
            id: 0,
            sort: "0",
            editable: true,
            deleted: "0",
            url: ""
        });
    }
    //设置内容
    @action.bound
    onCompleteEdit(content, id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData.content = content;
        this.onSave(id);
    }
    //保存
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { act: "app_map", op: "save", mod: "admin", ...itemData },
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
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "app_map",
                op: "index",
                mod: "admin"
            },
            res => {
                const { list } = res.data;
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list } = this.store;
        const showList = list.slice();
        return (
            <Spin
                ref="spin"
                wrapperClassName="AppGuideManager"
                spinning={false}
            >
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
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
