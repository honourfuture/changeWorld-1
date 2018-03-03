import React from "react";
import { action } from "mobx";
import { BaseComponent, NetImg, Base } from "../../common";
import { Flex, Tabs, Carousel } from "antd-mobile";
import "./Vanity.less";

const Utils = {
    units: "个十百千万@#%亿^&~",
    chars: "零一二三四五六七八九",
    numberToChinese: function(number) {
        const a = (number + "").split(""),
            s = [],
            t = this,
            j = a.length - 1;
        if (a.length > 12) {
            throw new Error("too big");
        } else {
            for (let i = 0; i <= j; i++) {
                if (j === 1 || j === 5 || j === 9) {
                    //两位数 处理特殊的 1*
                    if (i === 0) {
                        if (parseInt(a[i], 10) !== 1) {
                            s.push(t.chars.charAt(a[i]));
                        }
                    } else {
                        s.push(t.chars.charAt(a[i]));
                    }
                } else {
                    s.push(t.chars.charAt(a[i]));
                }
                if (i !== j) {
                    s.push(t.units.charAt(j - i));
                }
            }
        }
        return s
            .join("")
            .replace(/零([十百千万亿@#%^&~])/g, (m, d, b) => {
                //优先处理 零百 零千 等
                b = t.units.indexOf(d);
                if (b !== -1) {
                    if (d === "亿") return d;
                    if (d === "万") return d;
                    if (parseInt(a[j - b], 10) === 0) return "零";
                }
                return "";
            })
            .replace(/零+/g, "零")
            .replace(/零([万亿])/g, (m, b) => {
                // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                return b;
            })
            .replace(/亿[万千百]/g, "亿")
            .replace(/[零]$/, "")
            .replace(/[@#%^&~]/g, m => {
                return {
                    "@": "十",
                    "#": "百",
                    "%": "千",
                    "^": "十",
                    "&": "百",
                    "~": "千"
                }[m];
            })
            .replace(/([亿万])([一-九])/g, (m, d, b, c) => {
                c = t.units.indexOf(d);
                if (c !== -1) {
                    if (parseInt(a[j - c], 10) === 0) return d + "零" + b;
                }
                return m;
            });
    }
};
class VanityItem extends BaseComponent {
    render() {
        const { pretty_id, price } = this.props;
        const numRed = pretty_id.toString().slice(0, 4);
        const numLast = pretty_id
            .toString()
            .slice(4, pretty_id.toString().length);
        return (
            <div className="listItem">
                <div className="listItem-num">
                    <em>{numRed}</em>
                    {numLast}
                </div>
                <div className="listItem-price">
                    一口价：<em>￥{price}</em>
                </div>
            </div>
        );
    }
}

export class Vanity extends BaseComponent {
    store = {
        ad: [],
        pretty: [],
        pretty_count: []
    };
    componentDidMount() {
        Base.GET({ act: "shop", op: "pretty_index" }, res => {
            const { ad, pretty, pretty_count } = res.data;
            this.store.ad = ad;
            this.store.pretty = pretty;
            this.store.pretty_count = pretty_count;
        });
    }
    @action.bound
    onChange(tab, index) {
        const pretty_count = parseInt(
            this.store.pretty_count[index].pretty_count,
            10
        );
        Base.GET({ act: "shop", op: "pretty", pretty_count }, res => {
            this.store.pretty = res.data.pretty;
        });
    }
    render() {
        const { ad, pretty_count, pretty } = this.store;
        const tabs = pretty_count.map(val => {
            return { title: `${Utils.numberToChinese(val.pretty_count)}位数` };
        });
        tabs[0] = { title: "靓号" };
        const ads = ad.map((item, index) => {
            const { image, link } = item;
            return (
                <NetImg
                    key={index}
                    onClick={() => Base.push(link)}
                    src={image}
                    style={{ width: "100%" }}
                />
            );
        });
        const vanifyNum = pretty.map((item, index) => {
            return <VanityItem key={index} {...item} />;
        });
        return (
            <div className="Vanity base-content">
                {ads.length > 0 ? (
                    <Carousel autoplay={false} infinite dots={false}>
                        {ads}
                    </Carousel>
                ) : null}
                <div className="vanity-num">
                    <Tabs
                        tabs={tabs}
                        swipeable={false}
                        onChange={this.onChange}
                    >
                        <Flex wrap="wrap" className="vanity-num-list">
                            {vanifyNum}
                        </Flex>
                    </Tabs>
                </div>
            </div>
        );
    }
}
