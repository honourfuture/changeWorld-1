import React from 'react';
import {action} from 'mobx';
import {BaseComponent} from './base';
import {defaultImg} from '../images';
export class NetImg extends BaseComponent{
    store={height:this.props.height || 'auto'}
    @action.bound
    onLoad(){
        window.dispatchEvent(new Event('resize'));
        this.store.height = 'auto';
    }
    @action.bound
    onError(e){
        e.target.src = defaultImg;
    }
    render(){
        const {height} = this.store;
        return(
            <img 
            style={{height}}
            alt=""
            onLoad={this.onLoad}
            onError={this.onError}
            {...this.props}
            />
        )
    }
}