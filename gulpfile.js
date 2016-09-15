"use strict"

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    path = require('path'),
    prefix = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    prettify = require('gulp-prettify');

// Build task

gulp.task('build', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Gulp connect task

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
});

// JADE task

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

gulp.task('pug', function() {
    return gulp.src('pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .on('error', notify.onError(function (error) {
       return 'Pug compiling error\n' + error;
    }))
    .pipe(gulp.dest('app/'));
});

// HTML task

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(prettify({indent_size: 4}))
    .pipe(connect.reload());
});

// CSS task

gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

// JS task

gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// SASS task

gulp.task('sass', function () {
  gulp.src('sass/*.sass')
    .pipe(sass())
    .on('error', notify.onError(function (error) {
       return 'Sass compiling error\n' + error;
    }))
    .pipe(prefix("last 15 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
    .pipe(gulp.dest('./app/css'));
});

// Watch task

gulp.task('watch', function () {
  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('pug/*.pug', ['pug']);
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/js/*.js'], ['js']);
  // gulp.watch('pug/includes/*.pug', ['pug']);
});

// Default task

gulp.task('default', ['connect', 'pug', 'watch']);
