var gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    jade = require('gulp-jade'),
    data = require('gulp-data'),
    foreach = require('gulp-foreach'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync');

var modify = require('gulp-modify'),
    replace = require('gulp-replace');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var plumber = require('gulp-plumber');

const filter = require('gulp-filter');

const f = filter(['src/views/index.html']);


gulp.task('jadeTohtmlHot', ['moveData','productionHotCheck'],function() {
    return gulp.src('src/views/*.jade')
        .pipe(data(function(file) {
            console.log(path.basename(file.path))
                // return require('./data/' + path.basename(file.path) + '.json')  // just one json
            return require('../src/views/' + 'index.jade' + '.json')
        }))
        .pipe(jade({ pretty: true }))
        // .pipe(jade({
        //   locals: global.datas,
        //   pretty: true
        // }))
        // .pipe(gulp.dest('src/views/'))
        .pipe(plumber())
        .pipe(f)
        .pipe(replace("var ishot = false;", "var ishot = true;"))
        .pipe(gulp.dest('src/'));
});

gulp.task('jadeTohtml', ['productionPreCheck'],function() {
    return gulp.src('src/views/index.jade')
        .pipe(data(function(file) {
            return require('../src/views/' + 'index.jade' + '.json')
        }))
        .pipe(jade({ pretty: true }))
        .pipe(plumber())
        // .pipe(gulp.dest('src/views/'))
        .pipe(f)
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('devPreCheck', function() {
    return gulp.src('src/views/core/*.jade')
        .pipe(replace("-var env = 'production'", "-var env = 'dev'"))
        .pipe(replace("-var pre = 'hotUpdate'", "-var pre = 'preCompile'"))
        .pipe(gulp.dest('src/views/core/'));
})

gulp.task('productionHotCheck', function() {
    return gulp.src('src/views/core/*.jade')
        .pipe(replace("-var env = 'dev'", "-var env = 'production'"))
        .pipe(replace("-var pre = 'preCompile'", "-var pre = 'hotUpdate'"))
        .pipe(gulp.dest('src/views/core/'));
})

gulp.task('devHotCheck', function() {
    return gulp.src('src/views/core/*.jade')
        .pipe(replace("-var env = 'production'", "-var env = 'dev'"))
        .pipe(replace("-var pre = 'preCompile'", "-var pre = 'hotUpdate'"))
        .pipe(gulp.dest('src/views/core/'));
})

gulp.task('productionPreCheck', function() {
    return gulp.src('src/views/core/*.jade')
        .pipe(replace("-var env = 'dev'", "-var env = 'production'"))
        .pipe(replace("-var pre = 'hotUpdate'", "-var pre = 'preCompile'"))
        .pipe(gulp.dest('src/views/core/'));
})


gulp.task('jadeTohtml:dev', ['devPreCheck'],function() {
    return gulp.src('src/views/index.jade')
        .pipe(data(function(file) {
            return require('../src/views/' + 'index.jade' + '.json')
        }))
        .pipe(jade({ pretty: true }))
        .pipe(plumber())
        // .pipe(gulp.dest('src/views/'))
        .pipe(f)
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('jadeParseHot', ['moveData','devHotCheck'], function() {
    return gulp.src('src/views/index.jade')
        .pipe(data(function(file) {
            console.log(path.basename(file.path))
                // return require('./data/' + path.basename(file.path) + '.json')  // just one json
            return require('../src/views/' + 'index.jade' + '.json')
        }))
        .pipe(jade({ pretty: true }))
        .pipe(plumber())
        // .pipe(gulp.dest('src/views/'))
        .pipe(f)
        .pipe(replace("var ishot = false;", "var ishot = true;"))
        // .pipe(replace('<script src="app.min.js"></script>', '<script src="jspm_packages/system.js"></script><script src="config.js"></script><script>System.import("./js/app_hot")</script>'))
        .pipe(gulp.dest('src/'));

})

gulp.task('buildIdx', function(argument) {
    return gulp.src('src/views/index.html')
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('jadeToJS', function() {
    return gulp.src('src/views/article.jade')
        .pipe(foreach(function(stream, file) {
            var filename;
            filename = path.basename(file.path);
            filename = filename.split('.')[0];
            filename = filename.split('-').join('_');
            console.log(filename)
            return stream.pipe(jade({
                client: true,
                pretty: true,
                name: filename,
                basedir: '.'
            }));
        }))
        .pipe(concat('hotUpdate.js'))
        .pipe(modify({
            // fileModifier: function(file, contents) {
            //     var newContent;
            //     newContent = "var tmpObj = {'hello':'hello wrold'};\n" + contents + "\nreturn tmpObj";
            //     newContent = newContent.replace(/function \w+/g, function(match) {
            //         return 'tmpObj.' + match.substr(9) + '=function';
            //     });
            //     return newContent;
            // }
        }))
        .pipe(gulp.dest('src/js/'));
});
var isWin = /^win/.test(process.platform);
gulp.task('moveData', function() {
  return gulp.src('src/views/modules/**/data/*.json').pipe(foreach(function(stream, file) {
    var filenamearr;
    filenamearr = file.path.split(isWin?"\\":'/');
    filename = filenamearr[filenamearr.length - 3] + '.json';
    console.log(filename)
    return stream.pipe(rename(filename));
  })).pipe(modify({
    fileModifier: function(file, contents) {
      var newContent;
      newContent = '"' + filename.split('.')[0] + '":{\n"data":' + contents + '\n},';
      return newContent;
    }
  }))
  .pipe(concat('index.jade.json'))
  .pipe(modify({
    fileModifier: function(file, contents) {
      var newContent;
      newContent = contents.substr(0, contents.length - 1);
      newContent = "{\n" + newContent + "\n}";

      return newContent;
    }}))
  .pipe(gulp.dest('src/views/'))
  .pipe(concat('copy.txt'))
  .pipe(gulp.dest('src/'));
});