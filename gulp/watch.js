var gulp = require('gulp');
var browserSync = require('browser-sync'),
	path = require('path');//,util = require('gulp-util');

// Define the watch task
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(global.paths.sass, ['sass']);
    gulp.watch(global.paths.js, ['js']).on('change', reloadAndLog);
    gulp.watch(global.paths.fonts, ['fonts']).on('change', reloadAndLog);
    gulp.watch(global.paths.img, ['images']).on('change', reloadAndLog);
    gulp.watch(global.paths.html_dev, ['nunjucks']).on('change', reloadAndLog);
    gulp.watch(global.paths.views, ['jadeTohtml']).on('change', reloadAndLog);
    gulp.watch(global.paths.html).on('change', reloadAndLog);
});

gulp.task('watch_hot', ['browserSync'], function() {
    gulp.watch(global.paths.sass, ['sass']);
    gulp.watch(global.paths.js, ['js']).on('change', reloadAndLog);
    gulp.watch(global.paths.fonts, ['fonts']).on('change', reloadAndLog);
    gulp.watch(global.paths.img, ['images']).on('change', reloadAndLog);
    gulp.watch(global.paths.html_dev, ['nunjucks']).on('change', reloadAndLog);
    gulp.watch(global.paths.views, ['jadeParseHot']).on('change', reloadAndLog);
    gulp.watch(global.paths.html).on('change', reloadAndLog);
});


function reloadAndLog(event) {
	browserSync.reload();
	// util.log(
	//     util.colors.green('File ' + event.type + ': ') +
	//     util.colors.magenta(path.basename(event.path))
	//   );
}