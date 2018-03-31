var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('default', ['browser-sync'], function() {
    gulp.watch('css/**/*.css').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});