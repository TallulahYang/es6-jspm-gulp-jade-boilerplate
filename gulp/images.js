'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var config = global.paths.img;
var browserSync = require('browser-sync');

gulp.task('images', function() {
    return gulp.src(config)
        .pipe(changed(config)) // Ignore unchanged files
        .pipe(browserSync.reload({ stream: true }));
});