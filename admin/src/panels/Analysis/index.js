import React, { Component } from 'react';
import './Analysis.less';
import {Base} from '../../common';
import {Test3} from '../../components/Test3';
import { Row, Col } from 'antd';
export default class Analysis extends Component {
    componentDidMount(){
        console.log(12);
    }
    render(){
        console.log(this.props);
        const a = Base.getPageParams('id');
        console.log(a);
        return (
            <div>
                <Row gutter={24} className='Analysis'>
                    <Col span={12}>
                    </Col>
                    <Col span={4}>
                        <Test3/>
                    </Col>
                </Row>
            </div>
        )
    }
}