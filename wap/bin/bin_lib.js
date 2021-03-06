/*
 * @Author: daihanqiao@126.com 
 * @Date: 2018-01-10 22:58:40 
 * @Last Modified by: daihanqiao@126.com
 * @Last Modified time: 2018-01-10 23:26:01
 * @copyright: www.aicode.org.cn
 */

'use strict';
let fs = require('fs');
let path = require('path');
//[npm run panel userLogin 登录]
//[npm run component userLogin]
let com = {
	get args(){
		let npm_config_argv = JSON.parse(process.env.npm_config_argv);
		return npm_config_argv.original;	
	},
	//获取绝对路径
	getPath(url){
	    return path.resolve('./', url);
	},
	exists(dst,callback){
	    fs.exists( dst, (exists)=>{
	        // 已存在
	        if( exists ){
	            throw "-------该目录已存在，请重命名-------";
	        }else{
	            fs.mkdir( dst, callback);
	        }
	    });
	},
	mkdir(path){
	    if(!fs.existsSync(this.getPath(path))){
	        fs.mkdirSync(this.getPath(path));
	    }
	},
	//遍历文件
	walk:function(path, handleFile){
		var self = this;
		self.files = fs.readdirSync(path);
		self.files.forEach(function(item) {
			var tmpPath = path + '/' + item;
			var stats = fs.statSync(tmpPath);
			if (stats.isDirectory()) {
				if(item === '.svn'){
					return false;
				}
				self.walk(tmpPath,handleFile);
			} else {
				handleFile(tmpPath,stats);
			}
		});
	}
}
com.mkdir('src/panels/');
module.exports = com;
