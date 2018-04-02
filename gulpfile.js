let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let htmlmin = require('gulp-htmlmin');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let imagemin = require('gulp-imagemin');
let useref = require('gulp-useref');
let gulpIf = require('gulp-if');
let cssnano = require('gulp-cssnano');
let lazypipe = require('lazypipe');

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
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

gulp.task('img', function () {
    gulp.src('assets/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/assets'))
});

gulp.task('useref', function () {
    gulp.src('./*.html')
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, {})))
        .pipe(gulpIf('js/*.js', uglify()))
        .pipe(gulpIf('css/*.css', cssnano()))
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'))
});

gulp.task('build', ['useref', 'img'], function () { 

});