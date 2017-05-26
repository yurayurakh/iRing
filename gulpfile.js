"use strict";

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');


//Local Server(localhost:8080)
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// Css
gulp.task('css', function () {
		gulp.src('css/*.css')
    .pipe(concatCss("style.min.css"))
    .pipe(prefix('last 15 versions'))
    .pipe(minifyCSS(''))
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});

// Uncss
gulp.task('uncss', function () {
    return gulp.src('app/css/style.css')
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(gulp.dest('app/uncss'));
});

// Sass
gulp.task('sass', function () {
	gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(prefix('last 15 versions'))
    .pipe(minifyCSS(''))
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload());
});


//Html
gulp.task('html', function(){
	gulp.src('app/*.html')
	.pipe(connect.reload());
});

//Wath
gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass'])
    gulp.watch('app/*.html', ['html'])
});

gulp.task('default', ['connect', 'html', 'sass','watch']);