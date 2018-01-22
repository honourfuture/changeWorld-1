import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Form,Input,Button,Tabs,Row,Col,Switch} from 'antd';
import './SystemSet.less';

const formItemLayout = {
  	labelCol: {
    	xs: { span: 24 },
    	sm: { span: 8 },
  	},
  	wrapperCol: {
    	xs: { span: 24 },
    	sm: { span: 16 },
  	},
};
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class BasicItem extends BaseComponent{
	render(){
		const {item} = this.props || [];
		const items = item.map((item,index)=>{
			const {key,label,render} = item;
			const value = !render?<Input placeholder={`请输入${label}`} />:render(key);
			return (
				<FormItem className="baseForm" key={index} {...formItemLayout} label={label}>
					{value}
				</FormItem>
			)
		})
		return <div>{items}</div>
	}
}

class EmailItem extends BaseComponent{
	render(){
		const {item} = this.props || [];
		const items = item.map((item,index)=>{
			const {key,label,render} = item;
			const value = !render?<Input placeholder={`请输入${label}`} />:render(key);
			return (
				<FormItem key={index} {...formItemLayout} label={label}>
					{value}
				</FormItem>
			)
		})
		return <div>{items}</div>
	}
}

class UploadItem extends BaseComponent{
	render(){
		const {item} = this.props || [];
		const items = item.map((item,index)=>{
			const {key,label,render} = item;
			const value = !render?<Input placeholder={`请输入${label}`} />:render(key);
			return (
				<FormItem key={index} {...formItemLayout} label={label}>
					{value}
				</FormItem>
			)
		})
		return <div>{items}</div>
	}
}

export default class SystemSet extends BaseComponent{
	showProps=[
		{key:'site_name',label:'站点名称'},
		{key:'icp_number',label:'ICP证书号'},
		{key:'statistics_code',label:'第三方流量统计代码'},
		{key:'copyright',label:'版权信息'},
		{key:'site_status',label:'站点状态',render:()=>this.renderSwitch()},
		{key:'closed_reason',label:'关闭原因'},
		{key:'',label:' ',render:()=><Button type="primary" onClick={this.onSaveBasic}>确认提交</Button>}
	]
	showEmail=[
		{key:'email_host',label:'SMTP 服务器'},
		{key:'email_port',label:'SMTP 端口'},
		{key:'email_addr',label:'发信人邮件地址'},
		{key:'email_id',label:'SMTP 身份验证用户名'},
		{key:'email_pass',label:'SMTP 身份验证密码'},
		{key:'email_test',label:'测试接收的邮件地址',render:()=>this.renderTest()},
		{key:'',label:' ',render:()=><Button type="primary" onClick={this.onSaveEmail}>确认提交</Button>}
	]
	showUpload=[
		{key:'image_max_filesize',label:'图片文件大小',render:()=>this.renderImgSize()},
		{key:'image_allow_ext',label:'文件扩展名'},
		{key:'',label:' ',render:()=><Button type="primary" onClick={this.onSaveEmail}>确认提交</Button>}
	]
	renderTest(){
		return (
			<Row gutter={8}>
				<Col span={20}><Input /></Col>
				<Col span={4}><Button>测试</Button></Col>
			</Row>
		)
	}
	renderImgSize(){
		return (
			<div>大小 <Input style={{width:100}} /> KB（1024 KB = 1 MB）</div>
		)
	}
	renderSwitch(text,record,column){
		return (
			<Switch checkedChildren="开" unCheckedChildren="关" />
		)
	}
	onSaveBasic(){
		console.log("onSaveBasic");
	}
	onSaveEmail(){
		console.log("onSaveEmail");
	}
	render(){
		const {showProps,showEmail,showUpload} = this;
		const panes = [
	      	{ title: '基本设置', content: <BasicItem item={showProps} />, key: '1' },
	     	{ title: '邮件设置', content: <EmailItem item={showEmail} />, key: '2' },
	     	{ title: '上传设置', content: <UploadItem item={showUpload} />, key: '3' },
	    ];
		const tabPan = panes.map((item)=>{
			const {title,key,content} = item;
			return <TabPane key={key} tab={title}>{content}</TabPane>
		})

		return (
			<div className='SystemSet'>
				<Tabs>
					{tabPan}
				</Tabs>
			</div>
		)
	}
};
