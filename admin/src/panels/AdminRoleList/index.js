import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base,Global} from '../../common';
import {
    Table,
	Popconfirm,
	Input,
    Switch,
    Button,
    Spin,
    message,
    Select,
    Icon
} from "antd";
import { remove } from "lodash";
import './AdminRoleList.less';
const Option = Select.Option;

export default class AdminRoleList extends BaseComponent{
	constructor(){
		super();
		this.store = {
			list: [],
		}
		this.columns = [
            {
                title: "ID",
				dataIndex: "id",
				render: (text, record) =>
                    this.renderText(text, record, "id")
            },
            {
                title: "名称",
                dataIndex: "name",
                render: (text, record) =>
                    this.renderInput(text, record, "name")
			},
			{
                title: "备注",
                dataIndex: "remark",
                render: (text, record) =>
                    this.renderInput(text, record, "remark")
            },
            {
                title: "启用",
                dataIndex: "enable",
                render: (text, record) =>
                    this.renderSwitch(text, record, "enable")
			},
			{
                title: "更新时间",
                dataIndex: "updated_at",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
            {
                title: "操作",
                dataIndex: "operation",
                render: (text, record) => {
                    const { id,editable } = record;
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
                                    <a
                                        style={{marginLeft:10}}
                                        onClick={() =>
                                            Base.push('AccessSetting',{id:id})
                                        }
                                    >
                                        设置权限
                                    </a>
                                    <Popconfirm
                                        title="确认删除?"
                                        okText="确定"
                                        cancelText="取消"
                                        onConfirm={() => this.onDelete(id)}
                                    >
                                        <a className="ml10 gray">删除</a>
                                    </Popconfirm>
                                </span>
                            )}
                        </div>
                    );
                }
            }
        ];
	}
	renderText(text, record, column) {
        return <div>{record[column]}</div>;
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
	// current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "admin_role",
				op: "index",
				mod:'admin'
            },
            res => {
                this.store.list = res.data;
                this.cacheData = res.data.map(item => ({ ...item }));
            },
            this
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
    
	//是否启用
    @action.bound
    onSwitch(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.onSave(id);
	}
	//删除
    @action.bound
    onDelete(id) {
        Base.POST(
            { act: "admin_role", op: "save", mod:'admin', id, deleted: "1" },
            () => remove(this.store.list, item => id === item.id),
            this
        );
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
        Base.POST(
            { act: "admin_role", op: "save", mod:'admin', ...itemData },
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
    @action.bound
    onAdd() {
        if (this.store.list.find(item => item.id === 0)) {
            return message.info("请保存后再新建");
        }
        this.store.list.unshift({
            id: 0,
            name: "",
            remark: "",
            editable: true,
            deleted: "0",
            enable: "1",
            sort: 0
        });
    }
	//编辑
    @action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
	}
	componentDidMount() {
		this.requestData();
	}
	render(){
		const { list} = this.store;
		const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
		return (
			<Spin ref="spin" spinning={false} className='AdminRoleList'>
                <div className="pd10">
					<Button onClick={this.onAdd}>新增+</Button>
				</div>
				<Table
                    className="mt16"
                    bordered
                    dataSource={showList}
                    rowKey="id"
                    columns={this.columns}
                    pagination={false}
                />
			</Spin>
		)
	}
};
