'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');


gulp.task('sass', () => {
    return gulp.src('assets/scss/styles.scss')
        .pipe(maps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('autoprefixer', ['sass'], () => {
    return gulp.src('assets/css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('minify', ['autoprefixer'], () => {
    return gulp.src('assets/css/styles.css')
    .pipe(minify({debug:true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(gulp.dest('assets/css'))
});

gulp.task('sass:watch', () => {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('del', () => {
    del(['public', 'assets/css/styles.css*']);
});

gulp.task('build', ['minify'], () => {
    return gulp.src(['assets/css/styles.css', 'index.html', 'about.html', 'contact.html', 'services.html', 'terms.html', 'privacy.html', 'assets/img/**'], { base: './' })
    .pipe(gulp.dest('public'));
});

// start is replace by series in gulp 4
// gulp.task('default', ['del'], () => {
//     gulp.start('build');
// });
