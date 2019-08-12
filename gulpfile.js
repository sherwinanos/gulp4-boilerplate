"use strict";

// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const concat        = require('gulp-concat');
const imagemin      = require('gulp-imagemin');
const postcss       = require('gulp-postcss');
const replace       = require('gulp-replace');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');

// File path variables
const files = {
  htmlPath: 'app/*.html',
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js',
  imgPath: 'app/images/**/*'
}

// Sass task
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css')
  );
}

// JS task
function jsTask() {
  return src(files.jsPath)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
}

// Image task
function imgTask() {
  return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('dist/images/'))
}

// HTML task
function htmlTask() {
  return src(files.htmlPath)
    .pipe(dest('dist/'))
}

// Cachebusting task
const cbString = new Date().getTime();
function cacheBustingTask() {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'))
}

// Watch task
function watchTask() {
  watch([files.scssPath, files.jsPath, files.imgPath, files.htmlPath],
    parallel(scssTask, jsTask, imgTask, htmlTask, reloadTask)
  );
}

// Default task
exports.default = series(
  parallel(scssTask, jsTask, imgTask, htmlTask),
  cacheBustingTask,
  watchTask
);
