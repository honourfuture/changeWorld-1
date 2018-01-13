'use strict';
let newAppFilePath = "./../php/wap";
let fs = require( 'fs' );
let Lib = require('./bin_lib.js');
let stat = fs.stat;
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
let exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};
/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
let copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            let _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};
if(fs.existsSync(newAppFilePath)){
    Lib.walk(newAppFilePath,function(tmpPath){
        if(tmpPath.indexOf('config.xml') === -1){
            fs.unlinkSync(tmpPath);
        }
    });
}
//修改index.html
const editFile = (url,re,replaceStr)=>{
    const path = Lib.getPath(url);
    let content = fs.readFileSync(path,'utf-8');
    content = content.replace(re,replaceStr);
    fs.writeFileSync(path,content);
}
//复制到php/wap/build
exists( './build', newAppFilePath , copy);
