/**
 * 创建新站点
 */

var _   = require( 'underscore' ),
	fs  = require( 'fs' ),
	fse = require( 'fs-extra' );

function _help(){
	console.log( 'Usage: jugg create <name of your blog>' );
}

exports.exec = function( options ){
 	var name;

 	if( options.length ){
 		name = options[ 0 ];
 	}
 	// 如果参数数组是空或不是数组，那么打印 hlep 并退出程序
 	else{
 		_help();
 		return;
 	}

 	var basic = __dirname + '/../../basic', // 基本结构模板
 		src   = basic,
		dest  = __dirname + '/../../local/' + name; // 生成博客的目标路径

 	if( fs.exists( basic, function( exists ){
 		if( exists ){
 			fse.copySync( src, dest );
 			console.log( 'Blog ' + name + ' is created successfully.' );
 		}else{
 			// 如果找不到基础模板文件夹，则需要重新安装
 			console.log( 'The basic template cannot be found. Try reinstall jugg please.' );
 			process.exit( 1 );
 		}
 	} ) );
}