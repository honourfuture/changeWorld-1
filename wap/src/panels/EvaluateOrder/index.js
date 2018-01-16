import React from 'react';
import { action } from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,Button,NavBar,WhiteSpace,TextareaItem,ImagePicker,Checkbox,WingBlank} from 'antd-mobile';
import './EvaluateOrder.less';
import {icon,test} from '../../images';
import {GoodsItem} from '../../components/GoodsItem';

const AgreeItem = Checkbox.AgreeItem;
export default class EvaluateOrder extends BaseComponent{
	store={
		files:[],
        storeList:[{
			img: test.test4,
			title: 'RE:CIPE 水晶防晒喷雾 150毫升/瓶 3瓶',
			spec: '型号 150ml',
			price: '369',
			goodsId: '1',
			num: 1,
        }],
    }
    @action.bound
    onChange = (files, type, index) => {
	    console.log(files, type, index);
	    this.store.files = files;
	}
	render(){
		const {storeList,files} = this.store;
		const goodsItem = storeList.map((item,key)=>{
			return <GoodsItem key={key} item={item} />
		})

		return (
			<div className='EvaluateOrder'>
				<NavBar
                    className="base-line"
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                >我的订单</NavBar>
                <div className="base-content">
					{goodsItem}
					<WhiteSpace />
					<div className="evaluateBox">
						<TextareaItem
							placeholder="请输入输入您对商品的描述"
				            autoHeight
				        />
				        <ImagePicker
					        files={files}
					        onChange={this.onChange}
					        onImageClick={(index, fs) => console.log(index, fs)}
					        selectable={files.length < 10}
					        multiple={true}
					    />
					    <Flex className="anonymity" justify="end">
					    	<AgreeItem>
					            匿名评价
					        </AgreeItem>
					    </Flex>
					</div>
					<WhiteSpace size="lg" />
					<WingBlank size="md">
						<Button type="warning" className="save-address" onClick={()=>Base.push('MyOrder')}>提交</Button>
					</WingBlank>
                </div>
			</div>
		)
	}
};
