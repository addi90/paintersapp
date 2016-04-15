var gulp = require('gulp');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var filesToCopy = [
  'app/index.html',
  "app/assets/**/*.*",
  "app/styles/**/*.*",
  //TODO: This should be moved to a task to create a bundled file
  "app/bower_components/**/*.{js,css}"
];

gulp.task('ts', function(){
  var tsSource =  gulp.src(['app/scripts/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: true,
      noExternalResolve: false,
      removeComments: false,
      sortOutput: true,
      target: "ES5"
    }));

  return tsSource.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/app/scripts'));
});

gulp.task('copy', function(){
  gulp.src(filesToCopy, { base: './' })
    .pipe(gulp.dest('dist'))
});
//TODO: Add watch and serve

gulp.task('default', function () {
  runSequence(
    'ts',
    'copy'
  );
});