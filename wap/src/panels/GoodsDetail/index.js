import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, NetImg, Global } from "../../common";
import {
    Flex,
    NavBar,
    Icon,
    Carousel,
    Badge,
    Checkbox,
    Stepper,
    Button,
    Toast,
    WhiteSpace
} from "antd-mobile";
import "./GoodsDetail.less";
import { icon } from "../../images";

const wDevice = document.body.offsetWidth;

class EvaluateItem extends BaseComponent {
    render() {
        const { header, nickname, remark,photos,lv  } = this.props;
        const photo = JSON.parse(JSON.parse(photos));
		let photosItem = (photo || []).map((item,key)=>{
			return <NetImg className="desImg" src={Base.getImgUrl(item)} key={key}/>
		});
        return (
            <div className="evaluate-item am-flexbox-align-start am-flexbox">
                <NetImg className="userImg" src={Base.getImgUrl(header)} />
                <div>
                    <div className="name">
                        {Base.getAnonymity(nickname)} 等级：{lv}
                    </div>
                    <div className="des">
                        {remark}
                    </div>
                    {
					    photo.length > 0 ? (<div className="photos">
                            {photosItem}
                        </div>) : null
                    }
                </div>
                
            </div>
        );
    }
}

class GoodsItem extends BaseComponent {
    @action.bound
    onClick() {
        const { id } = this.props;
        Base.push("GoodsDetail", { id });
        window.location.reload();
    }
    render() {
        const { default_image, name, sale_price } = this.props;
        return (
            <div className="goods-item" onClick={this.onClick}>
                <NetImg src={Base.getImgUrl(default_image)} />
                <div className="title ellipsis2">{name}</div>
                <div className="price">￥{sale_price}</div>
            </div>
        );
    }
}

class AddressItem extends BaseComponent {
    @action.bound
    checkHandler() {
        const { onCheckHandler, index } = this.props;
        onCheckHandler(index);
    }
    render() {
        const { is_default, address, checked } = this.props;
        return (
            <Flex className="address-item" onClick={this.checkHandler}>
                <img src={icon.addressIcon} alt="" />
                <Flex.Item className="ellipsis">{`${
                    parseInt(is_default, 10) ? "[默认]" : ""
                }${address}`}</Flex.Item>
                <Checkbox checked={checked} />
            </Flex>
        );
    }
}

class AttrSelect extends BaseComponent {
    store = { curIndex: -1 };
    @action.bound
    selectItemHandler(index) {
        this.store.curIndex = index;
    }
    get value() {
        const { attrList } = this.props;
        const { curIndex } = this.store;
        return curIndex >= 0 ? attrList[curIndex] : "";
    }
    render() {
        const { curIndex } = this.store;
        const { attrList, attrTitle } = this.props;
        const attrItems = attrList.map((item, index) => {
            const disable = false;
            return (
                <Flex
                    key={index}
                    className="select-item-con"
                    onClick={() => this.selectItemHandler(index)}
                >
                    <div
                        className={`select-item ${disable ? "disable" : ""} ${
                            curIndex === index ? "selected" : ""
                        }`}
                    >
                        {item}
                    </div>
                </Flex>
            );
        });
        return (
            <div className="select-con">
                <div className="title">{attrTitle}</div>
                <Flex className="select-group base-line" wrap="wrap">
                    {attrItems}
                </Flex>
            </div>
        );
    }
}

class AttrSelectGroup extends BaseComponent {
    get value() {
        const data = {};
        let isNoSelect = false;
        const refDic = this.refDic;
        for (const key in refDic) {
            if (refDic.hasOwnProperty(key)) {
                const { value } = refDic[key];
                if (!value) {
                    isNoSelect = true;
                }
                data[key] = [value];
            }
        }
        return isNoSelect ? null : data;
    }
    refDic = {};
    render() {
        const { goods_attr, goodsAttrDic } = this.props;
        const goodsAttrItems = [];
        for (const key in goods_attr) {
            if (goods_attr.hasOwnProperty(key)) {
                const attrTitle = goodsAttrDic[key];
                const attrs = goods_attr[key];
                goodsAttrItems.push(
                    <AttrSelect
                        attrList={attrs}
                        attrTitle={attrTitle}
                        key={key}
                        ref={e => (this.refDic[key] = e)}
                    />
                );
            }
        }
        return <div>{goodsAttrItems}</div>;
    }
}

