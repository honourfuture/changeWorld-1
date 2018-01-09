/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:38:07 
 * @Last Modified by:   daihanqiao@126.com 
 * @Last Modified time: 2018-01-01 15:38:07 
 * 通用底部组件
 */

import React,{Component} from 'react';
import {Icon} from 'antd';
import globalFooterData from './GlobalFooter.config';
import './GlobalFooter.less';
const {links,copyright} = globalFooterData;

export class GlobalFooter extends Component {
    render(){
        return (
            <div className='globalFooter'>
                <div className='links'>
                    {links.map(link => (
                    <a
                        key={link.title}
                        target={link.blankTarget ? '_blank' : '_self'}
                        href={link.href}
                    >
                        {link.title}
                    </a>
                    ))}
                </div>
                <div>
                    Copyright <Icon type="copyright" /> {copyright}
                </div>
            </div>
        )
    }
}