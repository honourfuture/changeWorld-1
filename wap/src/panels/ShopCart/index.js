import React from 'react';
import {action,computed} from 'mobx';
import {BaseComponent,Base,NetImg} from '../../common';
import {Flex,Checkbox,NavBar,Icon,Button,Stepper,Toast} from 'antd-mobile';
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
		const {name,default_image,goods_attr,sale_price,checked,num} = this.props.item;
		let goodsAttrStr = '';
		const goodsAttrDic = goods_attr?JSON.parse(goods_attr):[];
		for (const key in goodsAttrDic) {
			if (goodsAttrDic.hasOwnProperty(key)) {
				goodsAttrStr+=` ${goodsAttrDic[key]}`
			}
		}
		return (
			<Flex className='cart-item'>
				<Checkbox checked={checked} onChange={this.changeHandler} className='check'/>
				<Flex.Item>
					<Flex align='start' className='goods-info'>
						<NetImg className='goods-img' src={Base.getImgUrl(default_image)}/>
						<Flex.Item>
							<Flex justify='between' align='start'>
								<div className="title ellipsis2">{name}</div>
								<div className="price">￥{Base.getNumFormat(sale_price)}</div>
							</Flex>
							<Flex justify='between' className='bottom-info'>
								<div className="spec">{goodsAttrStr}</div>
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
		storeList:[],
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
		const {isEdit,storeList} = this.store;
		if(isEdit){
			const goods_num = {};
			let isChecked = false;
			storeList.forEach((storeItem,index)=>{
				storeItem.goods.forEach((item)=>{
					const {checked,id,num} = item
					if(item.checked){
						goods_num[id] = num;
						isChecked = true;
					}
				})
			})
			if(!isChecked){
				return Toast.fail('请选择需要编辑的商品',2,null,false);
			}
			Base.POST({act:'cart',op:'save',mod:'user',goods_num:JSON.stringify(goods_num)},(res)=>{
				this.store.isEdit = !this.store.isEdit;
			});
		}else{
			this.store.isEdit = !this.store.isEdit;
		}
	}
	@action.bound
	payHandler(){
		Base.push('ConfirmOrder');
	}
	@action.bound
	delHandler(){
		const {storeList} = this.store;
		const goods_num = {};
		let isChecked = false;
		storeList.forEach((storeItem,index)=>{
			storeItem.goods.forEach((item)=>{
				const {checked,id} = item
				if(item.checked){
					goods_num[id] = 0;
					isChecked = true;
				}
			})
		})
		if(!isChecked){
			return Toast.fail('请选择需要删除的商品',2,null,false);
		}
		Base.POST({act:'cart',op:'save',mod:'user',goods_num:JSON.stringify(goods_num)},(res)=>{
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
		});
	}
	@computed get total(){
		let value = 0;
		const {storeList} = this.store;
		storeList.forEach((storeItem,index)=>{
			storeItem.goods.forEach((item)=>{
				const {checked,sale_price,num} = item;
				if(checked){
					value += parseFloat(sale_price)*parseInt(num,10);
				}
			})
		})
		return value;
	}
	componentDidMount(){
		Base.GET({act:'cart',op:'index',mod:'user'},(res)=>{
			const storeList = [];
			const data = res.data;
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					(data[key].goods || []).forEach(item=>{
						item.checked = false;
					})
					storeList.push({...data[key],storeId:key});
				}
			}
			console.log(storeList);
			this.store.storeList = storeList;
		})
	}
	render(){
		const {storeList,isEdit,isAllSelect} = this.store;
		const storeItems = storeList.map((storeItem)=>{
			const {header,storeId,nickname,goods} = storeItem;
			return <div className='store-item' key={storeId}>
				<Flex className='store-info base-line' onClick={()=>Base.push('AnchorStore')}>
					<NetImg src={Base.getImgUrl(header)}/>
					<div className='store-name'>{nickname}</div>
					<Icon type='right' color='#c9c9c9'/>
				</Flex>
				{
					goods.map((item)=><CartItem isEdit={isEdit} key={item.id} item={item}/>)
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
