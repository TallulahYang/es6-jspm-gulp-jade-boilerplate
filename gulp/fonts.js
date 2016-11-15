'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = global.paths.fonts;

gulp.task('fonts', function() {
    return gulp.src(config)
        .pipe(browserSync.reload({ stream: true }));
});