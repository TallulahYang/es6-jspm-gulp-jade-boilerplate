var gulp = require('gulp'), 
	browserSync = require('browser-sync');


gulp.task('js', function () {
    return gulp.src(global.paths.js)
        .pipe(browserSync.reload({ stream: true }));
});