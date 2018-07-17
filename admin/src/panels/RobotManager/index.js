import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Button, Spin, Upload, Icon, message, Modal, Input } from "antd";
import "./RobotManager.less";

export default class RobotManager extends BaseComponent {
    store = {
        list: [],
        total: 1,
        num: "",
        isShowModal: false
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
                    this.renderText(text, record, "nickname")
            },
            {
                title: "头像",
                dataIndex: "header",
                render: (text, record) => this.renderImg(text, record, "header")
            }
        ];
    }
    renderImg(text, record, column) {
        const { header } = record;
        return (
            <div>
                <img
                    className="img-uploader"
                    src={Base.getImgUrl(header)}
                    alt=""
                />
            </div>
        );
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
                op: "users",
                mod: "admin",
                title: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, count, anchor_status, sex } = res.data;
                console.log(list);
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
    render() {
        let { list, total, num, isShowModal } = this.store;
        const showList = list.slice();
        return (
            <Spin ref="spin" wrapperClassName="RobotManager" spinning={false}>
                <div className="pb10">
                    <Button onClick={this.onGen}>批量生产</Button>
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
                        placeholder="请输入生产个数"
                    />
                </Modal>
            </Spin>
        );
    }
}
