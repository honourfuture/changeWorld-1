import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex} from 'antd-mobile';
import './Test1.less';

export class Test1 extends BaseComponent{
    componentDidMount(){
    }
    render(){
        return (
            <Flex className='component-test1'>
                123
            </Flex>
        )
    }
}