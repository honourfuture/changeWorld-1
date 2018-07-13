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
    Select
} from "antd";
import "./GiftManager.less";
import { remove } from "lodash";
const Search = Input.Search;
const Option = Select.Option;

export default class GiftManager extends BaseComponent {
    store = {
        list: [],
        positionList: [
            {
                name: "金币",
                id: "1"
            }
            // {
            //     name: "积分",
            //     id: "2"
            // }
        ],
        total: 1
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "排序",
                dataIndex: "sort",
                width: "8%",
                render: (text, record) => this.renderInput(text, record, "sort")
            },
            {
                title: "礼物名称",
                dataIndex: "title",
                width: "24%",
                render: (text, record) =>
                    this.renderInput(text, record, "title")
            },
            {
                title: "礼物图片",
                dataIndex: "img",
                width: "12%",
                render: (text, record) => this.renderImg(text, record, "img")
            },
            {
                title: "特效图片",
                dataIndex: "gif",
                width: "12%",
                render: (text, record) => this.renderImg(text, record, "gif")
            },
            {
                title: "兑换类型",
                dataIndex: "exchange_type",
                width: "12%",
                render: (text, record) =>
                    this.renderSelect(text, record, "exchange_type")
            },
            {
                title: "兑换数量",
                dataIndex: "amount",
                width: "12%",
                render: (text, record) =>
                    this.renderInput(text, record, "amount")
            },
            {
                title: "启用",
                dataIndex: "enable",
                width: "8%",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
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
    renderImg(text, record, column) {
        const { editable, img } = record;
        const loading = record[column];
        return (
            <div>
                {editable ? (
                    <Upload
                        name="field"
                        data={{ field: "field" }}
                        listType="picture-card"
                        showUploadList={false}
                        action={Global.UPLOAD_URL}
                        onChange={e =>
                            this.onUploadChange(e, record.id, column)
                        }
                    >
                        {text ? (
                            <img
                                className="img-uploader"
                                src={Base.getImgUrl(text)}
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
                        src={Base.getImgUrl(text)}
                        alt=""
                    />
                )}
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{record[column]}</div>;
    }
    renderSelect(text, record, column) {
        const value = record[column];
        const { positionList } = this.store;
        let curIndex = positionList.findIndex(item => item.id === value);
        curIndex = curIndex >= 0 ? curIndex : 0;
        return (
            <div>
                {record.editable ? (
                    <Select
                        defaultValue={value || positionList[0].id}
                        style={{ width: 120 }}
                        onChange={value =>
                            this.onEditChange(record.id, value, column)
                        }
                    >
                        {positionList.map(({ id, name }) => (
                            <Option key={id} value={id}>
                                {name}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    positionList[curIndex].name
                )}
            </div>
        );
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
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
    }
    //上传
    @action.bound
    onUploadChange(info, id, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        if (info.file.status === "uploading") {
            itemData[column] = true;
            return (this.store.list = list);
        }
        if (info.file.status === "done") {
            itemData[column] = false;
            itemData[column] = info.file.response.data.file_url;
            return (this.store.list = list);
        }
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
        itemData.exchange_type = 1;
        Base.POST(
            { act: "live_gift", op: "save", ...itemData },
            res => {
                itemData.editable = false;
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
            { act: "live_gift", op: "save", id, deleted: "1" },
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
            title: "",
            editable: true,
            deleted: "0",
            enable: "1",
            sort: 0,
            exchange_type: "",
            img: ""
        });
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
                act: "live_gift",
                op: "index",
                title: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                this.store.list = res.data;
                this.store.total = res.data.length;
                this.cacheData = res.data.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <Spin ref="spin" wrapperClassName="GiftManager" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Search
                        placeholder="搜索标题"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 130, marginLeft: 10 }}
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
