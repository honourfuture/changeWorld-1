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
import "./LiveTemplate.less";
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
export default class LiveTemplate extends BaseComponent {
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
                title: "秒/次",
                dataIndex: "step_times",
                render: (text, record) =>
                    this.renderText(text, record, "step_times")
            },
            {
                title: "范围随机值或固定值",
                dataIndex: "step_num",
                render: (text, record) =>
                    this.renderText(text, record, "step_num")
            },
            {
                title: "结果最大数量",
                dataIndex: "max",
                render: (text, record) => this.renderText(text, record, "max")
            },
            {
                title: "浮动范围",
                dataIndex: "range",
                render: (text, record) => this.renderText(text, record, "range")
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { key_id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <a
                                    className="ml10"
                                    onClick={() => this.onPlay(key_id)}
                                >
                                    使用模板
                                </a>
                            </span>
                            <span>
                                <a
                                    className="ml10"
                                    onClick={() => this.onEdit(key_id)}
                                >
                                    编辑
                                </a>
                            </span>
                            <span>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onDelete(key_id)}
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
            { key: "id", label: "房间id" },
            { key: "step_times", label: "秒/次" },
            { key: "step_num", label: "范围随机值或固定值" },
            { key: "max", label: "结果最大数量" },
            { key: "range", label: "浮动范围" }
        ];
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderImg(text, record, column) {
        return <img className="header" src={Base.getImgUrl(text)} alt="" />;
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
    //删除
    @action.bound
    onDelete(key_id) {
        const list = this.store.list.slice();
        remove(list, item => item.key_id === key_id);
        Base.POST(
            {
                act: "config",
                op: "save",
                mod: "admin",
                tpl_live_fans: JSON.stringify(list)
            },
            res => {
                this.store.params = {};
                this.store.isShowModal = false;
                this.store.list = list;
                message.success("删除成功");
            },
            this
        );
    }
    @action.bound
    onEdit(key_id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => key_id === item.key_id);
        this.store.params = { ...itemData };
        this.store.isShowModal = true;
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
    //使用模板
    @action.bound
    onPlay(key_id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => key_id === item.key_id);
        this.store.params = { ...itemData, isPlay: true };
        this.store.isShowModal = true;
    }
    @action.bound
    onAddSubmit() {
        const params = { ...this.store.params };
        let isTips = false;
        this.addColumns.forEach(item => {
            if (!params[item.key] && !(!params.isPlay && item.key === "id")) {
                isTips = true;
            }
        });
        if (isTips) {
            return message.error("请输入完整的任务参数");
        }
        if (params.isPlay) {
            Base.POST(
                {
                    act: "queue",
                    op: "add",
                    mod: "admin",
                    task: "live_join",
                    ...params
                },
                res => {
                    this.store.isShowModal = false;
                    Base.goBack();
                }
            );
        } else {
            const list = this.store.list.slice();
            if (!params.key_id) {
                params.key_id = new Date().getTime();
                list.unshift(params);
            } else {
                const itemData = list.find(
                    item => params.key_id === item.key_id
                );
                Object.assign(itemData, params);
            }
            console.log(list);
            Base.POST(
                {
                    act: "config",
                    op: "save",
                    mod: "admin",
                    tpl_live_fans: JSON.stringify(list)
                },
                res => {
                    this.store.params = {};
                    this.store.isShowModal = false;
                    this.store.list = list;
                    message.success("添加成功");
                },
                this
            );
        }
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        Base.GET({ act: "admin", op: "config" }, res => {
            const list = res.data.tpl_live_fans || [];
            this.store.list = list;
            this.cacheData = list.map(item => ({ ...item }));
        });
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total, isShowModal, params } = this.store;
        const showList = list.slice();
        return (
            <Spin ref="spin" wrapperClassName="LiveTemplate" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
                </div>
                <Table
                    size="small"
                    className="mt16"
                    onChange={this.onTableHandler}
                    bordered
                    dataSource={showList}
                    rowKey="key_id"
                    columns={this.columns}
                    pagination={false}
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
                            if (!params.isPlay && key === "id") {
                                return null;
                            }
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
