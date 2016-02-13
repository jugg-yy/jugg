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
  var template = _loadTemplate( name, 'index' ),
      pageNum = 1,
      pageSize = options.site.article.pageSize;

  options.filename = './local/' + name + '/templates/index.ejs';
  options.pagination = {};
  options.curPageUrl = '/';


  _.each( options.articles.items, function( article, index, arr ){

    // 分页
    if( ( index + 1 ) % pageSize === 0 || index === 0 ){

      options.pagination.pageSize = pageSize;
      options.pagination.pageNum = pageNum;
      options.pagination.pageLength = Math.ceil( arr.length / pageSize );
      var html = ejs.render( template, options );

      if( pageNum === 1 ){
        fs.writeFileSync( './build/' + name + '/index.html', html );
      }else{
        if( ! fs.existsSync( './build/' + name + '/p/' + pageNum ) ){
          fs.mkdirSync( './build/' + name + '/p/' + pageNum );
        }
        fs.writeFileSync( './build/' + name + '/p/' + pageNum + '/index.html', html );
      }

      pageNum++;
    }
  } );

}

function _compileArticles( name, options ){
  var template = _loadTemplate( name, 'article' );

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
    article.prev = arr[ index - 1 ];
    article.next = arr[ index + 1 ];

    options.article = article;
    options.curPageUrl = '/articles/' + article.id + '.html';

    var html = ejs.render( template, options );
    fs.writeFileSync( './build/' + name + '/articles/' + article.id + '.html', html );
  } );
}


function _compilePages( name, options ){
  var template = _loadTemplate( name, 'page' );

  options.filename = './local/' + name + '/templates/page.ejs';

  _.each( options.pages.items, function( page, index, arr ){
    var pathMd = './local/' + name + '/pages/' + page.id + '.md';
    if( ! fs.existsSync( pathMd ) ){
      console.log( pathMd + ' not exists.' );
      return;
    }
    var content = fs.readFileSync(pathMd, 'utf8');
    content = toc.insert(content);
    content = marked( content );
    content = content.replace(/<pre><code/g, '<pre');
    content = content.replace(/<\/code><\/pre>/g, '<\/pre>');
    page.content = content;

    options.page = page;
    options.curPageUrl = '/pages/' + page.id + '.html';

    var html = ejs.render( template, options );
    fs.writeFileSync( './build/' + name + '/pages/' + page.id + '.html', html );
  } );
}


function _compileCategory( name, options ){
  var template = _loadTemplate( name, 'category' );

  options.filename = './local/' + name + '/templates/category.ejs';
  options.category = _.groupBy( options.articles.items, 'category' );
  options.curPageUrl = '/category.html';
  //console.log( options.articles );

  var html = ejs.render( template, options );
  fs.writeFileSync( './build/' + name + '/category.html', html );
}


function _dirsPrepare( name ){
  if( ! fs.existsSync( './build/' + name ) ){
    fs.mkdirSync( './build/' + name );
  }
  if( ! fs.existsSync( './build/' + name + '/articles' ) ){
    fs.mkdirSync( './build/' + name + '/articles' );
  }
  if( ! fs.existsSync( './build/' + name + '/pages' ) ){
    fs.mkdirSync( './build/' + name + '/pages' );
  }
  if( ! fs.existsSync( './build/' + name + '/p' ) ){
    fs.mkdirSync( './build/' + name + '/p' );
  }
}

exports.compile = function( name ){
  _dirsPrepare( name );
  var options = parse.parseTOML( name );
  _compileIndex( name, options );
  _compileCategory( name, options );
  _compilePages( name, options );
  _compileArticles( name, options );
  
}


