import React from 'react';
import {action} from 'mobx';
import {BaseComponent,Base} from './base';
export class NetImg extends BaseComponent{
    store={height:this.props.height || 'auto'}
    @action.bound
    imgLoadHandler(){
        window.dispatchEvent(new Event('resize'));
        this.store.height = 'auto';
    }
    render(){
        const {height} = this.store;
        return(
            <img 
            style={{height}}
            alt=""
            onLoad={this.imgLoadHandler}
            {...this.props}
            />
        )
    }
}