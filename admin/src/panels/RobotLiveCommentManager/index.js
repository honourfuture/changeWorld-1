import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {
    Table,
    Button,
    Spin,
    Upload,
    Icon,
    Switch,
    message,
    Form,
    Input,
    Modal,
    Popconfirm
} from "antd";
import "./RobotLiveCommentManager.less";
const FormItem = Form.Item;
const Search = Input.Search;
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
export default class RobotLiveCommentManager extends BaseComponent {
    store = {
        list: [],
        positionList: [],
        total: 1,
        isShowModal: false,
        params: {},
        isShowTem: false,
        temParams: {}
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "ID",
                dataIndex: "id",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "评论",
                dataIndex: "comment",
                render: (text, record) =>
                    this.renderText(text, record, "comment")
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
        this.temColumns = [
            { key: "step_times", label: "多少秒内评论" },
            { key: "step_num", label: "单次评论数" },
            { key: "max", label: "本次任务总评论数" },
            {
                key: "enable",
                label: "是否启用",
                render: value => {
                    return (
                        <Switch
                            checked={parseInt(value, 10) === 1}
                            onChange={value =>
                                this.onTemChange(
                                    { target: { value: value ? 1 : 0 } },
                                    "enable"
                                )
                            }
                        />
                    );
                }
            }
        ];
    }
    renderText(text, record, column) {
        return <div>{record[column]}</div>;
    }
    //添加
    @action.bound
    onAdd() {}
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
                act: "robot",
                op: "comment_list",
                mod: "admin",
                topic: 0,
                keyword: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    @action.bound
    onUploadChange(info) {
        if (info.file.status === "uploading") {
            return false;
        }
        if (info.file.status === "done") {
            Base.GET(
                {
                    act: "robot",
                    topic: 0,
                    op: "comment_import",
                    mod: "admin",
                    filename: info.file.response.data.file_url
                },
                res => {
                    this.cur_page = 1;
                    this.requestData();
                },
                this
            );
            return false;
        }
    }
    componentDidMount() {
        this.requestData();
    }
    @action.bound
    onSetTemplate() {
        Base.GET({ act: "admin", op: "config" }, res => {
            const list = res.data.tpl_live_comment || [];
            this.store.temParams = list[0] || { enable: "0" };
            this.store.isShowTem = true;
        });
    }
    @action.bound
    onTemChange(e, type) {
        this.store.temParams = {
            ...this.store.temParams,
            [type]: e.target.value
        };
    }
    @action.bound
    onTemSubmit() {
        const params = { ...this.store.temParams, id: new Date().getTime() };
        let isTips = false;
        this.temColumns.forEach(item => {
            if (!params.hasOwnProperty(item.key)) {
                isTips = true;
            }
        });
        if (isTips) {
            return message.error("请输入完整的任务参数");
        }
        Base.POST(
            {
                act: "config",
                op: "save",
                mod: "admin",
                tpl_live_comment: JSON.stringify([params])
            },
            res => {
                message.success("模板编辑成功");
                this.store.temParams = {};
                this.store.isShowTem = false;
            },
            this
        );
    }
    @action.bound
    onDelete(id) {
        Base.GET(
            {
                act: "robot",
                topic: 0,
                op: "comment_del",
                mod: "admin",
                id
            },
            res => {
                this.requestData();
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
    render() {
        let {
            list,
            total,
            isShowModal,
            params,
            isShowTem,
            temParams
        } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        const verifyData = Base.getLocalData("verifyData") || {};
        let header = "";
        for (let [key, value] of Object.entries(verifyData)) {
            header += key + "=" + value + "&";
        }
        return (
            <Spin
                ref="spin"
                wrapperClassName="RobotLiveCommentManager"
                spinning={false}
            >
                <div className="pb10">
                    <Search
                        placeholder="搜索关键词"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginRight: 10 }}
                    />
                    <Upload
                        accept="txt"
                        name="field"
                        data={{ field: "field" }}
                        showUploadList={false}
                        action={Global.UPLOAD_URL}
                        onChange={e => this.onUploadChange(e)}
                    >
                        <Button>
                            <Icon type="upload" /> txt批量上传
                        </Button>
                    </Upload>
                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={this.onSetTemplate}
                    >
                        模板管理
                    </Button>
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
                <Modal
                    visible={isShowTem}
                    title="模板任务"
                    closable={false}
                    okText="确定"
                    cancelText="取消"
                    onOk={this.onTemSubmit}
                    onCancel={action(() => (this.store.isShowTem = false))}
                >
                    <Form>
                        {this.temColumns.map((item, index) => {
                            const { key, label, render } = item;
                            return (
                                <FormItem
                                    key={key}
                                    {...formItemLayout}
                                    label={label}
                                >
                                    {render ? (
                                        render(temParams[key])
                                    ) : (
                                        <Input
                                            value={temParams[key]}
                                            onChange={e =>
                                                this.onTemChange(e, key)
                                            }
                                            placeholder={`请输入${label}`}
                                        />
                                    )}
                                </FormItem>
                            );
                        })}
                    </Form>
                </Modal>
            </Spin>
        );
    }
}
