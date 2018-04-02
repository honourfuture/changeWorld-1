import React from "react";
import { BaseComponent } from "../../common";
import { Card, Row, Col, Badge } from "antd";
import "./Dashboard.less";

const { Meta } = Card;
export default class Dashboard extends BaseComponent {
    render() {
        return (
            <div className="Dashboard">
                <Row>
                    <Col span={6}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <Badge count={99}>本周新增</Badge>,
                                <Badge count={99}>本月新增</Badge>
                            ]}
                        >
                            <Meta title="会员" description="新增会员" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                "开店审核",
                                "类目申请",
                                "续签申请",
                                "已到期",
                                "即将过期"
                            ]}
                        >
                            <Meta title="店铺" description="新开店铺审核" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                "本周新增",
                                "商品审核",
                                "举报",
                                "品牌管理"
                            ]}
                        >
                            <Meta
                                title="商品"
                                description="新增商品/品牌申请审核"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                "退款",
                                "退货",
                                "虚拟订单退款",
                                "投诉",
                                "待仲裁"
                            ]}
                        >
                            <Meta
                                title="订单"
                                description="交易订单及投诉/举报"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
