import React from 'react';
import {BaseComponent} from '../../common';
import {Flex, WhiteSpace, Button} from 'antd-mobile';
import './vanity.less';

import {Carousel_Img} from '../../components/Carousel_Img';

export class Vanity extends BaseComponent{
    render(){
    	// const imgData = ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'];
        return (
            <div className='Vanity'>
                <Carousel_Img />
            </div>
        )
    }
}