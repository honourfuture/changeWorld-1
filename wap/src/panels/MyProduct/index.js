import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, NetImg, Global } from "../../common";
import {
    Flex,
    Button,
    NavBar,
    WhiteSpace,
    ListView,
    PullToRefresh,
    Toast
} from "antd-mobile";
import "./MyProduct.less";
import { icon, test } from "../../images";
const height = document.body.offsetHeight - 45;
const goodsImgHeight = (document.body.offsetWidth - 10) / 2;
class Item extends BaseComponent {
    // @action.bound
    // onEditHandle(e) {
    //     const { callBack, goodsNum } = this.props.;
    //     callBack && callBack(goodsNum);
    //     e.stopPropagation();
    // }
    @action.bound
    onSave(e) {
        const data = { ...this.props.data };
        const enable = 1 - parseInt(data.enable);
        Base.POST({ act: "goods", op: "save", ...data, enable }, res => {
            Toast.success(enable === 1 ? "上架成功" : "下架成功");
            this.props.onChange(data.id, enable);
        });
        e.stopPropagation();
    }
    @action.bound
    onEdit(e) {
        Base.push("ProductIssue", { id: this.props.data.id });
        e.stopPropagation();
    }
    @action.bound
    onTop(e) {
        Base.POST({ act: "goods", op: "top", id: this.props.data.id }, () => {
            Toast.success("置顶成功");
        });
        e.stopPropagation();
    }
    render() {
        const { default_image, name, sale_price, id, enable } = this.props.data;
        // const goodsType =
        //     goodsTypes === 1 ? (
        //         <span className="productEdit" onClick={this.onEditHandle}>
        //             编辑
        //         </span>
        //     ) : (
        //         <span className="productAbled">售卖中</span>
        //     );
        return (
            <div
                className="recommend-goodsItem"
                onClick={() => Base.push("GoodsDetail", { id })}
            >
                <div className="recommend-goodsItem-img">
                    <NetImg
                        src={Base.getImgUrl(default_image)}
                        height={goodsImgHeight}
                    />
                </div>
                <div className="recommend-goodsItem-body">
                    <div className="recommend-goodsItem-title ellipsis2">
                        {name}
                    </div>
                    <Flex
                        justify="between"
                        className="recommend-goodsItem-opera"
                    >
                        <span className="goodsPrice">
                            ￥ {Base.getNumFormat(sale_price)}
                        </span>
                    </Flex>
                    <Flex justify="end" style={{ marginTop: 10 }}>
                        <Button
                            onClick={this.onTop}
                            type="warning"
                            inline
                            size="small"
                            className="item-btn"
                        >
                            <div style={{ fontSize: 10 }}>置顶</div>
                        </Button>
                        <Button
                            onClick={this.onEdit}
                            type="warning"
                            inline
                            size="small"
                            className="item-btn"
                        >
                            <div style={{ fontSize: 10 }}>编辑</div>
                        </Button>
                        <Button
                            onClick={this.onSave}
                            type="warning"
                            inline
                            size="small"
                            className="item-btn"
                        >
                            <div style={{ fontSize: 10 }}>
                                {parseInt(enable, 10) === 1 ? "下架" : "上架"}
                            </div>
                        </Button>
                    </Flex>
                </div>
                {/* {goodsType} */}
            </div>
        );
    }
}

export default class MyProduct extends BaseComponent {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.cur_page = 1;
        this.store = {
            list: [],
            isRead: "",
            refreshing: false,
            isLoading: false
        };
    }
    componentDidMount() {
        this.cur_page = 1;
        this.requestData(false);
    }
    @action.bound
    onChange(id, enable) {
        const list = this.store.list.slice();
        const data = list.find(item => item.id === id);
        if (data) {
            data.enable = enable;
        }
        this.store.list = list;
    }
    @action.bound
    renderItem(rowData, sectionID, rowID) {
        return <Item data={{ ...rowData }} onChange={this.onChange} />;
    }
    @action.bound
    requestData(b_noToast = true) {
        Base.GET(
            {
                act: "goods",
                op: "index",
                cur_page: this.cur_page || 1,
                per_page: Global.PAGE_SIZE
            },
            res => {
                const { list = [] } = res.data.goods || {};
                this.store.list =
                    this.cur_page === 1
                        ? [].concat(list)
                        : this.store.list.concat(list);
                this.store.refreshing = false;
                this.store.isLoading = false;
                if (list.length > 0) {
                    this.cur_page++;
                }
            },
            null,
            b_noToast
        );
    }
    @action.bound
    goBack(){
        const isPubProd = Base.getPageParams('isPubProd');
        if( isPubProd ){//发布成功后点击返回,则直接返回我的商城
            Base.push('UserCenter');
        }
        else{
            Base.goBack();
        }
    }
    @action.bound
    onRefresh() {
        this.store.refreshing = true;
        this.store.isLoading = false;
        this.cur_page = 1;
        this.requestData();
    }
    @action.bound
    onEndReached() {
        this.store.isLoading = true;
        this.store.refreshing = true;
        this.requestData();
    }
    @action.bound
    onEditHandle(e) {
        console.log("edit", e);
    }
    render() {
        const { list, isLoading, refreshing } = this.store;
        const dataSource = this.dataSource.cloneWithRows(list.slice());
        return (
            <div className="MyProduct">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={this.goBack}
                >
                    我的产品
                </NavBar>
                {/* <div className="base-content">
                    <WhiteSpace size="md" />
                    <Flex wrap="wrap" className="recommend-goods GoodsList">
                        {item}
                    </Flex>
                </div> */}
                <div className="base-content">
                    <ListView
                        style={{ height }}
                        dataSource={dataSource}
                        renderRow={this.renderItem}
                        renderFooter={() => (
                            <div style={{ padding: 15, textAlign: "center" }}>
                                {isLoading
                                    ? "加载中..."
                                    : list.length >= Global.PAGE_SIZE
                                        ? "加载完成"
                                        : ""}
                            </div>
                        )}
                        pullToRefresh={
                            <PullToRefresh
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        onEndReached={this.onEndReached}
                    // pageSize={2}
                    />
                </div>
            </div>
        );
    }
}
