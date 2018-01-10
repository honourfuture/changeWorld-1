import React from 'react';
import {BaseComponent} from '../../common';
import {Carousel} from 'antd-mobile';
import './carousel_img.less';

export class Carousel_Img extends BaseComponent{
    render(){
    	const imgData = ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'];
        return (
            <div className='Carousel_Img'>
            	<Carousel infinite  >
                	{
                		imgData.map(i => (
                			<a key={i} className="carousel_href">
                				<img src={`https://zos.alipayobjects.com/rmsportal/${i}.png`} />
                			</a>
                		))
                	}
                </Carousel>
            </div>
        )
    }
}