/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-01 15:37:46 
 * @Last Modified by:   daihanqiao@126.com 
 * @Last Modified time: 2018-01-01 15:37:46 
 * 通用异常页面组件
 */

import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './Exception.config';
import './Exception.less';

export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
	const pageType = type in config ? type : '404';
	const clsString = classNames('exception', className);
	return (
		<div className={clsString} {...rest}>
			<div className='imgBlock'>
				<div
					className='imgEle'
					style={{ backgroundImage: `url(${img || config[pageType].img})` }}
				/>
			</div>
			<div className='content'>
				<h1>{title || config[pageType].title}</h1>
				<div className='desc'>{desc || config[pageType].desc}</div>
				<div className='actions'>
				{
					actions ||
					createElement(linkElement, {
						to: '/',
						href: '/',
					}, <Button type="primary">返回首页</Button>)
				}
				</div>
			</div>
		</div>
	);
};
