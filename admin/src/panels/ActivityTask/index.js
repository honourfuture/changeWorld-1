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
    Form
} from "antd";
import { remove } from "lodash";
import "./ActivityTask.less";

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

export default class ActivityTask extends BaseComponent {
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
                title: "活动id",
                dataIndex: "id",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.id : "",
                        record,
                        "id"
                    )
            },
            {
                title: "用户昵称",
                dataIndex: "user_id",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.user_id].nickname,
                        record,
                        "user_id"
                    )
            },
            {
                title: "当前浏览量",
                dataIndex: "views",
                render: (text, record) =>
                    this.renderText(text, record, "user_id")
            },
            {
                title: "秒/次 ",
                dataIndex: "step_times",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.step_times : "",
                        record,
                        "step_times"
                    )
            },
            {
                title: "范围随机值或固定值",
                dataIndex: "step_num",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.step_num : "",
                        record,
                        "step_num"
                    )
            },
            {
                title: "结果最大数量",
                dataIndex: "max",
                render: (text, record) =>
                    this.renderText(
                        record.params ? record.params.max : "",
                        record,
                        "max"
                    )
            },
            {
                title: "活动",
                dataIndex: "title",
                width: 200,
                render: (text, record) => this.renderText(text, record, "title")
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
            { key: "id", label: "活动id" },
            { key: "step_times", label: "秒/次" },
            { key: "step_num", label: "范围随机值或固定值" },
            { key: "max", label: "结果最大数量" }
        ];
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
                task: "activity",
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
                task: "activity",
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
        this.store.params = {};
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
                task: "activity",
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
                task: "activity",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, status, count, user } = res.data;
                this.store.list = list;
                this.user = user;
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
            <Spin ref="spin" wrapperClassName="ActivityTask" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
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
                            const { key, label } = item;
                            return (
                                <FormItem
                                    key={key}
                                    {...formItemLayout}
                                    label={label}
                                >
                                    <Input
                                        value={params[key]}
                                        onChange={e => this.onAddChange(e, key)}
                                        placeholder={`请输入${label}`}
                                    />
                                </FormItem>
                            );
                        })}
                    </Form>
                </Modal>
            </Spin>
        );
    }
}
