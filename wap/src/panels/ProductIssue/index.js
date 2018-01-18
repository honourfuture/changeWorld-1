import React from 'react';
import { action } from 'mobx';
import { createForm } from 'rc-form';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,NavBar,WhiteSpace,List,InputItem,Switch,ImagePicker,TextareaItem,WingBlank,Toast,Picker} from 'antd-mobile';
import './ProductIssue.less';
import {icon} from '../../images';

const Item = List.Item;

class ImgItem extends BaseComponent {
	@action.bound
	onChangeImg(files, type, index){
		// const {callBack} = this.props;
        // callBack && callBack(files,type, index);
        console.log(files);
        if(type === 'add'){
            Base.POST({act:'common',op:'base64FileUpload',base64_image_content:files[files.length - 1].url},(res)=>{
                
            })
        }
	}
    render(){
    	const {title,fileName,isTextArea} = this.props;

    	const textArea = isTextArea === true ? <TextareaItem autoHeight placeholder="请输入产品描述会直接上传产品详情图片" className="productDetailInfo" /> : "";
        return (
            <div className="productImg">
            	<div className="mainTit">{title}<em>*</em></div>
            	{textArea}
            	<ImagePicker
			        files={fileName}
			        onChange={this.onChangeImg}
			        onImageClick={(index, fs) => console.log(index, fs)}
			        selectable={fileName.length < 6}
			        multiple={true}
			    />
			    <div className="upImgTips">最多可上传6张图片</div>
            </div>
        )
    }
}

class ProductIssue extends BaseComponent{
	state={
		checked: false,
	}
	store={
		goods_image:[],
        productDetail:[],
        send_mode:[],
        goods_attr:[],
    }
    // _request
	@action.bound
	onChangeMainImg = (files, type, index) => {
        console.log(files, type, index);
	    this.store.goods_image = files;
	}
	@action.bound
    onChangeDetailImg = (files, type, index) => {
        console.log(files, type, index);
	    this.store.productDetail = files;
    }
    @action.bound
    onSubmit(){
        this.props.form.validateFields((err, values) => {
            if(!err){
                console.log(values);
                const {send_mode} = values;
                if(!send_mode){
                    return Toast.fail('请选择发货模式');
                }
                Base.POST({act:'goods',op:'save',...values,send_mode:send_mode[0]},(res)=>{

                })
            }else{
                for (const key in err) {
                    if (err.hasOwnProperty(key)) {
                        const errInfo = err[key];
                        if(errInfo && errInfo.errors && errInfo.errors[0] && errInfo.errors[0].message){
                            return Toast.fail(errInfo.errors[0].message,2);
                        }
                    }
                }
            }
        });
    }
    componentDidMount(){
        Base.GET({act:'goods',op:'init'},(res)=>{
            const {goods_attr,send_mode} = res.data;
            this.store.goods_attr = goods_attr;
            this.store.send_mode = send_mode.map((label,value)=>{
                return {label,value};
            });
        })
    }
	render(){
		const {checked} = this.state;
        const {goods_image,productDetail,send_mode} = this.store;
        const { getFieldProps, getFieldError } = this.props.form;
		return (
			<div className='ProductIssue'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >产品发布</NavBar>
                <div className="base-content">
               		<WhiteSpace />
                	<List className="productBasic">
                        <InputItem
                            error={!!getFieldError('name')}
                            {...getFieldProps('name', {
                                rules: [{ required: true, message:'请输入产品名称'}],
                            })}
                            clear
                            placeholder="请输入产品名称"
                        >产品名称<em>*</em></InputItem>
                        <InputItem 
                            error={!!getFieldError('stock')}
                            {...getFieldProps('stock', {
                                rules: [{ required: true,pattern: /^\d+$/, message:'请输入正确的产品总量'}],
                            })}
                            clear
                            type="number"
                            placeholder="请输入产品总量"
                            moneyKeyboardAlign="right"
                        >总量<em>*</em></InputItem>
                        <InputItem
                            error={!!getFieldError('sale_price')}
                            {...getFieldProps('sale_price', {
                                rules: [
                                    { required: true,pattern: /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/, message:'请输入正确的产品价格'},
                                ],
                            })}
                            clear
                            type="money"
                            placeholder="￥0.00"
                            moneyKeyboardAlign="right"
                        >产品价格<em>*</em></InputItem>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <InputItem
                            error={!!getFieldError('freight_fee')}
                            {...getFieldProps('freight_fee', {
                                rules: [{ required: true,pattern: /^(([1-9]\d*)|0)(\.\d{0,2}?)?$/, message:'请输入邮费'}],
                            })}
                            clear
                            type="money"
                            placeholder="￥0.00"
                        >邮费<em>*</em></InputItem>
                        <Picker data={send_mode} cols={1} {...getFieldProps('send_mode')}>
                            <Item className='pick-item' arrow="horizontal">发货模式<em>*</em></Item>
                        </Picker>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <Item className='discounts-item'
                            extra={
                                <Flex>
                                    <InputItem
                                        {...getFieldProps('full_amount')}
                                        labelNumber={2}
                                        clear
                                        type="money"
                                        placeholder="￥0.00"
                                    >满</InputItem>
                                    <InputItem
                                        error={!!getFieldError('free_amount')}
                                        {...getFieldProps('free_amount')}
                                        labelNumber={2}
                                        clear
                                        type="money"
                                        placeholder="￥0.00"
                                    >减</InputItem>
                                </Flex>
                            }
                        >
                        发货模式</Item>
                        <InputItem
                            {...getFieldProps('use_point_rate')}
                            clear
                            type="number"
                            placeholder="0%"
                            moneyKeyboardAlign="right"
                        >积分使用比例</InputItem>
                        <Item
                          extra={<Switch 
                                {...getFieldProps('e_invoice')}
                                onClick={() => this.setState({checked:!checked})} 
                                size="small" checked={checked} 
                                color="red" 
                            />}
                        >是否支持电子发票</Item>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                       <InputItem className='city-rate-item'
                            {...getFieldProps('city_partner_rate')}
                            clear
                            type="number"
                            placeholder="0%"
                            moneyKeyboardAlign="right"
                        >城市合伙人分销比例</InputItem>
                        <InputItem 
                            {...getFieldProps('two_level_rate')}
                            clear
                            type="number"
                            placeholder="0%"
                            moneyKeyboardAlign="right"
                        >二级分销比例</InputItem>
                    </List>
                    <WhiteSpace />
                    <ImgItem title={'产品主图'} fileName={goods_image} callBack={this.onChangeMainImg} />
                    <WhiteSpace />
                    <Flex align="center" justify="center" style={{padding:20}}>预留产品属性</Flex>
                    <ImgItem title={'产品详情'} isTextArea={true} fileName={productDetail} callBack={this.onChangeDetailImg} />
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button onClick={this.onSubmit} type="warning" className="save-address">提交</Button>
                    </WingBlank>
                    <WhiteSpace size="xl" />
                </div>
			</div>
		)
	}
};
export default createForm()(ProductIssue);
