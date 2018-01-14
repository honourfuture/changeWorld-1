/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-10 22:58:40 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-10 23:31:00
 * @copyright: www.aicode.org.cn
 * 创建文件脚本
 */

'use strict';
let fs = require('fs');
let lib = require('./bin_lib.js');

if(lib.args[1] === 'component'){
	let componentName = lib.args[2];
	let path = "src/components/"+componentName;
	const ComponentTem = `import React from 'react';
import {BaseComponent,Base} from '../../common';
import './${componentName}.less';

export class ${componentName} extends BaseComponent{
	render(){
		return (
			<div className='${componentName}'>
			</div>
		)
	}
};
`;

	const LessTem = `@import '../../common/theme.less';
.${componentName}{

}
`
	lib.exists(lib.getPath(path),()=>{
		//生成页面文件
		let index = path + '/index.js';
		fs.writeFileSync(index,ComponentTem);
		let less = path + '/' + componentName + ".less";
		fs.writeFileSync(less,LessTem);
	})
}
