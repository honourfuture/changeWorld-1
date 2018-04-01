import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,NavBar,WhiteSpace,Steps} from 'antd-mobile';
import './ExLog.less';

import {icon} from '../../images';
const Step = Steps.Step;
export default class ExLog extends BaseComponent{
	store = {
		listLog:[{
			addr:"【杭州市】已签收，签收人：前台代收",
			time:"2017-04-14 03:52:12"
		},{
			addr:"【杭州市】五常揽投站安排投递，预计13:00:00前投递（投递员 姓名：周文进；联系电话：18058769605）",
			time:"2017-04-14 03:52:12"
		},{
			addr:"【杭州市】离开杭州处理中心 发往五常揽投站",
			time:"2017-04-14 03:52:12"
		},{
			addr:"【杭州市】已揽收",
			time:"2017-04-14 03:52:12"
		},{
			addr:"包裹已出库来自：杭州报税1号仓",
			time:"2017-04-14 03:52:12"
		}],
		orderNo:2017072719315,
		exName:"顺丰快递"
	}
	componentDidMount(){
		const id = parseInt(Base.getPageParams('id'));
		// express
		Base.POST({ act: "order_action", op: "buyer",mod:'user',order_id:id,action:'express'}, res => {
            // Toast.info(`已提交申请！`, 1);
            // setTimeout(()=>{
            // 	Base.goBack();
            // },1000)
        });
	}
	render(){
		
		const {listLog,orderNo,exName} = this.store;
		const listsLog = listLog.map((item,key)=>{
			if(key === 0 ){
				return <Step key={key} status="error" className="last" title={item.addr} description={item.time} />
			}else{
				return <Step key={key} status="process" title={item.addr} description={item.time} />
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
                <div className="base-content">
                	<Flex className="exBank" align="center">
						<img src={icon.exCar} className="exCarImg" alt=""/>
						<div className="exInfo">
							<div className="exInfoItem">
								<span>订单编号：</span>{exName}
							</div>
							<div className="exInfoItem">
								<span>物流编号：</span>{orderNo}
							</div>
						</div>
                	</Flex>
                	<WhiteSpace />
                	<div className="exStep">
                		<Steps size="small">
                			{listsLog}
					    </Steps>

                	</div>
                </div>	
			</div>
		)
	}
};
