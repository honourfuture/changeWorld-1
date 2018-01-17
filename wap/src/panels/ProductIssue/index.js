import React from 'react';
import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,NavBar,WhiteSpace,List,InputItem,Switch,ImagePicker,TextareaItem,WingBlank} from 'antd-mobile';
import './ProductIssue.less';
import {icon} from '../../images';

const Item = List.Item;

class ImgItem extends BaseComponent {
	@action.bound
	onChangeImg(files, type, index){
		const {callBack} = this.props;
		callBack && callBack(files);
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

export default class ProductIssue extends BaseComponent{
	state={
		checked: false,
	}
	store={
		productImg:[],
		productDetail:[],
	}
	@action.bound
	onChangeMainImg = (files, type, index) => {
	    this.store.productImg = files;
	}
	@action.bound
    onChangeDetailImg = (files, type, index) => {
	    this.store.productDetail = files;
	}
	render(){
		const {checked} = this.state;
		const {productImg,productDetail} = this.store;
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
                            clear
                            placeholder="请输入产品名称"
                        >产品名称<em>*</em></InputItem>
                        <InputItem 
                            clear
                            type="number"
                            placeholder="请输入产品总量"
                            moneyKeyboardAlign="right"
                        >总量<em>*</em></InputItem>
                        <InputItem 
                            clear
                            type="money"
                            placeholder="￥0.00"
                            moneyKeyboardAlign="right"
                        >产品价格<em>*</em></InputItem>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <InputItem
                            clear
                            type="money"
                            placeholder="￥0.00"
                        >邮费<em>*</em></InputItem>
                        <InputItem 
                            clear
                            type="number"
                            placeholder="请输入产品总量"
                            moneyKeyboardAlign="right"
                        >发货模式<em>*</em></InputItem>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                        <InputItem
                            clear
                            placeholder="请输入产品名称"
                        >优惠券</InputItem>
                        <InputItem 
                            clear
                            type="number"
                            placeholder="0%"
                            moneyKeyboardAlign="right"
                        >积分使用比例</InputItem>
                        <Item
                          extra={<Switch onClick={() => this.setState({checked:!checked})} size="small" checked={checked} color="red" />}
                        >是否支持电子发票</Item>
                    </List>
                    <WhiteSpace />
                    <List className="productBasic">
                       <InputItem 
                            clear
                            type="number"
                            placeholder="0%"
                            moneyKeyboardAlign="right"
                        >城市合伙人分销比例</InputItem>
                        <InputItem 
                            clear
                            type="number"
                            placeholder="0%"
                            moneyKeyboardAlign="right"
                        >二级分销比例</InputItem>
                    </List>
                    <WhiteSpace />
                    <ImgItem title={'产品主图'} fileName={productImg} callBack={this.onChangeMainImg} />
                    <WhiteSpace />
                    <Flex align="center" justify="center" style={{padding:20}}>预留产品属性</Flex>
                    <ImgItem title={'产品详情'} isTextArea={true} fileName={productDetail} callBack={this.onChangeDetailImg} />
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button type="warning" className="save-address">提交</Button>
                    </WingBlank>
                    <WhiteSpace size="xl" />
                </div>
			</div>
		)
	}
};
