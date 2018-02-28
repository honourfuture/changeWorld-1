
import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { List, NavBar, Flex } from "antd-mobile";
import "./MessAgeCenter.less";
import { icon } from "../../images";

const Item = List.Item;
export default class MessAgeCenter extends BaseComponent {
    store = {
        list: [],
        isRead: ""
    };
    @action.bound
    onRead(id) {
        Base.push("MessageDetail", { id });
    }
    componentDidMount() {
        Base.POST({ act: "mailbox", op: "index" }, res => {
            const { list, read_ids } = res.data;
            this.store.list = list;
            this.store.isRead = read_ids;
        });
    }
    render() {
        const { list, isRead } = this.store;
        const readList = isRead.split(",");
        const msgItem = (list || {}).map((item, key) => {
            const { id, title, content, updated_at } = item;
            let read = "title";
            readList.forEach((value, key) => {
                value === id && (read = "title read");
            });
            return (
                <Item
                    className="base-line"
                    multipleLine
                    key={id}
                    onClick={() => this.onRead(id)}
                >
                    <Flex justify="between" align="center">
                        <span className={read}>{title}</span>
                        <span className="time">{updated_at}</span>
                    </Flex>
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </Item>
            );
        });

        return (
            <div className="MessAgeCenter">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    消息中心
                </NavBar>
                <div className="base-content">
                    <List className="msgList">{msgItem}</List>
                </div>
            </div>
        );
    }
}