export default class GoodsDetail extends BaseComponent {
    store = {
        favorite: false,
        isAddressModal: false,
        curAddressIndex: 0,
        buyModalStatus: 0,
        selectNum: 1,
        evaluate: {},
        goods: [],
        goods_attr: {},
        goods_info: {},
        seller: {},
        address: [],
        sale_num: 0,
        goods_explain: "",
        cardTotal: 0
    };
    componentDidMount() {
        const { id } = Base.getPageParams();
        Base.GET({ act: "goods", op: "view", goods_id: id }, res => {
            const {
                evaluate,
                goods = {},
                goods_attr,
                goods_info,
                seller,
                favorite,
                sale_num,
                goods_explain,
                rate
            } = res.data;
            this.store.evaluate = evaluate;
            this.store.goods = goods;
            this.store.goods_attr = goods_attr;
            this.store.goods_info = goods_info;
            this.store.seller = seller;
            this.store.favorite = favorite;
            this.store.sale_num = sale_num || "0";
            this.store.goods_explain = goods_explain;
            this.store.rate = rate;
            Base.GET({ act: "cart", op: "count", mod: "user" }, res => {
                const data = res.data;
                this.store.cardTotal = data.count;
            });
            Base.GET(
                { act: "address", op: "index" },
                res => {
                    this.store.address = res.data.map((item, index) => {
                        let {
                            province,
                            city,
                            address,
                            id,
                            is_default,
                            area
                        } = item;
                        address = `${province} ${city} ${area} ${address}`;
                        if (parseInt(item.is_default, 10) === 1) {
                            this.store.curAddressIndex = index;
                        }
                        return {
                            id,
                            address,
                            is_default,
                            checked: parseInt(item.is_default, 10) === 1
                        };
                    });
                },
                null,
                true
            );
        });

        
    }
    @action.bound
    collectHandler() {
        const { id } = Base.getPageParams();
        Base.POST(
            {
                act: "collection",
                op: "save",
                mod: "user",
                topic: 2,
                sub_topic: 40,
                t_id: id
            },
            res => {
                this.store.favorite = !this.store.favorite;
            }
        );
    }
    @action.bound
    addressHandler() {
        const { address } = this.store;
        if (address.length > 0) {
            this.store.isAddressModal = !this.store.isAddressModal;
        } else {
            Base.push("NewAddress");
        }
    }
    @action.bound
    onCheckHandler(index) {
        this.store.curAddressIndex = index;
        this.addressHandler();
    }
    @action.bound
    buyModalHandler(type) {
        this.store.buyModalStatus = type;
    }
    @action.bound
    stepperHandler(value) {
        this.store.selectNum = value;
    }
    @action.bound
    onAddShopCart(goods_id, goods_attr, num) {
        Base.POST(
            {
                act: "cart",
                op: "add",
                mod: "user",
                goods_id,
                num,
                goods_attr
            },
            res => {
                Toast.success("添加购物车成功", 2, null, false);
                this.buyModalHandler(0);
            }
        );
    }
    @action.bound
    onNextStep() {
        const { buyModalStatus, goods_info = {}, selectNum } = this.store;
        let goods_attr = this.attrSelectGroup.value;
        if (!goods_attr) {
            return Toast.fail("请选择商品规格", 2, null, false);
        }
        const goods_id = goods_info.id;
        goods_attr = JSON.stringify(goods_attr);
        if (buyModalStatus === 1) {
            this.onAddShopCart(goods_id, goods_attr, selectNum);
        } else {
            Base.push("ConfirmOrder", { goods_id, goods_attr, num: selectNum });
        }
    }
    @action.bound
    onShare() {
        const { goods_info = {} } = this.store;
        let { name = "", default_image = "" } = goods_info;
        Base.getAuthData(({ user_id }) => {
            const shareData = {
                title: name,
                description: "",
                imageUrl: Base.getImgUrl(default_image),
                linkUrl: `${
                    Global.RES_URL
                }/wap/index.html#/Share?invite_uid=${user_id}&type=0`
            };
            Base.pushApp("openShareView", JSON.stringify(shareData));
        });
    }
    render() {
        const {
            favorite,
            isAddressModal,
            curAddressIndex,
            buyModalStatus,
            selectNum,
            evaluate = {},
            goods = {},
            goods_info = {},
            seller = {},
            address = [],
            sale_num,
            goods_explain,
            rate
        } = this.store;
        let {
            goods_image = "",
            sale_price = "",
            name = "",
            freight_fee = "",
            goods_ticket = "",
            use_point_rate = "",
            rebate_percent = 0,
            base_percent = 0,
            guarantee = false,
            e_invoice = "",
            goods_detail = "",
            buy_notice = "",
            seller_uid = "",
            goods_attr = "",
            id,
            default_image = ""
        } = goods_info;
        // console.log(goods_info)
        try {
            goods_attr = JSON.parse(goods_attr);
        } catch (error) {
            goods_attr = {};
        }
        const goodsAttrDic = this.store.goods_attr;
        const { header = "", nickname = "", summary = "", v = "",reward_point='' } = seller;
        const { list = [], total = "" } = goods;
        try {
            goods_image = JSON.parse(goods_image);
        } catch (error) {
            goods_image = [];
        }
        const goodsImgs = goods_image.map((val, index) => {
            return (
                <NetImg
                    key={index}
                    src={Base.getImgUrl(val)}
                    style={{
                        width: wDevice,
                        height: wDevice,
                        verticalAlign: "top"
                    }}
                />
            );
        });
        freight_fee = parseFloat(freight_fee);
        goods_ticket = goods_ticket ? JSON.parse(goods_ticket) : [];
        const goodsTickets = goods_ticket.map((item, index) => {
            const { full_amount = "", free_amount = "" } = item;
            if (parseFloat(full_amount) > 0) {
                return (
                    <div className="flex-item base-line" key={index}>
                        <Flex>
                            <div className="title">优惠券</div>
                            <div className="des">
                                满<em>{full_amount}</em>减<em>{free_amount}</em>
                            </div>
                        </Flex>
                    </div>
                );
            }
            return null;
        });
        goods_detail = goods_detail ? JSON.parse(goods_detail) : [];
        const goodsDetailImgs = goods_detail.map((item, index) => {
            return <img src={Base.getImgUrl(item)} key={index} alt="" />;
        });
        const evaluateList = evaluate.list || [];
        const evaluateUser = evaluate.user || {};
        const evaluateItems = evaluateList.map((item, index) => {
            const data = { ...item, ...evaluateUser[item.user_id] };
            return <EvaluateItem key={index} {...data} />;
        });
        const goodsItems = list.map((item, index) => {
            return <GoodsItem key={index} {...item} />;
        });
        const addressItems = address.map((item, index) => {
            return (
                <AddressItem
                    key={index}
                    {...item}
                    index={index}
                    checked={curAddressIndex === index}
                    onCheckHandler={this.onCheckHandler}
                />
            );
        });
        // const goodsAttrItems = [];
        // for (const key in goods_attr) {
        //     if (goods_attr.hasOwnProperty(key)) {
        //         const attrTitle = goodsAttrDic[key];
        //         const attrs = goods_attr[key];
        //         goodsAttrItems.push(
        //             <AttrSelect
        //                 attrList={attrs}
        //                 attrTitle={attrTitle}
        //                 key={key}
        //             />
        //         );
        //     }
        // }
        const chatData = { ...seller, id: seller_uid };
        const seller_address = seller.address || "";
        const { cardTotal } = this.store;
        return (
            <div className="GoodsDetail">
                <NavBar
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                    rightContent={[
                        <img
                            onClick={() => Base.push("ShopCart")}
                            key="0"
                            src={icon.cart}
                            style={{ marginRight: "16px" }}
                            alt=""
                        />,
                        <span className="cart-num">{cardTotal}</span>,
                        <img
                            onClick={this.onShare}
                            key="1"
                            src={icon.share}
                            alt=""
                        />
                    ]}
                >
                    <div
                        className="ellipsis"
                        style={{
                            width: (1 / 3) * wDevice,
                            textAlign: "center"
                        }}
                    >
                        商品详情
                    </div>
                </NavBar>
                <div className="base-content">
                    <Carousel autoplay={true} infinite>
                        {goodsImgs}
                    </Carousel>
                    <div className="info-con">
                        <Flex justify="between">
                            <div className="price">
                                ￥{Base.getNumFormat(sale_price)}
                            </div>
                            <Flex
                                style={{
                                    fontSize: 13,
                                    color: "#999",
                                    marginTop: 10
                                }}
                            >
                                {parseInt(base_percent) && <div>返利{parseInt(base_percent / 100 * sale_price)}元</div>}
                                <Flex style={{ marginRight: 20 }}>
                                    <div>已售{sale_num}</div>
                                </Flex>
                                {seller_address ? (
                                    <Flex>
                                        <div>{seller_address}</div>
                                    </Flex>
                                ) : null}
                            </Flex>
                            {/* {parseInt(reward_point)?<div style={{ fontSize: 11, color: "red" }}>
                                等价积分赠送
                            </div>:null} */}
                            {/* <div className='old-price'>原价<em>￥489</em></div> */}
                        </Flex>
                        <div className="title ellipsis2">
                            {freight_fee === 0 ? (
                                <Badge className="badge" text="包邮" />
                            ) : null}
                            {name}
                        </div>
                       
                    </div>
                    <div className="discounts-con">
                        {goodsTickets}
                        {/* {parseFloat(use_point_rate) > 0 ? (
                            <div className="flex-item">
                                <Flex>
                                    <div className="title">积分</div>
                                    <div className="des">
                                        该商品可使用<em>{use_point_rate}</em>积分抵扣
                                        <em>
                                            {parseInt(
                                                parseFloat(rate) *
                                                    parseFloat(use_point_rate)
                                            )}
                                        </em>元
                                    </div>
                                </Flex>
                            </div>
                        ) : null} */}
                    </div>

                    <div className="discounts-con">
                        {goodsTickets}
                        {guarantee && guarantee != 'null' ? (
                            <div className="flex-item">
                                <Flex>
                                    <div className="title">保障</div>
                                    <div className="des">
                                        {guarantee}
                                    </div>
                                </Flex>
                            </div>
                        ) : ''}
                    </div>
                    <div className="distribution-info-con">
                        <div className="flex-item base-line">
                            <Flex
                                justify="between"
                                onClick={this.addressHandler}
                            >
                                <Flex>
                                    <div className="title">配送</div>
                                    {address.length > 0 ? (
                                        <Flex.Item className="des ellipsis">
                                            至{" "}
                                            {address[curAddressIndex].address}
                                        </Flex.Item>
                                    ) : (
                                        <Flex.Item className="des ellipsis">
                                            新建配送地址
                                        </Flex.Item>
                                    )}
                                </Flex>
                                <Icon type="right" color="#c9c9c9" />
                            </Flex>
                        </div>
                        <div className="flex-item base-line">
                            <Flex>
                                <div className="title">运费</div>
                                <div className="des">
                                    {Base.getNumFormat(freight_fee)}
                                </div>
                            </Flex>
                        </div>
                        <div className="flex-item">
                            <Flex>
                                <div className="title">发票</div>
                                <div className="des">
                                    {parseInt(e_invoice, 10) ? "" : "不"}可开电子发票
                                </div>
                            </Flex>
                        </div>
                    </div>
                    {evaluateItems.length > 0 ? (
                        <div
                            className="evaluate-con"
                            onClick={() => Base.push("EvaluateList", { id })}
                        >
                            <Flex justify="between" className="title-con">
                                <div className="title">
                                    商品评价({evaluate.total || ""})
                                </div>
                                <Icon type="right" color="#c9c9c9" />
                            </Flex>
                            {evaluateItems}
                        </div>
                    ) : null}
                    <div className="lecturer-store-con">
                        <Flex justify="between" className="lecturer-info">
                            <Flex>
                                <div className="seller-header">
                                    <NetImg
                                        className="header"
                                        src={Base.getImgUrl(header)}
                                    />
                                    {parseInt(v, 10) ? (
                                        <img
                                            className="vip"
                                            src={icon.vipIcon}
                                            alt=""
                                        />
                                    ) : null}
                                </div>
                                <div>
                                    <div className="name">{nickname}</div>
                                    <div className="goods-num">
                                        在售商品：<em>{total}</em>个
                                    </div>
                                </div>
                            </Flex>
                            <Flex
                                onClick={() =>
                                    Base.pushApp("openShopView", seller_uid)
                                }
                            >
                                <div className="right-des">TA的店铺</div>
                                <Icon type="right" color="#c9c9c9" />
                            </Flex>
                        </Flex>
                        {summary ? (
                            <div className="store-des">{summary}</div>
                        ) : null}
                        <Flex className="goods-con">{goodsItems}</Flex>
                    </div>
                    {goodsDetailImgs.length > 0 ? (
                        <div className="image-text-con">
                            <div className="title-con">图文详情</div>
                            {goodsDetailImgs}
                            {/* <div className="bottom-tips">
                                别再拉了~=￣ω￣=~没有了
                            </div> */}
                        </div>
                    ) : null}
                   
                    <WhiteSpace size="lg" />
                    <div className="image-text-con">
                        <div className="title-con">价格说明</div>
                        <div
                            dangerouslySetInnerHTML={{ __html: goods_explain }}
                        />
                    </div>
                    {buy_notice && buy_notice != 'null' && (
                        <div dangerouslySetInnerHTML={{
                            __html: buy_notice
                          }}/>
                        )
                    }
                </div>
                <Flex className="footer">
                    <Flex.Item>
                        <Flex>
                            <Flex.Item
                                onClick={() =>
                                    Base.pushApp("openShopView", seller_uid)
                                }
                            >
                                <img src={icon.storeIcon} alt="" />
                                <div className="label">店铺</div>
                            </Flex.Item>
                            <Flex.Item
                                onClick={() =>
                                    Base.pushApp(
                                        "openChatView",
                                        JSON.stringify(chatData)
                                    )
                                }
                            >
                                <img src={icon.chat} alt="" />
                                <div className="label">客服</div>
                            </Flex.Item>
                            <Flex.Item onClick={this.collectHandler}>
                                <img
                                    src={
                                        favorite
                                            ? icon.collectIcon1
                                            : icon.collectIcon0
                                    }
                                    alt=""
                                />
                                <div className="label">收藏</div>
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item
                        onClick={() => this.buyModalHandler(1)}
                        className="add-shop-cart"
                    >
                        加入购物车
                    </Flex.Item>
                    <Flex.Item
                        className="buy-btn"
                        onClick={() => this.buyModalHandler(2)}
                    >
                        立即购买
                    </Flex.Item>
                </Flex>
                {isAddressModal ? (
                    <div className="modal-address">
                        <Flex className="title-con" justify="between">
                            <div>配送至</div>
                            <img
                                onClick={this.addressHandler}
                                src={icon.closeIcon}
                                alt=""
                            />
                        </Flex>
                        <div className="address-list">{addressItems}</div>
                    </div>
                ) : null}
                {buyModalStatus ? (
                    <div className="modal-buy">
                        <Flex
                            className="info-con"
                            justify="between"
                            align="start"
                        >
                            <Flex align="start">
                                <NetImg
                                    className="goods-img"
                                    src={Base.getImgUrl(default_image)}
                                />
                                <div className="info">
                                    <div className="price">￥{sale_price}
                                    
                                    </div>
                                    <div className="tips">请选择型号</div>
                                </div>
                            </Flex>
                            <img
                                className="close-img"
                                onClick={() => this.buyModalHandler(0)}
                                src={icon.closeIcon}
                                alt=""
                            />
                        </Flex>
                        {/* {goodsAttrItems} */}
                        <AttrSelectGroup
                            goods_attr={goods_attr}
                            goodsAttrDic={goodsAttrDic}
                            ref={e => (this.attrSelectGroup = e)}
                        />
                        <Flex className="buy-num-con" justify="between">
                            <div className="buy-num-title">购买数量</div>
                            <Stepper
                                onChange={this.stepperHandler}
                                showNumber
                                className="stepper"
                                min={1}
                                max={99}
                                value={selectNum}
                            />
                        </Flex>
                        <Button
                            className="buy-step-btn"
                            onClick={this.onNextStep}
                        >
                            下一步
                        </Button>
                    </div>
                ) : null}
            </div>
        );
    }
}
