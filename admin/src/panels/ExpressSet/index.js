import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Table, Button, Input, Popconfirm, Switch, Spin, message } from "antd";
import { remove } from "lodash";
import "./ExpressSet.less";

export default class ExpressSet extends BaseComponent {
    store = {
        list: []
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "sort",
                dataIndex: "sort",
                render: (text, record) => this.renderInput(text, record, "sort")
            },
            {
                title: "快递公司",
                dataIndex: "name",
                render: (text, record) => this.renderInput(text, record, "name")
            },
            {
                title: "拼音",
                dataIndex: "pinyin",
                render: (text, record) =>
                    this.renderInput(text, record, "pinyin")
            },
            {
                title: "快递公司代码",
                dataIndex: "com",
                render: (text, record) => this.renderInput(text, record, "com")
            },
            {
                title: "状态",
                dataIndex: "enable",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
            },
            {
                title: "设置常用",
                dataIndex: "status",
                render: (text, record) =>
                    this.renderSwitch(text, record, "status")
            },
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
                                    </a>&nbsp;&nbsp;
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
        const { id, enable, status } = record;
        let checkVal = column === "enable" ? enable : status;
        return (
            <Switch
                checked={parseInt(checkVal, 10) === 1}
                onChange={value => this.onSwitch(id, value ? 1 : 0, column)}
            />
        );
    }
    //添加
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.list.unshift({
            id: "",
            sort: "0",
            name: "",
            pinyin: "",
            com: "",
            editable: true,
            deleted: "0",
            enable: "1",
            status: "1"
        });
    }
    //编辑
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
    }
    //保存
    @action.bound
    onSave(id) {
        console.log(id);
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        console.log(itemData);
        itemData.editable = false;
        Base.POST(
            { act: "express", op: "save", ...itemData },
            res => {
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
    //是否启用
    @action.bound
    onSwitch(id, value, column) {
        console.log(column, "111111111");
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.onSave(id);
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
            { act: "express", op: "save", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    componentDidMount() {
        Base.POST(
            { act: "express", op: "index" },
            res => {
                this.store.list = res.data;
                this.cacheData = res.data.map(item => ({ ...item }));
            },
            this
        );
    }
    render() {
        const { list } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <Spin ref="spin" spinning={false} className="ExpressSet">
                <Button onClick={this.onAdd}>新增+</Button>
                <Table
                    className="mt16"
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={false}
                />
            </Spin>
        );
    }
}
