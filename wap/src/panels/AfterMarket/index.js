import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base} from '../../common';
import { Flex, NavBar, TextareaItem,Button,Toast} from "antd-mobile";
import { icon, blankImg } from "../../images";
import { createForm } from 'rc-form';
import './AfterMarket.less';

class AfterMarket extends BaseComponent{
	@action.bound
	applyHandler(){
		const id = parseInt(Base.getPageParams('id'));
    	this.props.form.validateFields((err, values) => {
            if (!err) {
                Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'refund',...values}, res => {
		            Toast.info(`已提交申请！`, 1);
		            setTimeout(()=>{
		            	Base.goBack();
		            },1000)
		        });
            }
        });
	}
	render(){
		const { getFieldProps, getFieldError } = this.props.form;
		return (
			<div className='AfterMarket'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt="" />}
                    onLeftClick={Base.goBack}
                >
                    申请售后
                </NavBar>
                <div className="applyMarket">
                	<TextareaItem
                		error={!!getFieldError('remark')}
                        {...getFieldProps('remark', {
                            rules: [{ required: true, message:'请输入您的描述'}],
                        })}
                        rows={5}
			            placeholder="请输入您的描述"
			            autoHeight
			        />
			        <div className="AfterMarket-opear">
	                    <Button onClick={this.applyHandler} type="warning" >申请售后</Button>
	                </div>
                </div>
			</div>
		)
	}
};
export default createForm()(AfterMarket);