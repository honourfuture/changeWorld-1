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
    Icon,
    Row,
    Col
} from "antd";
import { remove } from "lodash";
import { EditorModal } from "../../components/EditorModal";
import "./UserAudio.less";
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

export default class UserAudio extends BaseComponent {
    store = {
        list: [],
        addData: null,
        batchLoading: false
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
            {
                title: "音频地址",
                dataIndex: "video_url",
                width: 150,
                render: (text, record) =>
                    this.renderText(text, record, "video_url")
            },
            {
                title: "创建时间",
                dataIndex: "created_at",
                render: (text, record) =>
                    this.renderText(text, record, "created_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                // width: 150,
                // fixed: "right",
                render: (text, record) => {
                    const { id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span onClick={() => this.onEdit(id)}>
                                <a className="ml10">编辑</a>
                            </span>
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
        this.addInfo = [
            {
                key: "video_url",
                label: "音频文件",
                render: value => this.onAddImage("video_url", value)
            },
            { key: "title", label: "标题" },
            { key: "duration", label: "播放时长(秒)" },
            { key: "play_times", label: "播放次数" },
            {
                key: "cover_image",
                label: "封面图",
                render: value => this.onAddImage("cover_image", value)
            },
            { key: "price", label: "门票价格" },
            { key: "city_partner_rate", label: "城市分销比例(%)" },
            { key: "two_level_rate", label: "二级分销比例(%)" }
        ];
    }
    @action.bound
    onAddUploadChange(info) {
        this.store.batchLoading = true;
        if (info.file.status === "done") {
            const fileList = info.fileList;
            const len = fileList.length;
            let isAll = true;
            for (let i = 0; i < len; i++) {
                const { data } = fileList[i].response || {};
                if (!data || !data.file_url) {
                    isAll = false;
                    break;
                }
            }
            if (isAll) {
                Global.audioList = fileList.map(item => {
                    return {
                        ...item.response.data,
                        cover_image: Base.getPageParams("url")
                    };
                });
                this.store.batchLoading = false;
                Base.push("BatchAudio", {
                    album_id: Base.getPageParams("album_id")
                });
            }
        }
    }
    @action.bound
    onUploadChange(info, key) {
        console.log(info);
        const { addData } = this.store;
        if (key === "video_url") {
            addData.loading = true;
        }
        if (info.file.status === "done" || info.file.status === "removed") {
            const { fileList } = info;
            const data = fileList.length > 0 ? fileList[0].response.data : {};
            addData[key] = data.file_url || "";
            if (key === "video_url") {
                addData.loading = false;
                addData.title = data.name || "";
                addData.duration = data.playtime_seconds
                    ? Base.getNumFormat(data.playtime_seconds, 0)
                    : "";
            }
        }
    }
    onAddImage(key, value) {
        let fileName = "";
        if (value) {
            const arr = value.split("/");
            fileName = arr[arr.length - 1];
        }
        return (
            <div>
                <Upload
                    name="field"
                    data={{
                        field: "field",
                        audio: key === "video_url" ? 1 : 0
                    }}
                    action={Global.UPLOAD_URL}
                    showUploadList={false}
                    onChange={e => this.onUploadChange(e, key)}
                >
                    {value ? (
                        <div
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <span>{fileName}</span>
                            <Icon
                                onClick={action(e => {
                                    this.store.addData[key] = "";
                                    e.stopPropagation();
                                })}
                                style={{ marginLeft: 20 }}
                                type="close"
                                theme="outlined"
                            />
                        </div>
                    ) : (
                        <Button>
                            <Icon
                                type={
                                    this.store.addData.loading
                                        ? "loading"
                                        : "upload"
                                }
                            />{" "}
                            点击上传
                        </Button>
                    )}
                </Upload>
            </div>
        );
    }
    renderImg(text, record, column) {
        return (
            <div className="header-con">
                <img className="header" src={Base.getImgUrl(text)} alt="" />
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
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "live_audio", op: "save", mod: "user", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
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
                act: "live_audio",
                op: "index",
                mod: "user",
                album_id: Base.getPageParams("album_id"),
                cur_page: this.current || 1,
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
    onEdit(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        this.store.addData = { ...itemData };
    }
    @action.bound
    onAdd() {
        this.store.addData = {
            album_id: Base.getPageParams("album_id"),
            duration: "0",
            cover_image: Base.getPageParams("url"),
            title: "",
            price: "0",
            city_partner_rate: "0",
            two_level_rate: "0",
            video_url: "",
            // room_id: 0,
            play_times: "0",
            deleted: "0",
            enable: "1",
            loading: false
        };
    }
    @action.bound
    onCancelAdd() {
        this.store.addData = null;
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
            { act: "live_audio", op: "add", mod: "user", ...addData },
            () => {
                this.store.addData = null;
                // this.current = 1;
                this.requestData();
            },
            this
        );
    }
    render() {
        let { list, total, addData, batchLoading } = this.store;
        const showList = list.slice();
        // let tableWidth = this.columns.length * 150;
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
            <Spin ref="spin" wrapperClassName="UserAudio" spinning={false}>
                <div className="pb10">
                    <Button style={{ marginRight: 20 }} onClick={this.onAdd}>
                        上传音频
                    </Button>
                    <Upload
                        name="field"
                        data={{ field: "field", audio: 1 }}
                        multiple={true}
                        action={Global.UPLOAD_URL}
                        showUploadList={false}
                        onChange={e => this.onAddUploadChange(e)}
                    >
                        <Button>
                            <Icon type={batchLoading ? "loading" : "upload"} />{" "}
                            批量上传
                        </Button>
                    </Upload>
                    <Button style={{ float: "right" }} onClick={Base.goBack}>
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
                    // scroll={{ x: tableWidth }}
                    pagination={{
                        total,
                        current: this.current,
                        defaultPageSize: Global.PAGE_SIZE
                    }}
                />
                <Modal
                    closable={false}
                    className="UserAudio-Modal"
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
