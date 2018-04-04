/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-10 22:58:40 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-10 23:23:04
 * @copyright: www.aicode.org.cn
 * 创建文件脚本
 */

"use strict";
let fs = require("fs");
let lib = require("./bin_lib.js");

if (lib.args[1] === "panel") {
    let panelName = lib.args[2];
    let title = lib.args[3];
    let path = "src/panels/" + panelName;
    const PanelTem = `import React from 'react';
import {BaseComponent,Base} from '../../common';
import './${panelName}.less';

export default class ${panelName} extends BaseComponent{
	render(){
		return (
			<div className='${panelName}'>
			</div>
		)
	}
};
`;

    const LessTem = `@import '../../common/theme.less';
.${panelName}{

}
`;
    //在指定字符串除插入字符串，isAfter(在该字符串后)
    function insStrIndex(oldStr, specifyStr, insStr, fileName, isAfter) {
        var arr = oldStr.split(specifyStr);
        if (arr.length !== 2) {
            throw fileName + "ins indexConfig fail!";
        }
        if (isAfter) {
            arr[1] = insStr + arr[1];
        } else {
            arr[0] = arr[0] + insStr;
        }
        var newStr = arr.join(specifyStr);
        return newStr;
    }

    lib.exists(lib.getPath(path), () => {
        //生成页面文件
        let index = path + "/index.js";
        fs.writeFileSync(index, PanelTem);
        let less = path + "/" + panelName + ".less";
        fs.writeFileSync(less, LessTem);
        //修改index文件
        let indexConfigPath = lib.getPath("./src/panels/index.js");
        let contentText = "";
        if (!fs.existsSync(indexConfigPath)) {
            contentText = `//该文件由bin_createPanel脚本自动生成，请勿手动更改
import ${panelName} from './${panelName}';
export const panelsList =  [
	{
        path:'/${panelName}',
        component:${panelName},
        title:'${title}',
    },
];
export const getPanelName = (path)=>{
    const item = panelsList.find((item)=>item.path === path);
    const title = item?item.title:'';
    return title;
}
`;
        } else {
            contentText = fs.readFileSync(indexConfigPath, "utf-8");
            let insStr = `import ${panelName} from './${panelName}';\n`;
            contentText = insStrIndex(
                contentText,
                "export const panelsList = [",
                insStr,
                panelName
            );
            let insStr_component = `
    {
        path:'/${panelName}',
        component:${panelName},
        title:'${title}',
    },`;
            contentText = insStrIndex(
                contentText,
                "export const panelsList = [",
                insStr_component,
                panelName,
                true
            );
        }
        fs.writeFileSync(indexConfigPath, contentText);
    });
}
