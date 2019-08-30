// REQUIRE
//===================================
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const del = require("del");

// PATHS
//===================================
const files = {
  indexPath: "./*.html",
  viewsPath: "./src/views/*.html",
  cssPath: "./src/scss/**/*.scss",
  jsPath: "./src/js/main.js",
  imagesPath: "./src/images/**/*",
  fontsPath: "./src/fonts/**/*"
};

// Path: CSS Libraries
const libPath = ["./src/css/lib/bootstrap.min.css"];

// Path: JS Vendor
const vendorPath = [
  "./src/js/vendor/jquery.min.js",
  "./src/js/vendor/bootstrap.min.js"
];

// TASKS
//===================================

function cleanTask() {
  return del(["./dist/**", "!./dist"]);
}

function indexTask() {
  return src(files.indexPath)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

// Task: CSS (libraries)
function imageTask() {
  return src(files.imagesPath)
    .pipe(imagemin())
    .pipe(dest("./dist/images"));
}

// Task: CSS
function styleTask() {
  return src(files.cssPath)
    .pipe(sass())
    .pipe(cssnano())
    .pipe(concat("styles.min.css"))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

// Task: JS
function scriptTask() {
  return src(files.jsPath)
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("./dist/js"))
    .pipe(browserSync.stream());
}

// Task: JS (vendor)
function vendorTask() {
  return src(vendorPath)
    .pipe(concat("vendor.min.js"))
    .pipe(uglify())
    .pipe(dest("./dist/js"))
    .pipe(browserSync.stream());
}

// Task: CSS (libraries)
function libTask() {
  return src(libPath)
    .pipe(cssnano())
    .pipe(concat("lib.min.css"))
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
}

// Task: Fonts
function fontsTask() {
  return src(files.fontsPath).pipe(dest("./dist/fonts"));
}

// Task: Watch
function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  //watch(files.indexPath).on("change", browserSync.reload);
  //watch(files.viewsPath).on("change", browserSync.reload);
  watch(vendorPath);
  watch(libPath);
  watch(
    [
      files.indexPath,
      files.cssPath,
      files.jsPath,
      files.imagesPath,
      files.fontsPath
    ],
    parallel(
      indexTask,
      styleTask,
      scriptTask,
      imageTask,
      vendorTask,
      libTask,
      fontsTask
    )
  );
}

// Exports
exports.default = series(
  cleanTask,
  parallel(
    indexTask,
    styleTask,
    scriptTask,
    imageTask,
    vendorTask,
    libTask,
    fontsTask
  ),
  watchTask
);
