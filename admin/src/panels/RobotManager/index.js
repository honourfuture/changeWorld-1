import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {
    Table,
    Button,
    Spin,
    Upload,
    Icon,
    message,
    Modal,
    Input,
    Popconfirm,
    Select
} from "antd";
import "./RobotManager.less";
const Search = Input.Search;
const Option = Select.Option;

export default class RobotManager extends BaseComponent {
    store = {
        list: [],
        total: 1,
        num: "",
        targetId: "",
        isShowModal: false,
        isShowIdModal: false
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
                title: "昵称",
                dataIndex: "nickname",
                render: (text, record) =>
                    this.renderInput(text, record, "nickname")
            },
            {
                title: "头像",
                dataIndex: "header",
                render: (text, record) => this.renderImg(text, record, "header")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: "15%",
                render: (text, record) => {
                    const { editable, id } = record;
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
                                    {/* <Popconfirm title="确认删除?" okText='确定' cancelText='取消' onConfirm={() => this.onDelete(id)}>
									<a className='ml10 gray'>删除</a>
								</Popconfirm> */}
                                </span>
                            )}
                        </div>
                    );
                }
            }
        ];
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeys = selectedRowKeys;
            },
            getCheckboxProps: record => ({
                name: record.name
            })
        };
    }
    renderInput(text, record, column) {
        const { editable } = record;
        return (
            <div>
                {editable ? (
                    <Input
                        style={{ margin: "-5px 0" }}
                        value={text}
                        type={column === "sort" ? "number" : "text"}
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
    renderImg(text, record, column) {
        const { editable, header, loading } = record;
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
                        {header ? (
                            <img
                                style={{width: "32px"}}
                                className="img-uploader"
                                style={{ width: "120px" }}
                                src={Base.getImgUrl(header)}
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
                        style={{ width: "32px" }}
                        src={Base.getImgUrl(header)}
                        alt=""
                    />
                )}
            </div>
        );
    }
    // renderImg(text, record, column) {
    //     const { header } = record;
    //     return (
    //         <div>
    //             <img
    //                 className="img-uploader"
    //                 src={Base.getImgUrl(header)}
    //                 alt=""
    //             />
    //         </div>
    //     );
    // }
    renderText(text, record, column) {
        return <div>{record[column]}</div>;
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
            itemData.header = info.file.response.data.file_url;
            return (this.store.list = list);
        }
    }
    //编辑
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
    }
    //取消
    @action.bound
    onCancel(id) {
        this.store.list = this.cacheData.map(item => ({ ...item }));
    }
    //保存
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        // itemData.unit = ['日','月','季','年'][itemData.unit - 1];
        Base.POST(
            { act: "robot", op: "save", mod: "admin", ...itemData },
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

    //添加
    @action.bound
    onAdd() {}
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    searchType = ""; //搜索类型
    searchStr = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        this.selectedRowKeys = [];
        Base.GET(
            {
                act: "robot",
                op: "users",
                mod: "admin",
                type: this.searchType || "uid",
                keyword: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, anchor_status, sex } = res.data;
                // console.log(list);
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    @action.bound
    onGen(info, a) {
        if (!this.store.num) {
            return (this.store.isShowModal = true);
        }
        this.store.isShowModal = false;
        Base.POST(
            {
                act: "robot",
                op: "users_random",
                mod: "admin",
                num: this.store.num
            },
            res => {
                this.store.num = "";
                this.cur_page = 1;
                this.requestData();
            }
        );
    }
    @action.bound
    onChat() {
        console.log(this.selectedRowKeys);
        if (!this.selectedRowKeys || this.selectedRowKeys.length <= 0) {
            return message.error("请选择机器人");
        }
        const { targetId } = this.store;
        if (!targetId) {
            Base.push("/member/MemberManager", {
                ids: JSON.stringify(this.selectedRowKeys)
            });
            // this.store.isShowIdModal = true;
            return;
        }
        this.store.targetId = "";
        this.store.isShowIdModal = false;
        this.selectedRowKeys.forEach(item => {
            window.open(
                `${
                    Global.RES_URL
                }/admin/#/blank/IMPanel?id=${item}&targetId=${targetId}`
            );
            // window.open(
            //     `http://localhost:3000/#/blank/IMPanel?id=${item}&targetId=${targetId}`
            // );
        });
    }
    render() {
        let {
            list,
            total,
            num,
            isShowModal,
            isShowIdModal,
            targetId
        } = this.store;
        const showList = list.slice();
        return (
            <Spin ref="spin" wrapperClassName="RobotManager" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onGen}>批量生成</Button>
                    <Select
                        style={{ marginLeft: 10 }}
                        defaultValue={"uid"}
                        onChange={value => (this.searchType = value)}
                    >
                        <Option value="uid">{"ID"}</Option>
                        <Option value="title">{"昵称"}</Option>
                    </Select>
                    <Search
                        placeholder="搜索ID/昵称"
                        enterButton
                        onSearch={this.onSearch}
                        style={{ width: 200, marginLeft: 10 }}
                    />
                    <span style={{ marginLeft: 20 }}>
                        总数：
                        {total}
                    </span>
                    <Button style={{ float: "right" }} onClick={this.onChat}>
                        发起聊天
                    </Button>
                </div>
                <Table
                    rowSelection={this.rowSelection}
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
                    visible={!!isShowModal}
                    okText="确定"
                    cancelText="取消"
                    closable={false}
                    onOk={this.onGen}
                    onCancel={action(() => (this.store.isShowModal = false))}
                >
                    <Input
                        onChange={action(
                            e => (this.store.num = e.target.value)
                        )}
                        value={num}
                        placeholder="请输入生成个数"
                    />
                </Modal>
                <Modal
                    visible={!!isShowIdModal}
                    okText="确定"
                    cancelText="取消"
                    closable={false}
                    onOk={this.onChat}
                    onCancel={action(() => (this.store.isShowIdModal = false))}
                >
                    <Input
                        onChange={action(
                            e => (this.store.targetId = e.target.value)
                        )}
                        value={targetId}
                        placeholder="请输入聊天用户id"
                    />
                </Modal>
            </Spin>
        );
    }
}
