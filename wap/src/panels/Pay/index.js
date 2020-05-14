import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Flex, Button, Radio, NavBar, Toast } from "antd-mobile";
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
            },
            {
                type: "point"
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
        const { pretty_id, id, isPretty } = Base.getPageParams();
        const { curIndex, payTypeList } = this.store;
        const { type } = payTypeList[curIndex];
        const { pay_sn, order_sn } = Base.getPageParams();
        const trade_type = pay_sn ? "pay_sn" : "order_sn";
        const trade_sn = pay_sn ? pay_sn : order_sn;
        const { real_total_amount, balance } = this.store.data;
        if (parseInt(isPretty)) {
            Base.POST(
                {
                    act: "pretty",
                    op: "payment",
                    mod: "user",
                    payment_type: type,
                    id
                },
                res => {
                    const callBack = data => {
                        if (parseInt(data) === 1) {
                            Base.push("PayState", {
                                pretty_id,
                                real_total_amount,
                                payment_type: type
                            });
                        } else {
                            Toast.fail("支付失败", 2, null, false);
                        }
                    };
                    if (type === "balance" || type== 'point') {
                        callBack(1);
                    } else {
                        // const data =
                        //     typeof res.data === "string"
                        //         ? `${res.data}&payment_type=${type}`
                        //         : JSON.stringify({
                        //               data:res.data,
                        //               payment_type: type
                        //           });
                        const data = JSON.stringify({
                            data: res.data,
                            payment_type: type
                        });
                        if (window.JKEventHandler) {
                            window.JKEventHandler.callNativeFunction(
                                "payWithParams",
                                data,
                                "callbackID",
                                callBack
                            );
                        } else if (window.Native) {
                            window.payHandler = callBack;
                            window.Native.payWithParams(data, "payHandler");
                        }
                    }
                }
            );
        } else {
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
                    const callBack = data => {
                        if (parseInt(data) === 1) {
                            Base.push("PayState", {
                                trade_sn,
                                real_total_amount,
                                payment_type: type
                            });
                        } else {
                            Toast.fail("支付失败", 2, null, false);
                        }
                    };
                    if (type === "balance") {
                        callBack(1);
                    } else {
                        const data = JSON.stringify({
                            data: res.data,
                            payment_type: type
                        });
                        if (window.JKEventHandler) {
                            window.JKEventHandler.callNativeFunction(
                                "payWithParams",
                                data,
                                "callbackID",
                                callBack
                            );
                        } else if (window.Native) {
                            window.payHandler = callBack;
                            window.Native.payWithParams(data, "payHandler");
                        }
                    }
                }
            );
        }
    }
    componentDidMount() {
        const { pay_sn, order_sn, id, isPretty } = Base.getPageParams();
        if (parseInt(isPretty) === 1) {
            Base.GET({ act: "pretty", op: "view", mod: "user", id }, res => {
                this.store.data = {
                    ...res.data,
                    real_total_amount: res.data.price
                };
            });
        } else {
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
    }
    render() {
        console.log(Base.getPageParams())
        const { pay_sn, order_sn, id, isPretty } = Base.getPageParams();
        const { payTypeList, curIndex, data } = this.store;
        const { real_total_amount, balance, point } = data;
        const payTypes = payTypeList.map((item, index) => {
//          if(index == 3 && !isPretty){
//              return ;
//          }
            const { type } = item;
            console.log(type,'9996')
            if(type === 'point' && isPretty){
                return (
                    <Flex
                justify="between"
                key={type}
                onClick={() => this.changeHandler(index)}
            >
            <Flex.Item>
                <span className="pay-gold">积分支付</span>
                    <span className="account-money">
                    积分余额：{Base.getNumFormat(point)}
            </span>
                </Flex.Item>
                <Flex.Item>
                <Radio checked={curIndex === index} name={type} />
                </Flex.Item>
                </Flex>
            );
            }else  if (type === "balance") {
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
        <em>{+curIndex !== 3 ? '支付金额：' : '积分支付:'}</em>
        ￥{curIndex !==3? Base.getNumFormat(real_total_amount):'131456'}
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
