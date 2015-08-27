var gulp = require('gulp'); 
var babel = require('gulp-babel');

var browserify = require('browserify');

gulp.task('babel', function() {
  return gulp.src('src/*.js')
      .pipe(babel())
      .pipe(gulp.dest('dist'));
});
gulp.task('default', ['babel']);