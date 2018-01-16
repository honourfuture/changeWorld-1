import React from 'react';
import {BaseComponent,Base} from '../../common';
import {NavBar,WhiteSpace,Button,List,InputItem,select,WingBlank} from 'antd-mobile';
import './WriteExInfo.less';
import {icon} from '../../images';

const Item = List.Item;
export default class WriteExInfo extends BaseComponent{
	store={
        exName:[{
            name:"顺丰",
            value:1
        },{
            name:"邮政",
            value:2
        },{
            name:"中通",
            value:3
        }]
    }
	render(){
		const {exName} = this.store;
		const exNames = exName.map((item,key)=>{
			return <option value={item.value} key={key}>{item.name}</option>
		})

		return (
			<div className='WriteExInfo'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >快递信息</NavBar>
                <div className="base-content">
                	<WhiteSpace />
					<List className="checkEx">
						<Item
							align="right"
							arrow="horizontal"
				          	extra={
				          		<select>
				          			{exNames}
					          	</select>
				         	}
				        >快递公司<em>*</em></Item>
                        <InputItem
                            clear
                            align="right"
                            placeholder="请输入快递单号"
                            moneyKeyboardAlign="left"
                        >快递单号<em>*</em></InputItem>
                    </List>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button type="warning" className="save-address" onClick={()=>Base.push('NewAddress')}>提交</Button>
                    </WingBlank>
                </div>
			</div>
		)
	}
};
