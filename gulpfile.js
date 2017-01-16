'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
// var gulpif = require('gulp-if');
var minimist = require('minimist');

global.paths = {
    // HTML sources.
    'html': './src/*.html',

    'html_rst': './src/index.html',

    'html_dev': './src/*.nunjucks.html',

    'js': './src/js/**/*.js',

    'sass': './src/scss/app.scss',

    'img': './src/images/**/*',

    'fonts': './src/fonts/**/*',

    'src': './src',

    'views': './src/views/modules/**/*.jade',

    'datas': './src/views/modules/**/**/*.json',

    'css': './src/css',

    'dist': './deploy'
};

var knownOptions = {
    string: 'hot',
    default: { hot: 'runtime' } // runtime or pre
};

var options = minimist(process.argv.slice(2), knownOptions);  



requireDir('./gulp', { recurse: false });

// dev use jade and preCompile
gulp.task('development', ['sass', 'js', 'images', 'fonts', 'jadeTohtml:dev', 'watch']);

//dev use hotupdate 
gulp.task('hot', ['sass', 'js', 'images', 'fonts', 'jadeParseHot', 'jadeToJS', 'watch_hot']);

//  dev use nunjucks
gulp.task('dev_nj', ['sass', 'nunjucks', 'js', 'images', 'fonts', 'watch']);

gulp.task('default', ['dev']);

gulp.task('dev',function(){
    console.log('-------------_'+ options.hot +'_-----------------');
    if(options.hot !='runtime'){
        gulp.start("development");
    }else{
        gulp.start("hot");
    }
});