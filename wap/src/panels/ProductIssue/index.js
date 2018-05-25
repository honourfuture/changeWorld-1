import React from "react";
import { action } from "mobx";
import { createForm } from "rc-form";
import { BaseComponent, Base } from "../../common";
import {
    Flex,
    Button,
    NavBar,
    WhiteSpace,
    List,
    InputItem,
    Switch,
    ImagePicker,
    WingBlank,
    Toast,
    Picker,
    Modal
} from "antd-mobile";
import "./ProductIssue.less";
import { icon } from "../../images";

const Item = List.Item;
const alert = Modal.alert;

class ImgItem extends BaseComponent {
    @action.bound
    onChangeImg(files, type, index) {
        const { callBack } = this.props;
        if (type === "add") {
            const requestFile = files[files.length - 1];
            Base.POST(
                {
                    act: "common",
                    op: "base64FileUpload",
                    base64_image_content: requestFile.url
                },
                res => {
                    requestFile.file_url = res.data.file_url;
                    callBack && callBack(files);
                }
            );
        } else {
            callBack && callBack(files);
        }
    }
    render() {
        const { title, fileName, isRequired } = this.props;
        return (
            <div className="productImg">
                <div className="mainTit">
                    {title}
                    {isRequired ? <em>*</em> : null}
                </div>
                <ImagePicker
                    files={fileName}
                    onChange={this.onChangeImg}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={fileName.length < 8}
                    // multiple={true}
                />
                <div className="upImgTips">最多可上传8张图片</div>
            </div>
        );
    }
}

