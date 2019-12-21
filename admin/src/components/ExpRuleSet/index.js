import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {
    Table,
    Input,
    Popconfirm,
    Switch,
    Button,
    message,
    Upload,
    Icon
} from "antd";
import "./ExpRuleSet.less";
import { remove } from "lodash";

export class ExpRuleSet extends BaseComponent {
    store = {
        list: []
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "名称",
                dataIndex: "show_name",
                render: (text, record) =>
                this.renderInput(text, record, "show_name")
            },
            
            {
                title: "内部名称",
                dataIndex: "name",
                render: (text, record) =>
                this.renderInput(text, record, "name")
            },
            {
                title: "单次值",
                dataIndex: "value",
                render: (text, record) =>
                    this.renderInput(text, record, "value")
            },
            {
                title: "日限额",
                dataIndex: "days_limit",
                render: (text, record) =>
                    this.renderInput(text, record, "days_limit")
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
                                    {/* <Popconfirm
                                        title="确认删除?"
                                        okText="确定"
                                        cancelText="取消"
                                        onConfirm={() => this.onDelete(id)}
                                    >
                                        <a className="ml10 gray">删除</a>
                                    </Popconfirm> */}
                                </span>
                            )}
                        </div>
                    );
                }
            }
        ];
    }
    renderImg(text, record, column) {
        const { editable, grade_logo, loading } = record;
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
                        {grade_logo ? (
                            <img
                                className="img-uploader"
                                src={grade_logo}
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
                        src={`${Global.RES_URL}${grade_logo}`}
                        alt=""
                    />
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
            itemData.grade_logo = info.file.response.data.file_url;
            return (this.store.list = list);
        }
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
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData.editable = false;
        Base.POST(
            { act: "grade_rule", op: "save", mod: "admin", ...itemData },
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
            { act: "grade_rule", op: "save", mod: "admin", id, deleted: "1" },
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
            id: "",
            grade_name: "",
            grade_demand: "",
            grade_logo: "",
            editable: true,
            deleted: "0",
            enable: "1"
        });
    }
    @action.bound
    requestData() {
        Base.POST(
            {
                act: "grade_rule",
                op: "index",
                mod: "admin",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                this.store.list = res.data;
                this.cacheData = res.data.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <div className="ExpLvSet">
                <Button onClick={this.onAdd}>新增+</Button>
                <Table
                    className="mt16"
                    bordered
                    onChange={this.onTableHandler}
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={false}
                />
            </div>
        );
    }
}
