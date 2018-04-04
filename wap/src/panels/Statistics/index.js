import React from "react";
import { BaseComponent, Base } from "../../common";
import "./Statistics.less";

export default class Statistics extends BaseComponent {
    render() {
        return (
            <div className="Statistics">
                <div className="intBox">
                    <div className="myInt">
                        <div className="round">1162</div>
                        <div className="intRule" onClick={this.ruleHandler}>
                            积分规则 >
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
