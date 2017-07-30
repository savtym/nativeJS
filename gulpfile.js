'use strict';

const port = '8080';
const path = './app';

const gulp = require('gulp');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const notifier = require('node-notifier');
const connect = require('gulp-connect');

/* babel */
const babel = require('gulp-babel');
const jsmin = require('gulp-jsmin');


/* native build in single file */
const concat = require('gulp-concat');
// const autopolyfiller = require('gulp-autopolyfiller');


gulp.task('common-js', () => {

  let isBabel = babel({
    presets: [require('babel-preset-es2015')]
  });

  isBabel.on('error', function(e) {
    console.log(e);
    isBabel.end();
    notifier.notify(`error JS: ${ e.message }`);
  });

  gulp.src(`./common-js/**/*.js`)
    .pipe(isBabel)
    .pipe(rename({
      prefix: `common-`,
      dirname: ''
    }))
    .pipe(gulp.dest(`${ path }/js/common/`))
    .pipe(connect.reload());
});


//html
gulp.task('html', function() {
  return gulp.src(`${ path }/**/*.html`)
    .pipe(connect.reload());
})


gulp.task('native-js', () => {
  let isBabel = babel({
    presets: [require('babel-preset-es2015')]
  });

  isBabel.on('error', function(e) {
    console.log(e);
    isBabel.end();
    notifier.notify(`error JS: ${ e.message }`);
  });

  gulp.src(`./nativeJS/**/*.js`)
    .pipe(isBabel)
    .pipe(concat('native.min.js'))
    // .pipe(autopolyfiller(`./js/autopolyfiller.js`, {
    //   browsers: ['last 2 version', 'ie 9']
    // }))
    // .pipe(jsmin())
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(`${ path }/js/`))
    .pipe(connect.reload());
    // .pipe(open({uri: recacheURL}))
});


/* connect server */

gulp.task('connect', function() {
  connect.server({
    root: path,
    port: port,
    livereload: true
  });
});

/* watch */
gulp.task('watch', () => {
  gulp.watch([`./nativeJS/**/*`], ['native-js']);
  gulp.watch([`./common-js/**/*`], ['common-js']);
  gulp.watch([`${ path }/**/*.html`], ['html']);
});


/* default */
gulp.task('default', ['connect', 'native-js', 'common-js', 'watch']);
