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
    Modal,
    Form
} from "antd";
import { remove } from "lodash";
import "./ActivityList.less";

import { ActivityDetail } from "../../components/ActivityDetail";
import AddActivityImg from "../../components/AddActivityImg";
const Search = Input.Search;
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

export default class ActivityList extends BaseComponent {
    store = {
        list: [],
        acImg: false,
        loading: ""
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "活动ID",
                dataIndex: "id"
            },
            {
                title: "活动分类",
                width: "10%",
                dataIndex: "activity_class_name"
            },
            {
                title: "活动名称",
                dataIndex: "title"
            },
            {
                title: "活动详情",
                width: "15%",
                dataIndex: "details",
                render: text => {
                    return <div className="detail-con">{text}</div>;
                }
            },
            {
                title: "活动描述",
                width: "15%",
                dataIndex: "summary",
                render: text => {
                    return <div className="detail-con">{text}</div>;
                }
            },
            {
                title: "开始时间",
                dataIndex: "time_start",
                render: (text, record) =>
                    this.renderTime(text, record, "time_start")
            },
            {
                title: "结束时间",
                dataIndex: "time_end",
                render: (text, record) =>
                    this.renderTime(text, record, "time_end")
            },
            {
                title: "推荐设置",
                width: 80,
                dataIndex: "is_recommend",
                render: (text, record) =>
                    this.renderSwitch(text, record, "is_recommend")
            },
            {
                title: "热门商品",
                width: 80,
                dataIndex: "is_hot",
                render: (text, record) =>
                    this.renderSwitch(text, record, "is_hot")
            },
            {
                title: "操作",
                width: 180,
                dataIndex: "operation",
                render: (text, record) => {
                    const { id, user, is_ad } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <a
                                    onClick={() =>
                                        this.onRead(id, user.nickname)
                                    }
                                >
                                    详情
                                </a>
                                &nbsp;&nbsp;
                                <a onClick={() => this.onAddImg(id, is_ad)}>
                                    广告位
                                </a>
                                <a
                                    className="ml10"
                                    onClick={() => {
                                        Base.push("/robot/ActivityPlay", {
                                            id
                                        });
                                    }}
                                >
                                    选手
                                </a>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onDel(id)}
                                >
                                    <a className="ml10 gray">删除</a>
                                </Popconfirm>
                            </span>
                        </div>
                    );
                }
            }
        ];
    }
    renderTime(text, record, column) {
        const { time_end, time_start } = record;
        return Base.getTimeFormat(
            column === "time_start" ? time_start : time_end
        );
    }
    renderImg(text, record, column) {
        const { editable, icon, loading } = record;
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
                        {icon ? (
                            <img
                                className="img-uploader"
                                style={{ width: "120px" }}
                                src={icon}
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
                        style={{ width: "120px" }}
                        src={Base.getImgUrl(icon)}
                        alt=""
                    />
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
    onRead(id, names) {
        this.refs.detail.show(id, names);
    }
    @action.bound
    onAddImg(id, is_ad) {
        Base.sendEvt("com.show.adimg", { id: id, is_ad: is_ad });
    }
    onDel(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            {
                act: "activity",
                op: "save",
                mod: "user",
                ...itemData,
                deleted: 1
            },
            res => {
                remove(list, item => id === item.id);
                this.store.list = list;
            }
        );
    }
    //保存
    @action.bound
    onSave(id, value, column) {
        const recommend = {
            act: "activity",
            op: "recommend",
            mod: "admin",
            id: id,
            is_recommend: value
        };
        const hot = {
            act: "activity",
            op: "hot",
            mod: "admin",
            id: id,
            is_hot: value
        };
        const test = column == "is_hot" ? hot : recommend;
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { ...test },
            res => {
                // Base.POST({act:'activity',op:'recommend',mod:'admin',id:id,...test},(res)=>{
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
        this.onSave(id, value, column);
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
            itemData.icon = info.file.response.data.file_url;
            return (this.store.list = list);
        }
    }
    componentDidMount() {
        this.requestData();
    }
    requestData() {
        Base.GET(
            {
                act: "activity",
                op: "index",
                mod: "admin",
                title: this.searchStr || ""
            },
            res => {
                const { list } = res.data;
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    @action.bound
    onSearch(e) {
        this.searchStr = e;
        this.requestData();
    }
    render() {
        let { list, acImg, acDetail } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <Spin ref="spin" spinning={false} wrapperClassName="ActivityList">
                <div className="pb10">
                    {/* <Button onClick={this.onAdd}>新增+</Button> */}
                    <Search
                        placeholder="搜索标题"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200 }}
                    />
                </div>
                <Table
                    size="small"
                    className="mt16"
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={false}
                />
                <ActivityDetail ref="detail" item={list} destroyOnClose />
                <AddActivityImg ref="adImg" item={list} destroyOnClose />
            </Spin>
        );
    }
}
