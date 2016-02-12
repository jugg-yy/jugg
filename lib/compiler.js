/**
 * 解析并渲染页面辅助方法库
 */

var _      = require( 'underscore' ),
    ejs    = require( 'ejs' ),
    fs     = require( 'fs' ),
    parse  = require( './parse' ),
    marked = require( 'marked' ),
    toc    = require( 'marked-toc' );

// 开启GFM并支持代码高亮
marked.setOptions( {
  gfm : true,
  langPrefix : 'prettyprint linenums lang-'
} );


function _loadTemplate( name, template ){
  var path = './local/' + name + '/templates/' + template + '.ejs';
  if ( ! fs.existsSync( path ) ){
    console.log( path + ' can not be found!' );
    process.exit( 1 );
  }
  return fs.readFileSync( path, 'utf8' );
}

function _compileIndex( name, options ){
  var template = _loadTemplate( 'myBlog', 'index' );

  options.filename = './local/' + name + '/templates/index.ejs';

  _.each( options.articles.items, function( article, index, arr ){
    options.articles.items[ index ].href = 'articles/' + article.id + '.html';
  } );

  var html = ejs.render( template, options );

  fs.writeFileSync( './build/' + name + '/index.html', html );

}

function _compileArticles( name, options ){
  var template = _loadTemplate( 'myBlog', 'article' );

  options.filename = './local/' + name + '/templates/article.ejs';

  _.each( options.articles.items, function( article, index, arr ){
    var pathMd = './local/' + name + '/articles/' + article.id + '.md';
    if( ! fs.existsSync( pathMd ) ){
      console.log( pathMd + ' not exists.' );
      return;
    }
    var content = fs.readFileSync(pathMd, 'utf8');
    content = toc.insert(content);
    content = marked( content );
    content = content.replace(/<pre><code/g, '<pre');
    content = content.replace(/<\/code><\/pre>/g, '<\/pre>');
    article.content = content;

    options.article = article;
    var html = ejs.render( template, options );
      fs.writeFileSync( './build/' + name + '/articles/' + article.id + '.html', html );
  } );
}

function _dirsPrepare( name ){
  if( ! fs.existsSync( './build/' + name ) ){
  	fs.mkdirSync( './build/' + name );
  }
  if( ! fs.existsSync( './build/' + name + '/articles' ) ){
  	fs.mkdirSync( './build/' + name + '/articles' );
  }
}

exports.compile = function( name ){
  _dirsPrepare( name );
  var options = parse.parseTOML( name );
  _compileIndex( name, options );
  _compileArticles( name, options );
}


