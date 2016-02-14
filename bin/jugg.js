#!/usr/bin/env node

/**
 * 程序入口
 */

var _ = require( 'underscore' );

// 主方法名数组
var commands = [ 'create', 'server', 'build' ];

// 主方法对象
var execs = {};

// 载入所有主方法模块
_.each( commands, function( command, index, arr ){
	execs[ command ] = require( './commands/' + command );
} );

// 获取命令参数
var args = ! ( process.argv[ 0 ] === 'node' ||
  process.argv[ 0 ] === 'nodejs' ||
  process.argv[ 0 ].match( /(node.exe|node)$/ ) ) ? process.argv : _.last( process.argv, process.argv.length - 2 );

// 主方法
var command = args[ 0 ];

// 参数数组
var options = _.last( args, args.length - 1 );

// 执行主方法并提供参数
execs[ command ].exec( options );
