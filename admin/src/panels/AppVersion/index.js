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
    Select,
    Upload,
    Icon
} from "antd";
import { remove } from "lodash";
import "./AppVersion.less";
const Option = Select.Option;
const { TextArea, Search } = Input;

export default class AppVersion extends BaseComponent {
    store = {
        list: [],
        searchStr: ""
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "更新描述",
                dataIndex: "explain",
                width: "20%",
                render: (text, record) =>
                    this.renderTextArea(text, record, "explain")
            },
            {
                title: "版本名称",
                dataIndex: "version",
                width: "8%",
                render: (text, record) =>
                    this.renderInput(text, record, "version")
            },
            {
                title: "版本号",
                dataIndex: "version_alias",
                width: "8%",
                render: (text, record) =>
                    this.renderInput(text, record, "version_alias")
            },
            {
                title: "平台",
                dataIndex: "platform",
                width: "10%",
                render: (text, record) =>
                    this.renderSelect(text, record, "platform")
            },
            {
                title: "审核状态",
                dataIndex: "verify_status",
                width: "10%",
                render: (text, record) =>
                    this.renderVerifyStatus(text, record, "verify_status")
            },
            {
                title: "链接地址",
                dataIndex: "url",
                width: "25%",
                render: (text, record) => this.renderUrl(text, record, "url")
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
    renderTextArea(text, record, column) {
        const { editable } = record;
        return (
            <div>
                {editable ? (
                    <TextArea
                        rows={4}
                        // style={{ margin: "-5px 0" }}
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
    renderUrl(text, record, column) {
        const { editable, url, platform, loading } = record;
        return (
            <div>
                {editable ? (
                    parseInt(platform, 10) === 0 ? (
                        <Input
                            style={{ margin: "-5px 0" }}
                            value={text}
                            onChange={e =>
                                this.onEditChange(
                                    record.id,
                                    e.target.value,
                                    column
                                )
                            }
                        />
                    ) : (
                        <div>
                            <Upload
				                withCredentials={true}
                                name="field"
                                data={{ field: "field" }}
                                listType="picture-card"
                                showUploadList={false}
                                action={Global.UPLOAD_URL}
                                onChange={e =>
                                    this.onUploadChange(e, record.id)
                                }
                            >
                                {url ? (
                                    <div>{url}</div>
                                ) : (
                                    <div>
                                        <Icon
                                            type={loading ? "loading" : "plus"}
                                        />
                                        <div className="ant-upload-text">
                                            上传apk
                                        </div>
                                    </div>
                                )}
                            </Upload>
                        </div>
                    )
                ) : (
                    url
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
    renderVerifyStatus(text, record, column) {
        const value = parseInt(record[column], 10) || 0;
        const { verifyStatus } = this;
        return (
            <div>
                {record.editable ? (
                    <Select
                        defaultValue={value || 0}
                        style={{ width: 120 }}
                        onChange={value =>
                            this.onEditChange(record.id, value, column)
                        }
                    >
                        {verifyStatus.map((item, index) => (
                            <Option key={index} value={index}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    verifyStatus[value]
                )}
            </div>
        );
    }
    renderSelect(text, record, column) {
        const value = parseInt(record[column], 10) || 0;
        const { platform } = this;
        return (
            <div>
                {record.editable ? (
                    <Select
                        defaultValue={value || 0}
                        style={{ width: 120 }}
                        onChange={value =>
                            this.onEditChange(record.id, value, column)
                        }
                    >
                        {platform.map((item, index) => (
                            <Option key={index} value={index}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                ) : (
                    platform[value]
                )}
            </div>
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
            { act: "app_version", op: "save", mod: "admin", id, deleted: "1" },
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
            channel: "0",
            editable: true,
            deleted: "0",
            enable: "1",
            explain: "",
            platform: 0,
            verifyStatus: 0,
            url: "",
            version: "",
            version_alias: ""
        });
    }
    //搜索
    @action.bound
    onSearch(value) {
        this.store.searchStr = value;
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
            { act: "app_version", op: "save", mod: "admin", ...itemData },
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
                act: "app_version",
                op: "index",
                mod: "admin"
            },
            res => {
                const { list, platform, verifyStatus } = res.data;
                this.platform = platform;
                this.verifyStatus = verifyStatus;
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
        let { list, searchStr } = this.store;
        const showList = list.filter(item => {
            return (
                parseInt(item.deleted, 10) === 0 &&
                (!searchStr || item.version.indexOf(searchStr) !== -1)
            );
        });
        return (
            <Spin ref="spin" wrapperClassName="AppVersion" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Search
                        placeholder="搜索版本号"
                        enterButton
                        onSearch={this.onSearch}
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
