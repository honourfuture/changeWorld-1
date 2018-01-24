import React from 'react';
import ReactDOM from 'react-dom';
import {action} from 'mobx';
import {Base,BaseComponent,NetImg,Global} from '../../common';
import { WhiteSpace,Carousel,ListView,PullToRefresh,Flex} from 'antd-mobile';
import './Hots.less';

import {GoodsItem} from '../../components/GoodsList';
import {test} from '../../images';
const hList = document.body.offsetHeight - 45-44-154;
export class Hots extends BaseComponent{
    constructor(props){
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.cur_page = 1;
        this.store = {
            goods:[],
            refreshing:false,
            height:0,
            isLoading:true,
        }
    }
    componentDidMount(){
        const {id} = this.props;
        Base.GET({act:'shop',op:'index',goods_class_id:id,per_page:Global.PAGE_SIZE},(res)=>{
            this.cur_page ++;
            this.store.goods = res.data.goods;
            this.store.anchor = res.data.anchor;
            this.store.height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.listView).offsetTop - 88;
        });
    }
    @action.bound
    renderGoodsItem(rowData, sectionID, rowID){
        return <GoodsItem {...rowData}/>
    }
    @action.bound
    requestData(){
        const {id} = this.props;
        Base.GET({act:'shop',op:'goods',goods_class_id:id,cur_page:this.cur_page || 1,per_page:Global.PAGE_SIZE},(res)=>{
            const {goods} = res.data;
            this.store.goods = this.cur_page === 1?[].concat(goods):this.store.goods.concat(goods);
            this.store.refreshing = false;
            this.store.isLoading = goods.length > 0;
            if(goods.length > 0){
                this.cur_page ++;
            }
        },false,true);
    }
    @action.bound
    onRefresh(){
        this.store.refreshing = true;
        this.store.isLoading = false;
        this.cur_page = 1;
        this.requestData();

    }
    @action.bound
    onEndReached(){
        this.store.isLoading = true;
        this.store.refreshing = true;
        this.requestData();
    }
    render(){
        const {goods,refreshing,height,isLoading} = this.store;
        const dataSource = this.dataSource.cloneWithRows(goods.slice());
        return (
            <div className='Hots base-content'>
                <Carousel
                    autoplay={true}
                    infinite
                    >
                    {[test.banner1,test.banner1].map(val => (
                        <NetImg
                            key={val}
                            src={val}
                            style={{ width: '100%'}}
                        />
                    ))}
                </Carousel>
                <WhiteSpace size="md" />
                <div className="anchor-recommend"><span>主播推荐</span></div>
                <WhiteSpace size="md" />
                <ListView
                    ref={el => this.listView = el}
                    style={{ height }}
                    dataSource={dataSource}
                    renderRow={this.renderGoodsItem}
                    renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>{isLoading ? '加载中...' : '加载完成'}</div>)}
                    pullToRefresh={<PullToRefresh
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onEndReached={this.onEndReached}
                    // pageSize={2}
                >
                </ListView>
            </div>
        )
    }
}