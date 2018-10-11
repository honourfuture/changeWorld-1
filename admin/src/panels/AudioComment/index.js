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
    Modal,
    Form,
    Upload,
    Icon
} from "antd";
import "./AudioComment.less";
import { remove } from "lodash";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
export default class AudioComment extends BaseComponent {
    store = {
        list: [],
        total: 1,
        isShowModal: false,
        params: {}
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "音频id",
                dataIndex: "id",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.id : "",
                        record,
                        "id"
                    )
            },
            {
                title: "当前评论数",
                dataIndex: "views",
                render: (text, record) => this.renderText(text, record, "views")
            },
            {
                title: "音频名称",
                dataIndex: "title",
                width: 150,
                render: (text, record) => this.renderText(text, record, "title")
            },
            {
                title: "音频图片",
                dataIndex: "cover_image",
                render: (text, record) =>
                    this.renderImg(text, record, "cover_image")
            },
            {
                title: "主播昵称",
                dataIndex: "anchor_uid",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.anchor_uid].nickname,
                        record,
                        "anchor_uid"
                    )
            },
            {
                title: "多少秒内评论",
                dataIndex: "step_times",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.step_times : "",
                        record,
                        "step_times"
                    )
            },
            {
                title: "单次评论数",
                dataIndex: "step_num",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.step_num : "",
                        record,
                        "step_num"
                    )
            },
            {
                title: "本次任务总评论数",
                dataIndex: "max",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.max : "",
                        record,
                        "max"
                    )
            },
            {
                title: "文件名称",
                dataIndex: "origin_filename",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.origin_filename : "",
                        record,
                        "origin_filename"
                    )
            },
            {
                title: "任务状态",
                dataIndex: "status",
                render: (text, record) =>
                    this.renderText(this.status[text], record, "status")
            },
            {
                title: "暂停/启动",
                dataIndex: "enable",
                render: (text, record) => {
                    const { id, status } = record;
                    let btns = null;
                    if (parseInt(status) === 0 || parseInt(status) === 1) {
                        btns = (
                            <span>
                                <Popconfirm
                                    title="确认暂停?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onEnable(id, "stop")}
                                >
                                    <a className="ml10 gray">暂停</a>
                                </Popconfirm>
                            </span>
                        );
                    } else if (
                        parseInt(status) === 3 ||
                        parseInt(status) === 4 ||
                        parseInt(status) === 5
                    ) {
                        btns = (
                            <span>
                                <Popconfirm
                                    title="确认启动?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onEnable(id, "start")}
                                >
                                    <a className="ml10">启动</a>
                                </Popconfirm>
                            </span>
                        );
                    }
                    return (
                        <div className="editable-row-operations">{btns}</div>
                    );
                }
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onDelete(id)}
                                >
                                    <a className="ml10 gray">删除</a>
                                </Popconfirm>
                            </span>
                        </div>
                    );
                }
            }
        ];
        this.addColumns = [
            { key: "id", label: "音频id" },
            { key: "step_times", label: "多少秒内评论" },
            { key: "step_num", label: "单次评论数" },
            { key: "max", label: "本次任务总评论数" },
            {
                key: "filename",
                label: "评论内容",
                render: value => this.renderUploadTxt(value)
            }
        ];
    }
    @action.bound
    onUploadChange(info) {
        if (info.file.status === "done" || info.file.status === "removed") {
            const { fileList } = info;
            console.log(fileList[0]);
            this.store.params =
                fileList.length > 0
                    ? {
                          ...this.store.params,
                          filename: fileList[0].response.data.file_url,
                          origin_filename: fileList[0].name
                      }
                    : {
                          ...this.store.params,
                          filename: "",
                          origin_filename: ""
                      };
        }
    }
    renderUploadTxt(value) {
        return (
            <Upload
                name="field"
                data={{ field: "field" }}
                action={Global.UPLOAD_URL}
                onChange={e => this.onUploadChange(e)}
            >
                {value ? null : (
                    <Button>
                        <Icon type="upload" /> 点击上传
                    </Button>
                )}
            </Upload>
        );
    }
    renderImg(text, record, column) {
        return (
            <img
                style={{ width: 100, height: 100 }}
                src={Base.getImgUrl(text)}
                alt=""
            />
        );
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
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
    onEnable(id, op) {
        Base.POST(
            {
                act: "queue",
                op,
                mod: "admin",
                task: "audio_comment",
                id
            },
            () => {
                // this.current = 1;
                this.requestData();
            },
            this
        );
    }
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            {
                act: "queue",
                op: "del",
                mod: "admin",
                task: "audio_comment",
                id
            },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    @action.bound
    onAddChange(e, type) {
        this.store.params = { ...this.store.params, [type]: e.target.value };
    }
    //添加
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.params = { id: Base.getPageParams("id") || "" };
        this.store.isShowModal = true;
    }
    @action.bound
    onAddSubmit() {
        const params = { ...this.store.params };
        let isTips = false;
        this.addColumns.forEach(item => {
            if (!params[item.key]) {
                isTips = true;
            }
        });
        if (isTips) {
            return message.error("请输入完整的任务参数");
        }
        Base.POST(
            {
                act: "queue",
                op: "add",
                mod: "admin",
                task: "audio_comment",
                ...params
            },
            res => {
                // this.current = 1;
                this.requestData();
                this.store.isShowModal = false;
            }
        );
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
                act: "queue",
                op: "index",
                mod: "admin",
                task: "audio_comment",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, status, count, user } = res.data;
                this.user = user;
                this.store.list = list;
                this.status = status;
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
        let { list, total, isShowModal, params } = this.store;
        const showList = list.slice();
        return (
            <Spin ref="spin" wrapperClassName="AudioComment" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                    <Button onClick={Base.goBack} style={{ float: "right" }}>
                        返回
                    </Button>
                </div>
                <Table
                    size="small"
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
                <Modal
                    visible={isShowModal}
                    title="添加任务"
                    closable={false}
                    okText="确定"
                    cancelText="取消"
                    onOk={this.onAddSubmit}
                    onCancel={action(() => (this.store.isShowModal = false))}
                >
                    <Form>
                        {this.addColumns.map((item, index) => {
                            const { key, label, render } = item;
                            const el = render ? (
                                render(params[key])
                            ) : (
                                <Input
                                    value={params[key]}
                                    onChange={e => this.onAddChange(e, key)}
                                    placeholder={`请输入${label}`}
                                />
                            );
                            return (
                                <FormItem
                                    key={key}
                                    {...formItemLayout}
                                    label={label}
                                >
                                    {el}
                                </FormItem>
                            );
                        })}
                    </Form>
                </Modal>
            </Spin>
        );
    }
}
