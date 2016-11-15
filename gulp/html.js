var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
// log error
var plumber = require('gulp-plumber');
var prettify = require('gulp-prettify');
var rename = require('gulp-rename');
var data = require('gulp-data');

function getDataForFile(file) {
    return require(global.paths.html_config);
}
gulp.task('nunjucks', function() {
    nunjucksRender.nunjucks.configure([global.paths.html_dev], { watch: false });
    return gulp.src(global.paths.html_dev)
        .pipe(plumber())
        // .pipe(data(getDataForFile))
        .pipe(nunjucksRender({
            data: global.datas
        }))
        .pipe(prettify({ indent_size: 4 }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(global.paths.src));
});