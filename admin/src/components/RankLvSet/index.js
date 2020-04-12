import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {EditorModal} from '../../components/EditorModal';
import {
    Table,
    Input,
    Popconfirm,
    Switch,
    Button,
    message,
    Upload,
    Icon
} from "antd";
import "./RankLvSet.less";
import { remove } from "lodash";

export class RankLvSet extends BaseComponent {
    store = {
        list: []
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "会员等级",
                dataIndex: "id",
            },
            {
                title: "晋级值",
                dataIndex: "exp",
                render: (text, record) =>
                    this.renderInput(text, record, "exp")
            },
            {
                title: "等级名称",
                dataIndex: "name",
                render: (text, record) =>
                    this.renderInput(text, record, "name")
            },
            {
                title: "等级图",
                dataIndex: "icon",
                width: "10%",
                render: (text, record) =>
                    this.renderImg(text, record, "icon")
            },
            {
                title: "等级说明",
                dataIndex: "status",
                render: (text, record) => (
                    <div>
                        <Button onClick={() => this.onEdit(record.id, record.remark)} className='edit-btn' type="primary" shape='circle' size='large' icon="edit" />
                    </div>
                )
            },
            {
                title: "操作",
                dataIndex: "operation",
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
                                    </a>&nbsp;&nbsp;
                                    {/* <Popconfirm
                                        title="确认删除?"
                                        okText="确定"
                                        cancelText="取消"
                                        onConfirm={() => this.onDelete(id)}
                                    >
                                        <a className="ml10 gray">删除</a>
                                    </Popconfirm> */}
                                </span>
                            )}
                        </div>
                    );
                }
            }
        ];
    }
    renderImg(text, record, column) {
        const { editable, icon, loading } = record;
        return (
            <div>
                {editable ? (
                    <Upload
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
                                src={`${Global.RES_URL}${icon}`}
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
                        src={`${Global.RES_URL}${icon}`}
                        alt=""
                        width="48"
                    />
                )}
            </div>
        );
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
    renderSwitch(text, record, column) {
        return (
            <Switch
                checked={parseInt(record.enable, 10) === 1}
                onChange={value =>
                    this.onSwitch(record.id, value ? 1 : 0, column)
                }
            />
        );
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
            itemData.grade_logo = info.file.response.data.file_url;
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
    //保存
    @action.bound
    onEdit(id, remark){
		this.refs.editor.show(remark,id)
    }
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData.editable = false;
        Base.POST(
            { act: "rank_rule", op: "save", mod: "admin", ...itemData },
            res => {
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
        this.onSave(id);
    }
    //取消
    @action.bound
    onCancel(id) {
        this.store.list = this.cacheData.map(item => ({ ...item }));
    }
    //删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "grade", op: "save", mod: "admin", id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
    }
    //添加
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.list.unshift({
            id: "",
            name: "",
            exp: "",
            icon: "",
            editable: true,
        });

        this.forceUpdate();
    }
    @action.bound
	onCompleteEdit(content,id){
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData['remark'] = content;
        this.store.list = list;
        Base.POST(
            { act: "rank_rule", op: "save", mod: "admin", ...itemData },
            res => {
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
    @action.bound
    requestData() {
        Base.POST(
            {
                act: "rank_rule",
                op: "index",
                mod: "admin",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                this.store.list = res.data;
                this.cacheData = res.data.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list } = this.store;
        return (
            <div className="ExpLvSet">
                <EditorModal ref='editor' onComplete={this.onCompleteEdit}/>
                <Button onClick={this.onAdd}>新增+</Button>
                <Table
                    className="mt16"
                    bordered
                    onChange={this.onTableHandler}
                    dataSource={list}
                    rowKey="id"
                    columns={this.columns}
                    pagination={false}
                />
            </div>
        );
    }
}