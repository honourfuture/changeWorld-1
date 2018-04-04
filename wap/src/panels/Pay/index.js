import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Flex, Button, Radio, NavBar } from "antd-mobile";
import "./Pay.less";
import { icon, test, pay } from "../../images";

const payIconDic = {
    alipay: pay.payZfb,
    wechat: pay.payWx
};
export default class Pay extends BaseComponent {
    store = {
        payTypeList: [
            {
                type: "alipay"
            },
            {
                type: "wechat"
            },
            {
                type: "balance"
            }
        ],
        curIndex: 0,
        data: {}
    };
    @action.bound
    changeHandler(index) {
        this.store.curIndex = index;
    }
    @action.bound
    payHandler() {
        const { curIndex, payTypeList } = this.store;
        const { type } = payTypeList[curIndex];
        const { pay_sn, order_sn } = Base.getPageParams();
        const trade_type = pay_sn ? "pay_sn" : "order_sn";
        const trade_sn = pay_sn ? pay_sn : order_sn;
        const { real_total_amount, balance } = this.store.data;
        Base.POST(
            {
                act: "order_payment",
                op: "payment",
                mod: "user",
                payment_type: type,
                trade_type,
                trade_sn
            },
            res => {
                if (window.JKEventHandler) {
                    window.JKEventHandler.callNativeFunction(
                        JSON.stringify({ ...res.data, payment_type: type }),
                        data => {
                            Base.push("PayState", {
                                trade_sn,
                                real_total_amount,
                                payment_type: type
                            });
                        }
                    );
                }
            }
        );
    }
    componentDidMount() {
        const { pay_sn, order_sn } = Base.getPageParams();
        Base.GET(
            {
                act: "order_payment",
                op: "index",
                mod: "user",
                trade_type: pay_sn ? "pay_sn" : "order_sn",
                trade_sn: pay_sn ? pay_sn : order_sn
            },
            res => {
                this.store.data = res.data;
            }
        );
    }
    render() {
        const { payTypeList, curIndex, data } = this.store;
        const { real_total_amount, balance } = data;
        const payTypes = payTypeList.map((item, index) => {
            const { type } = item;
            if (type === "balance") {
                return (
                    <Flex
                        justify="between"
                        key={type}
                        onClick={() => this.changeHandler(index)}
                    >
                        <Flex.Item>
                            <span className="pay-gold">余额支付</span>
                            <span className="account-money">
                                账户余额：￥{Base.getNumFormat(balance)}
                            </span>
                        </Flex.Item>
                        <Flex.Item>
                            <Radio checked={curIndex === index} name={type} />
                        </Flex.Item>
                    </Flex>
                );
            } else {
                return (
                    <Flex
                        justify="between"
                        key={type}
                        onClick={() => this.changeHandler(index)}
                    >
                        <Flex.Item>
                            <img src={payIconDic[type]} alt="" />
                        </Flex.Item>
                        <Flex.Item>
                            <Radio checked={curIndex === index} name={type} />
                        </Flex.Item>
                    </Flex>
                );
            }
        });
        return (
            <div className="Pay">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    支付
                </NavBar>
                <div className="base-content">
                    <div className="Pay-box">
                        <div className="Pay-box-mode">
                            <h4 className="pay-h4">支付方式</h4>
                            <div className="pay-check">
                                {payTypes}
                                <span className="payMoney">
                                    <em>支付金额：</em>
                                    ￥{Base.getNumFormat(real_total_amount)}
                                </span>
                            </div>
                        </div>
                        <Flex
                            justify="center"
                            align="center"
                            className="Pay-box-opear"
                        >
                            <Button onClick={this.payHandler} type="warning">
                                下一步
                            </Button>
                        </Flex>
                    </div>
                </div>
            </div>
        );
    }
}
