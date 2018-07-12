import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base,Global} from '../../common';
import { Table, Button, Input, Popconfirm, Switch, Spin, message } from "antd";
import { remove } from "lodash";
import './PushMsg.less';

export default class PushMsg extends BaseComponent{
	store = {
		list: [],
		total:1
	};
	constructor(props) {
        super(props);
        this.columns = [
            {
                title: "消息摘要",
                dataIndex: "summary",
                render: (text, record) =>
                    this.renderInput(text, record, "summary")
            },
            {
                title: "操作",
                dataIndex: "operation",
                width: 150,
                fixed: "right",
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
										style={{marginRight:10}}
                                        onClick={() =>
                                            this.onSend(id)
                                        }
                                    >
                                        发送
                                    </a>
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
	renderInput(text, record, column) {
        const { editable } = record;
        return (
            <div>
                {editable ? (
                    <Input
                        style={{ margin: "-5px 0" }}
                        value={text}
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
	@action.bound
    onEditChange(id, value, column) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        itemData[column] = value;
        this.store.list = list;
    }
	current = 1;
    @action.bound
    requestData() {
        Base.GET(
            {
                act: "push",
                op: "index",
                mod: "admin",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
				console.log(res);
                const { list, count } = res.data;
                this.store.list = list;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
	}
	//推送
	@action.bound
	onSend(id){
		Base.POST(
            { act: "push", op: "send", mod: "admin", id:id },
            res => {
				message.success('发送成功！',2);
            },
            this
        );
	}
	//保存
    @action.bound
    onSave(id) {
        const list = this.store.list.slice();
        const itemData = list.find(item => id === item.id);
        Base.POST(
            { act: "push", op: "save", mod: "admin", ...itemData },
            res => {
                itemData.editable = false;
                itemData.id === 0 && (itemData.id = res.data.id);
                this.store.list = list;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
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
            { act: "push", op: "save", mod: "admin", id, deleted: "1" },
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
            id: 0,
            summary: "",
            editable: true,
            deleted: "0",
            enable: "1",
            sort: 0,
        });
    }
    componentDidMount() {
        this.requestData();
	}
	@action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
	render(){
		let { list, total } = this.store;
        const showList = list.slice();
		return (
			<div className='PushMsg'>
				<div className="pb10">
                    <Button onClick={this.onAdd}>新增+</Button>
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
			</div>
		)
	}
};
