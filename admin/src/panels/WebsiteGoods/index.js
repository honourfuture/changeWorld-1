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
import "./WebsiteGoods.less";
import { remove } from "lodash";
const { RangePicker } = DatePicker;
const Search = Input.Search;
const Option = Select.Option;

export default class WebsiteGoods extends BaseComponent {
    store = {
        list: [],
        total: 1
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "排序",
                width: 100,
                dataIndex: "sort",
                render: (text, record) => this.renderInput(text, record, "sort")
            },
            {
                title: "主标题",
                dataIndex: "title",
                width: 150,
                render: (text, record) =>
                    this.renderInput(text, record, "title")
            },
            // {
            //     title: "副标题",
            //     dataIndex: "sub_title",
            //     width: 150,
            //     render: (text, record) =>
            //         this.renderInput(text, record, "sub_title")
            // },
            {
                title: "产品图",
                dataIndex: "image",
                width: 120,
                render: (text, record) => this.renderImg(text, record, "image")
            },
            {
                title: "链接地址",
                dataIndex: "link",
                render: (text, record) => this.renderInput(text, record, "link")
            },
            {
                title: "启用",
                dataIndex: "enable",
                width: 100,
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
            },
            {
                title: "操作",
                width: 100,
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
                            <img
                                className="img-uploader"
                                src={Base.getImgUrl(image)}
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
                        src={Base.getImgUrl(image)}
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
            { act: "website_goods", op: "save", mod: "admin", ...itemData },
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
            {
                act: "website_goods",
                op: "save",
                mod: "admin",
                id,
                deleted: "1"
            },
            () => remove(this.store.list, item => id === item.id),
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
    //添加
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.list.unshift({
            id: 0,
            title: "",
            sub_title: "",
            editable: true,
            deleted: "0",
            enable: "1",
            sort: 0,
            link: "",
            image: ""
        });
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
                act: "website_goods",
                op: "index",
                mod: "admin",
                title: this.searchStr,
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count } = res.data;
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
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <Spin ref="spin" wrapperClassName="WebsiteGoods" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Search
                        placeholder="搜索标题"
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
