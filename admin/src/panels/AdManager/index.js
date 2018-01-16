import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from '../../common';
import { Form,Row, Col, Input,DatePicker,Button,Select,Table, Divider ,Modal} from 'antd';
import './AdManager.less';

const FormItem = Form.Item;
const Option = Select.Option;


const columns = [{
	title: '略缩图',
	dataIndex: 'pic',
	key: 'pic',
	render: text => <a href="#">{text}</a>,
}, {
	title: '标题',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '广告类型',
	dataIndex: 'type',
	key: 'type',
}, {
	title: '链接',
	dataIndex: 'href',
	key: 'href',
}, {
	title: '备注',
	dataIndex: 'remask',
	key: 'remask',
}, {
	title: 'Action',
	key: 'action',
	render: (text, record) => (
		<span>
			<a href="#">编辑</a>
			<Divider type="vertical" />
			<a href="#">删除</a>
		</span>
		),
}];

const data = [{
	key: '1',
	pic: 'John Brown',
	name: 'John Brown',
	type: 'John Brown',
	href: 32,
	enable: true,
	remask: 'New York No. 1 Lake Park',
}, {
	key: '2',
	pic: 'Jim Green',
	name: 'Jim Green',
	type: 'Jim Green',
	href: 32,
	enable: true,
	remask: 'New York No. 1 Lake Park',
}, {
	key: '3',
	pic: 'Joe Black',
	name: 'Joe Black',
	type: 'Joe Black',
	href: 32,
	enable: true,
	remask: 'New York No. 1 Lake Park',
}];



export default class AdManager extends BaseComponent{
	render(){
		return (
				<div className='AdManager'>
					<Form className="ant-advanced-search-form">
						<Row gutter={24}>
							<Col span={8}>
								<FormItem label="类型">
					              	<Select
					              		style={{ width: 171 }}
									    showSearch
									    placeholder="Select a person"
									    optionFilterProp="children"
									    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
									  >
									    <Option value="jack">Jack</Option>
									    <Option value="lucy">Lucy</Option>
									    <Option value="tom">Tom</Option>
									  </Select>
					          	</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label="时间">
					              	<DatePicker />
					          	</FormItem>
							</Col>
							<Col span={8}>
								<FormItem>
					              	<Button type="default">查询</Button>
					          	</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="primary">新增</Button>
							</Col>
						</Row>
					</Form>
					<Table style={{marginTop: 16}} columns={columns} dataSource={data} pagination={false} />



				</div>
		)
	}
};
