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
    Modal,
    Form
} from "antd";
import { remove } from "lodash";
import { EditorModal } from "../../components/EditorModal";
import "./Verify.less";
const Search = Input.Search;
const Option = Select.Option;
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

export default class Verify extends BaseComponent {
    store = {
        list: [],
        status: -1,
        curData: null,
        preImageUrl: ""
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "编号",
                dataIndex: "user_id",
                render: (text, record) =>
                    this.renderText(text, record, "user_id")
            },
            {
                title: "现等级",
                dataIndex: "from_name",
                render: (text, record) => this.renderText(text, record, "fans")
            },
            {
                title: "申请等级",
                dataIndex: "to_name",
                render: (text, record) =>
                    this.renderText(text, record, "pretty_id")
            },
            {
                title: "昵称",
                dataIndex: "nickname",
                render: (text, record) =>
                    this.renderText(text, record, "nickname")
            },
            {
                title: "申请时间",
                dataIndex: "account",
                render: (text, record) =>
                    record.created_at
            },
            {
                title: "审核状态",
                dataIndex: "status",
                render: (text, record) => {
                    let statusTxt = '';
                    if(record.status == 0){
                        statusTxt = '待审核'
                    }else if(record.status == 1){
                        statusTxt = '审核中'
                    }else if(record.status == 2){
                        statusTxt = '审核通过'
                    }else if(record.status == 3){
                        statusTxt = '审核拒绝'
                    }
                    return(
                        <span>{statusTxt}</span>
                    )
                }
                    
            },
            {
                title: "操作",
                dataIndex: "status",
                width: 150,
                render: (text, record) => {
                    const { id, status } = record;
                    if(record.status == 1 || record == 0){
                        return (
                            <div className="editable-row-operations">
                                    <span>
                                        <Popconfirm
                                            title="确认通过?"
                                            okText="通过"
                                            cancelText="拒绝"
                                            onConfirm={() => this.onCheck(id, 2)}
                                            onCancel={() => this.onCheck(id, 3)}
                                        >
                                            <a>审核</a>
                                        </Popconfirm>
                                    </span>
                            </div>
                        );
                    }else{
                        return (
                            <span></span>
                        )
                    }
                    
                }
            }
        ];
        this.info = [
            {
                key: "nickname",
                label: "昵称"
            },
            {
                key: "realname",
                label: "真实姓名"
            },
            {
                key: "mobi",
                label: "手机号"
            },
            {
                key: "email",
                label: "电子邮箱"
            },
            {
                key: "anchor_photo",
                label: "主播照片",
                render: value => {
                    let list = [];
                    try {
                        list = JSON.parse(value) || [];
                    } catch (error) {}
                    return list.map((item, index) => {
                        return (
                            <img
                                key={index}
                                src={Base.getImgUrl(item)}
                                className="photo"
                                alt=""
                                onClick={action(() => {
                                    this.store.preImageUrl = Base.getImgUrl(
                                        item
                                    );
                                })}
                            />
                        );
                    });
                }
            },
            {
                key: "certificate_no",
                label: "证件号码"
            },
            {
                key: "certificate_photo",
                label: "证件照片",
                render: value => {
                    return (
                        <img
                            className="photo"
                            src={Base.getImgUrl(value)}
                            alt=""
                            onClick={action(() => {
                                this.store.preImageUrl = Base.getImgUrl(value);
                            })}
                        />
                    );
                }
            },
            {
                key: "anchor_video",
                label: "主播视频",
                render: value => {
                    if (!value) {
                        return "";
                    }
                    const list = JSON.parse(value);
                    return (
                        <video width="320" height="240" controls>
                            <source src={list[0].video_url} type="video/mp4" />
                        </video>
                    );
                }
            },
            {
                key: "summary",
                label: "简介"
            }
        ];
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderSwitch(text, record, column) {
        return (
            <Switch
                checked={parseInt(record[column], 10) === 1}
                onChange={value => {
                    if (column === "is_hot") {
                        this.onOnOff(record.id, column, value ? 1 : 0);
                    } else {
                        this.onSwitch(
                            record.id,
                            value ? 1 : 0,
                            column,
                            record.user_id
                        );
                    }
                }}
            />
        );
    }
    @action.bound
    onOnOff(id, type, value) {
        if (type !== "deleted") {
            const list = this.store.list.slice();
            const itemData = list.find(item => id === item.id);
            itemData[type] = value;
            this.store.list = list;
        }
        Base.POST(
            {
                act: "anchor",
                op: "onoff",
                id,
                mod: "admin",
                name: type,
                value
            },
            () => {
                switch (type) {
                    case "deleted":
                        {
                            remove(this.store.list, item => id === item.id);
                        }
                        break;
                    default:
                        break;
                }
            },
            this
        );
    }
    //是否启用
    @action.bound
    onSwitch(id, value, column, user_id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.onSave(id, value, user_id);
    }
    //保存
    @action.bound
    onSave(id, onoff, user_id) {
        const list = this.store.list.slice();
        const itemData = this.store.list.find(item => id === item.id);
        Base.POST(
            { act: "shop", op: "reward_point", mod: "admin", onoff, user_id },
            res => {
                // itemData.editable = false;
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
    //搜索
    searchStr = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
        this.requestData();
    }
    @action.bound
    onDetail(id) {
        if (id) {
            Base.GET({ act: "anchor", op: "view", mod: "admin", id }, res => {
                console.log(res);
                this.store.curData = res.data;
            });
        } else {
            this.store.curData = null;
        }
    }
    @action.bound
    onCheck(id, status) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { act: "users_rank_rule_verify", op: "save", mod: "admin", id, status },
            res => {
                itemData.status = status;
                itemData.updated_at = Base.getTimeFormat(
                    new Date().getTime() / 1000,
                    2
                );
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
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
                act: "users_rank_rule_verify",
                op: "index",
                mod: "admin",
                status: this.store.status,
                keyword: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, status } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.status = status;
                this.cacheData = list.map(item => ({ ...item }));
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
        let { list, total, curData, preImageUrl } = this.store;
        const showList = list.slice();
        const { status = {1:'审核中', 2:'审核通过', 3:'拒绝'} } = this;
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
        let infoItems = null;
        if (curData) {
            infoItems = this.info.map((item, index) => {
                const { key, label, render } = item;
                const value = !render ? curData[key] : render(curData[key]);
                return (
                    <FormItem key={index} {...formItemLayout} label={label}>
                        {value}
                    </FormItem>
                );
            });
        }
        return (
            <Spin ref="spin" wrapperClassName="AnchorList" spinning={false}>
                <div className="pb10">
                    {statusCon.length > 0 ? (
                        <Select
                            style={{ width: 120 }}
                            onChange={this.onStatusSelect}
                            defaultValue={-1}
                        >
                            {statusCon}
                        </Select>
                    ) : null}
                    <span style={{ marginLeft: 20 }}>
                        总数：
                        {total}
                    </span>
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
                    className="anchorList-modal"
                    title="主播详情"
                    visible={!!curData}
                    closable={false}
                    onCancel={() => this.onDetail()}
                    footer={[
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => this.onDetail()}
                        >
                            确认
                        </Button>
                    ]}
                >
                    <Form>{infoItems}</Form>
                </Modal>
                <Modal
                    onCancel={action(() => {
                        this.store.preImageUrl = "";
                    })}
                    visible={!!preImageUrl}
                    footer={null}
                >
                    <img style={{ maxWidth: 400 }} src={preImageUrl} alt="" />
                </Modal>
            </Spin>
        );
    }
}
