/*
 * @Author: daihanqiao@126.com
 * @Date: 2018-01-01 15:38:27
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:45:53
 * 通用头部组件
 */

import React from "react";
import { Layout, Menu, Icon, Spin, Dropdown, Avatar } from "antd";
import Debounce from "lodash-decorators/debounce";
import { Base, Global, BaseComponent } from "../../common";
import { action } from "mobx";
import "./GlobalHeader.less";

const { Header } = Layout;

export class GlobalHeader extends BaseComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    @action.bound
    toggle() {
        this.triggerResizeEvent();
        Global.store.isCollapsed = !Global.store.isCollapsed;
    }
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("resize", true, false);
        window.dispatchEvent(event);
    }
    @action.bound
    menuItemHandler({ key }) {
        switch (key) {
            case "logout":
                Base.GET(
                    { act: "login_out", op: "index", mod: "user" },
                    res => {
                        Base.setLocalData("verifyData", null);
                        Base.push("/user/login");
                    }
                );
                break;
            default:
                break;
        }
    }
    render() {
        const { header } = Global.userInfo;
        const menu = (
            <Menu
                onClick={this.menuItemHandler}
                className="menu"
                selectedKeys={[]}
            >
                {/* <Menu.Item disabled>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Divider /> */}
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="globalHeader">
                <Icon
                    className="trigger"
                    type={
                        Global.store.isCollapsed ? "menu-unfold" : "menu-fold"
                    }
                    onClick={this.toggle}
                />
                <div className="right">
                    <Dropdown overlay={menu}>
                        <span className="account">
                            <Avatar
                                size="small"
                                className="avatar"
                                src={Base.getImgUrl(header)}
                            />
                        </span>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}
