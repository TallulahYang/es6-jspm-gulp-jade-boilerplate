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

const filter = require('gulp-filter');

const f = filter(['src/views/index.html']);


gulp.task('jadeTohtmlHot', function() {
    return gulp.src('src/views/*.jade')
        .pipe(replace("-var env = 'dev'", "-var env = 'production'"))
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
        .pipe(gulp.dest('src/views/'))
        .pipe(f)
        .pipe(gulp.dest('src/'));
});

gulp.task('jadeTohtml', function() {
    return gulp.src('src/views/*.jade')
        .pipe(replace("-var env = 'production'", "-var env = 'dev'"))
        .pipe(data(function(file) {
            return require('../src/views/' + 'index.jade' + '.json')
        }))
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('src/views/'))
        .pipe(f)
        .pipe(gulp.dest('src/'))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('jadeParseHot', function() {
    return gulp.src('src/views/*.jade')
        .pipe(replace("-var env = 'dev'", "-var env = 'production'"))
        .pipe(data(function(file) {
            console.log(path.basename(file.path))
                // return require('./data/' + path.basename(file.path) + '.json')  // just one json
            return require('../src/views/' + 'index.jade' + '.json')
        }))
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('src/views/'))
        .pipe(f)
        .pipe(replace('<script src="app.min.js"></script>', '<script src="jspm_packages/system.js"></script><script src="config.js"></script><script src="./js/runtime.js"></script><script>System.import("./js/app_hot")</script>'))
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


// gulp.task('jadeTohtml', ['buildDev','buildIdx']);