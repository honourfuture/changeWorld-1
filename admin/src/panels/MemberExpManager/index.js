import React from "react";
import { BaseComponent } from "../../common";
import { Tabs } from "antd";
import "./MemberExpManager.less";

import { ExpList } from "../../components/ExpList";
import {ExpRuleSet } from "../../components/ExpRuleSet";
import { ExpLvSet } from "../../components/ExpLvSet";
import { RankLvSet } from "../../components/RankLvSet";
import { ContinueSignSet } from "../../components/ContinueSignSet";

const TabPane = Tabs.TabPane;
export default class MemberExpManager extends BaseComponent {
    render() {
        const panes = [
            { title: "级别设置", content: <RankLvSet />, key: "4" },
            { title: '经验值明细', content: <ExpList />, key: '1' },
            { title: '规则设置', content: <ExpRuleSet />, key: '2' },
            { title: "等级设置", content: <ExpLvSet />, key: "3" },
            { title: "连续等级设置", content: <ContinueSignSet type={1}/>, key: "5" }
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
            <div className="MemberExpManager">
                <Tabs>{tabPan}</Tabs>
            </div>
        );
    }
}
