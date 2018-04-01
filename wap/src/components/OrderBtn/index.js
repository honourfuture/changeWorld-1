import React from 'react';
import {BaseComponent,Base} from '../../common';
import { Flex, NavBar, Button } from "antd-mobile";
import './OrderBtn.less';

export class OrderBtn extends BaseComponent{
	render(){
		const { btnTxt, oneCallBack, twoCallBack, threeCallBack, fourCallBack, isDouble } = this.props;
        let btns = null;
        if(parseInt(isDouble) === 1){
            btns =  <div>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                oneCallBack && oneCallBack()
                            }
                        >
                            {btnTxt[0]}
                        </Button>
                    </div>
        }
        if(parseInt(isDouble) === 2){
            btns = <div>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                oneCallBack && oneCallBack()
                            }
                        >
                            {btnTxt[0]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix eva-order"
                            onClick={() =>
                                twoCallBack && twoCallBack()
                            }
                        >
                            {btnTxt[1]}
                        </Button>
                    </div>
        }
        if(parseInt(isDouble) === 3){
            btns = <div>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                oneCallBack && oneCallBack()
                            }
                        >
                            {btnTxt[0]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix eva-order"
                            onClick={() =>
                                twoCallBack && twoCallBack()
                            }
                        >
                            {btnTxt[1]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                threeCallBack && threeCallBack()
                            }
                        >
                            {btnTxt[2]}
                        </Button>
                    </div>
        }
        if(parseInt(isDouble) === 4){
            btns = <div>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                oneCallBack && oneCallBack()
                            }
                        >
                            {btnTxt[0]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix eva-order"
                            onClick={() =>
                                twoCallBack && twoCallBack()
                            }
                        >
                            {btnTxt[1]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                threeCallBack && threeCallBack()
                            }
                        >
                            {btnTxt[2]}
                        </Button>
                        <Button
                            type="ghost"
                            inline
                            size="small"
                            className="am-button-borderfix"
                            onClick={() =>
                                fourCallBack && fourCallBack()
                            }
                        >
                            {btnTxt[3]}
                        </Button>
                    </div>
        }
		return (
			<Flex
                className="typeBtn"
                justify="end"
                align="center"
            >
                {btns}
            </Flex>
		)
	}
};
