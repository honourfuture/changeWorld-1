import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base} from '../../common';
import { Flex, NavBar, Radio,InputItem,Button,Toast} from "antd-mobile";
import { icon, blankImg } from "../../images";
import { createForm } from 'rc-form';
import './ApplyInvoice.less';

class ApplyInvoice extends BaseComponent{
	store={
		curIndex:0
	}
	@action.bound
    changeHandler(index){
        this.store.curIndex = index;
        this.props.form.resetFields();
    }
    @action.bound
    applyHandler(){
    	const id = parseInt(Base.getPageParams('id'));
    	this.props.form.validateFields((err, values) => {
            if (!err) {
                values.invoice_type = this.store.curIndex;
                Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'invoice',...values}, res => {
		            Toast.info(`已提交申请！`, 1);
		            setTimeout(()=>{
		            	Base.goBack();
		            },1000)
		        });
            }
        });
    }
	render(){
		const {curIndex} = this.store;
		const { getFieldProps, getFieldError } = this.props.form;
		const checedArr = ['企业','个人'];
		const radioEle = checedArr.map((item,key)=>{
			return <em key={key} onClick={()=>this.changeHandler(key)}>{item} <Radio checked={curIndex === key} ></Radio></em>
		});
		let invoicePlac = parseInt(curIndex) === 0 ? "请输入抬头名称或开票六位代码" :"请输入抬头名称";
		const taxEle = parseInt(curIndex) === 0 ? <Flex
								                        align="center"
								                        className="discount-item"
								                    >
								                        <Flex.Item className="leftFlex">
								                            税号
								                        </Flex.Item>
								                        <Flex.Item align="center">
								                            <InputItem
								                                type="text"
								                                placeholder={`请输入纳税人识别号或社会统一征信代码`}
								                                error={!!getFieldError('invoice_number')}
								                                {...getFieldProps('invoice_number', {
									                                rules: [{ required: true, message:'请输入产品名称'}],
									                            })}
								                            />
								                        </Flex.Item>
								                    </Flex> : null;
		return (
			<div className='ApplyInvoice'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    申请发票
                </NavBar>
                <div className="applyCheck">
                    <Flex
                        align="center"
                        className="discount-item base-line"
                    >
                        <Flex.Item>
                            发票抬头
                        </Flex.Item>
                        <Flex.Item align="right">
                            {radioEle}
                        </Flex.Item>
                    </Flex>
                    <Flex
                        align="center"
                        className="discount-item base-line"
                    >
                        <Flex.Item className="leftFlex">
                            名称
                        </Flex.Item>
                        <Flex.Item align="center">
                            <InputItem
                                type="text"
                                placeholder={invoicePlac}
                                error={!!getFieldError('invoice_title')}
                                {...getFieldProps('invoice_title', {
	                                rules: [{ required: true, message:'请输入产品名称'}],
	                            })}
                            />
                        </Flex.Item>
                    </Flex>
                    {taxEle}
                </div>
                <div className="ApplyInvoice-opear">
                    <Button onClick={this.applyHandler} type="warning" >申请发票</Button>
                </div>
			</div>
		)
	}
};
export default createForm()(ApplyInvoice);
