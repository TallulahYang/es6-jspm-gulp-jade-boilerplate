'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('browserSync', function() {
  return  browserSync({
        server: global.paths.src
    });
});

gulp.task('serve', ['browserSync']);
