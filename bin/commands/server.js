/**
 * 本地调试站点
 */

var _ 			= require( 'underscore' ),
    connect 	= require( 'connect' ),
    serveStatic = require('serve-static');

function _help(){
  console.log( 'Usage: jugg server <name of your blog>' );
}

exports.exec = function( options ){
  var port = 8001;
  var name;

  if( options.length ){
    name = options[ 0 ];
  }
  // 如果参数数组是空或不是数组，那么打印 hlep 并退出程序
  else{
    _help();
    return;
  }

  var app = connect();

  app.use( serveStatic( __dirname + '/../../build/' + name ) );
  app.listen( port );
  console.log( 'Listening: http://localhost:' + port );

}