import React from 'react';
import { action } from 'mobx';
import { BaseComponent, Base } from '../../common';
import { Modal, Form, Button, Spin, Table } from 'antd';
import './OrderDetail.less';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

const FormItem = Form.Item;
export class OrderDetail extends BaseComponent {
    store = { visible: false, data: {} };
    orderProps = [
        { key: 'order_sn', label: '订单编号：' },
        {
            key: 'buyer_uid',
            label: '买家姓名：',
            render: value => <div>{this.store.data.user[value].nickname}</div>
        },
        {
            key: 'seller_uid',
            label: '卖家姓名：',
            render: value => <div>{this.store.data.user[value].nickname}</div>
        },
        {
            key: 'address_info',
            label: '发货信息：',
            render: value => {
                const data = JSON.parse(value);
                return (
                    <div>
                        <div>姓名：{data.username}</div>
                        <div>电话：{data.mobi}</div>
                        <div>地址：{data.address}</div>
                    </div>
                );
            }
        },
        {
            key: 'real_total_amount',
            label: '支付金额：',
            render: value => <div>￥ {value}</div>
        },
        {
            key: 'total_amount',
            label: '总金额：',
            render: value => <div>￥ {value}</div>
        },
        {
            key: 'use_point_amount',
            label: '积分抵扣：',
            render: value => <div>￥ {value}</div>
        },
        {
            key: 'use_ticket_amount',
            label: '优惠券抵扣：',
            render: value => <div>￥ {value}</div>
        },
        {
            key: 'has_e_invoice',
            label: '发票：',
            render: value => (
                <div>{parseInt(value, 10) ? '需要' : '不需要'}</div>
            )
        },
        {
            key: 'message',
            label: '买家家留言：'
        },
        {
            key: 'status',
            label: '订单状态：',
            render: value => <div>{this.store.data.status[value]}</div>
        }
    ];
    goodsProps = [
        {
            key: 'default_image',
            label: '商品图片',
            render: value => (
                <img className="goods-img" src={Base.getImgUrl(value)} alt=""  width='100' height='100'/>
            )
        },
        {
            key: 'name',
            label: '商品名称：'
        },
        {
            key: 'goods_price',
            label: '商品价格：'
        },
        {
            key: 'freight_fee',
            label: '运费：',
            render: value => (
                <div>{parseInt(value, 10) > 0 ? `￥ ${value}` : '免运费'}</div>
            )
        },
        {
            key: 'goods_attr',
            label: '商品规格',
            render: this.renderAttr
        }
    ];
    commissionProps = [
        {
            key: 'user_id',
            label: '用户ID'
        },
        {
            key: 'nickname',
            label: '用户昵称'
        },
        {
            key: 'mobi',
            label: '手机号'
        },
        {
            key: 'user_id',
            label: '用户ID'
        },
        {
            key: 'amount',
            label: '佣金/收入'
        },
        {
            key: 'point',
            label: '订单积分'
        },
        {
            key: 'exp',
            label: '订单经验'
        }
    ];
    @action.bound
    renderAttr(value) {
        if (!value) {
            return '';
        }
        const valueObj = JSON.parse(value || '');
        const { goods_attr_category } = this;
        const list = [];
        for (const key in valueObj) {
            if (valueObj.hasOwnProperty(key)) {
                const attr = [];
                const attrValue = valueObj[key];
                const title = (
                    goods_attr_category.find(item => item.id === key) || {}
                ).name;
                attr.push(
                    <div key={key}>
                        <span className="mr10">{title}:</span>
                        {attrValue.map((item, index) => {
                            return (
                                <span key={index} className="mr10">
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                );
                list.push(attr);
            }
        }
        return list;
    }
    @action.bound
    requetData(id, details) {
        Base.GET(
            { act: 'order', op: 'view', mod: 'admin', id, details: details },
            res => {
                this.store.data = res.data;
                this.store.visible = true;
            },
            this
        );
    }
    @action.bound
    show(id, details) {
        this.id = id;
        details = typeof details == 'undefined' ? 0 : details;
        if (!this.goods_attr_category) {
            Base.GET({ act: 'goods_attr_category', op: 'index' }, res => {
                this.goods_attr_category = res.data;
                this.requetData(id, details);
            });
        } else {
            this.requetData(id, details);
        }
    }
    @action.bound
    hideModal() {
        this.store.visible = false;
    }
    render() {
        const { visible, data } = this.store;
        let items = null;
        let goodsItems = [];
        let commissionUsers = '';
        if (data.hasOwnProperty('order')) {
            const { order, goods, commission } = data;
            items = this.orderProps.map((item, index) => {
                const { key, label, render } = item;
                const value = !render ? order[key] : render(order[key]);
                return (
                    <FormItem key={index} {...formItemLayout} label={label}>
                        {value}
                    </FormItem>
                );
            });
            goodsItems = goods.map((goodsData, index) => {
                const goodsCon = this.goodsProps.map((item, itemIndex) => {
                    const { key, label, render } = item;
                    let value = !render
                        ? goodsData[key]
                        : render(goodsData[key]);
                    if (key === 'goods_price') {
                        value = `￥${goodsData[key]}　　x${goodsData.num}`;
                    }
                    return (
                        <FormItem
                            key={itemIndex}
                            {...formItemLayout}
                            label={label}
                        >
                            {value}
                        </FormItem>
                    );
                });
                return (
                    <div key={index} className="goods-con">
                        {goodsCon}
                    </div>
                );
            });
            commissionUsers = () => {
                const columns = [
                    {
                        title: '昵称',
                        dataIndex: 'nickname'
                    },
                    {
                        title: '手机号',
                        dataIndex: 'mobi'
                    },
                    {
                        title: '所得收益',
                        dataIndex: 'amount'
                    },
                    {
                        title: '所得积分',
                        dataIndex: 'point'
                    },
                    {
                        title: '所得经验',
                        dataIndex: 'exp'
                    }
                ];
                const dataSource = commission;
                return (
                    <div className="goods-con">
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                );
            };
        }
        return (
            <Spin ref="spin" wrapperClassName="OrderDetail" spinning={false}>
                <Modal
                    width='800px'
                    className="OrderDetailModal"
                    title="订单详情"
                    visible={visible}
                    closable={false}
                    onCancel={this.hideModal}
                    footer={[
                        <Button
                            key="submit"
                            type="primary"
                            onClick={this.hideModal}
                        >
                            确认
                        </Button>
                    ]}
                >
                    <Form>
                        <div>
                            <div className="con-title">订单信息</div>
                            {items}
                        </div>
                        <div>
                            <div className="con-title goods">商品信息</div>
                            {goodsItems}
                        </div>
                        <div>
                            <div className="con-title goods">收益信息</div>
                            {commissionUsers ? commissionUsers() : null}
                        </div>
                    </Form>
                </Modal>
            </Spin>
        );
    }
}
