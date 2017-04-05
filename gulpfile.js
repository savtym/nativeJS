'use strict';

let pathProject = 'ExtranetNew';
const buildPath = 'build';


const gulp = require('gulp');


/* Removes files and folders */
const clean = require('gulp-clean');

gulp.task('clean', () => {
  return gulp.src(`./${pathProject}/${buildPath}/`, {read: true})
    .pipe(clean());
});

gulp.task('clean-js', () => {
  return gulp.src([`./${pathProject}/${buildPath}/js/**/.js`, `./${pathProject}/${buildPath}/components/**/.js`], {read: false})
    .pipe(clean());
});

gulp.task('clean-html', () => {
  return gulp.src(`./${pathProject}/${buildPath}/**/.html`, {read: false})
    .pipe(clean());
});


/* autoprefixer for version browsers */
const autoprefixer = require('gulp-autoprefixer');
const autoprefixerLastVersion = "> 1%";
const autoprefixerIEVersion = "IE 9";


/* html */
gulp.task('html', ['clean-html'], () => {
	return gulp.src(`./${pathProject}/app/**/*.html`)
    .pipe(gulp.dest(`./${pathProject}/${buildPath}`))
		.pipe(connect.reload());
});

/* scss */
const sass = require('gulp-sass');

gulp.task('scss', () => {
  return gulp.src(`./${pathProject}/app/components/main.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [autoprefixerLastVersion, autoprefixerIEVersion]
    }))
    .pipe(gulp.dest(`./${pathProject}/${buildPath}/css`))
    .pipe(connect.reload());
});

/* images */
gulp.task('img', () => {
  return gulp.src(`./${pathProject}/app/images/**/*`)
    .pipe(gulp.dest(`./${pathProject}/${buildPath}/images`))
    .pipe(connect.reload());
});


/* babel */
const babel = require('gulp-babel');
const expect = require('gulp-expect-file');

gulp.task('js', ['clean-js'], () => {
  return gulp.src([`${pathProject}/app/**/*.js`, `./nativeJS/**/*.js`])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest(`./${pathProject}/${buildPath}`))
    .pipe(connect.reload());
});

/* add libs */
gulp.task('libs', () => {
  return gulp.src([
      'node_modules/systemjs/dist/system.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      `${pathProject}/app/libs/**/*`
    ])
    .pipe(gulp.dest(`./${pathProject}/${buildPath}/libs`))
		.pipe(connect.reload());
});


/* fonts */
gulp.task('fonts', () => {
  return gulp.src(`./${pathProject}/app/fonts/**/*`)
    .pipe(gulp.dest(`${pathProject}/${buildPath}/fonts`))
    .pipe(connect.reload());
});

// /* build */
// gulp.task('build', ['js', 'libs', 'less', 'html', 'img'], () => {
//   return gulp.src(`${buildPath}/**/*.*`) //min img, css, js
//     .pipe(gulp.dest('./dist'));
// });


/* connect server */
const connect = require('gulp-connect');
const history = require('connect-history-api-fallback');

gulp.task('connect', function() {
  connect.server({
    root: [`./${pathProject}/${buildPath}/`, './nativeJS/'],
    livereload: true,
    middleware: function(connect, opt) {
      return [ history({}) ]
    }
  });
});


/* watch */
gulp.task('watch', function() {
  gulp.watch([`./${pathProject}/app/**/*.html`], ['html']);
  gulp.watch([`./${pathProject}/app/**/*.scss`], ['scss']);
  gulp.watch([`./${pathProject}/app/libs/*.js`], ['libs']);
  gulp.watch([`./${pathProject}/app/fonts/**/*`], ['fonts']);
  gulp.watch([`./${pathProject}/app/images/**/*`], ['img']);
  gulp.watch([`./${pathProject}/app/**/*.js`, `./nativeJS/**/*`], ['js']);
});


const gulpParam = require('gulp-param')(require('gulp'), process.argv);

/* default */
gulpParam.task('default', function (client, extranet) {

  if (client) pathProject = 'ClientNew';
  else if (extranet) pathProject = 'ExtranetNew';

  console.log(`\x1b[33m\n\t   Project start in path: ./${pathProject}/${buildPath}/\n\x1b[37m`);

  return gulp.start(['connect', 'html', 'fonts', 'js', 'libs', 'scss', 'img', 'watch']);
});