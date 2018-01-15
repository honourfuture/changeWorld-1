import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Button,List,Radio,WhiteSpace,WingBlank,NavBar} from 'antd-mobile';

import './AddressManage.less';
import {icon} from '../../images';

export default class AddressManage extends BaseComponent{
	render(){
		return (
			<div className='AddressManage'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={<div onClick={()=>Base.push('NewAddress')} className='right-label'>添加</div>}
                >支付</NavBar>
			</div>
		)
	}
};
