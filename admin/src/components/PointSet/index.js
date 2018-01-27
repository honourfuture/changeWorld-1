import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Form,Input,Button,Row,Col,Select,message} from 'antd';
import './PointSet.less';

const formItemLayout = {
  	labelCol: {
    	xs: { span: 24 },
    	sm: { span: 4 },
  	},
  	wrapperCol: {
    	xs: { span: 24 },
    	sm: { span: 16 },
  	},
};
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class PointSet extends BaseComponent{
	showProps=[
		{key:'c_user_id',label:'会员ID',render:(value,key,label)=><Input placeholder={`请输入${label}`} />},
		{key:'type',label:'增减类型'},
		{key:'points',label:'积分值',render:(value,key,label)=><Input placeholder={`请输入${label}`} />},
		{key:'remark',label:'操作备注',render:(value,key,label)=><TextArea autosize={{ minRows: 4 }} />},
	]
	@action.bound
	onSaveBasic(value){
		this.props.form.validateFields((err, values) => {
			if(!err){
				Base.POST({act:'users_points',op:'save',...values},(res)=>{
					message.success(res.message);
				},this);
			}
        });
	}
	render(){
		const {getFieldDecorator} = this.props.form;
		const {showProps} = this;
		const items = showProps.map((item,index)=>{
			const {key,label,render} = item;
			if(key === 'type'){
				return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
						{getFieldDecorator(key,{initialValue:'1'})(
							<Select style={{width:120}}>
								<Option value="1">增加</Option>
								<Option value="2">减少</Option>
							</Select>
						)}
					</FormItem>
			}else{
				return <FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
						{getFieldDecorator(key)(render(key,key,label))}
					</FormItem>
			}
		})
		return (
			<div className='PointSet'>
				{items}
				<Row>
					<Col span={4}></Col>
					<Col>
						<Button type='primary' onClick={()=>this.onSaveBasic()}>确认提交</Button>
					</Col>
				</Row>
			</div>
		)
	}
};
export default Form.create()(PointSet);