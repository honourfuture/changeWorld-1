import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Table, Input, Popconfirm, Switch, Button, Spin, message } from "antd";
import { remove } from "lodash";
import "./SpecialTag.less";
const Search = Input.Search;

class ExpandedRowRender extends BaseComponent {
    store = {
        data: {}
    };
    constructor(props) {
        super(props);
        this.store.data = props.data;
        this.cacheData = props.data.list.map(item => ({ ...item }));
        this.columns = [
            {
                title: "排序",
                dataIndex: "sort",
                render: (text, record) => this.renderInput(text, record, "sort")
            },
            {
                title: "　子标签",
                dataIndex: "name",
                render: (text, record) => this.renderInput(text, record, "name")
            },
            {
                title: "启用",
                dataIndex: "enable",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
            },
            {
                title: "更新时间",
                dataIndex: "updated_at",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
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
                checked={parseInt(record.enable, 10) === 1}
                onChange={value =>
                    this.onSwitch(record.id, value ? 1 : 0, column)
                }
            />
        );
    }
    //是否启用
    @action.bound
    onSwitch(id, value, column) {
        const list = this.store.data.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.onSave(id);
    }
    //内容编辑
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.data.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.data.list = list;
    }
    //保存
    @action.bound
    onSave(id) {
        const list = this.store.data.list.slice();
        const itemData = this.store.data.list.find(item => id === item.id);
        Base.POST(
            {
                act: "album_tag",
                op: "save",
                ...itemData,
                sort: parseInt(itemData.sort, 10)
            },
            res => {
                itemData.editable = false;
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                itemData.id === 0 && (itemData.id = res.data.id);
                this.store.data.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    //取消
    @action.bound
    onCancel(id) {
        this.store.data.list = this.cacheData.map(item => ({ ...item }));
    }
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "album_tag", op: "save", id, deleted: "1" },
            () => remove(this.store.data.list, item => id === item.id),
            this
        );
    }
    componentDidMount() {}
    render() {
        const { list } = this.store.data;
        return (
            <Table
                className="sub-tag"
                columns={this.columns}
                dataSource={list.slice()}
                rowKey="id"
                pagination={false}
            />
        );
    }
}

export default class SpecialTag extends BaseComponent {
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
                render: (text, record) => this.renderInput(text, record, "sort")
            },
            {
                title: "专辑标签",
                dataIndex: "name",
                render: (text, record) => this.renderInput(text, record, "name")
            },
            {
                title: "启用",
                dataIndex: "enable",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
            },
            {
                title: "更新时间",
                dataIndex: "updated_at",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
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
                                    </a>
                                    <a
                                        className="ml10"
                                        onClick={() => this.onAddSub(id)}
                                    >
                                        添加子标签
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
                checked={parseInt(record.enable, 10) === 1}
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
    //内容编辑
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
        const list = this.store.list.slice();
        const itemData = this.store.list.find(item => id === item.id);
        Base.POST(
            {
                act: "album_tag",
                op: "save",
                ...itemData,
                sort: parseInt(itemData.sort, 10)
            },
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
            { act: "album_tag", op: "save", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    //添加子项
    @action.bound
    onAddSub(id) {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        const data = this.store.list.find(
            item => parseInt(item.id) === parseInt(id)
        );
        if (data.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        if (data && data.id) {
            data.list.unshift({
                id: 0,
                name: "",
                editable: true,
                deleted: "0",
                enable: "1",
                sort: 0,
                pid: id
            });
        }
        console.log(data);
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
            editable: true,
            deleted: "0",
            enable: "1",
            list: [],
            sort: 0
        });
    }
    //搜索
    @action.bound
    onSearch(e) {
        this.store.searchStr = e.target.value;
    }
    componentDidMount() {
        Base.GET({ act: "album_tag", op: "index" }, res => {
            const list = [];
            for (const key in res.data) {
                if (res.data.hasOwnProperty(key)) {
                    const item = res.data[key];
                    list.push(item);
                }
            }
            this.store.list = list;
            this.cacheData = list.map(item => ({ ...item }));
        });
    }
    render() {
        let { list, searchStr } = this.store;
        const showList = list.filter(item => {
            return (
                parseInt(item.deleted, 10) === 0 &&
                (!searchStr || item.name.indexOf(searchStr) !== -1)
            );
        });
        console.log(list);
        return (
            <Spin ref="spin" wrapperClassName="SpecialTag" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Search
                        placeholder="搜索分类名称"
                        onChange={this.onSearch}
                        style={{ width: 130, marginLeft: 10 }}
                    />
                </div>
                <Table
                    className="mt16"
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    expandedRowRender={data => (
                        <ExpandedRowRender data={data} />
                    )}
                    pagination={{ hideOnSinglePage: true }}
                />
            </Spin>
        );
    }
}
