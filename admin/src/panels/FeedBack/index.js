import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base,Global} from '../../common';
import { Table, Input, Popconfirm, Spin,Button } from "antd";
import {remove} from 'lodash';
import './FeedBack.less';

export default class FeedBack extends BaseComponent{
	store={
		list: [],
        user: {},
        total: 1,
	}
	constructor(props) {
        super(props);
        this.columns = [
            {
                title: "ID",
                dataIndex: "id",
                width: "10%",
                render: (text, record) => this.renderText(text, record, "id")
            },
            {
                title: "反馈内容",
                dataIndex: "content",
                width: "10%",
                render: (text, record) => this.renderText(text, record, "content")
            },
            {
                title: "反馈人",
                dataIndex: "user_id",
                width: "10%",
                render: (text, record) =>
                    this.renderStoreInfo(text, record, "user_id")
            },
            {
                title: "反馈图片",
                dataIndex: "photos",
                width: "10%",
                render: (text, record) =>
                    this.renderImg(text, record, "photos")
            },
            {
                title: "反馈时间",
                dataIndex: "updated_at",
                width: "10%",
                render: (text, record) =>
                    this.renderText(text, record, "updated_at")
            },
        ];
    }
    renderStoreInfo(text, record, column) {
        const { user } = this.store;
        const { user_id } = record;
        return <div>{user[user_id] ? user[user_id].nickname : ""}</div>;
    }
    renderText(text, record, column) {
        return <div>{record[column]}</div>;
    }
    renderImg(text, record, column) {
        const { photos } = record;
        let backPhotos = (photos || []).map((item,key)=>{
        	return <img className="feedImg" src={Base.getImgUrl(item)} key={key} alt=""/>
        })
        return (
        	<div className="feedCont">
            	{backPhotos}
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
                act: "feedback",
                op: "index",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list, user ,count} = res.data;
                this.store.list = list;
                this.store.user = user;
                this.store.total = count;
                this.cacheData = list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
	render(){
		let { list, total } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
		return (
			<Spin ref="spin" wrapperClassName="FeedBack" spinning={false}>
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
			</Spin>
		)
	}
};
