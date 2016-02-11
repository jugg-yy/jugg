var _      = require('underscore'),
	fs 	   = require('fs'),
	toml   = require('toml'),
	concat = require('concat-stream');

var tomls = [ 'site', 'nav', 'articles' ];

exports.parseTOML = function( name ){
	
	var obj = {};
	_.each( tomls, function( t, index, arr ){
		var path = './local/' + name + '/' + t + '.toml';
		if ( ! fs.existsSync( path ) ){
            console.log( path + ' can not be found!' );
            process.exit( 1 );
        }
		obj[ t ] = toml.parse( fs.readFileSync( path, 'utf8' ) );
	} );
	return obj;

}