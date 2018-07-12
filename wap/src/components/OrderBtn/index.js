import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Flex, NavBar, Button } from "antd-mobile";
import './OrderBtn.less';

export class OrderBtn extends BaseComponent{
	render(){
		const { btns } = this.props;
        let btn = null;
        btn = btns.map((item,key)=>{
            return  <Button
                        key={key}
                        type="ghost"
                        inline
                        size="small"
                        className="am-button-borderfix"
                        onClick={()=>item.onPress && item.onPress()}
                    >
                        {item.label} 
                    </Button>
        });
		return (
			<Flex
                className="typeBtn"
                justify="end"
                align="center"
            >
                {btn}
            </Flex>
		)
	}
};
