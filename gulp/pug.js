var gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    pug = require('gulp-pug'),
    foreach = require('gulp-foreach');

var modify = require('gulp-modify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('pugToJS', function() {
    return gulp.src('src/test.pug')
    .pipe(foreach(function(stream, file) {
        var filename;
        filename = path.basename(file.path);
        filename = filename.split('.')[0];
        filename = filename.split('-').join('_');
        return stream.pipe(pug({
            client: true,
            pretty: true,
            name: 'tempObj',
            basedir: '.'
        }));
    }))
    .pipe(concat('hotUpdate.js'))
    // .pipe(modify({ //override prevent
    //     fileModifier: function(file, contents) {
    //         var newContent;
    //         newContent = "var tmpObj = {'hello':'hello wrold'};\n" + contents + "\nreturn tmpObj";
    //         newContent = newContent.replace(/function \w+/g, function(match) {
    //             return 'tmpObj.' + match.substr(9) + '=function';
    //         });
    //         return newContent;
    //     }
    // }))
    .pipe(gulp.dest('src/js/'));
});


//////////now error/////////