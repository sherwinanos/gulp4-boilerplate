"use strict";

// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const concat        = require('gulp-concat');
const del           = require('del');
const imagemin      = require('gulp-imagemin');
const postcss       = require('gulp-postcss');
const replace       = require('gulp-replace');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');

// File path variables
const files = {
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js',
  imgPath: 'app/images/**/*',
  fontPath: 'app/fonts/**/*'
}

// Sass task
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('dist/css')
  );
}

// JS task
function jsTask() {
  return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
}

// Image task
function imgTask() {
  return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('dist/images/'))
}

// Fonts task
function fontTask() {
  return src(files.fontPath)
    .pipe(dest('dist/fonts/'))
}

// Cachebusting task
var cbString = new Date().getTime();
function cacheBustingTask(){
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

function cleanTask() {
  return del(['dist']);
}

// Watch task
function watchTask() {
  watch([files.scssPath, files.jsPath, files.imgPath, files.fontPath],
    parallel(scssTask, jsTask, imgTask, fontTask)
  );
}


// Default task
exports.default = series(
  cleanTask,
  parallel(scssTask, jsTask, imgTask, fontTask),
  cacheBustingTask,
  watchTask
);
