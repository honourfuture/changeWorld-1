import React from 'react';
import {BaseComponent,Base} from '../../common';
import {Flex,NavBar,WhiteSpace,Steps} from 'antd-mobile';
import './ExLog.less';

import {icon} from '../../images';
const Step = Steps.Step;
export default class ExLog extends BaseComponent{
	render(){
		const tel = 18058769605;
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
								<span>订单编号：</span>顺丰快递
							</div>
							<div className="exInfoItem">
								<span>物流编号：</span>2017072719315
							</div>
						</div>
                	</Flex>
                	<WhiteSpace />
                	<div className="exStep">
                		<Steps size="small">
					      	<Step status="error" className="last" title="【杭州市】已签收，签收人：前台代收" description="2017-04-14 03:52:12" />
					      	<Step status="process" title={<div>【杭州市】五常揽投站安排投递，预计13:00:00前投递（投递员 姓名：周文进；联系电话：<a href={'tel:'+tel}>{tel}</a></div>} description="2017-04-14 03:52:12" />
					      	<Step status="process" title="【杭州市】离开杭州处理中心 发往五常揽投站" description="2017-04-14 03:52:12" />
					      	<Step status="process" title="【杭州市】已揽收" description="2017-04-14 03:52:12" />
					      	<Step status="process" title="包裹已出库来自：杭州报税1号仓" description="2017-04-14 03:52:12" />
					    </Steps>

                	</div>
                </div>	
			</div>
		)
	}
};
