import React from 'react';
import {BaseComponent} from '../../common';
import {Flex} from 'antd-mobile';
import './Panel1.less';

export default class Panel1 extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <Flex className='panel-panel1'>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </Flex>
        )
    }
}