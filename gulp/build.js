'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  cssNano = require('gulp-cssnano'),
  htmlMin = require('gulp-htmlmin'),
  jspm = require('gulp-jspm'),
  pngquant = require('imagemin-pngquant'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  runSeq = require('run-sequence'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify');

// One build task to rule them all.
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('release',['buildhot']);

// hotupdate
gulp.task('buildhot', function (done) {
  runSeq('clean', ['buildJadeHot','jadeTohtmlHot', 'jadeToJS', 'buildsass', 'buildimg', 'buildjs', 'buildfonts'], 'buildhtml', done);
});

// normal build and precompile
gulp.task('build', function (done) {
  runSeq('clean', ['jadeTohtml','buildsass', 'buildimg', 'buildjs', 'buildfonts'], 'buildhtml', done);
});

gulp.task('buildJadeHot',function() {
  gulp.src("src/views/*.json")
    .pipe(gulp.dest(global.paths.dist + '/views'));

  gulp.src("src/js/runtime.js")
    .pipe(gulp.dest(global.paths.dist + '/lib'));

})

gulp.task('buildAni',()=>{
  gulp.src("src/js/animation/*.js")
    .pipe(gulp.dest(global.paths.dist + '/js/animation'));
});
// Build SASS for distribution.
gulp.task('buildsass', function () {
  return gulp.src(global.paths.sass)
    // .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    // .pipe(concat('app.css'))
    .pipe(autoprefixer())
    // .pipe(sourcemaps.write('.'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist + '/css'));
});

// Build JS for distribution.
gulp.task('buildjs', ['buildAni'],function () {
  var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('./src/js/app.js')
        // .pipe(sourcemaps.init())
        .pipe(jspm({
          selfExecutingBundle: true,
          minify: true//,
          // skipSourceMaps: true 
        }))
        .pipe(rename('app.min.js'))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(global.paths.dist + '/js'));
});

// Build HTML for distribution.
gulp.task('buildhtml',function () {
  return  gulp.src(global.paths.html_rst)
    .pipe(gulp.dest(global.paths.dist));
});

// Build images for distribution.
gulp.task('buildimg', function () {
  return  gulp.src(global.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.dist + '/images'));
});

gulp.task('buildfonts', function () {
  return  gulp.src(global.paths.fonts)
    .pipe(gulp.dest(global.paths.dist + '/fonts'));
});