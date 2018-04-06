/*=============================================
=            Gulp Modules                     =
=============================================*/
// Get the required modules and create and instances
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

/*=====  End of Gulp Modules           ======*/


/**
 * Default task w/ dependencies 
 * Dep: styles          process the sass files into css
 *      browser-sync    starts serving the project to the server
 */
gulp.task('default', ['styles', 'browser-sync'], function () {
    gulp.watch('sass/**/*.scss', ['styles']);                   // Watch sass files and calls styles task when they change
    gulp.watch('*.html').on('change', browserSync.reload);      // Watch html file and reloads browser on change
    gulp.watch('js/**/*.js').on('change', browserSync.reload);  // Watch js files and reloads browser on change
});

/**
 * Task for processing stylesheets
 */
gulp.task('styles', function () {
    gulp.src('sass/**/*.scss')                                  // Grab the files to work with
        .pipe(sass().on('error', sass.logError))                // Put them through the sass processor and convert to css, show errors if
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))  // Add prefixes for required items in new css
        .pipe(gulp.dest('./css'))                               // Place them in directory
        .pipe(browserSync.stream())                             // Push changes to the broswer
});

/**
 * Task for serving the project to the server and browser
 */
gulp.task('browser-sync', function () {
    browserSync.init({      // Initialize browser sync
        server: {           // Option
            baseDir: './'   // Directory to server
        }
    });
});

/**
 * Task to minify the html 
 */
gulp.task('html', function () {
    gulp.src('*.html')                                  // Grab the files to work with
        .pipe(htmlmin({ collapseWhitespace: true }))    // Push those files and minify with options
        .pipe(gulp.dest('build'))                       // Place the new file in desired directory
});

/**
 * Task to minify css and create a sourcemap
 */
gulp.task('css', function () {
    gulp.src('css/*.css')                           // Grab files to work with 
        .pipe(sourcemaps.init())                    // Start mapping
        .pipe(cleanCSS({ compatibility: 'ie8' }))   // Miniy css w/ options
        .pipe(sourcemaps.write())                   // Write map data on file
        .pipe(gulp.dest('build/css'))               // Place the new file in desired directory
});

/**
 * Task to combine js files, uglify, and create sourcemap
 */
gulp.task('js', function () {
    gulp.src(['./js/index1.js', './js/index2.js'])  // Grab files to work with
        .pipe(sourcemaps.init())                    // Start mapping
        .pipe(concat('main.min.js'))                // Join files and set the new file name
        .pipe(uglify())                             // uglify or min
        .pipe(sourcemaps.write())                   // Write map data on file
        .pipe(gulp.dest('build/js'))                // Place the new file in desired directory
});

/**
 * Task to minify images
 */
gulp.task('img', function () {
    gulp.src('assets/*')                    // Grab files to work with
        .pipe(imagemin())                   // Minify images
        .pipe(gulp.dest('build/assets'))    // Place new files in desired directory
});

/**
 * Task to minify files and change ref data
 */
gulp.task('ref', function () {
    gulp.src('*.html')                                          // Grab file to work with
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, {}))) // Process thru useref and map data as needed
        .pipe(gulpIf('js/*.js', uglify()))                      // If file references js files, then uglify them
        .pipe(gulpIf('css/*.css', cssnano()))                   // If file references css files, minify
        .pipe(htmlmin({ collapseWhitespace: true}))             // Minify the referenced file
        .pipe(sourcemaps.write())                               // Write map data on files
        .pipe(gulp.dest('build'))                               // Place the files in desired directory
});

/**
 * Task build files using dependencies
 */
gulp.task('build', ['useref', 'img'], function () { 

});