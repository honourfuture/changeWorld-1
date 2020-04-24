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
import "./SharePage.less";
import { icon } from "../../images";

const wDevice = document.body.offsetWidth;

class EvaluateItem extends BaseComponent {
    render() {
        const { header, nickname, remark,photos,lv  } = this.props;
        const photo = JSON.parse(JSON.parse(photos));
		let photosItem = (photo || []).map((item,key)=>{
			return(
				<div >	   
				   <NetImg className="desImg" src={Base.getImgUrl(item)} key={key}/>
				</div>
			)
		});
        return (
        	
            <div className="evaluate-item am-flexbox-align-start am-flexbox">
                <NetImg className="userImg" src={Base.getImgUrl()} />
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

export default class SharePage extends BaseComponent {
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
    selectedNum = 1;
    page_title = '';
    tipsShow = '';
    share_userinfo = null;
    componentDidMount() {
        const { id, uid } = Base.getPageParams();
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
        });
        Base.GET({ act: "info", op: "view", mod: "user", user_id: uid  }, res => {
            var share_title = "来自" + res.data.nickname + "的分享" + (res.data.invite_code ? "\n邀请码：" + res.data.invite_code : "");
            this.page_title = share_title;
            this.share_userinfo = res.data;
        });
    }
    

    @action.bound
    onShare() {
        const { goods_info = {} } = this.store;
        let { name = "", default_image = "" } = goods_info;
        Base.getAuthData(({ user_id }) => {
            Base.GET({ act: "info", op: "view", mod: "user", user_id: user_id  }, res => {
                var share_title = "来自" + res.data.nickname + "的分享" + (res.data.invite_code ? "\n邀请码：" + res.data.invite_code : "");
                console.log(share_title);
                const shareData = {
                    title: share_title,
                    description: "",
                    imageUrl: Base.getImgUrl(default_image),
                    linkUrl: `${
                        Global.RES_URL
                        }/wap/index.html#/Share?invite_uid=${user_id}&type=0`
                };
                Base.pushApp("openShareView", JSON.stringify(shareData));
            });

        });
    }
    @action.bound
    hiddenTips(){
        this.tipsShow = 'display:"none"';
    }
    /*点击立即打开app*/
    handleClick(){
        const { id, uid } = Base.getPageParams();
    	window.location.href = `${
            Global.RES_URL
            }/wap/index.html#/Share?invite_uid=${uid}&type=0`
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
            rate,
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
        const chatData = { ...seller, id: seller_uid };
        const seller_address = seller.address || "";
        const { cardTotal } = this.store;
        let page_title = this.page_title;
        return (
            <div className="GoodsDetail">
                <div className="base-content">
                    <Carousel autoplay={true} infinite>
                        {goodsImgs}                         
                    </Carousel>
                     
                    <div className="mymodel">
                       <div className="mymodel-list left">
                          <div className="mymodel-list-colse" onClick={this.hiddenTips}>x</div>
                          <div className="mymodel-list-logo">
                            <img src={icon.logo}/>
                          </div>
                          <div className="mymodel-list-content">
                            <p>打开罗马市场App</p>
                            <p>享受更多权益</p>
                          </div>
                       </div>
                       <div className="mymodel-list right"  onClick={this.handleClick}>立即打开</div>                      
                    </div>
                    
                   
                    
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
                            <Flex.Item>
                                <img src={icon.chat} alt="" />
                                <div className="label">客服</div>
                            </Flex.Item>
                            <Flex.Item>
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
                        className="add-shop-cart"
                    >
                        加入购物车
                    </Flex.Item>
                    <Flex.Item
                        className="buy-btn"
                    >
                        立即购买
                    </Flex.Item>
                </Flex>

            </div>
        );
    }
}
