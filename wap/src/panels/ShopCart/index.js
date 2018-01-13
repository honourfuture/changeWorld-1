import React from 'react';
import {action,computed} from 'mobx';
import {BaseComponent,Base} from '../../common';
import {Flex,Checkbox,NavBar,Icon,Button,Stepper} from 'antd-mobile';
import {test,icon} from '../../images';
import './ShopCart.less';

class CartItem extends BaseComponent{
	@action.bound
	changeHandler(){
		const {checked} = this.props.item;
		this.props.item.checked = !checked;
	}
	@action.bound
	stepperHandler(value){
		this.props.item.num = value;
	}
	render(){
		const {isEdit} = this.props;
		const {title,img,spec,price,checked,num} = this.props.item;
		return (
			<Flex className='cart-item'>
				<Checkbox checked={checked} onChange={this.changeHandler} className='check'/>
				<Flex.Item>
					<Flex align='start' className='goods-info'>
						<img className='goods-img' src={img} alt=""/>
						<Flex.Item>
							<Flex justify='between' align='start'>
								<div className="title ellipsis2">{title}</div>
								<div className="price">￥{Base.getNumFormat(price)}</div>
							</Flex>
							<Flex justify='between' className='bottom-info'>
								<div className="spec">{spec}</div>
								{isEdit?<Stepper onChange={this.stepperHandler} showNumber className='stepper' min={1} max={99} value={num}/>:
								<div className="num">x{num}</div>
								}
							</Flex>
						</Flex.Item>
					</Flex>
				</Flex.Item>
			</Flex>
		)
	}
}

export default class ShopCart extends BaseComponent{
	store={
		storeList:[
			{
				storeName:'文贝袄的店铺',
				storeId:'1',
				img:test.test1,
				goods:[
					{
						img:test.test8,
						title:'THE NORTHFACE 2017金岛狐毛短款派克服最新款，明星推荐，大牌值得拥有',
						spec:'经典褐色 S',
						price:'369',
						goodsId:'1',
						checked:false,
						num:1,
					},
					{
						img:test.test9,
						title:'日本—SUUNTO 腕表黑色运动',
						spec:'经典褐色 S',
						price:'357',
						goodsId:'2',
						checked:false,
						num:1,
					},
				]
			},
			{
				storeName:'哈哈哈的店铺',
				storeId:'2',
				img:test.test2,
				goods:[
					{
						img:test.test8,
						title:'安耐晒小金瓶',
						spec:'经典褐色 S',
						price:'369',
						goodsId:'3',
						checked:false,
						num:1,
					},
				]
			}
		],
		isEdit:false,
		isAllSelect:false,
	}
	@action.bound
	allCheckHandler(value){
		const {storeList,isAllSelect} = this.store;
		this.store.isAllSelect = !isAllSelect;
		storeList.forEach((storeItem,index)=>{
			storeItem.goods.forEach((item)=>{
				item.checked = !isAllSelect;
			})
		})
	}
	@action.bound
	rightHandler(){
		this.store.isEdit = !this.store.isEdit;
	}
	@action.bound
	payHandler(){
		Base.push('ConfirmOrder');
	}
	@action.bound
	delHandler(){
		const {storeList} = this.store;
		for(let len=storeList.length,i=len-1;i>=0;i--){
			const storeItem = storeList[i];
			for(let goodsLen = storeItem.goods.length,j=goodsLen-1;j>=0;j--){
				const item = storeItem.goods[j];
				if(item.checked){
					storeItem.goods.splice(j,1);
				}
			}
			if(storeItem.goods.length === 0){
				storeList.splice(i,1);
			}
		}
	}
	@computed get total(){
		let value = 0;
		const {storeList} = this.store;
		storeList.forEach((storeItem,index)=>{
			storeItem.goods.forEach((item)=>{
				const {checked,price,num} = item;
				if(checked){
					value += parseFloat(price)*parseInt(num,10);
				}
			})
		})
		return value;
	}
	render(){
		const {storeList,isEdit,isAllSelect} = this.store;
		const storeItems = storeList.map((storeItem)=>{
			const {img,storeId,storeName,goods} = storeItem;
			return <div className='store-item' key={storeId}>
				<Flex className='store-info base-line' onClick={()=>Base.push('AnchorStore')}>
					<img src={img} alt=""/>
					<div className='store-name'>{storeName}</div>
					<Icon type='right' color='#c9c9c9'/>
				</Flex>
				{
					goods.map((item)=><CartItem isEdit={isEdit} key={item.goodsId} item={item}/>)
				}
			</div>
		})
		return (
			<div className='ShopCart'>
				<NavBar
					className='base-line'
                    mode="light"
                    icon={<img src={icon.back} alt=''/>}
                    onLeftClick={Base.goBack}
                    rightContent={<div onClick={this.rightHandler} className='right-label'>{isEdit?'完成':'编辑'}</div>}
                >购物车</NavBar>
				<div className="base-content">
					{storeItems.length>0?storeItems:<div className='nodata'>暂无数据</div>}
				</div>
				{storeItems.length>0?<Flex className='footer' justify='between'>
					<Checkbox checked={isAllSelect} onChange={this.allCheckHandler} className='check'>全选</Checkbox>
					{isEdit?<Button className='del-btn' size='small' onClick={this.delHandler}>删除</Button>
					:<Flex>
						<div className='total'>合计 <em>￥{Base.getNumFormat(this.total)}</em></div>
						<Button className='pay-btn' size='small' onClick={this.payHandler}>去结算</Button>
					</Flex>}
				</Flex>:null}
			</div>
		)
	}
};
