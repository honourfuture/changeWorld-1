import React from 'react';
import {BaseComponent,Base} from '../../common';
import './ShopNavList.less';

export default class ShopNavList extends BaseComponent{
	componentDidMount() {
		Base.GET({act:'shop_class',op:'index',mod:'admin'},(res)=>{
			
		})
	}
	
	render(){
		return (
			<div className='ShopNavList'>
				
			</div>
		)
	}
};
