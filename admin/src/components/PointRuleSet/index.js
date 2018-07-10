import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import { Form, Input, Button, Row, Col, message } from "antd";
import "./PointRuleSet.less";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
const FormItem = Form.Item;
class PointRuleSet extends BaseComponent {
    store = {
        pageDate: {}
    };
    showProps = [
        // { key: "points_reg", label: "会员注册" },
        // { key: "points_login", label: "会员登陆" },
        // { key: "points_evaluate", label: "会员评论" },
        { key: "points_pay", label: "消费" }
        // { key: "points_order", label: "订单上限" },
        // { key: "line", label: "积分兑换商品规则" }
        // { key: "goods_exchange", label: "抵扣积分" }
    ];
    @action.bound
    onSaveBasic(value) {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Base.POST(
                    { act: "points_rule", op: "save", mod: "admin", ...values },
                    res => {
                        message.success(res.message);
                    },
                    this
                );
            }
        });
    }
    componentDidMount() {
        Base.POST(
            { act: "points_rule", op: "index", mod: "admin" },
            res => {
                this.store.pageDate = res.data;
            },
            this
        );
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { showProps } = this;
        const { pageDate } = this.store;
        const items = showProps.map((item, index) => {
            const { key, label } = item;
            if (key === "line") {
                return (
                    <div key={index} style={{ marginBottom: 24 }}>
                        {label}
                    </div>
                );
            } else {
                return (
                    <FormItem
                        className="baseForm"
                        key={index}
                        {...formItemLayout}
                        label={label}
                    >
                        {getFieldDecorator(key, {
                            initialValue: pageDate[key]
                        })(<Input placeholder={`请输入${label}`} />)}
                    </FormItem>
                );
            }
        });
        return (
            <div className="PointRuleSet">
                {items}
                <Row>
                    <Col span={4} />
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => this.onSaveBasic()}
                        >
                            确认提交
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Form.create()(PointRuleSet);
