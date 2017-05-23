const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const sequence = require('gulp-sequence');

gulp.task('sass', () => {
  return gulp.src('./src/app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/app'));
});

gulp.task('copy:bkp', () => {
  return gulp.src('./src/app/**/*.scss')
    .pipe(rename({extname: '.scssbkp'}))
    .pipe(gulp.dest('./src/app'));
});

gulp.task('rename:css:scss', () => {
  return gulp.src('./src/app/**/*.css')
    .pipe(rename({extname: '.scss'}))
    .pipe(gulp.dest('./src/app'));
});

gulp.task('rename:bkp:scss', () => {
  return gulp.src('./src/app/**/*.scssbkp')
    .pipe(rename({extname: '.scss'}))
    .pipe(gulp.dest('./src/app'));
});

gulp.task('clean', () => {
  return gulp.src(['./src/app/**/*.scssbkp', './src/app/**/*.css'], {read: false})
    .pipe(clean());
});

gulp.task('before:ngc', sequence('sass', 'copy:bkp', 'rename:css:scss'));
gulp.task('after:ngc', sequence('rename:bkp:scss', 'clean'));
