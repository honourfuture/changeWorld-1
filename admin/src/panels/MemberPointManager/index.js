import React from "react";
import { BaseComponent } from "../../common";
import { Tabs } from "antd";
import "./MemberPointManager.less";

import { PointDetail } from "../../components/PointDetail";
import { PointRuleSet } from "../../components/PointRuleSet";
import PointSet from "../../components/PointSet";

const TabPane = Tabs.TabPane;
export default class MemberPointManager extends BaseComponent {
    render() {
        const panes = [
            { title: "积分明细", content: <PointDetail />, key: "1" },
            { title: "规则设置", content: <PointRuleSet />, key: "2" },
            { title: "积分增减", content: <PointSet />, key: "3" }
        ];
        const tabPan = panes.map(item => {
            const { title, key, content } = item;
            return (
                <TabPane key={key} tab={title}>
                    {content}
                </TabPane>
            );
        });
        return (
            <div className="MemberPointManager">
                <Tabs>{tabPan}</Tabs>
            </div>
        );
    }
}
