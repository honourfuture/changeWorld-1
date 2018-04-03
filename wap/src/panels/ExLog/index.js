import React from 'react';
import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,NavBar,WhiteSpace,Steps} from 'antd-mobile';
import './ExLog.less';
import { NoData } from "../../components/NoData";
import {icon,blankImg} from '../../images';
const Step = Steps.Step;
export default class ExLog extends BaseComponent{
	store = {
		list:[],
		number:2017072719315,
		express:"顺丰快递"
	}
	componentDidMount(){
		this.requestData();
	}
	@action.bound
    requestData() {
        const id = parseInt(Base.getPageParams('id'));
		Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'express'}, res => {
			const {info,number,express} = res.data;
			this.store.list = info;
			this.store.number = number;
			this.store.express = express;
        });
    }
	render(){
		const {list,number,express} = this.store;
		const listsLog = list.map((item,key)=>{
			if(key === 0 ){
				return <Step key={key} status="error" className="last" title={item.context} description={item.ftime} />
			}else{
				return <Step key={key} status="process" title={item.context} description={item.ftime} />
			}
		})
		return (
			<div className='ExLog'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >查看物流</NavBar>
                {
                	list.length > 0 ?
                		<div className="base-content">
		                	<Flex className="exBank" align="center">
								<img src={icon.exCar} className="exCarImg" alt=""/>
								<div className="exInfo">
									<div className="exInfoItem">
										<span>订单编号：</span>{express}
									</div>
									<div className="exInfoItem">
										<span>物流编号：</span>{number}
									</div>
								</div>
		                	</Flex>
		                	<WhiteSpace />
		                	<div className="exStep">
		                		<Steps size="small">
		                			{listsLog}
							    </Steps>
		                	</div> 
		                </div> :
                		<NoData img={blankImg.order} label={'暂无数据'} />
                }
			</div>
		)
	}
};
