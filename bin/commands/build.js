/**
 * 生成全部静态页面
 * 即整个站点
 */

var _ 			= require( 'underscore' ),
	fse 		= require( 'fs-extra' ),
	gulp        = require( 'gulp' ),
	runSequence = require('run-sequence').use(gulp),
	compiler    = require( '../../lib/compiler' );

function _help(){
	console.log( 'Usage: jugg create <name of your blog>' );
}

function _tasks( name ){
	gulp.task( 'build_publish', function(){
		gulp.src( './build/' + name + '/index.html' )
	        .pipe( gulp.dest( './build/' + name + '/a/' ) );
	} );
}

function _copy( name ){
	fse.copySync( './local/' + name + '/assets/', './build/' + name + '/assets/' );
}

exports.exec = function( options ){
 	var name, // 博客文件夹名
 		mode = '-d'; // 开发模式（默认-d）/发布模式(-p)


 	if( options.length ){
 		name = options[ 0 ];
 		mode = options[ 1 ] ? options[ 1 ] : mode;
 	}
 	// 如果参数数组是空或不是数组，那么打印 hlep 并退出程序
 	else{
 		_help();
 		return;
 	}
 	_copy( name );
 	compiler.compile( name );
 	if( mode == '-p' ){

 		_tasks( name );

 		runSequence( 'build_publish' );
 	}

}

