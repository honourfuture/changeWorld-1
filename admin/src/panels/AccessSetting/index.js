import React from "react";
import { action, toJS } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import { Checkbox, Row, Col, Button, message } from "antd";
import "./AccessSetting.less";
import { getMenuData } from "../../common/GlobalMenu/GlobalMenu.config";
// const CheckboxGroup = Checkbox.Group;
// const checkList = [];
// getMenuData().forEach((item,key) => {
// 	const { children } = item;
// 	if (children && children.length > 0) {
// 		children.map(subItem => {
// 			const { path, name } = subItem;
// 			let value = path.split('/')[1];
// 			let label = name;
// 			checkList.push({
// 				value,
// 				label
// 			});
// 		});
// 	} else {
// 		const { path, name } = item;
// 		let value = path.split('/')[1];
// 		let label = name;
// 		checkList.push({
// 			value,
// 			label
// 		});
// 	}
// });

export default class AccessSetting extends BaseComponent {
    constructor() {
        super();
        this.store = {
            defaultCheckedList: [],
            list: []
        };
    }
    @action.bound
    onSaveBasic() {
        const { defaultCheckedList } = this.store;
        console.log(toJS(defaultCheckedList), "onSaveBasic");
        Base.POST(
            {
                act: "admin_role",
                op: "access",
                mod: "admin",
                id: this.id,
                access: defaultCheckedList
            },
            res => {
                message.success(res.message);
                Base.goBack();
            },
            this
        );
    }
    @action.bound
    onChange(e) {
        this.store.defaultCheckedList = e;
    }
    componentDidMount() {
        this.id = Base.getPageParams("id");
        Base.GET(
            {
                act: "admin_role",
                op: "index",
                mod: "admin"
            },
            res => {
                const list = res.data.slice();
                list.find(item => {
                    if (item.id === this.id) {
                        if (typeof item.access === "string") {
                            this.store.defaultCheckedList = item.access.split(
                                ","
                            );
                        } else {
                            this.store.defaultCheckedList = item.access || [];
                        }
                    }
                });
            },
            this
        );
    }
    render() {
        this.checkboxItem = getMenuData().map((item, key) => {
            const { name, path, children } = item;
            if (Global.userInfo.access != "admin" && path === "system") {
                children.map((item, key) => {
                    if (
                        item.path == "system/AdminManage" ||
                        item.path == "system/AdminRoleList"
                    ) {
                        delete children[key];
                    }
                });
            }
            if (children && children.length > 0) {
                children.map(subItems => {
                    const { path, name } = subItems;
                    subItems.label = name;
                    subItems.value = path.split("/")[1];
                });
            }
            let test = children.map((item, key) => {
                const { name, path } = item;
                return (
                    <Col key={key} span={6}>
                        <Checkbox value={path.split("/")[1]}>{name}</Checkbox>
                    </Col>
                );
            });
            return (
                <div key={key}>
                    <div className="title">{name}</div>
                    <Row gutter={24}>{test}</Row>
                </div>
            );
        });
        const { defaultCheckedList } = this.store;
        return (
            <div className="AccessSetting">
                <Checkbox.Group
                    value={defaultCheckedList}
                    onChange={e => this.onChange(e)}
                >
                    {this.checkboxItem}
                </Checkbox.Group>
                <Row gutter={24}>
                    <Col>
                        <Button
                            className="saveBtn"
                            type="primary"
                            onClick={() => this.onSaveBasic()}
                        >
                            确认提交
                        </Button>
                        <Button
                            className="saveBtn"
                            type="default"
                            onClick={() => Base.goBack()}
                        >
                            返回
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
