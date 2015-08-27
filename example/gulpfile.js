var gulp = require('gulp'); 
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('babel', function() {
  return gulp.src('src/*.js')
      .pipe(babel())
      .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function(){
  return gulp.src(['./dist/app.js'], {read: false})
  .pipe(browserify())
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./dist'));
});
gulp.task('default', ['babel', 'browserify']);
