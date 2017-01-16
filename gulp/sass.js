'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('sass', function() {
    return gulp.src(global.paths.sass)
        // .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        // .pipe(concat('app.css'))
        .pipe(autoprefixer())
        // .pipe(sourcemaps.write('.'))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.css))
        .pipe(browserSync.reload({ stream: true }));
});