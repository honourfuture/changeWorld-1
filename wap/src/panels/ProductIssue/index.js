import React from "react";
import { action } from "mobx";
import { createForm } from "rc-form";
import { BaseComponent, Base, Global } from "../../common";
import {
    Flex,
    Button,
    NavBar,
    WhiteSpace,
    List,
    InputItem,
    Switch,
    // ImagePicker,
    WingBlank,
    Toast,
    Picker,
    Modal,
    TextareaItem,
    Icon
} from "antd-mobile";
import "./ProductIssue.less";
import { icon } from "../../images";

const Item = List.Item;
const alert = Modal.alert;

const selectImgW = (document.body.offsetWidth - 30) / 4;
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

class ImgItem extends BaseComponent {
    store = { isShowTips: false };
    @action.bound
    onDel(index) {
        this.props.fileName.splice(index, 1);
    }
    @action.bound
    onChange(e) {
        const { isRequired } = this.props;
        const limit = isRequired ? 6 : 16;
        const files = e.target.files;
        let index = 0;
        const onUpload = () => {
            const file = files.item(index);
            if (this.props.fileName.length >= limit) {
                return (this.store.isShowTips = true);
            }
            if (file) {
                console.log(file);
                Base.uploadFile(file, res => {
                    file.file_url = res.data.file_url;
                    this.props.fileName.push(file);
                    index++;
                    onUpload();
                });
            }
        };
        onUpload();
    }
    @action.bound
    onAndroidUpload() {
        const self = this;
        window.inputMultiple = data => {
            let arr = [];
            try {
                arr = JSON.parse(data) || [];
            } catch (error) {
                console.log(error);
            }
            self.props.fileName.concat(
                arr.map(file_url => {
                    return { file_url };
                })
            );
        };
        window.Native.callImagePickActionSheet("6", "inputMultiple");
    }
    render() {
        const { title, fileName, isRequired } = this.props;
        const limit = isRequired ? 6 : 16;
        const { isShowTips } = this.store;
        const limitCls = isShowTips ? "upImgTips red" : "upImgTips";
        // const isAndroid = window.Native;
        const isAndroid = true;
        return (
            <div className="productImg">
                <div className="mainTit">
                    {title}
                    {isRequired ? <em>*</em> : null}
                </div>
                <Flex className="image-picker" wrap="wrap">
                    {fileName.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="select-img-con"
                                style={{
                                    width: selectImgW,
                                    height: selectImgW
                                }}
                            >
                                <img
                                    src={Base.getImgUrl(item.file_url)}
                                    alt=""
                                />
                                <Icon
                                    onClick={() => this.onDel(index)}
                                    className="del"
                                    type="cross-circle-o"
                                    size="sm"
                                    color="rgba(0,0,0,0.5)"
                                />
                            </div>
                        );
                    })}
                    <div
                        className="select-img-con"
                        style={{ width: selectImgW, height: selectImgW }}
                    >
                        {isAndroid ? (
                            <div
                                // disabled="disabled"
                                // type="file"
                                // accept="image/*"
                                // multiple="multiple"
                                // onChange={this.onChange}
                                className="image-select-input"
                                onClick={this.onAndroidUpload}
                            />
                        ) : (
                            <input
                                type="file"
                                accept="image/*"
                                multiple="multiple"
                                onChange={this.onChange}
                                className="image-select-input"
                            />
                        )}
                        <img src={icon.addImg} alt="" />
                    </div>
                </Flex>
                <div className={limitCls}>
                    最多可上传
                    {limit}
                    张图片
                </div>
                <div className="upImgTips">注：推荐尺寸为640*640的图片</div>
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
        goods_class: [],
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
                    city_partner_rate,
                    goods_class_id
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
                if (!goods_class_id) {
                    return Toast.fail("请选择产品分类", 2, null, false);
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
                const { id } = Base.getPageParams();
                if (id) {
                    values.id = id;
                }
                Base.POST(
                    {
                        act: "goods",
                        op: "save",
                        ...values,
                        use_point_rate,
                        e_invoice,
                        send_mode: send_mode[0],
                        goods_class_id: goods_class_id[0],
                        goods_ticket,
                        goods_image: JSON.stringify(goods_imageUrl),
                        goods_detail: JSON.stringify(goods_detailUrl),
                        goods_attr: JSON.stringify(goods_attr)
                    },
                    res => {
                        const { id } = Base.getPageParams();
                        if (id) {
                            alert("恭喜您", "编辑成功！", [
                                {
                                    text: "我的产品",
                                    onPress: () => Base.push("MyProduct")
                                }
                            ]);
                        } else {
                            alert("恭喜您", "发布成功！", [
                                {
                                    text: "继续发布",
                                    onPress: () => {
                                        window.location.reload();
                                    }
                                },
                                {
                                    text: "我的产品",
                                    onPress: () => Base.push("MyProduct")
                                }
                            ]);
                        }
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
            const { goods_attr, send_mode, point_rate, goods_class } = res.data;
            this.store.goods_attr = goods_attr.map(item => {
                return { ...item, list: [] };
            });
            this.store.send_mode = send_mode.map((label, value) => {
                return { label, value };
            });
            this.store.goods_class = goods_class.map(({ id, name }) => {
                return { label: name, value: id };
            });
            this.store.point_rate = point_rate;
            const { id } = Base.getPageParams();
            if (id) {
                Base.GET({ act: "goods", op: "view", goods_id: id }, res => {
                    const { goods_info } = res.data;
                    const {
                        name,
                        sale_price,
                        stock,
                        goods_class_id,
                        freight_fee,
                        send_mode,
                        full_amount,
                        free_amount,
                        use_point_rate,
                        e_invoice,
                        city_partner_rate,
                        two_level_rate,
                        goods_image,
                        goods_detail,
                        goods_attr
                    } = goods_info;
                    const { setFieldsValue } = this.props.form;
                    let init_goods_image = [];
                    try {
                        init_goods_image = JSON.parse(goods_image) || [];
                    } catch (error) {
                        init_goods_image = [];
                    }
                    init_goods_image = init_goods_image.map(item => {
                        return {
                            file_url: item,
                            orientation: 1,
                            url: Base.getImgUrl(item)
                        };
                    });
                    let init_goods_detail = [];
                    try {
                        init_goods_detail = JSON.parse(goods_detail) || [];
                    } catch (error) {
                        init_goods_detail = [];
                    }
                    init_goods_detail = init_goods_detail.map(item => {
                        return {
                            file_url: item,
                            orientation: 1,
                            url: Base.getImgUrl(item)
                        };
                    });
                    let init_goods_attr = {};
                    try {
                        init_goods_attr = JSON.parse(goods_attr) || {};
                    } catch (error) {
                        init_goods_attr = {};
                    }
                    const store_goods_attr = this.store.goods_attr;
                    store_goods_attr.map((item, index) => {
                        const { id, list } = item;
                        if (init_goods_attr[id]) {
                            store_goods_attr[index].list = init_goods_attr[id];
                        }
                    });
                    setFieldsValue({
                        name,
                        stock,
                        sale_price,
                        goods_class_id: [goods_class_id],
                        freight_fee,
                        send_mode: [send_mode],
                        full_amount,
                        free_amount,
                        e_invoice: parseInt(e_invoice),
                        city_partner_rate,
                        two_level_rate
                    });
                    this.store.use_point_rate = use_point_rate;
                    this.store.goods_image = init_goods_image;
                    this.store.goods_detail = init_goods_detail;
                });
            }
        });
    }
    render() {
        const {
            goods_image,
            goods_detail,
            send_mode,
            goods_attr,
            point_rate,
            use_point_rate,
            goods_class
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
                        <Flex
                            justify="between"
                            className="textarea-con base-line"
                        >
                            <div style={{ paddingLeft: 15, width: 80 }}>
                                产品名称
                                <em style={{ color: "#e21b1a" }}>*</em>
                            </div>
                            <TextareaItem
                                // style={{ width: 120 }}
                                maxLength={38}
                                error={!!getFieldError("name")}
                                {...getFieldProps("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入产品名称"
                                        }
                                    ]
                                })}
                                // clear
                                placeholder="请输入产品名称"
                                autoHeight
                                labelNumber={1}
                            />
                        </Flex>
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
                            总量
                            <em>*</em>
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
                            type="digit"
                            placeholder="￥0.00"
                            moneyKeyboardAlign="right"
                        >
                            产品价格
                            <em>*</em>
                        </InputItem>
                        <Picker
                            data={goods_class}
                            cols={1}
                            {...getFieldProps("goods_class_id")}
                        >
                            <Item className="pick-item" arrow="horizontal">
                                产品分类
                                <em>*</em>
                            </Item>
                        </Picker>
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
                            type="digit"
                            placeholder="￥0.00"
                        >
                            邮费
                            <em>*</em>
                        </InputItem>
                        <Picker
                            data={send_mode}
                            cols={1}
                            {...getFieldProps("send_mode")}
                        >
                            <Item className="pick-item" arrow="horizontal">
                                发货模式
                                <em>*</em>
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
                                        type="digit"
                                        placeholder="￥0.00"
                                    >
                                        满
                                    </InputItem>
                                    <InputItem
                                        error={!!getFieldError("free_amount")}
                                        {...getFieldProps("free_amount")}
                                        labelNumber={2}
                                        clear
                                        type="digit"
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
                            积分兑换比例
                            {` ${point_rate}:1`}
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
                            联盟商
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
