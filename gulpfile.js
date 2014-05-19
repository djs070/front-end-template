var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var tlr = require('tiny-lr')();
var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');
// var tlr = lr();

var livereload = function (evt, filepath) {
  tlr.changed({
    body: {
      files: path.relative(__dirname, filepath)
    }
  });
};
 
gulp.task('sass', function () {
  return gulp.src('src/stylesheets/*.scss')
    .pipe(sass({sourcemap: true}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function () {
  return gulp.src('src/js/**')
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function() {
  return gulp.src('src/html/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('build/img'));
});

gulp.task('static', function() {
  return gulp.src('static/**')
    .pipe(gulp.dest('build'));
});

// gulp.task('styles', function () {
//   return gulp.src('./stylesheets/*.scss')
//     .pipe(sass({sourcemap: true}))
//     .pipe(gulp.dest('./css'));
// });
 
gulp.task('default', ['js', 'html', 'sass', 'images', 'static'], function() {
  http.createServer(ecstatic({root: __dirname + "/build"})).listen(8080);
  gutil.log(gutil.colors.blue('HTTP server listening on port 8080'));
  tlr.listen(35729);
  gutil.log(gutil.colors.blue('Livereload server listening on port 35729'));
  gulp.watch('src/stylesheets/**', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/html/*.html', ['html']);
  gulp.watch('src/img/*', ['images']);
  gulp.watch('static/**', ['static']);
  gulp.watch(['build/**'])._watcher.on('all', livereload);
});
