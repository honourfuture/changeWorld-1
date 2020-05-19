import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Button, Spin, Upload, Icon } from "antd";
import "./RobotNickNameManager.less";

export default class RobotNickNameManager extends BaseComponent {
    store = {
        list: [],
        positionList: [],
        total: 1
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
                op: "nickname_list",
                mod: "admin",
                title: this.searchStr || "",
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
                    op: "nickname_import",
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
    render() {
        let { list, total } = this.store;
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
                wrapperClassName="RobotNickNameManager"
                spinning={false}
            >
                <div className="pb10">
                    <Upload
				        withCredentials={true}
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
            </Spin>
        );
    }
}
