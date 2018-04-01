import React from "react";
import { action } from "mobx";
import { BaseComponent, Base } from "../../common";
import {
    Flex,
    Button,
    NavBar,
    WhiteSpace,
    TextareaItem,
    ImagePicker,
    Checkbox,
    WingBlank,
    Toast
} from "antd-mobile";
import { createForm } from 'rc-form';
import "./EvaluateOrder.less";
import { icon } from "../../images";
import { OrderGoodsItem } from "../../components/OrderGoodsItem";

const AgreeItem = Checkbox.AgreeItem;
class EvaluateOrder extends BaseComponent {
    store = {
        files: [],
        storeList: [],
        is_anonymous: true
    }
    @action.bound
    onChange = (files, type, index) => {
        if(type === 'add'){
            const requestFile = files[files.length - 1];
            Base.POST({act:'common',op:'base64FileUpload',base64_image_content:requestFile.url},(res)=>{
                requestFile.file_url = res.data.file_url;
                this.store.files = files;
            })
        }
    }
    @action.bound
    submitHandler(){
        const id = parseInt(Base.getPageParams('id'));
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.is_anonymous = values.is_anonymous ? values.is_anonymous : this.store.is_anonymous;
                let arrImg = {};
                this.store.files.map((item,key)=>{
                    arrImg[key] = item.file_url;
                });
                values.photos = arrImg;
                Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'evaluate',...values}, res => {
                    Toast.info(`评价成功！`, 1);
                    setTimeout(()=>{
                        Base.goBack();
                    },1000)
                });
            }
        });
    }
    @action.bound
    agreeChange(){
        this.store.is_anonymous = !this.store.is_anonymous;
    }
    render() {
        const { storeList, files,is_anonymous } = this.store;
        const { getFieldProps, getFieldError } = this.props.form;
        const item = JSON.parse(Base.getPageParams('item'));
        
        const goodsItem = item.goods.map((item, key) => {
            return <OrderGoodsItem key={key} item={item} />;
        });

        return (
            <div className="EvaluateOrder">
                <NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    我的订单
                </NavBar>
                <div className="base-content">
                    {goodsItem}
                    <WhiteSpace />
                    <div className="evaluateBox">
                        <TextareaItem
                            placeholder="请输入输入您对商品的描述"
                            autoHeight
                            error={!!getFieldError('remark')}
                            {...getFieldProps('remark', {
                                rules: [{ required: true, message:'请输入输入您对商品的描述'}],
                            })}
                        />
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            selectable={files.length < 5}
                            multiple={true}
                        />
                        <Flex className="anonymity" justify="end">
                            <AgreeItem 
                                defaultChecked 
                                onClick={this.agreeChange}
                                {...getFieldProps('is_anonymous')}
                            >匿名评价</AgreeItem>
                        </Flex>
                    </div>
                    <WhiteSpace size="lg" />
                    <WingBlank size="md">
                        <Button
                            type="warning"
                            className="save-address"
                            onClick={this.submitHandler}
                        >
                            提交
                        </Button>
                    </WingBlank>
                </div>
            </div>
        );
    }
}
export default createForm()(EvaluateOrder);