class ProductIssue extends BaseComponent {
    store = {
        goods_image: [],
        goods_detail: [],
        send_mode: [],
        goods_attr: [],
        point_rate: 0,
        use_point_rate: 0
    };
    @action.bound
    onChangeMainImg = files => {
        this.store.goods_image = files;
    };
    @action.bound
    onChangeDetailImg = files => {
        this.store.goods_detail = files;
    };
    @action.bound
    onSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    send_mode,
                    full_amount = 0,
                    free_amount = 0,
                    two_level_rate,
                    city_partner_rate
                } = values;
                const i_two_level_rate = parseFloat(two_level_rate) || 0;
                const i_city_partner_rate = parseFloat(city_partner_rate) || 0;
                if (i_two_level_rate + i_city_partner_rate > 100) {
                    return Toast.fail(
                        "分销比例之和不能超过100%",
                        2,
                        null,
                        false
                    );
                }
                if (!send_mode) {
                    return Toast.fail("请选择发货模式", 2, null, false);
                }
                const {
                    goods_image,
                    goods_detail,
                    use_point_rate
                } = this.store;
                if (goods_image.length === 0) {
                    return Toast.fail("请上传产品主图", 2, null, false);
                }
                const goods_imageUrl = goods_image.map(item => item.file_url);
                const goods_detailUrl = goods_detail.map(item => item.file_url);
                const goods_attr = {};
                for (const key in values) {
                    if (
                        values.hasOwnProperty(key) &&
                        key.indexOf("attr_") !== -1
                    ) {
                        if (values[key]) {
                            const [str, id, index] = key.split("_");
                            goods_attr[id] = goods_attr[id] || [];
                            goods_attr[id][index] = values[key];
                        }
                        delete values[key];
                    }
                }
                const goods_ticket = JSON.stringify([
                    { full_amount, free_amount }
                ]);
                const e_invoice = values.e_invoice ? 1 : 0;
                delete values["full_amount"];
                delete values["free_amount"];
                delete values["e_invoice"];

                Base.POST(
                    {
                        act: "goods",
                        op: "save",
                        ...values,
                        use_point_rate,
                        e_invoice,
                        send_mode: send_mode[0],
                        goods_ticket,
                        goods_image: JSON.stringify(goods_imageUrl),
                        goods_detail: JSON.stringify(goods_detailUrl),
                        goods_attr: JSON.stringify(goods_attr)
                    },
                    res => {
                        alert("恭喜您", "发布成功！", [
                            { text: "继续发布", onPress: null },
                            {
                                text: "我的产品",
                                onPress: () => Base.push("MyProduct")
                            }
                        ]);
                    }
                );
            } else {
                for (const key in err) {
                    if (err.hasOwnProperty(key)) {
                        const errInfo = err[key];
                        if (
                            errInfo &&
                            errInfo.errors &&
                            errInfo.errors[0] &&
                            errInfo.errors[0].message
                        ) {
                            return Toast.fail(errInfo.errors[0].message, 2);
                        }
                    }
                }
            }
        });
    }
    @action.bound
    onAddAttr(index) {
        this.store.goods_attr[index].list.push("");
    }
    @action.bound
    onPointChange(value) {
        this.store.use_point_rate = value || 0;
    }
    componentDidMount() {
        Base.GET({ act: "goods", op: "init" }, res => {
            const { goods_attr, send_mode, point_rate } = res.data;
            this.store.goods_attr = goods_attr.map(item => {
                return { ...item, list: [] };
            });
            this.store.send_mode = send_mode.map((label, value) => {
                return { label, value };
            });
            this.store.point_rate = point_rate;
        });
    }
    render() {
        const {
            goods_image,
            goods_detail,
            send_mode,
            goods_attr,
            point_rate,
            use_point_rate
        } = this.store;
        const { getFieldProps, getFieldError } = this.props.form;
        const goodsAttrItems = goods_attr.map((item, index) => {
            const { id, name, list } = item;
            return (
                <List key={id} className="productBasic attr-con">
                    <Item
                        className="attr-item"
                        extra={
                            <Button
                                type="ghost"
                                className="add-btn"
                                size="small"
                                onClick={() => this.onAddAttr(index)}
                            >
                                添加
                            </Button>
                        }
                    >
                        {name}
                        <em>{"没有就不用写"}</em>
                    </Item>
                    {list.map((attrItem, attrIndex) => {
                        const propsStr = `attr_${id}_${attrIndex}`;
                        return (
                            <InputItem
                                key={attrIndex}
                                {...getFieldProps(propsStr, {
                                    initialValue: attrItem
                                })}
                                clear
                                placeholder="请输入属性值"
                            />
                        );
                    })}
                </List>
            );
        });
        return (
            <div className="ProductIssue">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    产品发布
                </NavBar>
                <div className="base-content">
                    <WhiteSpace />
                    <List className="productBasic">
                        <InputItem
                            maxLength={25}
                            error={!!getFieldError("name")}
                            {...getFieldProps("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入产品名称"
                                    }
                                ]
                            })}
                            clear
                            placeholder="请输入产品名称"
                        >
                            产品名称<em>*</em>
                        </InputItem>
                        <InputItem
                            error={!!getFieldError("stock")}
                            {...getFieldProps("stock", {
                                rules: [
                                    {
                                        required: true,
                                        pattern: /^\d+$/,
                                        message: "请输入正确的产品总量"
                                    }
                                ]
                            })}
                            clear
                            type="number"
                            placeholder="请输入产品总量"
                            moneyKeyboardAlign="right"
                        >
                            总量<em>*</em>
                        </InputItem>
                        <InputItem
                            error={!!getFieldError("sale_price")}
                            {...getFieldProps("sale_price", {
                                rules: [
                                    {
                                        required: true,
                                        pattern: /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/,
                                        message: "请输入正确的产品价格"
                                    }
                                ]
                            })}
                            clear
                            type="money"
                            placeholder="￥0.00"
                            moneyKeyboardAlign="right"
                        >
                            产品价格<em>*</em>
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <InputItem
                            error={!!getFieldError("freight_fee")}
                            {...getFieldProps("freight_fee", {
                                rules: [
                                    {
                                        required: true,
                                        pattern: /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/,
                                        message: "请输入邮费"
                                    }
                                ]
                            })}
                            clear
                            type="money"
                            placeholder="￥0.00"
                        >
                            邮费<em>*</em>
                        </InputItem>
                        <Picker
                            data={send_mode}
                            cols={1}
                            {...getFieldProps("send_mode")}
                        >
                            <Item className="pick-item" arrow="horizontal">
                                发货模式<em>*</em>
                            </Item>
                        </Picker>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <Item
                            className="discounts-item"
                            extra={
                                <Flex>
                                    <InputItem
                                        {...getFieldProps("full_amount")}
                                        labelNumber={2}
                                        clear
                                        type="money"
                                        placeholder="￥0.00"
                                    >
                                        满
                                    </InputItem>
                                    <InputItem
                                        error={!!getFieldError("free_amount")}
                                        {...getFieldProps("free_amount")}
                                        labelNumber={2}
                                        clear
                                        type="money"
                                        placeholder="￥0.00"
                                    >
                                        减
                                    </InputItem>
                                </Flex>
                            }
                        >
                            优惠
                        </Item>
                        <Item
                            className="use-point-item"
                            extra={
                                <div>
                                    最高抵扣：￥{" "}
                                    <em>
                                        {parseInt(point_rate, 10)
                                            ? parseInt(use_point_rate, 10) /
                                              parseInt(point_rate, 10)
                                            : "0"}
                                    </em>
                                </div>
                            }
                        >
                            积分兑换比例{` ${point_rate}:1`}
                        </Item>
                        <InputItem
                            clear
                            type="number"
                            placeholder="0"
                            moneyKeyboardAlign="right"
                            onChange={this.onPointChange}
                            labelNumber={7}
                        >
                            最高可使用积分
                        </InputItem>
                        <Item
                            extra={
                                <Switch
                                    {...getFieldProps("e_invoice", {
                                        valuePropName: "checked"
                                    })}
                                    size="small"
                                    color="red"
                                />
                            }
                        >
                            是否支持电子发票
                        </Item>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <InputItem
                            className="city-rate-item"
                            {...getFieldProps("city_partner_rate")}
                            clear
                            type="number"
                            placeholder="0"
                            moneyKeyboardAlign="right"
                            extra="%"
                        >
                            城市合伙人分销比例
                        </InputItem>
                        <InputItem
                            {...getFieldProps("two_level_rate")}
                            clear
                            type="number"
                            placeholder="0"
                            moneyKeyboardAlign="right"
                            extra="%"
                        >
                            二级分销比例
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <ImgItem
                        title={"产品主图"}
                        isRequired={true}
                        fileName={goods_image}
                        callBack={this.onChangeMainImg}
                    />
                    <WhiteSpace />
                    {goodsAttrItems}
                    <ImgItem
                        title={"产品详情"}
                        fileName={goods_detail}
                        callBack={this.onChangeDetailImg}
                    />
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button
                            onClick={this.onSubmit}
                            type="warning"
                            className="save-address"
                        >
                            提交
                        </Button>
                    </WingBlank>
                    <WhiteSpace size="xl" />
                </div>
            </div>
        );
    }
}
export default createForm()(ProductIssue);
