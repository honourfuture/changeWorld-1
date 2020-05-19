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
    Modal,
    Form,
    Upload,
    Icon
} from "antd";
import "./ActivityPlay.less";
import { remove } from "lodash";
const TextArea = Input.TextArea;
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

export default class ActivityPlay extends BaseComponent {
    store = {
        list: [],
        total: 0,
        addData: null
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "活动报名ID",
                dataIndex: "id",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "用户id",
                dataIndex: "user_id",
                render: (text, record) =>
                    this.renderText(text, record, "user_id")
            },
            {
                title: "用户昵称",
                dataIndex: "nickname",
                render: (text, record) =>
                    this.renderText(text, record, "nickname")
            },
            {
                title: "用户头像",
                dataIndex: "header",
                width: 120,
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "票数",
                dataIndex: "vote",
                render: (text, record) => this.renderText(text, record, "vote")
            },
            // {
            //     title: "简介",
            //     dataIndex: "summary",
            //     render: (text, record) =>
            //         this.renderText(text, record, "summary")
            // },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { id } = record;
                    return (
                        <div className="editable-row-operations">
                            <span>
                                <a
                                    onClick={() =>
                                        Base.push("ActivityLike", {
                                            activity_id: id
                                        })
                                    }
                                >
                                    点赞任务
                                </a>
                            </span>
                        </div>
                    );
                }
            }
        ];
        this.addInfo = [
            { key: "user_id", label: "用户id" },
            {
                key: "summary",
                label: "拉票感言",
                render: value => {
                    return (
                        <TextArea
                            onChange={action(e => {
                                this.store.addData.summary = e.target.value;
                            })}
                            value={value}
                            rows={4}
                        />
                    );
                }
            },
            {
                key: "photos",
                label: "照片",
                render: value => this.onAddImage("photos", value)
            }
        ];
    }
    @action.bound
    onUploadChange(info, key) {
        if (info.file.status === "done") {
            const { addData } = this.store;
            const value = addData[key];
            const { height, width, file_url } = info.file.response.data;
            value.push({
                url: file_url,
                height,
                width
            });
            addData[key] = value;
        }
    }
    onAddImage(key, fileNameList) {
        fileNameList = fileNameList || [];
        return (
            <div>
                <Upload
				    withCredentials={true}
                    name="field"
                    data={{ field: "field" }}
                    action={Global.UPLOAD_URL}
                    showUploadList={false}
                    onChange={e => this.onUploadChange(e, key)}
                >
                    {fileNameList.map((item, index) => {
                        const arr = item.url.split("/");
                        return (
                            <div
                                key={index}
                                style={{ marginBottom: 5, marginTop: 5 }}
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                            >
                                <span>{arr[arr.length - 1]}</span>
                                <Icon
                                    onClick={action(e => {
                                        const fileList = this.store.addData[
                                            key
                                        ];
                                        fileList.splice(index, 1);
                                        this.store.addData[key] = fileList;

                                        e.stopPropagation();
                                    })}
                                    style={{ marginLeft: 20 }}
                                    type="close"
                                    theme="outlined"
                                />
                            </div>
                        );
                    })}
                    <Button>
                        <Icon type="upload" /> 点击上传
                    </Button>
                </Upload>
            </div>
        );
    }
    renderText(text, record, column) {
        return <div>{text}</div>;
    }
    renderImg(text, record, column) {
        return (
            <div>
                <img
                    className="header"
                    src={`${Global.RES_URL}${text}`}
                    alt=""
                />
            </div>
        );
    }
    // renderInput(text, record, column) {
    //     const { editable } = record;
    //     return (
    //         <div>
    //             {editable ? (
    //                 <Input
    //                     style={{ margin: "-5px 0" }}
    //                     value={text}
    //                     type={column === "sort" ? "number" : "text"}
    //                     onChange={e =>
    //                         this.onEditChange(record.id, e.target.value, column)
    //                     }
    //                 />
    //             ) : (
    //                 text
    //             )}
    //         </div>
    //     );
    // }
    // renderSwitch(text, record, column) {
    //     return (
    //         <Switch
    //             checked={parseInt(record.enable, 10) === 1}
    //             onChange={value =>
    //                 this.onSwitch(record.id, value ? 1 : 0, column)
    //             }
    //         />
    //     );
    // }
    @action.bound
    onEditTask(id) {
        Base.push("ActivityLike", { id });
    }
    @action.bound
    onEditChange(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        const setData = action(() => {
            this.store.addData = { ...itemData };
        });
        setData();
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
            if (key === "photos") {
                if (addData[key].length === 0) {
                    tips = "请上传图片";
                    break;
                }
            } else {
                if (!addData[key]) {
                    tips = `请输入${label}`;
                    break;
                }
            }
        }
        if (tips) {
            return message.error(`${tips}`);
        }
        Base.POST(
            {
                act: "activity_enter",
                op: "add",
                ...addData,
                photos: JSON.stringify(addData.photos),
                activity_id: Base.getPageParams("id")
            },
            () => {
                this.store.addData = null;
                // this.current = 1;
                this.requestData();
            },
            this
        );
    }
    //是否启用
    // @action.bound
    // onSwitch(id, value, column) {
    //     const list = this.store.list.slice();
    //     const itemData = list.find(item => id === item.id);
    //     itemData[column] = value;
    //     this.onSave(id);
    // }
    //取消
    // @action.bound
    // onCancel(id) {
    //     this.store.list = this.cacheData.map(item => ({ ...item }));
    // }
    //删除
    // @action.bound
    // onDelete(id) {
    //     Base.POST(
    //         {
    //             act: "activity_enter",
    //             op: "onoff",
    //             mod: "admin",
    //             id,
    //             deleted: "1"
    //         },
    //         () => remove(this.store.list, item => id === item.id),
    //         this
    //     );
    // }
    //添加
    @action.bound
    onAdd() {
        this.store.addData = {
            id: "",
            user_id: "",
            summary: "",
            photos: []
        };
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        Base.POST(
            {
                act: "activity",
                op: "more",
                id: Base.getPageParams("id"),
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { enter_list, enter_count } = res.data;
                this.store.list = enter_list.map(item => {
                    return { ...item, summary: "" };
                });
                this.store.total = enter_count;
                this.cacheData = enter_list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
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
            <div className="ActivityPlay">
                <Button onClick={this.onAdd}>新增+</Button>
                <Table
                    className="mt16"
                    bordered
                    onChange={this.onTableHandler}
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
                    closable={false}
                    className="ActivityPlay-Modal"
                    visible={!!addData}
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.onCancelAdd}
                    onOk={this.onAddSave}
                >
                    {addItems}
                </Modal>
            </div>
        );
    }
}
