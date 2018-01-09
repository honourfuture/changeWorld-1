import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Spin} from 'antd';
import './Test1.less';

export class Test1 extends BaseComponent{
    componentDidMount(){
        Base.GET({act:'v2',op:'index2'},(res)=>{
            
        },this);
    }
    render(){
        return (
            <Spin className='Test1' ref='spin' size="default">
                <div className="test1">123</div>
            </Spin>
        )
    }
}