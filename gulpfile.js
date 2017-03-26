"use strict"

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

/* autoprefixer for version browsers */
const autoprefixerLastVersion = "> 1%";
const autoprefixerIEVersion = "IE 8";


//html
gulp.task('html', function() {
	return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build'))
		.pipe(connect.reload());
})

/* scss */

const sass = require('gulp-sass');

gulp.task('scss', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload());
});

//img
gulp.task('img', function() {
  return gulp.src(['./app/**/*.png', './app/**/*.jpg'])
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
})


//babel
const babel = require('gulp-babel');
const expect = require('gulp-expect-file');

gulp.task('js', function() {
  return gulp.src('./app/scrips/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./build'))
    // .pipe(expect('./app/**/*.js'))
		.pipe(connect.reload());
});

gulp.task('jsComponent', function() {
    return gulp.src('./app/**/**/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('./build'))
        // .pipe(expect('./app/**/*.js'))
        .pipe(connect.reload());
});


//libs js
gulp.task('libs', function() {
  return gulp.src([
    'node_modules/systemjs/dist/system.js',
    'node_modules/babel-polyfill/dist/polyfill.js'])
    .pipe(gulp.dest('./build/libs'))
		.pipe(connect.reload());
});


//build
gulp.task('build', ['js', 'libs', 'less', 'html', 'img'], function(){
  return gulp.src('./build/**/*.*') //min img, css, js
    .pipe(gulp.dest('./dist'));
});


//connect server
const connect = require('gulp-connect');
const history = require('connect-history-api-fallback');

gulp.task('connect', function() {
  connect.server({
    root: './build',
    livereload: true,
    port: 8888,
    // middleware: function(connect, opt) {
    //   return [
    //     history({})
    //   ]
    // }
  });
});

//watch
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.scss'], ['scss']);
    gulp.watch(['./app/scripts/**/*.js'], ['js']);
    gulp.watch(['./app/**/*.js'], ['jsComponent']);
  gulp.watch(['./app/**/*.img'], ['img']);
});

//default
gulp.task('default', ['connect', 'html', 'js', 'jsComponent', 'libs', 'scss', 'img', 'watch']);