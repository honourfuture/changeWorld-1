/*
 * @Author: daihanqiao@126.com
 * @Date: 2018-01-01 15:38:48
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-01 15:45:34
 * 通用侧边栏菜单组件
 */
import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { getMenuData } from "./GlobalMenu.config";
import { Global, BaseComponent, Base } from "../../common";
import { action, observable } from "mobx";
import "./GlobalMenu.less";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { store } = Global;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = observable([]);
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `/${item.path}`,
                to: `/${item.children[0].path}`
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

export { redirectData };

export class GlobalMenu extends BaseComponent {
    constructor(props) {
        super(props);
        this.store = { menus: getMenuData() };
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props)
        };
        //切换后台
        Global.observeUserInfo(() => {
            this.setAccess();
        });
    }
    componentDidMount() {
        this.setAccess();
    }
    @action.bound
    setAccess() {
        // Base.GET({ act: "admin", op: "access", mod: "admin" }, res => {
        //     const { is_root, access } = res.data;
        //     if (parseInt(is_root)) {
        //         redirectData.clear();
        //         let list = getMenuData();
        //         list.forEach(getRedirect);
        //         this.store.menus = list;
        //     } else {
        //         const subAccess = (access.access || "").split(",");
        //         let list = getMenuData(subAccess);
        //         list = list.filter(
        //             item => item.children && item.children.length > 0
        //         );
        //         redirectData.clear();
        //         list.forEach(getRedirect);
        //         this.store.menus = list;
        //     }
        // });
    }
    getFlatMenuKeys(menus) {
        let keys = [];
        menus.forEach(item => {
            if (item.children) {
                keys.push(item.path);
                keys = keys.concat(this.getFlatMenuKeys(item.children));
            } else {
                keys.push(item.path);
            }
        });
        return keys;
    }
    getSelectedMenuKeys = path => {
        if (!this.flatMenuKeys) {
            this.flatMenuKeys = this.getFlatMenuKeys(this.store.menus);
        }
        if (this.flatMenuKeys.indexOf(path.replace(/^\//, "")) > -1) {
            return [path.replace(/^\//, "")];
        }
        if (
            this.flatMenuKeys.indexOf(
                path.replace(/^\//, "").replace(/\/$/, "")
            ) > -1
        ) {
            return [path.replace(/^\//, "").replace(/\/$/, "")];
        }
        return this.flatMenuKeys.filter(item => {
            const itemRegExpStr = `^${item.replace(/:[\w-]+/g, "[\\w-]+")}$`;
            const itemRegExp = new RegExp(itemRegExpStr);
            return itemRegExp.test(path.replace(/^\//, "").replace(/\/$/, ""));
        });
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                openKeys: this.getDefaultCollapsedSubMenus(nextProps)
            });
        }
    }
    getDefaultCollapsedSubMenus(props) {
        const {
            location: { pathname }
        } = props || this.props;
        const snippets = pathname.split("/").slice(1, -1);
        const currentPathSnippets = snippets.map((item, index) => {
            const arr = snippets.filter((_, i) => i <= index);
            return arr.join("/");
        });
        let currentMenuSelectedKeys = [];
        currentPathSnippets.forEach(item => {
            currentMenuSelectedKeys = currentMenuSelectedKeys.concat(
                this.getSelectedMenuKeys(item)
            );
        });
        if (currentMenuSelectedKeys.length === 0) {
            return [this.store.menus[0].path];
        }
        return currentMenuSelectedKeys;
    }
    getNavMenuItems(menusData) {
        if (!menusData) {
            return [];
        }
        return menusData.map(item => {
            if (!item.name) {
                return null;
            }
            let itemPath;
            if (item.path && item.path.indexOf("http") === 0) {
                itemPath = item.path;
            } else {
                itemPath = `/${item.path || ""}`.replace(/\/+/g, "/");
            }
            if (item.children && item.children.some(child => child.name)) {
                return item.hideInMenu ? null : (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                item.name
                            )
                        }
                        key={item.key || item.path}
                    >
                        {this.getNavMenuItems(item.children)}
                    </SubMenu>
                );
            }
            const icon = item.icon && <Icon type={item.icon} />;
            return item.hideInMenu ? null : (
                <Menu.Item key={item.key || item.path}>
                    {/^https?:\/\//.test(itemPath) ? (
                        <a href={itemPath} target={item.target}>
                            {icon}
                            <span>{item.name}</span>
                        </a>
                    ) : (
                        <Link
                            to={itemPath}
                            target={item.target}
                            replace={itemPath === this.props.location.pathname}
                        >
                            {icon}
                            <span>{item.name}</span>
                        </Link>
                    )}
                </Menu.Item>
            );
        });
    }
    handleOpenChange = openKeys => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.store.menus.some(
            item =>
                lastOpenKey &&
                (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys]
        });
    };
    @action.bound
    onCollapse() {
        store.isCollapsed = !store.onCollapse;
    }
    render() {
        const {
            location: { pathname }
        } = this.props;
        const { openKeys } = this.state;
        const menuProps = store.isCollapsed
            ? {}
            : {
                  openKeys
              };
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={store.isCollapsed}
                breakpoint="md"
                onCollapse={this.onCollapse}
                width={256}
                className="globalMenu"
            >
                <div className="log">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>猪买单</h1>
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    {...menuProps}
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={selectedKeys}
                    style={{ padding: "16px 0", width: "100%" }}
                >
                    {this.getNavMenuItems(this.store.menus)}
                </Menu>
            </Sider>
        );
    }
}
