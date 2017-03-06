"use strict"

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

/* autoprefixer for version browsers */
const autoprefixerLastVersion = "> 1%";
const autoprefixerIEVersion = "IE 8";

//less
const less = require('gulp-less');
const path = require('path');

gulp.task('less', function() {
  return gulp.src('./app/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
      browsers: [autoprefixerLastVersion, autoprefixerIEVersion],
      cascade: false
    }))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

//html
gulp.task('html', function() {
	return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build'))
		.pipe(connect.reload());
})

//img
gulp.task('img', function() {
  return gulp.src(['./app/**/*.png', './app/**/*.jpg'])
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
})

//css
gulp.task('css', function() {
  return gulp.src(['./app/**/*.css'])
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
})

//fonts
gulp.task('fonts', function() {
  return gulp.src(['./app/fonts/*.*'])
    .pipe(gulp.dest('./build/fonts/'))
    .pipe(connect.reload());
})


//babel
const babel = require('gulp-babel');
const expect = require('gulp-expect-file');

gulp.task('js', function() {
  return gulp.src('./app/**/*.js') 
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./build'))
    .pipe(expect('./app/**/*.js'))
		.pipe(connect.reload());
});

//libs js
gulp.task('libs', function() {
  return gulp.src([
    'node_modules/systemjs/dist/system.js',
    'node_modules/babel-polyfill/dist/polyfill.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('./build/libs'))
		.pipe(connect.reload());
});


//build
gulp.task('build', ['js', 'libs', 'less', 'html', 'img', 'fonts', 'css'], function(){
  return gulp.src('./build/**/*.*') //min img, css, js
    .pipe(gulp.dest('./dist'));
});


//connect server
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8888
  });
});

//watch
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/**/*.less'], ['less']);
  gulp.watch(['./app/**/*.js'], ['js']);
  gulp.watch(['./app/**/*.img'], ['img']);
  gulp.watch(['./app/**/*.css'], ['css']);
  gulp.watch(['./app/fonts/*.*'], ['fonts']);
});

//default
gulp.task('default', ['connect', 'html', 'js', 'css', 'fonts', 'libs', 'less', 'img', 'watch']);