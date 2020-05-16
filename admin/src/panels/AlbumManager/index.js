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
    Form,
    Upload,
    Icon
} from "antd";
import { remove } from "lodash";
import "./AlbumManager.less";
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
let global_current = 1;
export default class AlbumManager extends BaseComponent {
    store = {
        list: [],
        article_class: [],
        addData: null
    };
    curData = {};
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "编号",
                dataIndex: "id",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "昵称",
                dataIndex: "nickname",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.anchor_uid].nickname,
                        record,
                        "nickname"
                    )
            },
            {
                title: "收藏量",
                dataIndex: "favorite",
                render: (text, record) =>
                    this.renderText(text, record, "favorite")
            },
            {
                title: "手机号",
                dataIndex: "mobi",
                render: (text, record) =>
                    this.renderText(
                        this.user[record.anchor_uid].mobi,
                        record,
                        "mobi"
                    )
            },
            {
                title: "标题",
                dataIndex: "title",
                width: 150,
                render: (text, record) => this.renderText(text, record, "title")
            },
            {
                title: "封面",
                dataIndex: "cover_image",
                render: (text, record) =>
                    this.renderImg(text, record, "cover_image")
            },
            {
                title: "价格",
                dataIndex: "price",
                render: (text, record) => this.renderText(text, record, "price")
            },
            // {
            //     title: "简介",
            //     dataIndex: "summary",
            //     width: 150,
            //     render: (text, record) =>
            //         this.renderText(text, record, "summary")
            // },
            {
                title: "更新时间",
                dataIndex: "updated_at",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                // width: 150,
                // fixed: "right",
                render: (text, record) => {
                    const { id, sort } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <a
                                    onClick={() => {
                                        this.onEdit(id);
                                    }}
                                >
                                    编辑
                                </a>
                                <a
                                    className="ml10"
                                    onClick={() => {
                                        Base.push("/robot/CollectTask", { id });
                                    }}
                                >
                                    收藏任务
                                </a>
                                <a
                                    className="ml10"
                                    onClick={() => {
                                        Base.push("UserAudio", {
                                            album_id: record.id,
                                            url: record.cover_image
                                        });
                                    }}
                                >
                                    音频列表(
                                    {record.audio_num || 0})
                                </a>
                                <Popconfirm
                                    title="确认置顶?"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => this.onTop(id)}
                                >
                                    <a className="ml10">置顶</a>
                                </Popconfirm>
                                {sort > 0 ? (
                                    <Popconfirm
                                        title="确认取消置顶?"
                                        okText="确定"
                                        cancelText="取消"
                                        onConfirm={() => this.onUnTop(id)}
                                    >
                                        <a className="ml10 gray">取消置顶</a>
                                    </Popconfirm>
                                ) : null}
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
        this.addInfo = [
            { key: "anchor_uid", label: "主播id" },
            { key: "title", label: "标题" },
            {
                key: "album_class",
                label: "专辑类型",
                render: () => {
                    const { addData } = this.store;
                    const album_class_list = this.album_class_list;
                    if (!album_class_list || album_class_list.length <= 0) {
                        return null;
                    }
                    const options = album_class_list.map(item => {
                        return (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        );
                    });
                    return (
                        <Select
                            defaultValue={addData.album_class}
                            onChange={action(value => {
                                addData.album_class = value;
                            })}
                        >
                            {options}
                        </Select>
                    );
                }
            },
            {
                key: "cover_image",
                label: "封面图",
                render: value => this.onAddImage("cover_image", value)
            },
            // { key: "album_tag", label: "专辑标签" },
            { key: "price", label: "门票价格" },
            { key: "city_partner_rate", label: "城市分销比例(%)" },
            { key: "two_level_rate", label: "加盟商分销比例(%)" },
            {
                key: "public",
                label: "是否公开",
                render: () => {
                    const { addData } = this.store;
                    return (
                        <Select
                            defaultValue="1"
                            onChange={action(value => {
                                addData.public = value;
                            })}
                        >
                            <Option value="0">不公开</Option>
                            <Option value="1">公开</Option>
                        </Select>
                    );
                }
            },
            {
                key: "summary",
                label: "简介图",
                render: value => this.onAddImage("summary", value)
            }
        ];
    }
    @action.bound
    onUploadChange(info, key) {
        if (info.file.status === "done") {
            const { addData } = this.store;
            const { fileList } = info;
            if (key === "cover_image") {
                addData[key] =
                    fileList.length > 0
                        ? fileList[0].response.data.file_url
                        : "";
            } else {
                const value = addData[key];
                let fileList = [];
                try {
                    fileList = JSON.parse(value) || [];
                } catch (error) {}
                fileList.push(info.file.response.data.file_url);
                addData[key] = JSON.stringify(fileList);
            }
        }
    }
    onAddImage(key, value) {
        let fileNameList = [];
        if (value) {
            try {
                if (key === "summary") {
                    fileNameList = JSON.parse(value) || [];
                } else {
                    fileNameList = [value];
                }
                fileNameList = fileNameList.map(item => {
                    const arr = item.split("/");
                    return arr[arr.length - 1];
                });
            } catch (error) {}
        }
        return (
            <div>
                <Upload
                    name="field"
                    data={{ field: "field" }}
                    action={Global.UPLOAD_URL}
                    showUploadList={false}
                    onChange={e => this.onUploadChange(e, key)}
                >
                    {fileNameList.map((fileName, index) => {
                        return (
                            <div
                                key={index}
                                style={{ marginBottom: 5, marginTop: 5 }}
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                            >
                                <span>{fileName}</span>
                                <Icon
                                    onClick={action(e => {
                                        if (key === "cover_image") {
                                            this.store.addData[key] = "";
                                        } else {
                                            const value = this.store.addData[
                                                key
                                            ];
                                            try {
                                                const fileList =
                                                    JSON.parse(value) || [];
                                                fileList.splice(index, 1);
                                                this.store.addData[
                                                    key
                                                ] = JSON.stringify(fileList);
                                            } catch (error) {}
                                        }
                                        e.stopPropagation();
                                    })}
                                    style={{ marginLeft: 20 }}
                                    type="close"
                                    theme="outlined"
                                />
                            </div>
                        );
                    })}
                    {fileNameList.length > 0 && key === "cover_image" ? null : (
                        <Button>
                            <Icon type="upload" /> 点击上传
                        </Button>
                    )}
                </Upload>
            </div>
        );
    }
    renderImg(text, record, column) {
        return (
            <div className="header-con">
                <img className="header" src={Base.getImgUrl(text)} alt="" style={{ width: "32px" }}/>
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderSwitch(text, record, column) {
        return (
            <Switch
                checked={parseInt(record.headhunter, 10) === 1}
                onChange={value =>
                    this.onSwitch(record.id, value ? 1 : 0, column)
                }
            />
        );
    }
    // //是否启用
    // @action.bound
    // onSwitch(id, value, column) {
    //     const list = this.store.list.slice();
    //     const itemData = list.find(item => id === item.id);
    //     itemData[column] = value;
    //     console.log(itemData, "itemData");
    //     this.onSave(id);
    // }
    // //保存
    // @action.bound
    // onSave(id) {
    //     const list = this.store.list.slice();
    //     const itemData = this.store.list.find(item => id === item.id);
    //     Base.POST(
    //         { act: "headhunter", op: "onoff", mod: "admin", ...itemData },
    //         res => {
    //             itemData.editable = false;
    //             itemData.updated_at = Base.getTimeFormat(
    //                 new Date().getTime() / 1000,
    //                 2
    //             );
    //             itemData.id === 0 && (itemData.id = res.data.id);
    //             this.store.list = list;
    //             this.cacheData = list.map(item => ({ ...item }));
    //         },
    //         this
    //     );
    // }
    //搜索
    searchType = ""; //搜索类型
    searchStr = "";
    @action.bound
    onSearch(value) {
        global_current = 1;
        this.searchStr = value;
        this.requestData();
    }
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "live_album", op: "save", mod: "user", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    @action.bound
    onTop(id) {
        Base.GET(
            {
                act: "live_album",
                op: "top",
                mod: "user",
                id
            },
            () => {
                global_current = 1;
                this.requestData();
            }
        );
    }
    @action.bound
    onUnTop(id) {
        Base.GET(
            {
                act: "live_album",
                op: "untop",
                mod: "user",
                id
            },
            () => {
                global_current = 1;
                this.requestData();
            }
        );
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        global_current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "live_album",
                op: "index",
                mod: "user",
                type: this.searchType || "uid",
                keyword: this.searchStr || "",
                cur_page: global_current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, user } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
                this.user = user;
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    @action.bound
    onAdd() {
        const setData = action(() => {
            this.store.addData = {
                anchor_uid: "",
                cover_image: "",
                title: "",
                album_class: this.album_class_list[0].id,
                album_tag: "",
                price: "0.00",
                city_partner_rate: "0.00",
                two_level_rate: "0.00",
                public: 1,
                summary: "",
                editable: true,
                deleted: "0",
                enable: "1"
            };
        });
        if (!this.album_class_list || this.album_class_list.length <= 0) {
            Base.GET(
                { act: "album_class", op: "index" },
                res => {
                    this.album_class_list = res.data.filter(
                        item => parseInt(item.enable) > 0
                    );
                    if (this.album_class_list.length <= 0) {
                        return message.info("请设置专辑类型");
                    }
                    setData();
                },
                this
            );
        } else {
            setData();
        }
    }
    @action.bound
    onCancelAdd() {
        this.store.addData = null;
    }
    @action.bound
    onEdit(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        const setData = action(() => {
            this.store.addData = { ...itemData };
        });
        if (!this.album_class_list || this.album_class_list.length <= 0) {
            Base.GET(
                { act: "album_class", op: "index" },
                res => {
                    this.album_class_list = res.data.filter(
                        item => parseInt(item.enable) > 0
                    );
                    if (this.album_class_list.length <= 0) {
                        return message.info("请设置专辑类型");
                    }
                    setData();
                },
                this
            );
        } else {
            setData();
        }
    }
    @action.bound
    onAddSave() {
        let tips = "";
        const { addData } = this.store;
        for (let i = 0; i < this.addInfo.length; i++) {
            const { key, label } = this.addInfo[i];
            if (!addData[key]) {
                tips = label;
                break;
            }
        }
        if (tips) {
            return message.error(`请输入${tips}`);
        }
        Base.POST(
            { act: "live_album", op: "save", mod: "user", ...addData },
            () => {
                this.store.addData = null;
                // global_current = 1;
                this.requestData();
            },
            this
        );
    }
    render() {
        let { list, total, addData } = this.store;
        const showList = list.slice();
        let addItems = [];
        if (addData) {
            addItems = this.addInfo.map((item, index) => {
                const { key, label, render } = item;
                const value = render ? (
                    render(addData[key])
                ) : (
                    <Input
                        value={addData[key]}
                        onChange={action(e => {
                            addData[key] = e.target.value;
                        })}
                    />
                );
                return (
                    <FormItem key={index} {...formItemLayout} label={label}>
                        {value}
                    </FormItem>
                );
            });
        }
        return (
            <Spin ref="spin" wrapperClassName="AlbumManager" spinning={false}>
                <div className="pb10">
                    <Button style={{ marginRight: 20 }} onClick={this.onAdd}>
                        创建专辑
                    </Button>
                    <Select
                        defaultValue={"uid"}
                        onChange={value => (this.searchType = value)}
                    >
                        <Option value="uid">{"主播ID"}</Option>
                        <Option value="title">{"标题"}</Option>
                    </Select>
                    <Search
                        placeholder="搜索主播ID/标题"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                </div>
                <Table
                    size="small"
                    className="mt16"
                    onChange={this.onTableHandler}
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    // scroll={{ x: tableWidth }}
                    pagination={{
                        total,
                        current: global_current,
                        defaultPageSize: Global.PAGE_SIZE
                    }}
                />
                <Modal
                    closable={false}
                    className="AlbumManager-Modal"
                    visible={!!addData}
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.onCancelAdd}
                    onOk={this.onAddSave}
                >
                    {addItems}
                </Modal>
            </Spin>
        );
    }
}
