import React from "react";
import { BaseComponent, Base } from "../../common";
import { Button } from "antd-mobile";
import "./NoData.less";

export class NoData extends BaseComponent {
    render() {
        const { img, btnLabel, label, onClick } = this.props;
        return (
            <div className="NoData">
                <img src={img} alt="" />
                <div>{label}</div>
                <Button onClick={onClick} size="small" inline type="ghost">
                    {btnLabel}
                </Button>
            </div>
        );
    }
}
