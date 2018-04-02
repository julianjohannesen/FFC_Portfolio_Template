var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var imagemin = require('gulp-imagemin');

gulp.task('default', ['styles', 'browser-sync'], function () {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);
});


gulp.task('styles', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
});


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'))
});

gulp.task('css', function () {
    gulp.src('css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
});

gulp.task('js', function () {
    gulp.src(['./js/index1.js', './js/index2.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

gulp.task('img', function () {
    gulp.src('assets/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/assets'))
});

gulp.task('build', ['html', 'css', 'js'], function () { });