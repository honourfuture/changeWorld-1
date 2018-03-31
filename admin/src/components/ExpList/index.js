import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Table, Button, Input, message } from "antd";
import "./ExpList.less";

const Search = Input.Search;
export class ExpList extends BaseComponent {
    store = {
        list: [],
        total: 1,
        user: {}
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "会员ID",
                dataIndex: "user_id",
                width: "10%"
            },
            {
                title: "会员名称",
                dataIndex: "user_name",
                width: "10%",
                render: (text, record) =>
                    this.renderStoreInfo(text, record, "user_id")
            },
            {
                title: "会员等级",
                dataIndex: "grade_name",
                width: "10%"
            },
            {
                title: "晋级值",
                dataIndex: "grade_demand",
                width: "10%"
            },
            {
                title: "等级图",
                dataIndex: "grade_logo",
                width: "10%"
            },
            {
                title: "时间",
                dataIndex: "updated_at",
                width: "10%"
            },
            {
                title: "操作描述",
                dataIndex: "rule_name_text",
                width: "10%"
            }
        ];
    }
    renderStoreInfo(text, record, column) {
        const { user } = this.store;
        const { user_id } = record;
        return <div>{user[user_id].nickname}</div>;
    }
    //搜索
    searchStr = "";
    @action.bound
    onSearch(value) {
        this.current = 1;
        this.searchStr = value;
        this.requestData();
    }
    @action.bound
    onTableHandler({ current, pageSize }) {
        this.current = current;
        this.requestData();
    }
    current = 1;
    @action.bound
    requestData() {
        const { goods_class_id } = this.store;
        Base.POST(
            {
                act: "users_grade",
                op: "index",
                user_id: this.searchStr || "",
                cur_page: this.current || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { grade, user } = res.data;
                this.store.list = grade.list;
                this.store.user = user;
                this.store.total = grade.count;
                this.cacheData = grade.list.map(item => ({ ...item }));
            },
            this
        );
    }
    componentDidMount() {
        this.requestData();
    }
    render() {
        let { list, total } = this.store;
        const showList = list.filter(item => {
            return parseInt(item.deleted, 10) === 0;
        });
        return (
            <div className="ExpList">
                {/* <Search
						placeholder="搜索用户ID"
						enterButton
						onSearch={this.onSearch}
						style={{ width: 180 }}
					/> */}
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
            </div>
        );
    }
}
