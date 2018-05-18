import React from "react";
import { BaseComponent, Base } from "../../common";
import { Flex } from "antd-mobile";
import "./OrderGoodsItem.less";
const w = document.body.offsetWidth;
export class OrderGoodsItem extends BaseComponent {
    render() {
        const {
            name,
            default_image,
            goods_attr,
            sale_price,
            num
        } = this.props.item;
        let goodsAttrStr = "";
        const goodsAttrDic = goods_attr ? JSON.parse(goods_attr) : [];
        for (const key in goodsAttrDic) {
            if (goodsAttrDic.hasOwnProperty(key)) {
                goodsAttrStr += ` ${goodsAttrDic[key]}`;
            }
        }
        return (
            <Flex
                align="start"
                style={{ width: w }}
                className="OrderGoodsItem goods-info base-line"
            >
                <img
                    className="goods-img"
                    src={Base.getImgUrl(default_image)}
                    alt=""
                />
                <Flex.Item>
                    <Flex justify="between" align="start">
                        <div className="title ellipsis">{name}</div>
                        <div className="price">￥ {sale_price}</div>
                    </Flex>
                    <Flex justify="between" className="bottom-info">
                        <div className="spec">{goodsAttrStr}</div>
                        <div className="spec">x{num}</div>
                    </Flex>
                </Flex.Item>
            </Flex>
        );
    }
}
