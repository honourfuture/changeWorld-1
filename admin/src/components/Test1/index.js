import React from 'react';
import {BaseComponent} from '../../common';
import {Spin} from 'antd';
import './Test1.less';

export class Test1 extends BaseComponent{
    componentDidMount(){
        // this.refs.spin.setState({spinning:false});
    }
    render(){
        return (
            <Spin className='Test1' ref='spin' size="default">
                <div className="test1">123</div>
            </Spin>
        )
    }
}