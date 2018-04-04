import React from "react";
import { BaseComponent, Base } from "../../common";
import { Flex, Button, NavBar } from "antd-mobile";
import "./PayState.less";
import { icon, pay } from "../../images";

export default class PayState extends BaseComponent {
    payDic = { alipay: "支付宝支付", wechat: "微信支付", balance: "余额支付" };
    componentDidMount() {}
    render() {
        const {
            trade_sn,
            real_total_amount,
            payment_type
        } = Base.getPageParams();
        return (
            <div className="PayState">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    支付结果
                </NavBar>
                <div className="base-content">
                    <div className="PayState-box">
                        <img src={pay.paySuccess} alt="" />
                        <p className="PayState-box-tips">支付成功！</p>
                    </div>
                    <div className="PayState-order">
                        <div className="orderItem">
                            支付金额：<span>
                                ￥{Base.getNumFormat(real_total_amount)}
                            </span>
                        </div>
                        <div className="orderItem">
                            订单编号：<span>{trade_sn}</span>
                        </div>
                        <div className="orderItem">
                            支付方式：<span>{this.payDic[payment_type]}</span>
                        </div>
                    </div>
                    <Flex
                        align="center"
                        justify="center"
                        className="PayState-opear"
                    >
                        <Button
                            onClick={() => Base.push("MyOrder", { index: 2 })}
                            type="ghost"
                            inline
                            className="am-button-borderfix payBtn"
                        >
                            我的订单
                        </Button>
                        <Button
                            onClick={() => Base.push("ShopIndex")}
                            type="warning"
                            inline
                        >
                            回到首页
                        </Button>
                    </Flex>
                </div>
            </div>
        );
    }
}
