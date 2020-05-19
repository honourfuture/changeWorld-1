import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Button, Spin, Upload, Icon, message } from "antd";
import "./RobotHeaderManager.less";

export default class RobotHeaderManager extends BaseComponent {
    store = {
        list: [],
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
                    style={{width: "32px"}}
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
                op: "header_list",
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
    componentDidMount() {
        this.requestData();
    }
    //已上传
    uploadedList = [];
    //待上传
    uploadList = [];
    @action.bound
    onUploadChange(info, a) {
        let canUpload = true;
        info.fileList.forEach(item => {
            if (item.status !== "done") {
                canUpload = false;
            } else {
                if (
                    this.uploadedList.indexOf(item.response.data.file_url) ===
                        -1 &&
                    this.uploadList.indexOf(item.response.data.file_url) === -1
                ) {
                    this.uploadList.push(item.response.data.file_url);
                }
            }
        });
        if (canUpload) {
            Base.POST(
                {
                    act: "robot",
                    op: "header_batch_add",
                    mod: "admin",
                    headers: JSON.stringify(this.uploadList)
                },
                res => {
                    this.uploadedList = this.uploadedList.concat(
                        this.uploadList
                    );
                    this.uploadList = [];
                    this.cur_page = 1;
                    this.requestData();
                },
                this
            );
        }
    }
    render() {
        let { list, total } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <Spin
                ref="spin"
                wrapperClassName="RobotHeaderManager"
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
                        multiple={true}
                    >
                        <Button>
                            <Icon type="upload" /> 批量导入
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
