import React from 'react';
import { action } from "mobx";
import {BaseComponent,Base} from '../../common';
import {NavBar,WhiteSpace,Button,List,InputItem,select,WingBlank,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import './WriteExInfo.less';
import {icon} from '../../images';

const Item = List.Item;
class WriteExInfo extends BaseComponent{
	store={
        exName:[],
        exNo:'0'
    }
    componentDidMount(){
        Base.GET({ act: "express", op: "index"}, res => {
            this.store.exName = res.data;
        });
    }
    @action.bound
    exHandler(){
        const id = parseInt(Base.getPageParams('id'));
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.express_id = values.express_id ? values.express_id : this.store.exNo;
                Base.POST({ act: "order_action", op: "seller",mod:'user',order_id:id,action:'goods_send',...values}, res => {
                    Toast.info(`发货成功！`, 1);
                    setTimeout(()=>{
                        Base.goBack();
                    },1000)
                });
            }
        });
    }
	render(){
		const {exName} = this.store;
        const { getFieldProps, getFieldError } = this.props.form;
		const exNames = exName.map((item,key)=>{
			return <option value={item.id} key={key}>{item.name}</option>
		});
		return (
			<div className='WriteExInfo'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >快递信息</NavBar>
                <div className="base-content">
                	<WhiteSpace />
					<List className="checkEx">
						<Item
							align="right"
							arrow="horizontal"
				          	extra={
				          		<select
                                    {...getFieldProps('express_id')}
                                >
				          			{exNames}
					          	</select>
				         	}
				        >快递公司<em>*</em></Item>
                        <InputItem
                            clear
                            align="right"
                            placeholder="请输入快递单号"
                            moneyKeyboardAlign="left"
                            error={!!getFieldError('number')}
                            {...getFieldProps('number', {
                                rules: [{ required: true, message:'请输入快递单号'}],
                            })}
                        >快递单号<em>*</em></InputItem>
                    </List>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button type="warning" className="save-address" onClick={this.exHandler}>提交</Button>
                    </WingBlank>
                </div>
			</div>
		)
	}
};
export default createForm()(WriteExInfo);

