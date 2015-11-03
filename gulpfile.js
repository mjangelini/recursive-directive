// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});
gulp.task('copy-js-files', function() {
  gulp.src('./app/js/**')
    .pipe(gulp.dest('dist/js'));
});
gulp.task('copy-css-files', function() {
  gulp.src('./app/css/**')
    .pipe(gulp.dest('dist/css'));
});
gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});


// default task
gulp.task('serve',
  ['lint', 'connect']
);
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint', 'copy-js-files', 'copy-css-files', 'copy-html-files', 'copy-bower-components', 'connectDist']
  );
});