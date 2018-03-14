import React from "react";
import { action } from "mobx";
import { BaseComponent, Base, Global } from "../../common";
import {
    Button,
    List,
    Radio,
    WhiteSpace,
    WingBlank,
    NavBar,
    Toast
} from "antd-mobile";
import "./SelectAddress.less";

import { icon } from "../../images";

const Item = List.Item;
const Brief = Item.Brief;

class AddressItem extends BaseComponent {
    @action.bound
    changeHandler() {
        const { index, callBack } = this.props;
        callBack && callBack(index);
    }
    render() {
        const {
            username,
            mobi,
            province,
            city,
            area,
            address,
            checked,
            id
        } = this.props;
        return (
            <div>
                <List className="addressItem" onClick={this.changeHandler}>
                    <Item
                        thumb={<Radio checked={checked} key={id} />}
                        multipleLine
                    >
                        {username} <span>{mobi}</span>
                        <Brief
                        >{`${province}-${city}-${area} ${address}`}</Brief>
                    </Item>
                </List>
                <WhiteSpace size="lg" />
            </div>
        );
    }
}

export default class SelectAddress extends BaseComponent {
    store = {
        curIndex: 0,
        addressList: []
    };
    componentDidMount() {
        Base.GET({ act: "address", op: "index" }, res => {
            this.store.addressList = res.data;
        });
    }
    @action.bound
    changeHandler(index) {
        this.store.curIndex = index;
    }
    @action.bound
    onSelect() {
        const { addressList, curIndex } = this.store;
        if (addressList.length <= 0 || curIndex < 0) {
            return Toast.fail("请选择地址", 2, null, false);
        }
        Global.curSelectAddressId = addressList[curIndex].id;
        Base.goBack();
    }
    render() {
        const { curIndex, addressList } = this.store;
        const addressItems = addressList.map((item, index) => {
            return (
                <AddressItem
                    key={index}
                    checked={curIndex === index}
                    index={index}
                    {...item}
                    callBack={this.changeHandler}
                />
            );
        });
        return (
            <div className="SelectAddress">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                    rightContent={
                        <div
                            onClick={() => Base.push("NewAddress")}
                            className="right-label"
                        >
                            添加
                        </div>
                    }
                >
                    选择地址
                </NavBar>
                <div className="base-content">
                    <div className="SelectAddress-box">{addressItems}</div>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button
                            type="warning"
                            className="save-address"
                            onClick={this.onSelect}
                        >
                            确 定
                        </Button>
                    </WingBlank>
                </div>
            </div>
        );
    }
}
