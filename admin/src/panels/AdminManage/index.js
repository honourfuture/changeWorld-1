import React from "react";
import { action, toJS } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {
    Table,
    Popconfirm,
    Input,
    Switch,
    Spin,
    message,
    Select,
    Upload,
    Icon,
    Button
} from "antd";
import { remove } from "lodash";
import "./AdminManage.less";
const Option = Select.Option;

export default class AdminManage extends BaseComponent {
    constructor() {
        super();
        this.store = {
            list: [],
            role: [],
            total: 1
        };
        this.columns = [
            {
                title: "ID",
                dataIndex: "id",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "名称",
                dataIndex: "account",
                render: (text, record) =>
                    this.renderInput(text, record, "account")
            },
            {
                title: "密码",
                dataIndex: "password",
                render: (text, record) =>
                    this.renderPsw(text, record, "password")
            },
            {
                title: "头像",
                dataIndex: "header",
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "身份角色",
                dataIndex: "role_id",
                render: (text, record) => {
                    if (parseInt(record.is_root)) {
                        return <div>超级管理员</div>;
                    }
                    return this.renderSelect(text, record, "role_id");
                }
            },
            {
                title: "备注",
                dataIndex: "remark",
                render: (text, record) =>
                    this.renderInput(text, record, "remark")
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
                    const { id, editable, is_root } = record;
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
                                    {!parseInt(is_root) ? (
                                        <Popconfirm
                                            title="确认删除?"
                                            okText="确定"
                                            cancelText="取消"
                                            onConfirm={() => this.onDelete(id)}
                                        >
                                            <a className="ml10 gray">删除</a>
                                        </Popconfirm>
                                    ) : null}
                                </span>
                            )}
                        </div>
                    );
                }
            }
        ];
    }
    renderImg(text, record, column) {
        const { editable, header, loading } = record;
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
                        {header ? (
                            <img
                                className="img-uploader"
                                src={Base.getImgUrl(header)}
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
                        src={Base.getImgUrl(header)}
                        alt=""
                    />
                )}
            </div>
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
            itemData.header = info.file.response.data.file_url;
            return (this.store.list = list);
        }
    }
    renderText(text, record, column) {
        return <div>{record[column]}</div>;
    }
    renderPsw(text, record, column) {
        const { editable } = record;
        return (
            <div>
                {editable ? (
                    <Input
                        style={{ margin: "-5px 0" }}
                        type={column === "sort" ? "number" : "text"}
                        onChange={e =>
                            this.onEditChange(record.id, e.target.value, column)
                        }
                    />
                ) : (
                    "******"
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
    renderSelect(text, record, column) {
        const value = record[column];
        const { role } = this.store;
        if (role.length > 0) {
            let curIndex = role.findIndex(item => item.id === value);
            curIndex = curIndex >= 0 ? curIndex : 0;
            return (
                <div>
                    {record.editable ? (
                        <Select
                            defaultValue={value}
                            style={{ width: 120 }}
                            onChange={value =>
                                this.onEditChange(record.id, value, column)
                            }
                        >
                            {role.map(({ id, name }) => (
                                <Option key={id} value={id}>
                                    {name}
                                </Option>
                            ))}
                        </Select>
                    ) : curIndex === 0 ? (
                        "未选择角色"
                    ) : (
                        role[curIndex].name
                    )}
                </div>
            );
        } else {
            return <div />;
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
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "admin", op: "save", mod: "admin", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    //取消
    @action.bound
    onCancel(id) {
        this.store.list = this.cacheData.map(item => ({ ...item }));
    }
    //保存
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData.login_account = itemData.account;
        // delete itemData.account;
        // if (this.isAdd && itemData.password == "") {
        //     return message.error("登录密码必填");
        // }
        // if (!this.isAdd) {
        //     itemData.password =
        //         itemData.password != "" ? itemData.password : "";
        // }
        Base.POST(
            { act: "admin", op: "save", mod: "admin", ...itemData },
            res => {
                itemData.editable = false;
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                itemData.id === 0 && (itemData.id = res.data.id);
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
                const verifyData = Base.getLocalData("verifyData") || {};
                if (id == verifyData.admin_id) {
                    const { account, header } = itemData;
                    Global.userInfo = { account, header };
                }
            },
            this
        );
        this.isAdd = false;
    }
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        // this.isAdd = true;
        // const { role } = this.store;
        // const role_id = role.length > 0 ? role[0].id : "";
        this.store.list.unshift({
            id: 0,
            account: "",
            password: "",
            header: "",
            role_id: "0",
            editable: true,
            deleted: "0",
            enable: "1",
            sort: 0,
            remark: ""
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
                act: "admin",
                op: "index",
                mod: "admin",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, role, count } = res.data;
                role.unshift({ id: "0", name: "请选择" });
                this.store.list = list.map(item => {
                    return { ...item, password: "" };
                });
                this.store.role = role;
                this.store.total = count;
                // this.cacheData = list.map(item => ({ ...item }));
                this.cacheData = list.map(item => {
                    return { ...item, password: "" };
                });
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        const { list, total } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <Spin ref="spin" wrapperClassName="AdminManage" spinning={false}>
                <div className="pd10">
                    <Button onClick={this.onAdd}>新增+</Button>
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
