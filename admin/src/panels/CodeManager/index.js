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
import "./CodeManager.less";
import { remove } from "lodash";
const { RangePicker } = DatePicker;
const Search = Input.Search;
const Option = Select.Option;

export default class CodeManager extends BaseComponent {
    store = {
        list: [],
        positionList: [],
        total: 1,
        status: ""
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
                title: "靓号",
                dataIndex: "pretty_id",
                width: "10%",
                render: (text, record) =>
                    this.renderPrettyId(text, record, "pretty_id")
            },
            {
                title: "更新时间",
                dataIndex: "updated_at",
                width: "15%",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
            {
                title: "购买人",
                dataIndex: "buyer_id",
                width: "10%",
                render: (text, record) =>
                    this.renderBuyer(text, record, "buyer_id")
            },
            {
                title: "销售价格",
                dataIndex: "price",
                width: "12%",
                render: (text, record) =>
                    this.renderInput(text, record, "price")
            },
            {
                title: "积分价格",
                dataIndex: "point",
                width: "12%",
                render: (text, record) =>
            		this.renderText(text, record, "point")
            },
            {
                title: "启用",
                dataIndex: "enable",
                width: "8%",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
            },
            {
                title: "是否靓号",
                dataIndex: "is_pretty",
                width: "8%",
                render: (text, record) =>
                    this.renderSwitch(text, record, "is_pretty")
            },
            {
                title: "销售状态",
                dataIndex: "status",
                width: 100,
                render: (text, record) =>
                    this.renderText(this.status[text], record, "status")
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
    renderPrettyId(text, record, column) {
        const { id, editable } = record;
        return (
            <div>
                {editable && parseInt(id, 10) === 0 ? (
                    <Input
                        style={{ margin: "-5px 0" }}
                        value={text}
                        type={
                            column === "sort" ||
                            column === "pretty_id" ||
                            column === "price"
                                ? "number"
                                : "text"
                        }
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
    renderBuyer(text, record, column) {
        const buyer_id = record[column];
        const { user } = this.store;
        const nickname = (user[buyer_id] || {}).nickname || "";
        return <div>{nickname}</div>;
    }
    renderImg(text, record, column) {
        const { editable, image, loading } = record;
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
                        {image ? (
                            <img className="img-uploader" src={image} alt="" />
                        ) : (
                            <div>
                                <Icon type={loading ? "loading" : "plus"} />
                                <div className="ant-upload-text">上传</div>
                            </div>
                        )}
                    </Upload>
                ) : (
                    <img className="img-uploader" src={image} alt="" />
                )}
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
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
    renderDate(text, record, column) {
        let { editable, start_time, end_time } = record;
        const formatStr = "YYYY-MM-DD";
        start_time = start_time * 1000;
        end_time = end_time * 1000;
        return (
            <div>
                {editable ? (
                    <RangePicker
                        defaultValue={[moment(start_time), moment(end_time)]}
                        format={formatStr}
                        onChange={e => this.onDateChange(e, record.id)}
                    />
                ) : (
                    <div>
                        {moment(start_time).format(formatStr)} 至{" "}
                        {moment(end_time).format(formatStr)}
                    </div>
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
                        type={
                            column === "sort" ||
                            column === "pretty_id" ||
                            column === "price"
                                ? "number"
                                : "text"
                        }
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
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
    }
    //日期范围选择
    @action.bound
    onDateChange(e, id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData.start_time = e[0].unix();
        itemData.end_time = e[1].unix();
        this.store.list = list;
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
            itemData.image = info.file.response.data.file_url;
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
        Base.POST(
            { act: "pretty", op: "save", mod: "admin", ...itemData },
            res => {
                itemData.editable = false;
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                itemData.id === 0 && (itemData.id = res.data.id);
                itemData.price = Base.getNumFormat(itemData.price);
                itemData.point = res.data.point;
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
            { act: "pretty", op: "save", mod: "admin", id, deleted: "1" },
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
            pretty_id: "",
            editable: true,
            deleted: "0",
            enable: "1",
            sort: 0,
            price: 0,
            is_pretty: "0"
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
                act: "pretty",
                op: "index",
                mod: "admin",
                status: this.store.status,
                pretty_id: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { user, pretty, status } = res.data;
                this.store.list = pretty.list;
                this.store.user = user;
                this.store.total = pretty.count;
                this.status = status;
                this.cacheData = pretty.list.map(item => ({ ...item }));
            },
            this
        );
    }
    @action.bound
    onStatusSelect(e) {
        this.current = 1;
        this.store.status = e;
        this.requestData();
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        const { status = {} } = this;
        const statusCon = [];
        for (const key in status) {
            if (status.hasOwnProperty(key)) {
                const item = status[key];
                statusCon.push(
                    <Option value={key} key={key}>
                        {item}
                    </Option>
                );
            }
        }
        statusCon.unshift(
            <Option value={-1} key={-1}>
                全部
            </Option>
        );
        return (
            <Spin ref="spin" wrapperClassName="CodeManager" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Search
                        placeholder="搜索靓号"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                    {statusCon.length > 0 ? (
                        <Select
                            style={{ marginLeft: 10 }}
                            onChange={this.onStatusSelect}
                            defaultValue={-1}
                        >
                            {statusCon}
                        </Select>
                    ) : null}
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
