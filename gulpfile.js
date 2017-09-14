'use strict';

const port = '8000';
const path = './app';
const pathBuild = './build';

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
const order = require('gulp-order');
const autopolyfiller = require('gulp-autopolyfiller');
const merge = require('event-stream').merge;
// const autoPolyfiller = require('gulp-autoPolyfiller');



//html
gulp.task('html', function() {
  return gulp.src(`${ path }/**/*.html`)
    .pipe(gulp.dest(`${ pathBuild }/`))
    .pipe(connect.reload());
});

// scss
const sass = require('gulp-sass');

gulp.task('scss', () => {
  return gulp.src(`${ path }/scss/main.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${ pathBuild }/css/`))
    .pipe(connect.reload());
});


gulp.task('js-native', () => {
  let isBabel = babel({
    presets: [require('babel-preset-es2015')]
  });

  isBabel.on('error', function(e) {
    console.log(e);
    isBabel.end();
    notifier.notify(`error JS: ${ e.message }`);
  });

  // Concat all required js files
  const all = gulp.src([`${ path }/libs/*.js`, `${ path }/libs/polyfill/*.js`, `${ path }/js/common/components/*.js`, `${ path }/js/common/*.js`, `${ path }/js/*.js`])
    .pipe(isBabel)
    .pipe(concat('native.js'));

  // Generate polyfills for all files
  const polyfills = all
    .pipe(autopolyfiller('polyfills.js', {
      browsers: ['last 2 version', 'ie 8', 'ie 9']
    }));

  return merge(polyfills, all)
  // Order files. NB! polyfills MUST be first
    .pipe(order([
      'polyfills.js',
      'native.js'
    ]))
    // Make single file
    .pipe(concat('native.min.js'))
    // Uglify it
    // .pipe(jsmin())
    .pipe(rename({dirname: ''}))
    // And finally write `all.min.js` into `build/` dir
    .pipe(gulp.dest(`${ pathBuild }/libs/`))
    .pipe(connect.reload());
});

gulp.task('js', () => {
  let isBabel = babel({
    presets: [require('babel-preset-es2015')]
  });

  isBabel.on('error', function(e) {
    console.log(e);
    isBabel.end();
    notifier.notify(`error JS: ${ e.message }`);
  });

  gulp.src(`${ path }/components/**/*.js`)
    .pipe(isBabel)
    // .pipe(autoPolyfiller(`./js/autoPolyfiller.js`, {
    //   browsers: ['last 2 version', 'ie 9']
    // }))
    // .pipe(jsmin())
    // .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(`${ pathBuild }/components/`))
    .pipe(connect.reload());
    // .pipe(open({uri: recacheURL}))
});


/* connect server */

gulp.task('connect', function() {
  connect.server({
    root: pathBuild,
    port: port,
    livereload: true
  });
});

/* watch */
gulp.task('watch', () => {
  gulp.watch([`${ path }/components/**/*`], ['js']);
  gulp.watch([`${ path }/js/**/*`], ['js-native']);
  gulp.watch([`${ path }/**/*.scss`], ['scss']);
  gulp.watch([`${ path }/**/*.html`], ['html']);
});


/* default */
gulp.task('default', ['connect', 'html', 'js', 'js-native', 'scss', 'watch']);
